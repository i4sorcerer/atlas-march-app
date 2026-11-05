/* =========================================================================
 * Mario 的中华五千年 · 中文朗读器
 * 处理首次播放、语音加载、Chrome cancel 竞态和无声失败重试。
 * ========================================================================= */

(function () {
  "use strict";

  const synth = window.speechSynthesis;
  const supported = Boolean(synth && window.SpeechSynthesisUtterance);
  let enabled = false;
  let preferredVoice = null;
  let activeUtterances = [];
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
    if (!supported) return null;
    const voices = synth.getVoices();
    if (!voices.length) return preferredVoice;
    preferredVoice = pickChineseVoice(voices) || preferredVoice;
    return preferredVoice;
  }

  function clearStartTimer() {
    if (startTimer) window.clearTimeout(startTimer);
    startTimer = 0;
  }

  function stop() {
    requestToken += 1;
    clearStartTimer();
    activeUtterances = [];
    if (supported && (synth.speaking || synth.pending || synth.paused)) {
      synth.cancel();
    }
    emit("stopped");
  }

  function speakNow(token, text, retried) {
    if (!supported || token !== requestToken) return;
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
    if (!supported) {
      emit("unsupported", { message: "这个浏览器不支持中文朗读。" });
      return false;
    }

    const token = ++requestToken;
    clearStartTimer();
    activeUtterances = [];

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
    if (supported) {
      loadVoices();
      synth.addEventListener("voiceschanged", loadVoices);
    }
  }

  window.MarioNarration = {
    configure,
    isSupported: () => supported,
    setEnabled: (value) => { enabled = Boolean(value); },
    isEnabled: () => enabled,
    speak,
    stop,
    getVoices: () => (supported ? synth.getVoices() : [])
  };
})();
