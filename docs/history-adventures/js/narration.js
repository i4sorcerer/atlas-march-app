/* =========================================================================
 * Mario 的中华五千年 · 中文朗读器
 * 优先播放预生成故事音频，失败时回退到浏览器中文语音。
 * ========================================================================= */

(function () {
  "use strict";

  const synth = window.speechSynthesis;
  const speechSupported = Boolean(synth && window.SpeechSynthesisUtterance);
  const audioSupported = typeof window.Audio === "function";
  let enabled = false;
  let preferredVoice = null;
  let activeUtterances = [];
  let audioPlayer = null;
  let audioPlayToken = 0;
  let audioPlayText = "";
  let audioFailedToken = 0;
  let onStateChange = function () {};
  let requestToken = 0;
  let startTimer = 0;

  function emit(status, detail) {
    onStateChange(Object.assign({ status }, detail || {}));
  }

  function pickChineseVoice(voices) {
    const candidates = voices
      .filter((voice) => /^zh|chinese|mandarin|中文|普通话/i.test(voice.lang + " " + voice.name))
      .map((voice) => {
        let score = 0;
        if (/^zh-CN$/i.test(voice.lang)) score += 100;
        else if (/^zh/i.test(voice.lang)) score += 60;
        if (voice.localService) score += 30;
        if (/婷婷|语舒|美嘉|善怡|普通话|mandarin|Chinese/i.test(voice.name)) score += 20;
        if (/Eddy|Flo|Grandma|Grandpa|Reed|Rocko|Sandy|Shelley/i.test(voice.name)) score -= 8;
        return { voice, score };
      })
      .sort((a, b) => b.score - a.score);

    return candidates.length ? candidates[0].voice : null;
  }

  function loadVoices() {
    if (!speechSupported) return null;
    const voices = synth.getVoices();
    if (!voices.length) return preferredVoice;
    preferredVoice = pickChineseVoice(voices) || preferredVoice;
    return preferredVoice;
  }

  function clearStartTimer() {
    if (startTimer) window.clearTimeout(startTimer);
    startTimer = 0;
  }

  function pauseAudio() {
    if (!audioPlayer) return;
    try {
      audioPlayer.pause();
    } catch (error) {
      // Ignore pause failures while switching audio sources.
    }
  }

  function ensureAudioPlayer() {
    if (!audioSupported) return null;
    if (audioPlayer) return audioPlayer;

    audioPlayer = new Audio();
    audioPlayer.preload = "auto";
    audioPlayer.setAttribute("playsinline", "");
    audioPlayer.addEventListener("ended", () => {
      if (audioPlayToken === requestToken) emit("ended");
    });
    audioPlayer.addEventListener("error", () => {
      if (audioPlayToken === requestToken) {
        fallbackToSpeech(audioPlayToken, audioPlayText);
      }
    });
    return audioPlayer;
  }

  function stop() {
    requestToken += 1;
    audioPlayToken = 0;
    clearStartTimer();
    activeUtterances = [];
    pauseAudio();
    if (speechSupported && (synth.speaking || synth.pending || synth.paused)) {
      synth.cancel();
    }
    emit("stopped");
  }

  function fallbackToSpeech(token, text) {
    if (token !== requestToken || audioFailedToken === token) return;
    audioFailedToken = token;
    audioPlayToken = 0;
    clearStartTimer();
    pauseAudio();

    if (!speechSupported) {
      emit("error", {
        code: "audio-failed",
        message: "故事音频加载失败，请刷新页面再试一次。"
      });
      return;
    }

    emit("fallback", { message: "故事音频加载失败，已改用系统朗读。" });
    speakNow(token, text, false);
  }

  function playAudio(token, text, src) {
    const player = ensureAudioPlayer();
    if (!player) {
      fallbackToSpeech(token, text);
      return;
    }

    audioPlayToken = token;
    audioPlayText = text;
    pauseAudio();

    try {
      if (player.dataset.src !== src) {
        player.dataset.src = src;
        player.src = src;
        player.load();
      } else {
        player.currentTime = 0;
      }
    } catch (error) {
      fallbackToSpeech(token, text);
      return;
    }

    player.play().then(() => {
      if (token !== requestToken) return;
      clearStartTimer();
      emit("started");
    }).catch(() => {
      if (token !== requestToken) return;
      fallbackToSpeech(token, text);
    });
  }

  function speakNow(token, text, retried) {
    if (!speechSupported || token !== requestToken) return;
    loadVoices();
    if (synth.paused) synth.resume();

    const utterance = new SpeechSynthesisUtterance(text);
    if (preferredVoice) utterance.voice = preferredVoice;
    utterance.lang = preferredVoice && preferredVoice.lang ? preferredVoice.lang : "zh-CN";
    utterance.rate = 0.9;
    utterance.pitch = 1.04;
    utterance.volume = 1;
    activeUtterances.push(utterance);

    let started = false;
    clearStartTimer();
    startTimer = window.setTimeout(() => {
      if (token !== requestToken || started) return;
      if (synth.speaking || synth.pending || synth.paused) {
        if (synth.paused) synth.resume();
        return;
      }

      loadVoices();
      if (!retried) {
        speakNow(token, text, true);
        return;
      }
      emit("blocked", {
        message: "系统朗读没有启动，请检查设备音量和浏览器语音设置。"
      });
    }, 1700);

    utterance.onstart = () => {
      started = true;
      clearStartTimer();
      emit("started");
    };

    utterance.onend = () => {
      clearStartTimer();
      activeUtterances = activeUtterances.filter((item) => item !== utterance);
      if (token === requestToken) emit("ended");
    };

    utterance.onerror = (event) => {
      clearStartTimer();
      activeUtterances = activeUtterances.filter((item) => item !== utterance);
      if (event.error === "interrupted" || event.error === "canceled") return;
      emit("error", {
        code: event.error || "speech-error",
        message: event.error === "not-allowed"
          ? "浏览器没有允许朗读，请再点一次朗读按钮。"
          : "设备暂时没有发出声音，请检查系统语音设置。"
      });
    };

    try {
      synth.speak(utterance);
    } catch (error) {
      clearStartTimer();
      emit("error", { code: "speak-failed", message: error.message || "朗读启动失败。" });
    }
  }

  function speak(text, options) {
    const opts = options || {};
    const clean = String(text || "").replace(/\s+/g, " ").trim();
    if (!clean) return false;
    if (!enabled && !opts.force) return false;
    if (!audioSupported && !speechSupported) {
      emit("unsupported", { message: "这个浏览器不支持中文朗读。" });
      return false;
    }

    const token = ++requestToken;
    clearStartTimer();
    activeUtterances = [];
    audioFailedToken = 0;
    pauseAudio();

    if (opts.audioSrc && audioSupported) {
      playAudio(token, clean, opts.audioSrc);
      return true;
    }

    if (!speechSupported) {
      emit("unsupported", { message: "这个浏览器不支持中文朗读。" });
      return false;
    }

    // 首次播放不要先 cancel；部分 Chrome 会把紧接着的 speak 一起取消。
    const needsCancel = synth.speaking || synth.pending || synth.paused;
    if (needsCancel) {
      synth.cancel();
      window.setTimeout(() => speakNow(token, clean, false), 120);
    } else {
      speakNow(token, clean, false);
    }
    return true;
  }

  function configure(options) {
    if (options && typeof options.onStateChange === "function") {
      onStateChange = options.onStateChange;
    }
    if (speechSupported) {
      loadVoices();
      synth.addEventListener("voiceschanged", loadVoices);
    }
  }

  window.MarioNarration = {
    configure,
    isSupported: () => audioSupported || speechSupported,
    setEnabled: (value) => { enabled = Boolean(value); },
    isEnabled: () => enabled,
    speak,
    stop,
    getVoices: () => (speechSupported ? synth.getVoices() : [])
  };
})();
