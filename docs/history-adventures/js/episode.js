(function () {
  "use strict";

  const EPISODES = Array.isArray(window.MARIO_EPISODES) ? window.MARIO_EPISODES : [];
  const TASK_KEYS = ["game", "life", "change", "quiz"];
  const TOTAL_TASKS = TASK_KEYS.length;
  const SCENE_NAMES = ["封面", "历史故事", "探索游戏", "古人生活", "变与不变", "小测验", "寻史徽章"];
  const params = new URLSearchParams(window.location.search);
  const requestedId = params.get("id") || "01-02";
  const episode = EPISODES.find((item) => item.id === requestedId);

  const errorPanel = document.getElementById("episodeError");
  const book = document.getElementById("book");
  const nav = document.getElementById("bookNav");

  if (!episode) {
    if (errorPanel) errorPanel.hidden = false;
    if (book) book.hidden = true;
    if (nav) nav.hidden = true;
    document.title = "罗盘没有找到这一站 · Mario 的中华五千年";
    return;
  }

  const STORAGE_KEY = "mario-history-" + episode.id;
  const scenes = Array.from(document.querySelectorAll(".episode-scene"));
  const state = {
    current: 0,
    tasks: new Set(),
    soundOn: false,
    bestScore: 0,
    findFound: new Set(),
    sortIndex: 0,
    sortLocked: false,
    sequenceNext: 1,
    sequenceOrdered: new Set(),
    quizIndex: 0,
    quizCorrect: 0,
    quizAnswered: false,
    quizFinished: false,
    reported: false
  };

  const progressBar = document.getElementById("progressBar");
  const starCount = document.getElementById("starCount");
  const soundToggle = document.getElementById("soundToggle");
  const pageNow = document.getElementById("pageNow");
  const pageDots = document.getElementById("pageDots");
  const prevButton = document.getElementById("prevButton");
  const nextButton = document.getElementById("nextButton");
  const toastEl = document.getElementById("toast");
  const coverArt = document.getElementById("coverArt");
  const storyArt = document.getElementById("storyArt");
  const gameStage = document.getElementById("gameStage");
  const gamePanel = document.getElementById("gamePanel");
  const lifeCards = document.getElementById("lifeCards");
  const changeCards = document.getElementById("changeCards");
  const quizDots = document.getElementById("quizDots");

  function escapeHtml(value) {
    return String(value ?? "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  function setText(id, value) {
    const element = document.getElementById(id);
    if (element) element.textContent = value ?? "";
  }

  function renderSceneArt(type, key) {
    const theme = episode.theme;
    const palette = {
      sky: theme.sky,
      sky2: theme.sky2,
      ground: theme.ground,
      accent: theme.accent
    };
    const safeKey = String(key).replace(/[^a-z0-9-]/gi, "");
    const skyId = "ep-sky-" + safeKey;
    const groundId = "ep-ground-" + safeKey;
    const sunId = "ep-sun-" + safeKey;
    const waterId = "ep-water-" + safeKey;
    const roofId = "ep-roof-" + safeKey;

    const defs = `
      <defs>
        <linearGradient id="${skyId}" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="${escapeHtml(palette.sky)}"/>
          <stop offset="100%" stop-color="${escapeHtml(palette.sky2)}"/>
        </linearGradient>
        <linearGradient id="${groundId}" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="${escapeHtml(palette.ground)}"/>
          <stop offset="100%" stop-color="${escapeHtml(shade(palette.ground, -18))}"/>
        </linearGradient>
        <radialGradient id="${sunId}">
          <stop offset="0%" stop-color="#fff5c9"/>
          <stop offset="58%" stop-color="#efd38d"/>
          <stop offset="100%" stop-color="#efd38d" stop-opacity="0"/>
        </radialGradient>
        <linearGradient id="${waterId}" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stop-color="#8db8b2"/>
          <stop offset="55%" stop-color="#4f8788"/>
          <stop offset="100%" stop-color="#315e67"/>
        </linearGradient>
        <linearGradient id="${roofId}" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="${escapeHtml(palette.accent)}"/>
          <stop offset="100%" stop-color="${escapeHtml(shade(palette.accent, -24))}"/>
        </linearGradient>
      </defs>`;

    const sky = `
      <rect width="760" height="560" fill="url(#${skyId})"/>
      <circle cx="605" cy="90" r="112" fill="url(#${sunId})" opacity=".72"/>
      <circle class="ep-sun" cx="605" cy="90" r="48" fill="#f3df9e" opacity=".9"/>
      <g class="ep-cloud" fill="#fff8dc" opacity=".48">
        <ellipse cx="158" cy="96" rx="54" ry="16"/>
        <ellipse cx="196" cy="88" rx="37" ry="19"/>
        <ellipse cx="124" cy="91" rx="31" ry="14"/>
      </g>
      <g class="ep-cloud cloud-two" fill="#fff8dc" opacity=".34">
        <ellipse cx="520" cy="155" rx="58" ry="15"/>
        <ellipse cx="558" cy="146" rx="34" ry="18"/>
        <ellipse cx="486" cy="149" rx="28" ry="12"/>
      </g>
      <g class="ep-bird" fill="none" stroke="#274e4f" stroke-width="3" stroke-linecap="round" opacity=".46">
        <path d="M258 137q11-10 22 0q11-10 22 0"/>
        <path d="M319 168q8-7 16 0q8-7 16 0"/>
      </g>`;

    let body = "";

    if (type === "village") {
      body = `
        <path d="M0 334 Q126 232 258 320 Q350 242 470 313 Q585 220 760 317 V410 H0Z" fill="${escapeHtml(shade(palette.ground, 19))}" opacity=".55"/>
        <path d="M0 380 Q176 323 343 380 T760 365 V560 H0Z" fill="url(#${groundId})"/>
        <path class="ep-water" d="M0 454 Q112 420 229 460 T475 449 T760 463 V560 H0Z" fill="url(#${waterId})" opacity=".78"/>
        <g>
          <path d="M95 384L159 326L226 384Z" fill="#d7b271"/>
          <rect x="118" y="379" width="84" height="78" rx="4" fill="#b88c57"/>
          <rect x="151" y="415" width="24" height="42" rx="11" fill="#594330"/>
          <path d="M267 411L331 354L399 411Z" fill="#c18d50"/>
          <rect x="290" y="407" width="87" height="70" rx="4" fill="#9d7447"/>
          <rect x="323" y="438" width="22" height="39" rx="10" fill="#55412e"/>
        </g>
        <g transform="translate(463 408)">
          <ellipse cx="32" cy="71" rx="65" ry="18" fill="#2b3530" opacity=".18"/>
          <path d="M11 29L56 4L99 29Z" fill="#d4b06b"/>
          <rect x="17" y="27" width="76" height="69" rx="4" fill="#ae7e46"/>
          <rect x="48" y="55" width="20" height="41" rx="9" fill="#4f3b2a"/>
          <path class="ep-fire" d="M57 70q-18-16-2-32q2 13 10 16q9-12 12-24q18 23 1 40q-6 7-21 0Z" fill="#e08338"/>
          <path d="M62 70q-9-10 0-21q1 10 8 13q6-7 7-14q9 14-1 22Z" fill="#f4ce60"/>
        </g>
        <g transform="translate(648 325)">
          <path d="M0 109V15" stroke="#5e4328" stroke-width="7"/>
          <path class="ep-flag" d="M4 15L96 34L4 61Z" fill="${escapeHtml(palette.accent)}"/>
        </g>
        <g fill="#2f5a46">
          <path d="M42 391l25-83 26 83Z"/><path d="M686 393l28-95 28 95Z"/>
          <rect x="63" y="377" width="9" height="56" fill="#65472d"/>
          <rect x="709" y="374" width="10" height="56" fill="#65472d"/>
        </g>`;
    } else if (type === "river") {
      body = `
        <path d="M0 322L115 165L231 326L344 213L448 329L575 176L760 324V425H0Z" fill="${escapeHtml(shade(palette.ground, 18))}" opacity=".62"/>
        <path d="M0 368 Q161 313 296 365 Q423 410 760 348 V560 H0Z" fill="url(#${groundId})"/>
        <path class="ep-water" d="M238 333 C389 352 286 423 407 448 C536 474 479 518 760 521 L760 560 H0 C166 530 220 483 172 449 C129 418 188 384 238 333Z" fill="url(#${waterId})"/>
        <g fill="none" stroke="#d7efe7" stroke-width="3" stroke-linecap="round" opacity=".48">
          <path d="M318 382q24-10 49 0t49 0"/>
          <path d="M401 458q27-11 54 0t54 0"/>
          <path d="M180 493q25-10 50 0t50 0"/>
        </g>
        <g transform="translate(78 382)">
          <path d="M0 75Q31 44 63 75T126 75" fill="none" stroke="#c49c58" stroke-width="12" stroke-linecap="round"/>
          <path d="M20 75V28M60 75V13M101 75V33" stroke="#3b6a50" stroke-width="3"/>
          <path d="M20 45q-17-14-31 2M61 29q-18-16-34 0M101 50q18-15 34 0" fill="none" stroke="#3b6a50" stroke-width="3"/>
        </g>
        <g transform="translate(596 366)">
          <path d="M0 104L57 75L116 104Z" fill="#cba96b"/>
          <rect x="11" y="101" width="94" height="55" fill="#a77c48"/>
          <rect x="48" y="119" width="20" height="37" rx="9" fill="#58412c"/>
        </g>
        <path d="M0 526Q124 480 251 519T492 510T760 527V560H0Z" fill="${escapeHtml(shade(palette.ground, -8))}" opacity=".72"/>`;
    } else if (type === "palace") {
      body = `
        <path d="M0 353Q154 282 302 350Q452 277 760 349V455H0Z" fill="${escapeHtml(shade(palette.ground, 17))}" opacity=".52"/>
        <path d="M0 414Q186 359 366 411T760 406V560H0Z" fill="url(#${groundId})"/>
        <g transform="translate(102 90)">
          <path d="M38 283H512V337H38Z" fill="#d8c293"/>
          <path d="M62 337H488V366H62Z" fill="#bca574"/>
          <rect x="92" y="195" width="368" height="92" fill="#e3c88e"/>
          <rect x="119" y="211" width="22" height="76" fill="${escapeHtml(palette.accent)}"/>
          <rect x="183" y="211" width="22" height="76" fill="${escapeHtml(palette.accent)}"/>
          <rect x="347" y="211" width="22" height="76" fill="${escapeHtml(palette.accent)}"/>
          <rect x="411" y="211" width="22" height="76" fill="${escapeHtml(palette.accent)}"/>
          <rect x="228" y="222" width="96" height="65" rx="4" fill="#6f4a2d"/>
          <path d="M42 196L276 80L510 196Z" fill="url(#${roofId})"/>
          <path d="M74 178L276 86L478 178Z" fill="#e1bd70" opacity=".62"/>
          <path d="M84 142L276 48L468 142Z" fill="url(#${roofId})"/>
          <path d="M116 127L276 56L436 127Z" fill="#d8a951" opacity=".65"/>
          <path d="M255 45H297V15H255Z" fill="#d0a34d"/>
          <path d="M215 21H337V45H215Z" fill="#c28a37"/>
        </g>
        <g class="ep-lantern" transform="translate(190 278)">
          <path d="M0 0V23" stroke="#74512b" stroke-width="3"/>
          <ellipse cx="0" cy="42" rx="14" ry="20" fill="#c94e36"/>
          <path d="M0 62v16" stroke="#c99c43" stroke-width="3"/>
        </g>
        <g class="ep-lantern" transform="translate(586 278)">
          <path d="M0 0V23" stroke="#74512b" stroke-width="3"/>
          <ellipse cx="0" cy="42" rx="14" ry="20" fill="#c94e36"/>
          <path d="M0 62v16" stroke="#c99c43" stroke-width="3"/>
        </g>
        <g fill="#476952">
          <circle cx="72" cy="431" r="40"/><circle cx="704" cy="425" r="44"/>
          <rect x="64" y="424" width="10" height="66" fill="#62472e"/>
          <rect x="698" y="418" width="11" height="72" fill="#62472e"/>
        </g>`;
    } else if (type === "market") {
      body = `
        <path d="M0 345Q154 270 314 342Q502 279 760 339V439H0Z" fill="${escapeHtml(shade(palette.ground, 19))}" opacity=".56"/>
        <path d="M0 410Q160 368 337 409T760 396V560H0Z" fill="url(#${groundId})"/>
        <path d="M314 405L492 405L672 560H96Z" fill="#c7a975" opacity=".67"/>
        <g transform="translate(46 214)">
          <rect x="32" y="104" width="178" height="142" fill="#dcbf86"/>
          <path d="M0 105L120 31L241 105Z" fill="url(#${roofId})"/>
          <rect x="79" y="147" width="84" height="99" rx="4" fill="#6b4830"/>
          <path d="M66 144H176V160H66Z" fill="${escapeHtml(palette.accent)}"/>
        </g>
        <g transform="translate(384 316)">
          <rect x="0" y="62" width="258" height="95" rx="4" fill="#a87847"/>
          <path d="M-18 65H276L248 5H10Z" fill="#e1c178"/>
          <path d="M10 5H67L52 65H-18Z" fill="${escapeHtml(palette.accent)}" opacity=".85"/>
          <path d="M126 5H183L169 65H110Z" fill="${escapeHtml(palette.accent)}" opacity=".85"/>
          <path d="M235 5H276L276 65H232Z" fill="${escapeHtml(palette.accent)}" opacity=".85"/>
          <ellipse cx="54" cy="91" rx="25" ry="13" fill="#87623b"/>
          <ellipse cx="111" cy="94" rx="27" ry="14" fill="#9b713f"/>
          <path d="M173 75h49v32h-49z" fill="#d7c08f"/>
          <path d="M181 81h33M181 89h26M181 97h30" stroke="#80613d" stroke-width="2"/>
        </g>
        <g fill="#4f7457">
          <circle cx="324" cy="406" r="31"/><circle cx="694" cy="397" r="37"/>
          <rect x="318" y="400" width="9" height="61" fill="#5d422c"/>
          <rect x="689" y="390" width="10" height="67" fill="#5d422c"/>
        </g>
        <g class="ep-flag" transform="translate(285 242)">
          <path d="M0 150V0" stroke="#5e412a" stroke-width="6"/>
          <path d="M2 1L70 18L2 41Z" fill="${escapeHtml(palette.accent)}"/>
        </g>`;
    } else if (type === "cave") {
      body = `
        <path d="M0 318L109 135L204 318L290 183L392 322L505 119L626 316L760 169V457H0Z" fill="${escapeHtml(shade(palette.ground, 20))}" opacity=".62"/>
        <path d="M0 410Q182 358 354 407T760 404V560H0Z" fill="url(#${groundId})"/>
        <path d="M87 435Q145 96 380 70Q614 94 676 435Z" fill="#6b6254"/>
        <path d="M132 430Q180 134 380 111Q578 133 628 430Z" fill="#4b4a43"/>
        <path d="M187 430Q229 195 380 167Q531 195 575 430Z" fill="#252f32"/>
        <circle cx="380" cy="240" r="89" fill="none" stroke="#d9b96d" stroke-width="4" opacity=".35"/>
        <g transform="translate(380 245)">
          <path d="M-62 124Q-58 32 0 20Q58 31 62 124Z" fill="#9e754a"/>
          <circle cy="-20" r="42" fill="#bf925c"/>
          <path d="M-21 52Q0 20 22 52" fill="none" stroke="#d0b47a" stroke-width="4"/>
          <path d="M-44 126H44" stroke="#d6b873" stroke-width="5" opacity=".55"/>
        </g>
        <g class="ep-lantern" transform="translate(250 246)">
          <path d="M0 0V31" stroke="#8a6133" stroke-width="3"/>
          <ellipse cy="52" rx="17" ry="24" fill="#c95735"/>
          <path d="M0 76v18" stroke="#d3a54d" stroke-width="3"/>
        </g>
        <g class="ep-lantern" transform="translate(510 246)">
          <path d="M0 0V31" stroke="#8a6133" stroke-width="3"/>
          <ellipse cy="52" rx="17" ry="24" fill="#c95735"/>
          <path d="M0 76v18" stroke="#d3a54d" stroke-width="3"/>
        </g>
        <g fill="#3d5945" opacity=".9">
          <circle cx="71" cy="410" r="35"/><circle cx="693" cy="408" r="39"/>
        </g>`;
    } else if (type === "city") {
      body = `
        <path d="M0 345Q132 285 279 338Q441 276 760 334V430H0Z" fill="${escapeHtml(shade(palette.ground, 16))}" opacity=".55"/>
        <path d="M0 417Q167 366 342 413T760 401V560H0Z" fill="url(#${groundId})"/>
        <g transform="translate(34 260)">
          <path d="M0 242V62Q120 3 243 62V242Z" fill="#a98553"/>
          <path d="M-17 63L121 0L261 63Z" fill="url(#${roofId})"/>
          <rect x="74" y="118" width="93" height="124" rx="5" fill="#5b3f2d"/>
          <path d="M53 279H341" stroke="#d4bc84" stroke-width="7"/>
          <path d="M22 100h27v22H22zm39 0h27v22H61zm39 0h27v22H100zm39 0h27v22h-27zm39 0h27v22h-27z" fill="#d7bd85"/>
        </g>
        <g transform="translate(399 126)">
          <rect x="42" y="184" width="210" height="100" fill="#d0ad70"/>
          <path d="M-9 185L145 112L299 185Z" fill="url(#${roofId})"/>
          <path d="M25 154L145 89L265 154Z" fill="url(#${roofId})"/>
          <path d="M55 127L145 75L235 127Z" fill="url(#${roofId})"/>
          <rect x="82" y="201" width="25" height="76" fill="${escapeHtml(palette.accent)}"/>
          <rect x="188" y="201" width="25" height="76" fill="${escapeHtml(palette.accent)}"/>
          <rect x="122" y="216" width="49" height="61" rx="3" fill="#67462d"/>
        </g>
        <g transform="translate(574 354)">
          <rect x="0" y="53" width="134" height="84" fill="#d4b77c"/>
          <path d="M-14 54L67 9L149 54Z" fill="url(#${roofId})"/>
          <rect x="25" y="85" width="82" height="52" fill="#85613c"/>
        </g>
        <g class="ep-lantern" transform="translate(254 340)">
          <path d="M0 0V18" stroke="#694a2a" stroke-width="3"/>
          <rect x="-9" y="18" width="18" height="24" rx="6" fill="#c94f36"/>
        </g>
        <g class="ep-lantern" transform="translate(502 368)">
          <path d="M0 0V18" stroke="#694a2a" stroke-width="3"/>
          <rect x="-9" y="18" width="18" height="24" rx="6" fill="#c94f36"/>
        </g>
        <path d="M254 451Q316 403 378 451T504 451T630 451" fill="none" stroke="#d7c08b" stroke-width="28" stroke-linecap="round" opacity=".42"/>`;
    } else if (type === "steppe") {
      body = `
        <path d="M0 323Q145 238 294 327Q476 247 760 320V429H0Z" fill="${escapeHtml(shade(palette.ground, 18))}" opacity=".58"/>
        <path d="M0 388Q185 330 376 388T760 370V560H0Z" fill="url(#${groundId})"/>
        <path d="M0 462Q155 412 335 465T760 447V560H0Z" fill="${escapeHtml(shade(palette.ground, -9))}"/>
        <path d="M232 560Q344 457 491 382Q580 336 690 316" fill="none" stroke="#d6bb7e" stroke-width="54" stroke-linecap="round" opacity=".52"/>
        <g transform="translate(442 346)">
          <ellipse cx="108" cy="106" rx="145" ry="24" fill="#263a33" opacity=".15"/>
          <path d="M21 87Q41 11 122 12Q202 16 220 88Z" fill="#e5d0a1"/>
          <path d="M54 88V142H188V88" fill="#d3b77d"/>
          <rect x="96" y="105" width="45" height="37" rx="19" fill="#5d4630"/>
          <path d="M105 12L122 0L140 12" fill="#b74c36"/>
        </g>
        <g transform="translate(138 392)" fill="#344f3d">
          <ellipse cx="52" cy="51" rx="50" ry="23"/>
          <path d="M75 27Q91-14 113 18L136 26L121 47L92 48Z"/>
          <path d="M24 65L11 120M67 67L83 120M105 49l20 70" stroke="#344f3d" stroke-width="8" stroke-linecap="round"/>
          <path d="M8 101l-22 16M76 112l-18 23" stroke="#344f3d" stroke-width="5" stroke-linecap="round"/>
        </g>
        <g class="ep-flag" transform="translate(690 282)">
          <path d="M0 146V0" stroke="#5a422a" stroke-width="6"/>
          <path d="M2 0L66 17L2 43Z" fill="${escapeHtml(palette.accent)}"/>
        </g>
        <g fill="#2d523e" opacity=".82">
          <path d="M0 411q27-44 54 0q29-48 58 0z"/>
          <path d="M640 446q30-50 60 0q25-41 54 0z"/>
        </g>`;
    } else if (type === "ship") {
      body = `
        <rect y="310" width="760" height="250" fill="url(#${waterId})"/>
        <path class="ep-water" d="M0 335Q117 306 234 336T471 329T760 339V370Q597 342 474 371T229 368T0 371Z" fill="#b7d9cf" opacity=".47"/>
        <path class="ep-water" d="M0 450Q126 416 253 451T507 443T760 451V495Q601 462 470 497T223 489T0 496Z" fill="#d9ece3" opacity=".25"/>
        <g class="ep-boat" transform="translate(206 211)">
          <path d="M0 181Q31 225 63 244H282Q328 213 354 168Q188 198 0 181Z" fill="#8f5f34"/>
          <path d="M21 180Q182 201 335 166" fill="none" stroke="#d2a65e" stroke-width="7"/>
          <path d="M166 176V5" stroke="#65462b" stroke-width="8"/>
          <path d="M173 11Q260 55 286 145L174 158Z" fill="#f0dcae"/>
          <path d="M158 19Q92 64 76 148L158 158Z" fill="#d7bd87"/>
          <path d="M166 4L213 25L166 53Z" fill="${escapeHtml(palette.accent)}" class="ep-flag"/>
          <path d="M20 181L62 244M318 174L281 242" stroke="#5d3f27" stroke-width="6"/>
          <circle cx="176" cy="159" r="12" fill="#b74c36"/>
        </g>
        <g fill="none" stroke="#254f56" stroke-width="3" stroke-linecap="round" opacity=".7">
          <path d="M65 278q12-9 24 0q12-9 24 0"/>
          <path d="M610 255q12-9 24 0q12-9 24 0"/>
        </g>
        <path d="M0 520Q122 490 243 519T480 512T760 520V560H0Z" fill="#2e5960"/>`;
    } else {
      body = `
        <path d="M0 379Q157 337 322 380T760 369V560H0Z" fill="url(#${groundId})"/>
        <g transform="translate(65 243)">
          <rect x="0" y="31" width="83" height="171" fill="#cdbd9b"/>
          <rect x="96" y="-18" width="97" height="220" fill="#b7ad91"/>
          <rect x="207" y="62" width="72" height="140" fill="#d8c69f"/>
          <rect x="294" y="-52" width="109" height="254" fill="#a59f8e"/>
          <rect x="417" y="16" width="88" height="186" fill="#c8b995"/>
          <rect x="520" y="79" width="81" height="123" fill="#dbcaa5"/>
          <g fill="#e9d9aa" opacity=".8">
            <path d="M113-2h19v19h-19zm32 0h19v19h-19zm32 0h19v19h-19zm-70 36h19v19h-19zm32 0h19v19h-19zm32 0h19v19h-19z"/>
            <path d="M315-36h20v20h-20zm37 0h20v20h-20zm-37 31h20v20h-20zm37 0h20v20h-20z"/>
          </g>
        </g>
        <g transform="translate(560 130)">
          <path d="M31 150Q-5 103 31 62Q64 26 31-6Q62 23 49 58Q35 95 70 139Z" fill="#e5d8b7"/>
          <path d="M31 150Q-5 103 31 62Q64 26 31-6" fill="none" stroke="#8ca29c" stroke-width="3"/>
          <circle cx="34" cy="49" r="13" fill="#c8563e"/>
          <path d="M12 149l39 19l39-19" fill="none" stroke="#c8563e" stroke-width="7" stroke-linecap="round"/>
        </g>
        <g transform="translate(0 424)">
          <path d="M-20 57Q178 9 363 43T780 38" fill="none" stroke="#dfd3ae" stroke-width="46" stroke-linecap="round"/>
          <path d="M-20 57Q178 9 363 43T780 38" fill="none" stroke="#6e8d87" stroke-width="5" stroke-linecap="round"/>
          <g transform="translate(245 3)">
            <rect x="0" y="0" width="244" height="37" rx="18" fill="#f3ead2"/>
            <path d="M42 1L76-35H214L244 1Z" fill="#f3ead2"/>
            <path d="M80-29H169V-1H68Z" fill="#4e7d7a"/>
            <rect x="24" y="27" width="202" height="6" rx="3" fill="${escapeHtml(palette.accent)}"/>
            <path d="M24 37l-8 13M221 37l8 13" stroke="#4a5e5b" stroke-width="3"/>
          </g>
        </g>
        <g fill="#3e624d">
          <circle cx="662" cy="350" r="37"/><circle cx="720" cy="350" r="45"/>
          <rect x="657" y="341" width="9" height="68" fill="#60482e"/>
          <rect x="715" y="340" width="10" height="69" fill="#60482e"/>
        </g>`;
    }

    return `
      <svg class="ep-scene-svg" viewBox="0 0 760 560" role="img" aria-label="${escapeHtml(
        episode.title + " · " + episode.era + "场景插画"
      )}">
        ${defs}
        ${sky}
        ${body}
        ${tokensSvg(theme.tokens)}
      </svg>`;
  }

  function tokensSvg(tokens) {
    const positions = [
      [64, 170],
      [680, 205],
      [693, 488]
    ];
    return (tokens || []).slice(0, 3).map((token, index) => `
      <g class="ep-token ${index === 1 ? "token-delay" : ""}" transform="translate(${positions[index][0]} ${positions[index][1]})">
        <circle r="27" fill="#fff5d8" opacity=".82"/>
        <circle r="27" fill="none" stroke="#6f552b" stroke-width="1" opacity=".25"/>
        <text y="9" text-anchor="middle" font-size="27">${escapeHtml(token)}</text>
      </g>`).join("");
  }

  function shade(hex, percent) {
    const normalized = String(hex || "#556b63").replace("#", "");
    if (!/^[0-9a-f]{6}$/i.test(normalized)) return "#556b63";
    const value = parseInt(normalized, 16);
    const amount = Math.round(255 * (percent / 100));
    const red = Math.max(0, Math.min(255, (value >> 16) + amount));
    const green = Math.max(0, Math.min(255, ((value >> 8) & 0xff) + amount));
    const blue = Math.max(0, Math.min(255, (value & 0xff) + amount));
    return "#" + [red, green, blue].map((item) => item.toString(16).padStart(2, "0")).join("");
  }

  function applyEpisodeContent() {
    document.title = episode.title + " · Mario 的中华五千年";
    document.body.style.setProperty("--ep-sky", episode.theme.sky);
    document.body.style.setProperty("--ep-sky2", episode.theme.sky2);
    document.body.style.setProperty("--ep-ground", episode.theme.ground);
    document.body.style.setProperty("--ep-accent", episode.theme.accent);
    document.querySelector('meta[name="theme-color"]').setAttribute("content", episode.theme.sky2);

    setText("headerLabel", episode.label);
    setText("headerTitle", episode.title);
    setText("coverLabel", episode.label);
    setText("coverEra", episode.era);
    setText("coverTitle", episode.title);
    setText("coverSubtitle", episode.subtitle);
    setText("coverNarration", "“" + episode.coverNarration + "”");
    setText("coverYears", episode.years + " · 建议和爸爸妈妈一起读");
    setText("coverStamp", episode.era);
    setText("storyEyebrow", episode.story.eyebrow);
    setText("storyTitle", episode.story.title);
    setText("storyFact", episode.story.fact);
    setText("gameTitle", episode.game.title);
    setText("gameIntro", episode.game.intro);
    setText("lifeTitle", episode.life.title);
    setText("lifeIntro", episode.life.intro);
    setText("changeTitle", episode.change.title);
    setText("changeIntro", episode.change.intro);
    setText("badgeName", episode.badge);
    setText("badgeIcon", episode.theme.tokens[0] || "🧭");
    setText("finalTakeaway", "这一站最值得记住的是：" + episode.story.fact);

    if (coverArt) {
      coverArt.innerHTML = renderSceneArt(episode.theme.scene, "cover-" + episode.id);
      coverArt.setAttribute("role", "img");
      coverArt.setAttribute("aria-label", episode.title + "主题插画");
    }
    if (storyArt) {
      storyArt.innerHTML = renderSceneArt(episode.theme.scene, "story-" + episode.id);
    }
    if (gameStage) {
      gameStage.innerHTML = renderSceneArt(episode.theme.scene, "game-" + episode.id);
    }

    const storyText = document.getElementById("storyText");
    if (storyText) {
      storyText.innerHTML = episode.story.text.map((paragraph) => "<p>" + escapeHtml(paragraph) + "</p>").join("");
    }

    renderLifeCards();
    renderChangeCards();
    renderGame();
    renderQuiz();
    setupParentGuide();
    setupNextEpisode();
    updateNarrations();
  }

  function setupSceneIndexes() {
    scenes.forEach((scene, index) => {
      scene.dataset.index = String(index);
      if (pageDots) {
        const dot = document.createElement("i");
        dot.dataset.dot = String(index);
        pageDots.appendChild(dot);
      }
    });
  }

  function updateNarrations() {
    const byName = {};
    scenes.forEach((scene) => { byName[scene.dataset.scene] = scene; });
    if (byName.cover) byName.cover.dataset.narration = episode.coverNarration;
    if (byName.story) byName.story.dataset.narration = episode.story.narration;
    if (byName.game) byName.game.dataset.narration = episode.game.intro;
    if (byName.life) byName.life.dataset.narration = episode.life.intro;
    if (byName.change) byName.change.dataset.narration = episode.change.intro;
    if (byName.quiz) {
      const question = episode.quiz[state.quizIndex];
      byName.quiz.dataset.narration = question
        ? "小测验。第" + (state.quizIndex + 1) + "题。" + question.q
        : "小测验完成了。";
    }
    if (byName.final) {
      byName.final.dataset.narration =
        "Mario，这一站完成了。你获得了" + episode.badge + "徽章。记住：" + episode.story.fact;
    }
  }

  function readSavedState() {
    try {
      const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
      if (Array.isArray(saved.tasks)) {
        state.tasks = new Set(saved.tasks.filter((task) => TASK_KEYS.includes(task)));
      }
      if (Number.isFinite(saved.bestScore)) state.bestScore = saved.bestScore;
      state.quizFinished = state.tasks.has("quiz");
    } catch (error) {
      state.tasks = new Set();
    }
  }

  function saveState() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({
        tasks: Array.from(state.tasks),
        bestScore: state.bestScore,
        updatedAt: Date.now()
      }));
    } catch (error) {
      /* 本地存储不可用时，仍可继续阅读。 */
    }
  }

  function updateStarMeter(bump) {
    if (!starCount) return;
    starCount.textContent = "🌟 " + state.tasks.size + " / " + TOTAL_TASKS;
    starCount.setAttribute("aria-label", "已获得 " + state.tasks.size + " 颗探索星");
    if (bump) {
      starCount.classList.remove("bump");
      void starCount.offsetWidth;
      starCount.classList.add("bump");
    }
  }

  function updateFinalStats() {
    setText("finalStars", state.tasks.size + " / " + TOTAL_TASKS);
    setText("finalScore", (state.quizFinished ? state.bestScore : state.quizCorrect) + " / " + episode.quiz.length);
  }

  function markTask(task) {
    if (!TASK_KEYS.includes(task) || state.tasks.has(task)) return;
    state.tasks.add(task);
    const scene = document.querySelector('.episode-scene[data-task="' + task + '"]');
    if (scene) scene.classList.add("done");
    updateStarMeter(true);
    updateFinalStats();
    saveState();
    refreshNav();
  }

  /* ---------------- 探索游戏 ---------------- */

  function renderGame() {
    if (!gamePanel) return;
    if (episode.game.type === "find") {
      renderFindGame();
    } else if (episode.game.type === "sort") {
      renderSortGame();
    } else if (episode.game.type === "sequence") {
      renderSequenceGame();
    }
  }

  function renderFindGame() {
    const items = episode.game.items || [];
    if (gameStage) {
      gameStage.insertAdjacentHTML("beforeend", items.map((item, index) => `
        <button class="hotspot hotspot-${index}" type="button" data-find-index="${index}"
          aria-label="寻找线索 ${index + 1}"><span aria-hidden="true">${escapeHtml(item.icon)}</span></button>
      `).join(""));
      gameStage.querySelectorAll(".hotspot").forEach((button) => {
        button.addEventListener("click", () => findItem(Number(button.dataset.findIndex)));
      });
    }

    gamePanel.innerHTML = `
      <div class="find-progress">
        <span>在画面里点亮 3 个闪光点</span>
        <b id="findCount">0 / ${items.length}</b>
      </div>
      <div class="find-list">
        ${items.map((item, index) => `
          <div class="find-row" data-find-row="${index}">
            <span aria-hidden="true">${escapeHtml(item.icon)}</span>
            <div><b>${escapeHtml(item.label)}</b><small>${escapeHtml(item.fact)}</small></div>
          </div>
        `).join("")}
      </div>`;
  }

  function findItem(index) {
    const item = episode.game.items[index];
    if (!item || state.findFound.has(index)) return;
    state.findFound.add(index);

    const hotspot = gameStage.querySelector('[data-find-index="' + index + '"]');
    const row = gamePanel.querySelector('[data-find-row="' + index + '"]');
    if (hotspot) {
      hotspot.classList.add("is-found");
      hotspot.innerHTML = '<span aria-hidden="true">' + escapeHtml(item.icon) + "</span>";
      hotspot.disabled = true;
    }
    if (row) row.classList.add("found");
    const count = document.getElementById("findCount");
    if (count) count.textContent = state.findFound.size + " / " + episode.game.items.length;
    showToast("找到线索：" + item.label);
    speakText(item.label + "。" + item.fact, false);

    if (state.findFound.size === episode.game.items.length) {
      markTask("game");
      if (count) count.textContent = "全部找到了！";
      showToast("获得 1 颗探索星：眼睛会观察，历史就会说话。");
    }
  }

  function renderSortGame() {
    const total = episode.game.items.length;
    if (state.sortIndex >= total) {
      finishSortGame();
      return;
    }
    const current = episode.game.items[state.sortIndex];

    gamePanel.innerHTML = `
      <div class="find-progress">
        <span>读一读卡片，把它送进正确的筐</span>
        <b>${state.sortIndex + 1} / ${total}</b>
      </div>
      <div class="sort-card" id="sortCard">
        <span class="sort-count">卡片 ${state.sortIndex + 1}</span>
        <span class="sort-icon" aria-hidden="true">${escapeHtml(current.icon)}</span>
        <p>${escapeHtml(current.text)}</p>
      </div>
      <div class="sort-actions" id="sortActions">
        ${episode.game.categories.map((category) => `
          <button class="sort-choice" type="button" data-sort="${escapeHtml(category.id)}">
            <span aria-hidden="true">${escapeHtml(category.icon)}</span>
            <span>${escapeHtml(category.label)}</span>
          </button>
        `).join("")}
      </div>
      <p class="sort-feedback" id="sortFeedback">这张卡片应该去哪一边？</p>`;

    gamePanel.querySelectorAll(".sort-choice").forEach((button) => {
      button.addEventListener("click", () => answerSort(button.dataset.sort));
    });
    state.sortLocked = false;
  }

  function answerSort(choice) {
    if (state.sortLocked) return;
    state.sortLocked = true;
    const current = episode.game.items[state.sortIndex];
    const correct = choice === current.type;
    const card = document.getElementById("sortCard");
    const feedback = document.getElementById("sortFeedback");
    const buttons = Array.from(gamePanel.querySelectorAll(".sort-choice"));
    const category = episode.game.categories.find((item) => item.id === current.type);
    buttons.forEach((button) => { button.disabled = true; });

    if (correct) {
      if (card) card.classList.add("is-correct");
      if (feedback) {
        feedback.textContent = "分对了！" + current.why;
        feedback.className = "sort-feedback correct";
      }
      speakText("分对了。" + current.why, false);
    } else {
      if (card) card.classList.add("is-wrong");
      if (feedback) {
        feedback.textContent = "它属于「" + (category ? category.label : current.type) + "」。" + current.why;
        feedback.className = "sort-feedback wrong";
      }
      speakText("再想一想。它属于" + (category ? category.label : current.type) + "。" + current.why, false);
    }

    window.setTimeout(() => {
      if (card) card.classList.add("is-leaving");
      window.setTimeout(() => {
        state.sortIndex += 1;
        renderSortGame();
      }, 230);
    }, correct ? 850 : 1450);
  }

  function finishSortGame() {
    const categories = episode.game.categories.map((item) => item.label).join("、");
    gamePanel.innerHTML = `
      <div class="sort-complete">
        <span class="sort-icon" aria-hidden="true">✅</span>
        <h3>全部分好了！</h3>
        <p>你把卡片分进了「${escapeHtml(categories)}」。分类的时候，历史就变得更有条理了。</p>
        <p class="action-hint">这一站获得 1 颗探索星。</p>
      </div>`;
    markTask("game");
    showToast("获得 1 颗探索星：会分类，就会比较。");
  }

  function renderSequenceGame() {
    const items = episode.game.items;
    if (state.sequenceNext > items.length) {
      finishSequenceGame();
      return;
    }
    const order = getSequenceOrder(items.length);
    gamePanel.innerHTML = `
      <div class="find-progress">
        <span>按时间顺序，从最早开始点</span>
        <b>下一张：第 ${state.sequenceNext} 张</b>
      </div>
      <div class="sequence-board">
        ${order.map((itemIndex) => {
          const item = items[itemIndex];
          const isOrdered = state.sequenceOrdered.has(itemIndex);
          return `
            <button class="sequence-card ${isOrdered ? "is-ordered" : ""}" type="button"
              data-sequence-index="${itemIndex}" ${isOrdered ? "disabled" : ""}>
              <span aria-hidden="true">${escapeHtml(item.icon)}</span>
              ${escapeHtml(item.text)}
              ${isOrdered ? "<i>" + findSequenceNumber(itemIndex) + "</i>" : ""}
            </button>`;
        }).join("")}
      </div>
      <p class="sequence-feedback" id="sequenceFeedback">先找第 1 张：这件事最早发生。</p>`;

    gamePanel.querySelectorAll(".sequence-card:not(.is-ordered)").forEach((button) => {
      button.addEventListener("click", () => chooseSequenceCard(Number(button.dataset.sequenceIndex)));
    });
  }

  function getSequenceOrder(length) {
    const order = Array.from({ length }, (_, index) => index);
    let seed = Number(episode.id.replace(/\D/g, "")) || 7;
    for (let index = order.length - 1; index > 0; index -= 1) {
      seed = (seed * 9301 + 49297) % 233280;
      const swapIndex = seed % (index + 1);
      [order[index], order[swapIndex]] = [order[swapIndex], order[index]];
    }
    if (order.every((value, index) => value === index)) {
      order.push(order.shift());
    }
    return order;
  }

  function chooseSequenceCard(correctIndex) {
    const card = gamePanel.querySelector('[data-sequence-index="' + correctIndex + '"]');
    const feedback = document.getElementById("sequenceFeedback");
    if (!card || state.sequenceOrdered.has(correctIndex)) return;

    if (correctIndex + 1 === state.sequenceNext) {
      const orderNumber = state.sequenceNext;
      state.sequenceOrdered.add(correctIndex);
      state.sequenceNext += 1;
      card.classList.add("is-ordered");
      card.disabled = true;
      card.insertAdjacentHTML("beforeend", "<i>" + orderNumber + "</i>");
      if (feedback) {
        feedback.textContent = "顺序对了！接着找下一张。";
        feedback.className = "sequence-feedback correct";
      }
      speakText("顺序对了。接着找下一张。", false);

      if (state.sequenceNext > episode.game.items.length) {
        window.setTimeout(finishSequenceGame, 500);
      } else {
        const nextLabel = gamePanel.querySelector(".find-progress b");
        if (nextLabel) nextLabel.textContent = "下一张：第 " + state.sequenceNext + " 张";
      }
    } else {
      card.classList.add("is-wrong");
      window.setTimeout(() => card.classList.remove("is-wrong"), 500);
      if (feedback) {
        feedback.textContent = "还没到这一张。先找更早发生的事情。";
        feedback.className = "sequence-feedback wrong";
      }
      speakText("再想一想。先找更早发生的事情。", false);
    }
  }

  function findSequenceNumber(index) {
    return episode.game.items.findIndex((_, itemIndex) => itemIndex === index) + 1;
  }

  function finishSequenceGame() {
    gamePanel.innerHTML = `
      <div class="sort-complete">
        <span class="sort-icon" aria-hidden="true">🧭</span>
        <h3>时间线排好了！</h3>
        <p>${episode.game.items.map((item, index) => (index + 1) + ". " + escapeHtml(item.text)).join("<br>")}</p>
        <p class="action-hint">这一站获得 1 颗探索星。</p>
      </div>`;
    markTask("game");
    showToast("获得 1 颗探索星：时间顺序清楚啦。");
  }

  /* ---------------- 古人生活 ---------------- */

  function renderLifeCards() {
    if (!lifeCards) return;
    lifeCards.innerHTML = episode.life.items.map((item, index) => `
      <button class="reveal-card" type="button" data-life-index="${index}" aria-expanded="false">
        <span aria-hidden="true">${escapeHtml(item.icon)}</span>
        <b>${escapeHtml(item.title)}</b>
        <small>${escapeHtml(item.fact)}</small>
      </button>
    `).join("");

    lifeCards.querySelectorAll(".reveal-card").forEach((card) => {
      card.addEventListener("click", () => revealLifeCard(card));
    });
  }

  function revealLifeCard(card) {
    if (card.classList.contains("is-open")) return;
    card.classList.add("is-open");
    card.setAttribute("aria-expanded", "true");
    const index = Number(card.dataset.lifeIndex);
    const item = episode.life.items[index];
    speakText(item.title + "。" + item.fact, false);
    const openCount = lifeCards.querySelectorAll(".is-open").length;
    setText("lifeHint", "已发现 " + openCount + " / " + episode.life.items.length + " 张生活卡");
    if (openCount === episode.life.items.length) {
      markTask("life");
      setText("lifeHint", "古人的一天拼完整了！");
      showToast("获得 1 颗探索星：历史也是吃饭、干活和过日子。");
    }
  }

  /* ---------------- 变与不变 ---------------- */

  function renderChangeCards() {
    if (!changeCards) return;
    changeCards.innerHTML = episode.change.items.map((item, index) => `
      <details class="change-card" data-change-index="${index}">
        <summary>
          <span aria-hidden="true">${escapeHtml(item.icon)}</span>
          <b>第 ${index + 1} 组 · 点开时间对照</b>
          <i>点一下</i>
        </summary>
        <div class="change-pair">
          <div class="changed"><small>变了</small><p>${escapeHtml(item.changed)}</p></div>
          <div class="unchanged"><small>没变</small><p>${escapeHtml(item.unchanged)}</p></div>
        </div>
      </details>
    `).join("");

    changeCards.querySelectorAll(".change-card").forEach((card) => {
      card.addEventListener("toggle", () => {
        if (!card.open) return;
        const item = episode.change.items[Number(card.dataset.changeIndex)];
        speakText("变了：" + item.changed + "。没变：" + item.unchanged, false);
        const openCount = changeCards.querySelectorAll(".change-card[open]").length;
        setText("changeHint", "已打开 " + openCount + " / " + episode.change.items.length + " 组时间对照");
        if (openCount === episode.change.items.length) {
          markTask("change");
          setText("changeHint", "你找到了藏在变化里的连续线。");
          showToast("获得 1 颗探索星：会看见变化，也会看见不变。");
        }
      });
    });
  }

  /* ---------------- 小测验 ---------------- */

  function renderQuiz() {
    if (!quizDots) return;
    quizDots.innerHTML = episode.quiz.map(() => "<i></i>").join("");
    renderQuestion();
  }

  function renderQuestion() {
    const question = episode.quiz[state.quizIndex];
    const quizMain = document.getElementById("quizMain");
    const quizResult = document.getElementById("quizResult");
    const answerList = document.getElementById("answerList");
    const quizNext = document.getElementById("quizNext");
    const quizFeedback = document.getElementById("quizFeedback");
    if (!question || !answerList) return;

    state.quizAnswered = false;
    if (quizMain) quizMain.hidden = false;
    if (quizResult) quizResult.hidden = true;
    setText("questionNumber", "第 " + (state.quizIndex + 1) + " 题 / 共 " + episode.quiz.length + " 题");
    setText("questionText", question.q);
    if (quizFeedback) {
      quizFeedback.textContent = "选一个你心里的答案。";
      quizFeedback.className = "quiz-feedback";
    }
    if (quizNext) quizNext.hidden = true;

    answerList.innerHTML = question.options.map((option, index) => `
      <button class="answer-button" type="button" data-answer="${index}">
        <span class="answer-letter">${["A", "B", "C", "D"][index] || index + 1}</span>
        <span class="answer-text">${escapeHtml(option)}</span>
        <span class="answer-mark" aria-hidden="true">○</span>
      </button>
    `).join("");

    answerList.querySelectorAll(".answer-button").forEach((button) => {
      button.addEventListener("click", () => answerQuestion(Number(button.dataset.answer)));
    });
    quizDots.querySelectorAll("i").forEach((dot, index) => {
      dot.classList.toggle("active", index === state.quizIndex);
    });

    const quizScene = document.getElementById("scene-quiz");
    if (quizScene) {
      quizScene.dataset.narration = "小测验。第" + (state.quizIndex + 1) + "题。" + question.q;
    }
  }

  function answerQuestion(choice) {
    if (state.quizAnswered) return;
    state.quizAnswered = true;
    const question = episode.quiz[state.quizIndex];
    const answerList = document.getElementById("answerList");
    const feedback = document.getElementById("quizFeedback");
    const quizNext = document.getElementById("quizNext");
    const correct = choice === question.correct;
    if (correct) state.quizCorrect += 1;

    answerList.querySelectorAll(".answer-button").forEach((button, index) => {
      button.disabled = true;
      const mark = button.querySelector(".answer-mark");
      if (index === question.correct) {
        button.classList.add("correct");
        if (mark) mark.textContent = "✓";
      } else if (index === choice) {
        button.classList.add("wrong");
        if (mark) mark.textContent = "×";
      } else {
        button.classList.add("dim");
      }
    });

    if (feedback) {
      feedback.textContent = correct ? question.right : question.wrong;
      feedback.className = "quiz-feedback " + (correct ? "correct" : "wrong");
    }
    if (quizNext) {
      quizNext.hidden = false;
      quizNext.textContent = state.quizIndex < episode.quiz.length - 1 ? "下一题 →" : "看看我的成绩 🏅";
    }
    speakText(correct ? question.right : question.wrong, false);
  }

  function finishQuiz() {
    state.quizFinished = true;
    state.bestScore = Math.max(state.bestScore, state.quizCorrect);
    const quizMain = document.getElementById("quizMain");
    const quizResult = document.getElementById("quizResult");
    const resultText = document.getElementById("quizResultText");
    if (quizMain) quizMain.hidden = true;
    if (quizResult) quizResult.hidden = false;
    setText("quizScore", String(state.quizCorrect));

    const total = episode.quiz.length;
    if (resultText) {
      if (state.quizCorrect === total) {
        resultText.textContent = "全部答对！你不但记住了关键事件，还能把这一站讲给别人听。";
      } else if (state.quizCorrect >= Math.ceil(total * .66)) {
        resultText.textContent = "关键线索已经抓住了。再翻一遍故事，你会讲得更完整。";
      } else {
        resultText.textContent = "没关系，历史不是一次就背完的。记住这一站的一句话，就已经有收获。";
      }
    }

    markTask("quiz");
    updateFinalStats();
    reportQuiz();
    showToast("挑战完成：答对 " + state.quizCorrect + " / " + total + " 题，获得「" + episode.badge + "」！");
    speakText("挑战完成。你答对了" + state.quizCorrect + "题。记住：" + episode.story.fact, false);
  }

  function reportQuiz() {
    if (state.reported) return;
    state.reported = true;
    if (window.parent && window.parent !== window) {
      window.parent.postMessage({
        type: "quiz-result",
        topicId: "mario-history-" + episode.id,
        title: episode.title,
        emoji: episode.theme.tokens[0] || "🧭",
        score: state.quizCorrect,
        total: episode.quiz.length
      }, "*");
    }
  }

  /* ---------------- 家长指南 ---------------- */

  function setupParentGuide() {
    const firstLife = episode.life.items[0];
    const firstChange = episode.change.items[0];
    setText("parentTitle", "陪读指南 · " + episode.title);
    setText("parentCore", episode.story.title + "。" + episode.story.fact);
    setText("parentQuestions",
      "先问：“如果罗盘带你到了这里，你最想先看什么？”读完后请 Mario 用自己的话说出故事标题，再回答一道小测题。");
    setText("parentEvidence", episode.parentNote);
    setText("parentLife",
      "从「" + firstLife.title + "」聊到今天的相似生活；再从“" + firstChange.changed + "”与“" +
      firstChange.unchanged + "”里，找一个家里也能找到的例子。");
  }

  const parentButton = document.getElementById("parentButton");
  const parentModal = document.getElementById("parentModal");
  const parentClose = document.getElementById("parentClose");

  function openParentGuide() {
    if (!parentModal) return;
    stopSpeaking();
    parentModal.hidden = false;
    document.body.classList.add("modal-open");
    if (parentClose) parentClose.focus();
  }

  function closeParentGuide() {
    if (!parentModal) return;
    parentModal.hidden = true;
    document.body.classList.remove("modal-open");
    if (parentButton) parentButton.focus();
  }

  if (parentButton) parentButton.addEventListener("click", openParentGuide);
  if (parentClose) parentClose.addEventListener("click", closeParentGuide);
  if (parentModal) {
    parentModal.addEventListener("click", (event) => {
      if (event.target === parentModal) closeParentGuide();
    });
  }
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && parentModal && !parentModal.hidden) closeParentGuide();
  });

  /* ---------------- 下一站 ---------------- */

  function setupNextEpisode() {
    const currentIndex = EPISODES.findIndex((item) => item.id === episode.id);
    const nextEpisode = EPISODES[currentIndex + 1];
    const nextButtonLink = document.getElementById("nextEpisodeButton");
    if (!nextButtonLink) return;
    if (nextEpisode) {
      nextButtonLink.href = "episode.html?id=" + encodeURIComponent(nextEpisode.id);
      nextButtonLink.textContent = "下一站 · " + nextEpisode.title + " →";
    } else {
      nextButtonLink.href = "index.html";
      nextButtonLink.textContent = "回到五千年故事地图 →";
    }
  }

  /* ---------------- 朗读 ---------------- */

  function chooseChineseVoice() {
    if (!("speechSynthesis" in window)) return null;
    const voices = window.speechSynthesis.getVoices();
    return voices.find((voice) => /^zh|chinese|mandarin|中文|普通话/i.test(voice.lang + " " + voice.name)) || null;
  }

  function speakText(text, force) {
    if (!text || (!force && !state.soundOn)) return;
    if (!("speechSynthesis" in window)) {
      showToast("这个浏览器暂时不能朗读，可以请爸爸妈妈读给你听。");
      return;
    }
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    const voice = chooseChineseVoice();
    if (voice) utterance.voice = voice;
    utterance.lang = "zh-CN";
    utterance.rate = .9;
    utterance.pitch = 1.06;
    window.speechSynthesis.speak(utterance);
  }

  function speakCurrentScene(force) {
    const scene = scenes[state.current];
    if (!scene) return;
    speakText(scene.dataset.narration || "", force);
  }

  function stopSpeaking() {
    if ("speechSynthesis" in window) window.speechSynthesis.cancel();
  }

  if (soundToggle) {
    soundToggle.addEventListener("click", () => {
      if (!("speechSynthesis" in window)) {
        showToast("这个浏览器暂时不能朗读，可以请爸爸妈妈读给你听。");
        return;
      }
      state.soundOn = !state.soundOn;
      soundToggle.setAttribute("aria-pressed", String(state.soundOn));
      soundToggle.setAttribute("aria-label", state.soundOn ? "关闭朗读" : "打开朗读");
      soundToggle.textContent = state.soundOn ? "🔊 朗读开" : "🔇 朗读";
      if (state.soundOn) {
        speakCurrentScene(true);
        showToast("朗读已打开，翻页时会读这一页。");
      } else {
        stopSpeaking();
        showToast("朗读已关闭。");
      }
    });
  }

  const readStoryButton = document.getElementById("readStoryButton");
  if (readStoryButton) {
    readStoryButton.addEventListener("click", () => speakText(episode.story.narration, true));
  }

  /* ---------------- 翻页进度 ---------------- */

  function refreshNav() {
    const scene = scenes[state.current];
    if (!scene) return;
    if (progressBar) progressBar.style.width = ((state.current + 1) / scenes.length * 100) + "%";
    if (pageNow) pageNow.textContent = (state.current + 1) + " / " + scenes.length + " · " + SCENE_NAMES[state.current];
    if (pageDots) {
      pageDots.querySelectorAll("i").forEach((dot, index) => {
        dot.classList.toggle("active", index === state.current);
        dot.classList.toggle("seen", index < state.current);
      });
    }
    if (prevButton) prevButton.disabled = state.current === 0;
    if (!nextButton) return;

    const task = scene.dataset.task;
    const gateOpen = !task || state.tasks.has(task);
    const isLast = state.current === scenes.length - 1;
    nextButton.hidden = isLast;
    nextButton.disabled = !gateOpen;
    if (!gateOpen) {
      nextButton.textContent = "先完成互动 →";
    } else if (scene.dataset.scene === "quiz" && state.quizFinished) {
      nextButton.textContent = "领取徽章 →";
    } else {
      nextButton.textContent = "下一页 →";
    }
  }

  function goTo(index, options) {
    const opts = options || {};
    if (index < 0 || index >= scenes.length) return;
    stopSpeaking();
    scenes[state.current].classList.remove("active");
    state.current = index;
    const scene = scenes[state.current];
    scene.classList.add("active");

    if (!opts.skipHash) {
      const hash = "#" + scene.id;
      if (window.location.hash !== hash) history.replaceState(null, "", hash);
    }
    window.scrollTo({
      top: 0,
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth"
    });
    refreshNav();
    if (state.soundOn) window.setTimeout(() => speakCurrentScene(false), 330);
    if (scene.dataset.scene === "final") {
      updateFinalStats();
      window.setTimeout(createConfetti, 350);
    }
  }

  function createConfetti() {
    const container = document.getElementById("confetti");
    if (!container) return;
    const colors = [episode.theme.accent, episode.theme.sky2, "#c69b4a", "#3f766d", "#e8cf8d"];
    container.innerHTML = "";
    for (let index = 0; index < 32; index += 1) {
      const piece = document.createElement("i");
      piece.style.left = (30 + Math.random() * 40) + "%";
      piece.style.setProperty("--x", (-190 + Math.random() * 380) + "px");
      piece.style.setProperty("--rot", (-180 + Math.random() * 540) + "deg");
      piece.style.setProperty("--delay", (Math.random() * .55) + "s");
      piece.style.setProperty("--confetti", colors[index % colors.length]);
      container.appendChild(piece);
    }
    window.setTimeout(() => { container.innerHTML = ""; }, 3400);
  }

  /* ---------------- 提示条 ---------------- */

  let toastTimer = 0;
  function showToast(message) {
    if (!toastEl || !message) return;
    window.clearTimeout(toastTimer);
    toastEl.textContent = message;
    toastEl.classList.add("show");
    toastTimer = window.setTimeout(() => toastEl.classList.remove("show"), 2500);
  }

  /* ---------------- 启动 ---------------- */

  setupSceneIndexes();
  readSavedState();
  applyEpisodeContent();
  updateStarMeter(false);
  updateFinalStats();
  refreshNav();

  const startButton = document.getElementById("startButton");
  if (startButton) startButton.addEventListener("click", () => goTo(1));
  const againButton = document.getElementById("againButton");
  if (againButton) {
    againButton.addEventListener("click", () => {
      history.replaceState(null, "", window.location.pathname + window.location.search);
      goTo(0, { skipHash: true });
    });
  }
  const toBadgeButton = document.getElementById("toBadgeButton");
  if (toBadgeButton) toBadgeButton.addEventListener("click", () => goTo(6));

  if (prevButton) prevButton.addEventListener("click", () => goTo(state.current - 1));
  if (nextButton) {
    nextButton.addEventListener("click", () => {
      if (nextButton.disabled) return;
      goTo(state.current + 1);
    });
  }
  const quizNext = document.getElementById("quizNext");
  if (quizNext) {
    quizNext.addEventListener("click", () => {
      if (state.quizIndex < episode.quiz.length - 1) {
        state.quizIndex += 1;
        renderQuestion();
      } else {
        finishQuiz();
      }
    });
  }

  const hashScene = scenes.find((scene) => "#" + scene.id === window.location.hash);
  if (hashScene) {
    goTo(Number(hashScene.dataset.index), { skipHash: true });
  } else {
    goTo(0, { skipHash: true });
  }
})();
