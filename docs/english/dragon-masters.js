/* =========================================================================
 *  Dragon Masters · Book 1, Chapter 1
 *  Interactive storybook, story archive, knowledge graph, and optional games.
 * ========================================================================= */

(function () {
  "use strict";

  var DATA = window.DRAGON_MASTERS;
  if (!DATA) return;

  var body = document.body;
  var textPage = document.querySelector(".text-page");
  var totalHotspots = DATA.scenes.reduce(function (sum, scene) {
    return sum + scene.hotspots.length;
  }, 0);

  var TYPE_META = {
    person: {
      en: "PEOPLE",
      zh: "人物",
      labelEn: "People",
      labelZh: "人物",
      color: "#c54d3b",
      soft: "#ffe8e0"
    },
    dragon: {
      en: "DRAGONS",
      zh: "龙族",
      labelEn: "Dragons",
      labelZh: "龙族",
      color: "#2f827a",
      soft: "#dff3ed"
    },
    place: {
      en: "PLACES",
      zh: "地点",
      labelEn: "Places",
      labelZh: "地点",
      color: "#a47728",
      soft: "#fff0c9"
    },
    clue: {
      en: "STORY CLUES",
      zh: "故事线索",
      labelEn: "Story clues",
      labelZh: "故事线索",
      color: "#4a78a8",
      soft: "#e4effa"
    }
  };

  var DRAGON_SPEECH = [
    {
      en: "Psst! There are hidden clues in this story. Can you find all ten?",
      zh: "嘘！这个故事里藏着线索。你能把十条都找出来吗？"
    },
    {
      en: "If you were Drake, what would you say to the red dragon?",
      zh: "如果你是德雷克，你会对红龙说什么？"
    },
    {
      en: "Drake had never ridden a horse. What is something new you would like to try safely?",
      zh: "德雷克以前从没骑过马。你想在安全的前提下尝试什么新事物？"
    }
  ];

  var state = {
    lang: "en",
    sceneIndex: 0,
    discovered: {},
    doorOpen: false,
    activeHotspot: null,
    dossierId: "",
    archiveFilter: "all",
    graphFilter: "all",
    selectedNode: "",
    traceTimers: [],
    traceNodes: {},
    traceEdges: {},
    dragonSpeechIndex: 0,
    sequenceNext: 0,
    sequenceDone: 0,
    quizAnswered: 0,
    quizScore: 0
  };

  var els = {
    langToggle: document.getElementById("langToggle"),
    readingProgress: document.getElementById("readingProgress"),
    voiceDot: document.getElementById("voiceDot"),
    voiceNote: document.getElementById("voiceNote"),
    sceneTabs: document.getElementById("sceneTabs"),
    sceneArt: document.getElementById("sceneArt"),
    hotspotLayer: document.getElementById("hotspotLayer"),
    hotspotNote: document.getElementById("hotspotNote"),
    hotspotClose: document.getElementById("hotspotClose"),
    hotspotType: document.getElementById("hotspotType"),
    hotspotTitle: document.getElementById("hotspotTitle"),
    hotspotText: document.getElementById("hotspotText"),
    hotspotDossier: document.getElementById("hotspotDossier"),
    pageCounter: document.getElementById("pageCounter"),
    pagePlace: document.getElementById("pagePlace"),
    pageTitle: document.getElementById("pageTitle"),
    pageNarrationEn: document.getElementById("pageNarrationEn"),
    pageNarrationZh: document.getElementById("pageNarrationZh"),
    pageClues: document.getElementById("pageClues"),
    prevPage: document.getElementById("prevPage"),
    nextPage: document.getElementById("nextPage"),
    pageDots: document.getElementById("pageDots"),
    bookSpread: document.getElementById("bookSpread"),
    discoveryCount: document.getElementById("discoveryCount"),
    archiveFilters: document.getElementById("archiveFilters"),
    archiveGrid: document.getElementById("archiveGrid"),
    dossierDialog: document.getElementById("dossierDialog"),
    dossierBody: document.getElementById("dossierBody"),
    dossierClose: document.getElementById("dossierClose"),
    graphFilters: document.getElementById("graphFilters"),
    knowledgeSvg: document.getElementById("knowledgeSvg"),
    graphInspector: document.getElementById("graphInspector"),
    tracePathBtn: document.getElementById("tracePathBtn"),
    labTabs: document.getElementById("labTabs"),
    sequenceBoard: document.getElementById("sequenceBoard"),
    sequenceScore: document.getElementById("sequenceScore"),
    sequenceFeedback: document.getElementById("sequenceFeedback"),
    vocabGrid: document.getElementById("vocabGrid"),
    lifeMissions: document.getElementById("lifeMissions"),
    quizBoard: document.getElementById("quizBoard"),
    quizScore: document.getElementById("quizScore"),
    quizComplete: document.getElementById("quizComplete"),
    resetQuiz: document.getElementById("resetQuiz"),
    dragonTap: document.getElementById("dragonTap"),
    dragonSpeech: document.getElementById("dragonSpeech"),
    dragonSpeechMessage: document.getElementById("dragonSpeechMessage"),
    dragonSpeechClose: document.getElementById("dragonSpeechClose")
  };

  function esc(value) {
    return String(value == null ? "" : value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  function bi(en, zh) {
    return '<span class="t-en">' + esc(en) + "</span>" +
      '<span class="t-zh">' + esc(zh) + "</span>";
  }

  function paragraphs(items, secretFrom) {
    return items.map(function (item, index) {
      var hideUntilDoor = typeof secretFrom === "number" && secretFrom >= 0 && index >= secretFrom;
      var cls = hideUntilDoor
        ? ' class="door-secret"'
        : "";
      return "<p" + cls + ">" + esc(item) + "</p>";
    }).join("");
  }

  function archiveById(id) {
    return DATA.archive.filter(function (entry) { return entry.id === id; })[0] || null;
  }

  function sceneIndexById(id) {
    for (var i = 0; i < DATA.scenes.length; i += 1) {
      if (DATA.scenes[i].id === id) return i;
    }
    return -1;
  }

  function hotspotById(id) {
    for (var i = 0; i < DATA.scenes.length; i += 1) {
      var scene = DATA.scenes[i];
      for (var j = 0; j < scene.hotspots.length; j += 1) {
        if (scene.hotspots[j].id === id) return scene.hotspots[j];
      }
    }
    return null;
  }

  function nodeById(id) {
    return DATA.graph.nodes.filter(function (node) { return node.id === id; })[0] || null;
  }

  function edgeKey(from, to) {
    return [from, to].sort().join("::");
  }

  function typeMeta(type) {
    return TYPE_META[type] || TYPE_META.clue;
  }

  /* -----------------------------------------------------------------------
   *  Code-native story illustrations
   * --------------------------------------------------------------------- */

  function artOnionField() {
    return [
      '<svg viewBox="0 0 720 640" preserveAspectRatio="xMidYMid slice" focusable="false">',
      "<defs>",
      '<linearGradient id="onionSky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#dff2f1"/><stop offset="1" stop-color="#fff1c9"/></linearGradient>',
      '<linearGradient id="onionField" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#a9d78f"/><stop offset="1" stop-color="#68aa70"/></linearGradient>',
      '<linearGradient id="drakeShirt" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#f2c66d"/><stop offset="1" stop-color="#dca243"/></linearGradient>',
      "</defs>",
      '<rect width="720" height="640" fill="url(#onionSky)"/>',
      '<circle cx="590" cy="92" r="52" fill="#ffd56f" opacity=".9"/>',
      '<g fill="#fff" opacity=".8"><ellipse cx="128" cy="105" rx="62" ry="22"/><ellipse cx="174" cy="92" rx="42" ry="18"/><ellipse cx="93" cy="96" rx="31" ry="14"/><ellipse cx="478" cy="146" rx="49" ry="18"/><ellipse cx="514" cy="136" rx="31" ry="14"/></g>',
      '<path d="M0 296 C92 237 173 247 247 290 C330 339 385 243 480 262 C571 280 626 247 720 301 L720 640 L0 640Z" fill="#b8dfb6"/>',
      '<path d="M0 383 C116 333 210 366 311 341 C427 313 533 330 720 391 L720 640 L0 640Z" fill="url(#onionField)"/>',
      '<path d="M0 502 C159 470 268 481 379 503 C512 530 615 498 720 473 L720 640 L0 640Z" fill="#8bc177"/>',
      '<g stroke="#5d985b" stroke-width="5" opacity=".5"><path d="M-20 418 C120 380 223 406 350 385 C485 362 593 381 740 419"/><path d="M-20 460 C115 424 233 448 363 426 C501 402 601 423 740 458"/><path d="M-20 504 C111 479 216 499 344 480 C490 458 601 476 740 509"/></g>',
      '<g transform="translate(165 445)">',
      '<ellipse cx="0" cy="52" rx="58" ry="13" fill="#4d7d4a" opacity=".22"/>',
      '<path d="M0 39 C-5 8 4 -18 15 -37 C21 -17 19 7 12 31 C31 7 49 -4 66 -6 C53 16 32 36 -1 47 C-27 36 -52 19 -63 0 C-44 -2 -24 10 -7 29Z" fill="#79a95b"/>',
      '<ellipse cx="0" cy="35" rx="31" ry="37" fill="#f5cf83"/>',
      '<path d="M-19 19 C-7 29 8 29 20 19" fill="none" stroke="#dcae62" stroke-width="3" opacity=".7"/>',
      '<path d="M-2 -1 C-28 2 -45 18 -42 35 C-20 29 -5 18 8 5" fill="#db9acb" opacity=".75"/>',
      "</g>",
      '<g opacity=".9">',
      '<g transform="translate(109 505) scale(.7)"><path d="M0 30 C0 5 10 -13 20 -25 C30 -5 24 15 16 28 C35 10 50 6 62 9 C49 29 27 40 0 43 C-24 33 -41 19 -48 5 C-28 4 -13 15 0 30Z" fill="#81af60"/><ellipse cy="39" rx="25" ry="29" fill="#f4d18c"/></g>',
      '<g transform="translate(92 557) scale(.56)"><path d="M0 30 C4 6 14 -10 24 -22 C31 -4 26 15 17 27 C38 12 51 9 61 12 C46 29 25 39 0 42 C-25 33 -41 21 -48 7 C-28 5 -13 17 0 30Z" fill="#7dad5e"/><ellipse cy="39" rx="25" ry="29" fill="#f1c97f"/></g>',
      "</g>",
      '<g transform="translate(252 316)">',
      '<ellipse cx="0" cy="236" rx="60" ry="14" fill="#496f45" opacity=".2"/>',
      '<path d="M-23 160 L-29 226 M22 160 L31 226" stroke="#4f6888" stroke-width="19" stroke-linecap="round"/>',
      '<path d="M-42 229 C-23 218 -6 222 1 231 L-26 244Z" fill="#614736"/><path d="M25 229 C43 220 56 223 65 232 L38 244Z" fill="#614736"/>',
      '<path d="M-44 86 C-31 55 23 55 45 88 L37 170 C20 184 -18 184 -37 170Z" fill="url(#drakeShirt)"/>',
      '<path d="M-31 95 C-52 120 -56 151 -42 174" fill="none" stroke="#e6b45d" stroke-width="16" stroke-linecap="round"/>',
      '<path d="M34 95 C57 115 65 139 55 164" fill="none" stroke="#e6b45d" stroke-width="16" stroke-linecap="round"/>',
      '<path d="M-31 110 C-12 122 23 122 39 108 L35 167 C15 180 -15 179 -34 163Z" fill="#507b73"/>',
      '<path d="M-2 112 L-2 167" stroke="#365e59" stroke-width="4"/>',
      '<circle cx="0" cy="42" r="53" fill="#e9b887"/>',
      '<path d="M-51 33 C-44 -7 -17 -25 10 -21 C39 -17 52 3 51 31 C30 18 17 19 -2 22 C-21 25 -37 31 -51 33Z" fill="#62422f"/>',
      '<path d="M-45 15 C-27 -10 2 -15 24 -5" fill="none" stroke="#4c3325" stroke-width="12" stroke-linecap="round"/>',
      '<circle cx="-18" cy="45" r="4" fill="#3e332c"/><circle cx="19" cy="45" r="4" fill="#3e332c"/>',
      '<path d="M-9 61 C0 67 9 66 17 60" fill="none" stroke="#9a5e4a" stroke-width="3" stroke-linecap="round"/>',
      '<path d="M-58 4 C-76 24 -71 49 -56 62" fill="none" stroke="#e4b27f" stroke-width="16" stroke-linecap="round"/>',
      '<path d="M56 13 C75 30 75 50 59 65" fill="none" stroke="#e4b27f" stroke-width="16" stroke-linecap="round"/>',
      "</g>",
      '<g transform="translate(463 210)">',
      '<ellipse cx="73" cy="260" rx="118" ry="20" fill="#486b43" opacity=".22"/>',
      '<path d="M5 151 C7 104 51 78 100 90 C151 102 177 137 166 179 C156 217 113 233 69 222 C30 213 3 188 5 151Z" fill="#a4653c"/>',
      '<path d="M153 117 C177 92 207 93 222 111 C239 132 226 157 201 168 C184 176 161 164 154 147Z" fill="#a4653c"/>',
      '<path d="M200 102 L210 70 L222 103 L237 83 L231 119 L202 126Z" fill="#8e5130"/>',
      '<path d="M17 192 L-3 255 M75 213 L66 267 M130 206 L154 263 M157 177 L195 245" stroke="#86512f" stroke-width="17" stroke-linecap="round"/>',
      '<path d="M-8 255 C8 247 25 251 31 260 L-1 269Z" fill="#543a2b"/><path d="M59 267 C74 258 93 262 99 272 L67 278Z" fill="#543a2b"/><path d="M147 263 C163 255 181 259 186 269 L154 276Z" fill="#543a2b"/><path d="M188 246 C204 238 219 243 224 253 L194 260Z" fill="#543a2b"/>',
      '<path d="M18 123 C-9 140 -13 170 4 188" fill="none" stroke="#8e5130" stroke-width="18" stroke-linecap="round"/>',
      '<path d="M46 107 C57 58 107 47 130 70 C145 84 146 107 139 127 L124 182 L53 174Z" fill="#a6b9b3"/>',
      '<path d="M64 61 C62 35 77 20 97 23 C120 26 132 48 124 72 C112 89 76 87 64 61Z" fill="#efc08d"/>',
      '<path d="M63 52 C65 26 86 12 107 22 C127 32 127 55 119 66 C99 49 82 47 63 52Z" fill="#7f4e33"/>',
      '<path d="M58 95 C46 80 41 69 43 55 L62 69Z" fill="#b44e3e"/><path d="M124 95 C143 82 153 71 155 58 L132 65Z" fill="#b44e3e"/>',
      '<path d="M68 92 C85 105 108 108 128 96 L140 167 C111 187 65 182 46 160Z" fill="#8a3f38"/>',
      '<path d="M58 128 C55 149 63 169 80 181" fill="none" stroke="#efc08d" stroke-width="13" stroke-linecap="round"/>',
      '<path d="M90 90 C96 80 111 80 118 92" fill="none" stroke="#7b4a35" stroke-width="4" stroke-linecap="round"/>',
      '<circle cx="92" cy="69" r="3.5" fill="#3e332c"/><circle cx="113" cy="69" r="3.5" fill="#3e332c"/>',
      '<path d="M94 83 C101 88 109 87 115 82" fill="none" stroke="#a6624c" stroke-width="3" stroke-linecap="round"/>',
      '<path d="M148 147 L170 156" stroke="#efc08d" stroke-width="12" stroke-linecap="round"/>',
      "</g>",
      '<g fill="#5c914f"><path d="M534 576 C547 552 566 550 581 565 C568 581 548 585 534 576Z"/><path d="M576 590 C592 568 610 568 622 582 C608 596 592 598 576 590Z"/></g>',
      '<circle cx="659" cy="164" r="5" fill="#fff" opacity=".8"/><circle cx="672" cy="192" r="3" fill="#fff" opacity=".7"/>',
      "</svg>"
    ].join("");
  }

  function artCastleRoad() {
    return [
      '<svg viewBox="0 0 720 640" preserveAspectRatio="xMidYMid slice" focusable="false">',
      "<defs>",
      '<linearGradient id="roadSky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#d9eef0"/><stop offset="1" stop-color="#fff1cd"/></linearGradient>',
      '<linearGradient id="roadGrass" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#a6d290"/><stop offset="1" stop-color="#6eae77"/></linearGradient>',
      '<linearGradient id="castleStone" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#f7e6bd"/><stop offset="1" stop-color="#c89e60"/></linearGradient>',
      "</defs>",
      '<rect width="720" height="640" fill="url(#roadSky)"/>',
      '<circle cx="105" cy="88" r="55" fill="#ffd46d"/>',
      '<g fill="#fff" opacity=".78"><ellipse cx="529" cy="91" rx="64" ry="22"/><ellipse cx="575" cy="77" rx="39" ry="17"/><ellipse cx="493" cy="80" rx="31" ry="14"/></g>',
      '<path d="M0 327 C86 254 172 246 259 294 C344 341 414 236 500 270 C588 305 647 270 720 314 L720 640 L0 640Z" fill="#b8dfb8"/>',
      '<path d="M0 395 C102 348 198 348 309 387 C438 432 542 355 720 399 L720 640 L0 640Z" fill="url(#roadGrass)"/>',
      '<path d="M-56 640 C30 539 106 489 214 439 C338 381 427 339 541 252 C579 224 615 198 661 177 L720 206 C648 234 611 265 572 302 C474 391 398 424 287 477 C193 522 142 566 88 640Z" fill="#e4c88e"/>',
      '<path d="M-28 618 C67 530 127 486 226 442 C349 387 432 344 544 260 C580 233 615 208 653 189" fill="none" stroke="#f4deb0" stroke-width="23" opacity=".9"/>',
      '<g transform="translate(532 22)">',
      '<path d="M-143 277 L-143 164 L-103 164 L-103 129 L-65 129 L-65 164 L-23 164 L-23 103 L21 103 L21 164 L66 164 L66 121 L106 121 L106 164 L151 164 L151 278Z" fill="url(#castleStone)"/>',
      '<path d="M-170 164 L-143 164 L-143 83 L-104 83 L-104 164 L-170 145Z" fill="#d3ad71"/>',
      '<path d="M106 164 L151 164 L151 83 L191 83 L191 145 L218 164Z" fill="#d3ad71"/>',
      '<rect x="-48" y="190" width="65" height="88" rx="34" fill="#6b8079"/>',
      '<path d="M-16 190 L-16 149 L17 149 L17 190" fill="#6b8079"/>',
      '<g fill="#fff1c8"><rect x="-118" y="202" width="28" height="48" rx="14"/><rect x="84" y="202" width="28" height="48" rx="14"/><rect x="-91" y="88" width="24" height="43" rx="12"/><rect x="135" y="88" width="24" height="43" rx="12"/></g>',
      '<g stroke="#9e7647" stroke-width="3" opacity=".5"><path d="M-143 230 L151 230"/><path d="M-143 258 L151 258"/></g>',
      '<path d="M-23 103 L0 68 L21 103Z" fill="#b54d3d"/><path d="M66 121 L87 91 L106 121Z" fill="#b54d3d"/>',
      '<path d="M0 68 L0 42" stroke="#7a6143" stroke-width="3"/><path d="M0 42 L34 51 L0 61Z" fill="#e65b45"/>',
      "</g>",
      '<g transform="translate(167 336)">',
      '<ellipse cx="102" cy="181" rx="132" ry="19" fill="#547b4f" opacity=".22"/>',
      '<path d="M20 102 C27 72 60 61 98 69 C139 78 163 99 159 128 C154 157 120 174 78 168 C40 162 16 140 20 102Z" fill="#a9693e"/>',
      '<path d="M142 85 C163 64 190 68 202 84 C213 101 201 121 177 130 C161 136 145 126 141 111Z" fill="#a9693e"/>',
      '<path d="M190 69 L197 40 L209 69 L223 52 L218 82 L193 88Z" fill="#8e5130"/>',
      '<path d="M30 144 L15 217 M81 160 L72 224 M129 153 L151 216 M148 129 L184 190" stroke="#875231" stroke-width="16" stroke-linecap="round"/>',
      '<path d="M5 217 C21 210 36 214 42 223 L10 230Z" fill="#563b2b"/><path d="M62 224 C77 216 94 220 100 229 L69 235Z" fill="#563b2b"/><path d="M141 216 C156 209 173 213 178 223 L147 229Z" fill="#563b2b"/><path d="M177 190 C191 183 205 187 210 197 L181 203Z" fill="#563b2b"/>',
      '<path d="M27 82 C1 96 -1 126 12 143" fill="none" stroke="#8d5632" stroke-width="18" stroke-linecap="round"/>',
      '<path d="M48 78 C54 35 94 20 121 39 C137 50 137 71 130 90 L118 145 L55 137Z" fill="#c3d3cc"/>',
      '<path d="M62 36 C61 14 76 2 95 5 C116 8 126 26 119 47 C107 62 75 60 62 36Z" fill="#efc08d"/>',
      '<path d="M60 30 C63 8 82 -3 101 5 C119 12 120 33 112 43 C94 28 78 25 60 30Z" fill="#74472f"/>',
      '<path d="M108 31 L126 14 L151 15 L136 37Z" fill="#6f8f89"/>',
      '<path d="M54 67 C82 80 108 81 130 65 L139 131 C111 150 70 146 46 126Z" fill="#6b8d86"/>',
      '<path d="M70 64 C64 84 66 105 77 121" fill="none" stroke="#efc08d" stroke-width="12" stroke-linecap="round"/>',
      '<path d="M85 62 C91 54 105 54 111 64" fill="none" stroke="#7b4a35" stroke-width="3"/>',
      '<circle cx="87" cy="43" r="3" fill="#3e332c"/><circle cx="107" cy="43" r="3" fill="#3e332c"/>',
      '<path d="M91 55 C98 59 104 58 109 54" fill="none" stroke="#a6624c" stroke-width="3" stroke-linecap="round"/>',
      '<g transform="translate(18 56)"><path d="M0 19 C0 1 8 -10 17 -17 C23 -3 19 10 12 18 C27 7 39 5 48 8 C38 21 23 27 0 28 C-17 20 -28 12 -34 2 C-19 1 -8 8 0 19Z" fill="#6faa67" opacity=".85"/></g>',
      "</g>",
      '<g fill="#fff" opacity=".7"><path d="M218 120 l9 -6 5 8 -10 5z"/><path d="M401 145 l8 -5 4 7 -8 5z"/></g>',
      "</svg>"
    ].join("");
  }

  function artCastleHall() {
    return [
      '<svg viewBox="0 0 720 640" preserveAspectRatio="xMidYMid slice" focusable="false">',
      "<defs>",
      '<linearGradient id="hallWall" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#84bbb0"/><stop offset="1" stop-color="#c8e4d8"/></linearGradient>',
      '<linearGradient id="hallFloor" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#f3dda9"/><stop offset="1" stop-color="#cfa76b"/></linearGradient>',
      '<linearGradient id="doorStone" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#9c9280"/><stop offset="1" stop-color="#686b63"/></linearGradient>',
      "</defs>",
      '<rect width="720" height="640" fill="url(#hallWall)"/>',
      '<path d="M0 430 L720 430 L720 640 L0 640Z" fill="url(#hallFloor)"/>',
      '<g fill="none" stroke="#eaf4e8" stroke-width="9" opacity=".55"><path d="M34 430 L34 155 C34 91 85 48 144 48 C204 48 254 91 254 155 L254 430"/><path d="M466 430 L466 155 C466 91 517 48 576 48 C636 48 686 91 686 155 L686 430"/></g>',
      '<g fill="#316f69" opacity=".22"><path d="M0 0 H720 V67 C615 84 564 37 449 62 C336 86 286 39 164 66 C90 83 46 69 0 55Z"/><path d="M0 372 H720 V430 L0 430Z"/></g>',
      '<g stroke="#c69b58" stroke-width="5" opacity=".6"><path d="M0 412 L720 412"/><path d="M64 430 L14 640"/><path d="M271 430 L236 640"/><path d="M449 430 L484 640"/><path d="M656 430 L706 640"/></g>',
      '<g transform="translate(94 96)">',
      '<path d="M0 0 H250 V265 H0Z" fill="#6e3f35"/>',
      '<path d="M17 18 H233 V247 H17Z" fill="#f2d49b"/>',
      '<path d="M39 56 C68 21 117 12 151 42 C177 65 192 95 208 134 L203 205 L39 207 L44 132 C42 101 39 78 39 56Z" fill="#4c8a7d"/>',
      '<path d="M74 138 C117 88 170 100 192 134 L181 188 L69 187Z" fill="#e65b45"/>',
      '<path d="M94 135 C103 118 125 113 139 124 C151 134 153 151 143 162 L94 166Z" fill="#a63831"/>',
      '<circle cx="136" cy="137" r="4" fill="#fff1c0"/><circle cx="132" cy="146" r="3" fill="#fff1c0"/>',
      '<path d="M105 171 C128 181 151 178 173 164" fill="none" stroke="#f5c45e" stroke-width="6" stroke-linecap="round"/>',
      '<path d="M48 219 H205" stroke="#c3934d" stroke-width="7" stroke-linecap="round"/>',
      '<path d="M0 0 L-24 17 L-24 278 L0 265" fill="#d4ac68"/><path d="M250 0 L274 17 L274 278 L250 265" fill="#d4ac68"/>',
      "</g>",
      '<g transform="translate(392 111)">',
      '<path d="M0 0 H235 V281 H0Z" fill="#6f746e"/>',
      '<path d="M14 14 H221 V267 H14Z" fill="url(#doorStone)"/>',
      '<path d="M54 267 V110 C54 55 88 25 118 25 C148 25 182 55 182 110 V267" fill="none" stroke="#c2b28f" stroke-width="9" opacity=".7"/>',
      '<path d="M117 33 L136 75 L117 118 L98 75Z" fill="#c7aa66" opacity=".65"/>',
      '<circle cx="74" cy="168" r="25" fill="none" stroke="#d0c09a" stroke-width="8" opacity=".6"/><path d="M74 143 V193 M49 168 H99" stroke="#d0c09a" stroke-width="8" opacity=".6"/>',
      '<circle cx="171" cy="173" r="15" fill="#b99c65"/><path d="M160 173 H182" stroke="#756c5a" stroke-width="4"/>',
      '<path d="M14 238 H221" stroke="#4e534e" stroke-width="4" opacity=".55"/>',
      '<path d="M-16 0 L0 0 L0 281 L-16 294Z" fill="#4f554f"/><path d="M235 0 L251 0 L251 294 L235 281Z" fill="#4f554f"/>',
      "</g>",
      '<g transform="translate(326 318)">',
      '<path d="M0 108 V49 H29 V29 H63 V50 H94 V108Z" fill="#d9c39e"/><path d="M18 73 H77 V107 H18Z" fill="#bd9f6e"/>',
      '<path d="M34 55 C38 35 52 30 65 38 C76 45 78 58 71 68 L39 69Z" fill="#5e9a85"/>',
      '<path d="M43 54 C48 42 58 42 64 50 L61 66 L43 66Z" fill="#e65b45"/>',
      "</g>",
      '<g transform="translate(88 519)">',
      '<ellipse cx="36" cy="81" rx="48" ry="9" fill="#7d6547" opacity=".18"/>',
      '<circle cx="29" cy="7" r="21" fill="#e9b887"/><path d="M9 3 C11 -13 27 -19 38 -12 C51 -4 50 10 44 17 C32 7 22 5 9 3Z" fill="#62422f"/>',
      '<path d="M10 26 C28 35 44 34 56 26 L63 65 C47 76 24 74 8 63Z" fill="#cfad5f"/>',
      '<path d="M20 63 L17 86 M50 63 L53 86" stroke="#4f6888" stroke-width="10" stroke-linecap="round"/>',
      '<circle cx="23" cy="9" r="2.8" fill="#3e332c"/><circle cx="38" cy="9" r="2.8" fill="#3e332c"/>',
      "</g>",
      '<g transform="translate(181 494)">',
      '<ellipse cx="35" cy="105" rx="54" ry="10" fill="#7d6547" opacity=".18"/>',
      '<circle cx="29" cy="1" r="18" fill="#efc08d"/><path d="M11 -2 C13 -16 27 -20 37 -13 C48 -6 46 7 40 11 C31 3 22 1 11 -2Z" fill="#74472f"/>',
      '<path d="M12 19 C28 27 43 25 53 17 L60 78 C44 91 22 89 7 77Z" fill="#7c9b94"/>',
      '<path d="M20 77 L18 105 M49 77 L51 105" stroke="#4f6888" stroke-width="10" stroke-linecap="round"/>',
      '<path d="M63 38 L83 54" stroke="#efc08d" stroke-width="9" stroke-linecap="round"/>',
      "</g>",
      '<g fill="#f4bd4f"><circle cx="369" cy="184" r="19"/><circle cx="369" cy="184" r="31" fill="none" stroke="#f4bd4f" stroke-width="3" opacity=".3"/><path d="M369 184 L394 166 L388 193Z" fill="#e65b45"/></g>',
      '<g fill="#f4bd4f"><circle cx="337" cy="187" r="14"/><path d="M331 198 L324 221 L340 211 L350 222 L345 194Z" fill="#f0a53d"/></g>',
      "</svg>"
    ].join("");
  }

  function artDragonChamber() {
    return [
      '<svg viewBox="0 0 720 640" preserveAspectRatio="xMidYMid slice" focusable="false">',
      "<defs>",
      '<linearGradient id="chamberBg" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#3e7770"/><stop offset="1" stop-color="#b8d6bc"/></linearGradient>',
      '<linearGradient id="chamberFloor" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#d7b678"/><stop offset="1" stop-color="#9f835c"/></linearGradient>',
      '<linearGradient id="redDragon" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#ff8b67"/><stop offset="1" stop-color="#c73f35"/></linearGradient>',
      '<radialGradient id="fireGlow"><stop offset="0" stop-color="#fff3a9" stop-opacity=".95"/><stop offset=".55" stop-color="#f7a63e" stop-opacity=".75"/><stop offset="1" stop-color="#e65b45" stop-opacity="0"/></radialGradient>',
      '<linearGradient id="doorFace" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#9e9787"/><stop offset="1" stop-color="#5e665f"/></linearGradient>',
      "</defs>",
      '<rect width="720" height="640" fill="url(#chamberBg)"/>',
      '<path d="M0 421 L720 421 L720 640 L0 640Z" fill="url(#chamberFloor)"/>',
      '<g fill="none" stroke="#f0dfb5" stroke-width="8" opacity=".25"><path d="M39 421 V179 C39 107 99 61 162 61 C226 61 285 107 285 179 V421"/><path d="M435 421 V179 C435 107 495 61 558 61 C622 61 681 107 681 179 V421"/></g>',
      '<g stroke="#d4b26f" stroke-width="3" opacity=".45"><path d="M60 451 L2 640"/><path d="M200 451 L158 640"/><path d="M324 451 L303 640"/><path d="M447 451 L471 640"/><path d="M629 451 L683 640"/></g>',
      '<g class="dragon-reveal">',
      '<g transform="translate(361 145)">',
      '<path d="M56 121 C-29 62 -64 -2 -30 -43 C14 1 59 57 89 111Z" fill="#f47a5d" opacity=".92"/>',
      '<path d="M119 108 C197 43 215 -26 177 -58 C139 -10 104 50 88 107Z" fill="#e96853" opacity=".9"/>',
      '<ellipse cx="77" cy="161" rx="77" ry="111" fill="url(#redDragon)"/>',
      '<ellipse cx="77" cy="179" rx="43" ry="67" fill="#f7c56e"/>',
      '<circle cx="77" cy="55" r="70" fill="#f27a5c"/>',
      '<path d="M23 13 C14 -18 30 -42 57 -56 C55 -25 63 -2 77 8" fill="#b83d31"/>',
      '<path d="M132 13 C142 -18 126 -42 99 -56 C101 -25 94 -2 80 8" fill="#b83d31"/>',
      '<ellipse cx="77" cy="53" rx="53" ry="43" fill="#f78968"/>',
      '<circle cx="57" cy="48" r="8" fill="#283b36"/><circle cx="98" cy="48" r="8" fill="#283b36"/>',
      '<circle cx="60" cy="45" r="2.6" fill="#fff"/><circle cx="101" cy="45" r="2.6" fill="#fff"/>',
      '<ellipse cx="77" cy="71" rx="28" ry="20" fill="#f6c86f"/>',
      '<circle cx="68" cy="68" r="3" fill="#7e3b2b"/><circle cx="86" cy="68" r="3" fill="#7e3b2b"/>',
      '<path d="M56 82 C69 91 86 90 98 81" fill="none" stroke="#9b3d31" stroke-width="4" stroke-linecap="round"/>',
      '<path d="M138 181 C198 166 220 196 207 230 C196 261 165 263 146 237" fill="none" stroke="#d54b3e" stroke-width="21" stroke-linecap="round"/>',
      '<path d="M20 184 C-25 204 -22 244 18 255" fill="none" stroke="#d54b3e" stroke-width="18" stroke-linecap="round"/>',
      "</g>",
      '<g class="dragon-fire">',
      '<circle cx="329" cy="338" r="94" fill="url(#fireGlow)"/>',
      '<path d="M348 294 C300 294 265 322 226 332 C259 342 278 355 303 357 C277 371 270 389 289 403 C310 382 326 380 344 365 C338 389 350 404 369 410 C371 382 384 369 391 348 C411 367 433 371 450 359 C422 343 407 327 385 318 C397 301 380 288 348 294Z" fill="#f7b642"/>',
      '<path d="M353 318 C323 321 300 338 273 346 C300 350 320 358 338 351 C324 369 337 380 354 377 C351 394 366 398 380 386 C386 366 397 356 401 341 C410 354 424 354 436 347 C411 338 397 327 381 327 C385 316 371 312 353 318Z" fill="#e65b45"/>',
      '<circle cx="330" cy="350" r="19" fill="#fff4b1"/><circle cx="302" cy="342" r="13" fill="#fff4b1"/><circle cx="373" cy="360" r="12" fill="#ffd675"/>',
      "</g>",
      '<g fill="#6f9e82" opacity=".8"><path d="M556 425 L586 338 L615 425Z"/><path d="M607 425 L642 365 L665 425Z"/><path d="M538 425 L560 384 L581 425Z"/></g>',
      '<g fill="#f4bd4f"><circle cx="560" cy="456" r="18"/><circle cx="596" cy="468" r="10"/><circle cx="524" cy="475" r="8"/><path d="M548 501 H602 V530 H548Z" fill="#c78d3d"/></g>',
      "</g>",
      '<g class="stone-door-panel">',
      '<path d="M143 640 V174 C143 67 228 8 340 8 C452 8 537 67 537 174 V640Z" fill="url(#doorFace)"/>',
      '<path d="M171 640 V180 C171 88 240 39 340 39 C440 39 509 88 509 180 V640Z" fill="none" stroke="#c0b18e" stroke-width="10" opacity=".55"/>',
      '<path d="M340 43 V640" stroke="#4b524d" stroke-width="8" opacity=".7"/>',
      '<g fill="none" stroke="#c7b98f" stroke-width="8" opacity=".55"><circle cx="340" cy="220" r="58"/><path d="M340 170 L387 244 L293 244Z"/><circle cx="340" cy="412" r="40"/><path d="M310 412 H370 M340 382 V442"/></g>',
      '<path d="M184 590 C252 566 421 566 496 590" fill="none" stroke="#7a705d" stroke-width="18" opacity=".42"/>',
      '<g fill="#d3c59f" opacity=".5"><circle cx="227" cy="285" r="12"/><circle cx="448" cy="302" r="10"/><circle cx="245" cy="474" r="9"/><circle cx="435" cy="501" r="12"/></g>',
      "</g>",
      '<g fill="#f4bd4f"><circle cx="81" cy="104" r="5"/><circle cx="645" cy="153" r="6"/><circle cx="619" cy="92" r="4"/></g>',
      "</svg>"
    ].join("");
  }

  function sceneArtMarkup(key) {
    if (key === "onion-field") return artOnionField();
    if (key === "castle-road") return artCastleRoad();
    if (key === "castle-hall") return artCastleHall();
    return artDragonChamber();
  }

  /* -----------------------------------------------------------------------
   *  Story pages, hotspots, and page navigation
   * --------------------------------------------------------------------- */

  function renderSceneTabs() {
    els.sceneTabs.innerHTML = DATA.scenes.map(function (scene, index) {
      return [
        '<button class="chapter-tab" type="button" role="tab"',
        ' data-scene-index="', index, '"',
        ' aria-selected="false">',
        '<span class="tab-num">', String(scene.number).padStart(2, "0"), "</span>",
        '<span class="tab-copy"><b>', bi(scene.placeEn, scene.placeZh), "</b>",
        "<small>", bi(scene.titleEn, scene.titleZh), "</small></span>",
        "</button>"
      ].join("");
    }).join("");

    els.pageDots.innerHTML = DATA.scenes.map(function (scene, index) {
      return '<button class="page-dot" type="button" data-page-index="' + index +
        '" aria-label="Go to page ' + (index + 1) + '"></button>';
    }).join("");
  }

  function renderHotspots(scene) {
    var canShow = function (hotspot) {
      return !hotspot.revealOnDoor || (scene.interaction === "door" && state.doorOpen);
    };

    var buttons = scene.hotspots.filter(canShow).map(function (hotspot) {
      var found = state.discovered[hotspot.id] ? " is-found" : "";
      return [
        '<button class="hotspot', found, '" type="button"',
        ' data-hotspot-id="', esc(hotspot.id), '"',
        ' style="left:', hotspot.x, "%;top:", hotspot.y, '%"',
        ' aria-label="', esc(hotspot.labelEn + " / " + hotspot.labelZh), '">',
        '<span aria-hidden="true">', esc(hotspot.icon), "</span>",
        '<span class="hotspot-label">', bi(hotspot.labelEn, hotspot.labelZh), "</span>",
        "</button>"
      ].join("");
    }).join("");

    var doorControl = "";
    if (scene.interaction === "door" && !state.doorOpen) {
      doorControl = '<button class="door-control" id="doorControl" type="button">' +
        bi("Open the stone door", "推开石门") +
        "</button>";
    }

    els.hotspotLayer.innerHTML = buttons + doorControl;
  }

  function updateDiscoveryCount() {
    var count = Object.keys(state.discovered).length;
    els.discoveryCount.textContent = count + " / " + totalHotspots;
  }

  function updateSceneChrome() {
    Array.prototype.forEach.call(els.sceneTabs.querySelectorAll("[data-scene-index]"), function (tab) {
      var active = Number(tab.getAttribute("data-scene-index")) === state.sceneIndex;
      tab.classList.toggle("active", active);
      tab.setAttribute("aria-selected", active ? "true" : "false");
      tab.tabIndex = active ? 0 : -1;
    });

    Array.prototype.forEach.call(els.pageDots.querySelectorAll("[data-page-index]"), function (dot) {
      var active = Number(dot.getAttribute("data-page-index")) === state.sceneIndex;
      dot.classList.toggle("active", active);
      dot.setAttribute("aria-current", active ? "page" : "false");
    });
  }

  function showScene(index, animate) {
    index = Math.max(0, Math.min(DATA.scenes.length - 1, Number(index) || 0));
    state.sceneIndex = index;
    state.activeHotspot = null;
    els.hotspotNote.hidden = true;
    if (window.Mario) window.Mario.stop();

    var scene = DATA.scenes[index];
    var isDoorScene = scene.interaction === "door";
    var doorOpen = isDoorScene && state.doorOpen;

    els.sceneArt.innerHTML = sceneArtMarkup(scene.artKey);
    els.sceneArt.classList.toggle("door-open", doorOpen);
    textPage.classList.toggle("door-open", doorOpen);

    els.pageCounter.innerHTML = bi(
      "PAGE " + (index + 1) + " / " + DATA.scenes.length,
      "第 " + (index + 1) + " / " + DATA.scenes.length + " 页"
    );
    els.pagePlace.innerHTML = bi(scene.placeEn.toUpperCase(), scene.placeZh);
    els.pageTitle.innerHTML = bi(scene.titleEn, scene.titleZh);
    els.pageNarrationEn.innerHTML = paragraphs(scene.textEn, isDoorScene ? 1 : -1);
    els.pageNarrationZh.innerHTML = paragraphs(scene.textZh, isDoorScene ? 1 : -1);

    els.pageClues.innerHTML = scene.clues.map(function (clue) {
      return '<span class="page-clue">' + bi(clue.en, clue.zh) + "</span>";
    }).join("");

    els.prevPage.disabled = index === 0;
    els.nextPage.disabled = index === DATA.scenes.length - 1;
    renderHotspots(scene);
    updateSceneChrome();
    updateDiscoveryCount();

    if (animate) {
      els.bookSpread.classList.remove("is-turning");
      void els.bookSpread.offsetWidth;
      els.bookSpread.classList.add("is-turning");
      setTimeout(function () { els.bookSpread.classList.remove("is-turning"); }, 380);
    }
  }

  function openStoneDoor() {
    var scene = DATA.scenes[state.sceneIndex];
    if (!scene || scene.interaction !== "door" || state.doorOpen) return;

    state.doorOpen = true;
    els.sceneArt.classList.add("door-open");
    textPage.classList.add("door-open");
    if (window.Mario) window.Mario.beep("correct");

    var control = document.getElementById("doorControl");
    if (control) {
      control.disabled = true;
      control.innerHTML = bi("The door is opening...", "石门正在打开……");
    }

    setTimeout(function () {
      if (state.sceneIndex !== DATA.scenes.length - 1) return;
      renderHotspots(scene);
      var firstReveal = els.hotspotLayer.querySelector(".hotspot");
      if (firstReveal) firstReveal.focus({ preventScroll: true });
    }, 720);
  }

  function showHotspot(id) {
    var hotspot = hotspotById(id);
    if (!hotspot) return;
    var entry = archiveById(hotspot.archiveId);
    if (!entry) return;

    var isNew = !state.discovered[id];
    state.discovered[id] = true;
    state.activeHotspot = id;

    var marker = els.hotspotLayer.querySelector('[data-hotspot-id="' + id + '"]');
    if (marker) marker.classList.add("is-found");

    var meta = typeMeta(entry.type);
    els.hotspotType.innerHTML = bi("STORY DOSSIER · " + meta.en, "故事档案 · " + meta.zh);
    els.hotspotTitle.innerHTML = bi(entry.nameEn, entry.nameZh);
    els.hotspotText.innerHTML = bi(entry.summaryEn, entry.summaryZh);
    els.hotspotDossier.setAttribute("data-archive-id", entry.id);
    els.hotspotNote.hidden = false;
    updateDiscoveryCount();

    if (isNew && window.Mario) window.Mario.beep("correct");
    if (isNew && Object.keys(state.discovered).length === totalHotspots && window.Mario) {
      window.Mario.confetti(34);
    }
  }

  els.sceneTabs.addEventListener("click", function (event) {
    var tab = event.target.closest("[data-scene-index]");
    if (tab) showScene(Number(tab.getAttribute("data-scene-index")), true);
  });

  els.pageDots.addEventListener("click", function (event) {
    var dot = event.target.closest("[data-page-index]");
    if (dot) showScene(Number(dot.getAttribute("data-page-index")), true);
  });

  els.prevPage.addEventListener("click", function () {
    showScene(state.sceneIndex - 1, true);
  });

  els.nextPage.addEventListener("click", function () {
    showScene(state.sceneIndex + 1, true);
  });

  els.hotspotLayer.addEventListener("click", function (event) {
    var hotspot = event.target.closest("[data-hotspot-id]");
    if (hotspot) {
      showHotspot(hotspot.getAttribute("data-hotspot-id"));
      return;
    }
    if (event.target.closest("#doorControl")) openStoneDoor();
  });

  els.hotspotClose.addEventListener("click", function () {
    els.hotspotNote.hidden = true;
    state.activeHotspot = null;
  });

  els.hotspotDossier.addEventListener("click", function () {
    var id = els.hotspotDossier.getAttribute("data-archive-id");
    if (id) openDossier(id);
  });

  /* -----------------------------------------------------------------------
   *  Archive cards and dossiers
   * --------------------------------------------------------------------- */

  function filterChip(filter, active, labelEn, labelZh, count) {
    return [
      '<button class="filter-chip', active ? " active" : "", '" type="button"',
      ' data-filter-value="', esc(filter), '">',
      bi(labelEn, labelZh),
      count == null ? "" : '<span class="filter-count">' + esc(count) + "</span>",
      "</button>"
    ].join("");
  }

  function archiveCounts() {
    var counts = { all: DATA.archive.length, person: 0, dragon: 0, place: 0, clue: 0 };
    DATA.archive.forEach(function (entry) {
      counts[entry.type] = (counts[entry.type] || 0) + 1;
    });
    return counts;
  }

  function renderArchiveFilters() {
    var counts = archiveCounts();
    els.archiveFilters.innerHTML = filterChip("all", state.archiveFilter === "all", "All", "全部", counts.all) +
      filterChip("person", state.archiveFilter === "person", "People", "人物", counts.person) +
      filterChip("dragon", state.archiveFilter === "dragon", "Dragons", "龙族", counts.dragon) +
      filterChip("place", state.archiveFilter === "place", "Places", "地点", counts.place) +
      filterChip("clue", state.archiveFilter === "clue", "Story clues", "故事线索", counts.clue);
  }

  function renderArchive() {
    renderArchiveFilters();
    els.archiveGrid.innerHTML = DATA.archive.map(function (entry) {
      var meta = typeMeta(entry.type);
      var status = entry.locked
        ? bi("LOCKED", "未解锁")
        : bi(meta.labelEn, meta.labelZh);
      return [
        '<button class="archive-card', entry.locked ? " locked" : "", '" type="button"',
        ' data-archive-id="', esc(entry.id), '" data-type="', esc(entry.type), '"',
        ' style="--type:', meta.color, ";--type-soft:", meta.soft, '">',
        '<span class="archive-icon" aria-hidden="true">', esc(entry.emoji), "</span>",
        '<span class="archive-copy"><span class="archive-type">', status, "</span>",
        "<h3>", bi(entry.nameEn, entry.nameZh), "</h3>",
        "<p>", bi(entry.roleEn, entry.roleZh), "</p></span>",
        '<span class="archive-open">', entry.locked ? "🔒" : "OPEN →", "</span>",
        "</button>"
      ].join("");
    }).join("");
    applyArchiveFilter();
  }

  function applyArchiveFilter() {
    Array.prototype.forEach.call(els.archiveGrid.querySelectorAll(".archive-card"), function (card) {
      var type = card.getAttribute("data-type");
      var hidden = state.archiveFilter !== "all" && type !== state.archiveFilter;
      card.classList.toggle("is-hidden", hidden);
    });
  }

  function dossierFacts(entry) {
    return entry.factsEn.map(function (fact, index) {
      return "<li>" + bi(fact, entry.factsZh[index] || "") + "</li>";
    }).join("");
  }

  function connectionsMarkup(entry) {
    if (!entry.connections.length) {
      return '<p class="dossier-summary">' +
        bi(
          "No Chapter 1 links are confirmed for this future dossier yet.",
          "这份未来档案目前还没有第一章中确认的关系。"
        ) +
        "</p>";
    }

    return '<div class="dossier-links">' + entry.connections.map(function (id) {
      var link = archiveById(id);
      if (!link) return "";
      return '<button class="dossier-link" type="button" data-doc-link="' + esc(id) + '">' +
        esc(link.emoji) + " " + bi(link.nameEn, link.nameZh) +
        "</button>";
    }).join("") + "</div>";
  }

  function renderDossier(entry) {
    var meta = typeMeta(entry.type);
    var sceneIndex = sceneIndexById(entry.firstSceneId);
    var actions = [];
    if (sceneIndex >= 0) {
      actions.push(
        '<button class="dossier-action primary" type="button" data-doc-scene="' +
        esc(entry.firstSceneId) + '">' +
        bi("Go to the first story page", "回到首次出现的绘本页") +
        "</button>"
      );
    }
    actions.push(
      '<button class="dossier-action" type="button" data-tts="',
      esc(entry.factsEn.join(" ")),
      '" data-tts-lang="en-US">🔊 ',
      bi("Hear English facts", "听英文事实"),
      "</button>"
    );
    actions.push(
      '<button class="dossier-action" type="button" data-tts="',
      esc(entry.factsZh.join(" ")),
      '" data-tts-lang="zh-CN">🔊 ',
      bi("Hear Chinese facts", "听中文事实"),
      "</button>"
    );

    els.dossierBody.setAttribute("style", "--type:" + meta.color + ";--type-soft:" + meta.soft);
    els.dossierBody.innerHTML = [
      '<div class="dossier-head">',
      '<div class="dossier-portrait" aria-hidden="true">', esc(entry.emoji), "</div>",
      '<div><span class="dossier-kicker">', bi(meta.labelEn.toUpperCase(), meta.labelZh), "</span>",
      '<h2 id="dossierName">', bi(entry.nameEn, entry.nameZh), "</h2>",
      '<p class="dossier-role">', bi(entry.roleEn, entry.roleZh), "</p>",
      '<span class="dossier-status">', bi(entry.statusEn, entry.statusZh), "</span></div>",
      "</div>",
      '<p class="dossier-summary">', bi(entry.summaryEn, entry.summaryZh), "</p>",
      '<h3 class="dossier-section-title">', bi("What Chapter 1 tells us", "第一章告诉我们"), "</h3>",
      '<ul class="dossier-facts">', dossierFacts(entry), "</ul>",
      '<h3 class="dossier-section-title">', bi("Story connections", "故事关系"), "</h3>",
      connectionsMarkup(entry),
      '<div class="dossier-actions">', actions.join(""), "</div>"
    ].join("");
  }

  function openDossier(id) {
    var entry = archiveById(id);
    if (!entry) return;
    state.dossierId = id;
    renderDossier(entry);
    if (window.Mario) window.Mario.init(els.dossierDialog);
    if (typeof els.dossierDialog.showModal === "function") {
      if (!els.dossierDialog.open) els.dossierDialog.showModal();
    } else {
      els.dossierDialog.setAttribute("open", "");
    }
    var shell = els.dossierDialog.querySelector(".dossier-shell");
    if (shell) shell.scrollTop = 0;
    setTimeout(function () { els.dossierClose.focus(); }, 30);
  }

  function closeDossier() {
    if (typeof els.dossierDialog.close === "function" && els.dossierDialog.open) {
      els.dossierDialog.close();
    } else {
      els.dossierDialog.removeAttribute("open");
    }
  }

  els.archiveFilters.addEventListener("click", function (event) {
    var button = event.target.closest("[data-filter-value]");
    if (!button) return;
    state.archiveFilter = button.getAttribute("data-filter-value");
    renderArchiveFilters();
    applyArchiveFilter();
    if (window.Mario) window.Mario.beep("correct");
  });

  els.archiveGrid.addEventListener("click", function (event) {
    var card = event.target.closest("[data-archive-id]");
    if (card) openDossier(card.getAttribute("data-archive-id"));
  });

  els.dossierBody.addEventListener("click", function (event) {
    var related = event.target.closest("[data-doc-link]");
    if (related) {
      openDossier(related.getAttribute("data-doc-link"));
      return;
    }

    var scene = event.target.closest("[data-doc-scene]");
    if (scene) {
      var index = sceneIndexById(scene.getAttribute("data-doc-scene"));
      closeDossier();
      if (index >= 0) {
        showScene(index, true);
        document.getElementById("storybook").scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  });

  els.dossierClose.addEventListener("click", closeDossier);
  els.dossierDialog.addEventListener("click", function (event) {
    if (event.target === els.dossierDialog) closeDossier();
  });

  /* -----------------------------------------------------------------------
   *  Interactive knowledge graph
   * --------------------------------------------------------------------- */

  function renderGraphFilters() {
    els.graphFilters.innerHTML = filterChip("all", state.graphFilter === "all", "All", "全部") +
      filterChip("person", state.graphFilter === "person", "People", "人物") +
      filterChip("dragon", state.graphFilter === "dragon", "Dragons", "龙族") +
      filterChip("place", state.graphFilter === "place", "Places", "地点") +
      filterChip("clue", state.graphFilter === "clue", "Clues", "线索");
  }

  function renderGraph() {
    var parts = [];
    parts.push(
      '<g class="graph-edge-layer">',
      DATA.graph.edges.map(function (edge, index) {
        var from = nodeById(edge.from);
        var to = nodeById(edge.to);
        if (!from || !to) return "";
        var mx = (from.x + to.x) / 2;
        var my = (from.y + to.y) / 2 - 4;
        return [
          '<line class="graph-edge" data-edge-index="', index, '" x1="', from.x, '" y1="', from.y,
          '" x2="', to.x, '" y2="', to.y, '"/>',
          '<text class="graph-edge-label graph-edge-label-en" data-edge-label="', index,
          '" x="', mx, '" y="', my, '" text-anchor="middle">', esc(edge.labelEn), "</text>",
          '<text class="graph-edge-label graph-edge-label-zh" data-edge-label="', index,
          '" x="', mx, '" y="', my + 13, '" text-anchor="middle">', esc(edge.labelZh), "</text>"
        ].join("");
      }).join(""),
      "</g>",
      '<g class="graph-node-layer">'
    );

    DATA.graph.nodes.forEach(function (node) {
      var entry = archiveById(node.id);
      if (!entry) return;
      var lockedClass = node.locked ? " node-locked" : "";
      parts.push(
        '<g class="graph-node node-', esc(entry.type), lockedClass, '"',
        ' data-graph-node="', esc(node.id), '" role="button" tabindex="0"',
        ' aria-label="', esc(entry.nameEn + " / " + entry.nameZh), '">',
        '<circle class="node-shape" cx="', node.x, '" cy="', node.y, '" r="', node.r, '"/>',
        '<text class="node-icon" x="', node.x, '" y="', node.y + 7,
        '" text-anchor="middle" aria-hidden="true">', esc(entry.emoji), "</text>",
        node.locked ? '<text class="node-lock" x="' + node.x + '" y="' + (node.y - node.r + 4) +
          '" text-anchor="middle" aria-hidden="true">🔒</text>' : "",
        '<text class="node-label node-label-en" x="', node.x, '" y="', node.y + node.r + 18,
        '" text-anchor="middle">', esc(entry.nameEn), "</text>",
        '<text class="node-label node-label-zh" x="', node.x, '" y="', node.y + node.r + 31,
        '" text-anchor="middle">', esc(entry.nameZh), "</text>",
        "</g>"
      );
    });

    parts.push("</g>");
    els.knowledgeSvg.innerHTML = parts.join("");
    renderGraphFilters();
    applyGraphState();
  }

  function neighborIds(id) {
    var neighbors = {};
    DATA.graph.edges.forEach(function (edge) {
      if (edge.from === id) neighbors[edge.to] = true;
      if (edge.to === id) neighbors[edge.from] = true;
    });
    return neighbors;
  }

  function traceActive() {
    return Object.keys(state.traceNodes).length > 0;
  }

  function applyGraphState() {
    var selected = state.selectedNode;
    var neighbors = selected ? neighborIds(selected) : {};
    var tracing = traceActive();

    Array.prototype.forEach.call(els.knowledgeSvg.querySelectorAll("[data-graph-node]"), function (nodeEl) {
      var id = nodeEl.getAttribute("data-graph-node");
      var entry = archiveById(id);
      var dimmed = false;

      if (state.graphFilter !== "all" && entry && entry.type !== state.graphFilter) dimmed = true;
      if (selected && id !== selected && !neighbors[id]) dimmed = true;
      if (tracing && !state.traceNodes[id]) dimmed = true;

      nodeEl.classList.toggle("is-selected", id === selected);
      nodeEl.classList.toggle("is-neighbor", Boolean(neighbors[id]));
      nodeEl.classList.toggle("is-dimmed", dimmed);
    });

    Array.prototype.forEach.call(els.knowledgeSvg.querySelectorAll("[data-edge-index]"), function (edgeEl) {
      var index = Number(edgeEl.getAttribute("data-edge-index"));
      var edge = DATA.graph.edges[index];
      var active = false;

      if (selected && edge && (edge.from === selected || edge.to === selected)) active = true;
      if (tracing && edge && state.traceEdges[edgeKey(edge.from, edge.to)]) active = true;
      edgeEl.classList.toggle("is-active", active);
    });
  }

  function renderGraphInspector(id) {
    var entry = archiveById(id);
    if (!entry) {
      els.graphInspector.innerHTML =
        '<span class="inspector-icon">🗺️</span>' +
        "<h3>" + bi("Pick a node", "选择一个节点") + "</h3>" +
        "<p>" + bi(
          "Tap any person, dragon, place, or clue to see its connections here.",
          "点击人物、龙、地点或线索，在这里查看它的关系。"
        ) + "</p>";
      return;
    }

    var meta = typeMeta(entry.type);
    var links = entry.connections.map(function (linkId) {
      var link = archiveById(linkId);
      if (!link) return "";
      return '<button class="dossier-link" type="button" data-graph-select="' + esc(linkId) + '">' +
        esc(link.emoji) + " " + bi(link.nameEn, link.nameZh) + "</button>";
    }).join("");

    els.graphInspector.innerHTML = [
      '<span class="inspector-icon" aria-hidden="true">', esc(entry.emoji), "</span>",
      "<h3>", bi(entry.nameEn, entry.nameZh), "</h3>",
      '<span class="inspector-type">', bi(meta.labelEn.toUpperCase(), meta.labelZh), "</span>",
      "<p>", bi(entry.summaryEn, entry.summaryZh), "</p>",
      links ? '<div class="inspector-links">' + links + "</div>" : "",
      '<button class="dossier-action primary" type="button" data-graph-dossier="',
      esc(entry.id), '">', bi("Open full dossier", "打开完整档案"), "</button>"
    ].join("");
  }

  function selectGraphNode(id, scrollInspector) {
    if (!archiveById(id)) return;
    clearTrace();
    state.selectedNode = id;
    renderGraphInspector(id);
    applyGraphState();
    if (scrollInspector && window.innerWidth < 1021) {
      els.graphInspector.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }
  }

  function clearTrace() {
    state.traceTimers.forEach(function (timer) { clearTimeout(timer); });
    state.traceTimers = [];
    state.traceNodes = {};
    state.traceEdges = {};
    Array.prototype.forEach.call(els.knowledgeSvg.querySelectorAll(".is-tracing"), function (node) {
      node.classList.remove("is-tracing");
    });
    els.tracePathBtn.classList.remove("is-active");
    els.tracePathBtn.setAttribute("aria-pressed", "false");
  }

  function beginTrace() {
    clearTrace();
    state.selectedNode = "";
    state.graphFilter = "all";
    renderGraphFilters();
    applyGraphState();

    var path = DATA.graph.tracePath;
    els.tracePathBtn.classList.add("is-active");
    els.tracePathBtn.setAttribute("aria-pressed", "true");
    els.graphInspector.innerHTML =
      '<span class="inspector-icon">✦</span>' +
      "<h3>" + bi("Drake's path is lighting up", "德雷克的路线正在亮起") + "</h3>" +
      "<p>" + bi("Watch the connections from the onion field to the fireball.", "沿着从洋葱田到火球的关系看下去。") + "</p>";

    path.forEach(function (id, index) {
      var timer = setTimeout(function () {
        state.traceNodes[id] = true;
        if (index > 0) state.traceEdges[edgeKey(path[index - 1], id)] = true;
        applyGraphState();

        Array.prototype.forEach.call(els.knowledgeSvg.querySelectorAll(".is-tracing"), function (node) {
          node.classList.remove("is-tracing");
        });
        var nodeEl = els.knowledgeSvg.querySelector('[data-graph-node="' + id + '"]');
        if (nodeEl) nodeEl.classList.add("is-tracing");

        var entry = archiveById(id);
        if (entry) {
          els.graphInspector.innerHTML =
            '<span class="inspector-icon">' + esc(entry.emoji) + "</span>" +
            "<h3>" + bi(entry.nameEn, entry.nameZh) + "</h3>" +
            '<p class="inspector-trace-step">' +
            bi("Path step " + (index + 1) + " of " + path.length, "路线第 " + (index + 1) + " / " + path.length + " 站") +
            "</p><p>" + bi(entry.summaryEn, entry.summaryZh) + "</p>";
        }

        if (index === path.length - 1) {
          var endTimer = setTimeout(function () {
            Array.prototype.forEach.call(els.knowledgeSvg.querySelectorAll(".is-tracing"), function (node) {
              node.classList.remove("is-tracing");
            });
            els.tracePathBtn.setAttribute("aria-pressed", "false");
          }, 1400);
          state.traceTimers.push(endTimer);
        }
      }, index * 430);
      state.traceTimers.push(timer);
    });
  }

  els.graphFilters.addEventListener("click", function (event) {
    var button = event.target.closest("[data-filter-value]");
    if (!button) return;
    clearTrace();
    state.graphFilter = button.getAttribute("data-filter-value");
    state.selectedNode = "";
    renderGraphFilters();
    renderGraphInspector("");
    applyGraphState();
  });

  els.knowledgeSvg.addEventListener("click", function (event) {
    var node = event.target.closest("[data-graph-node]");
    if (node) selectGraphNode(node.getAttribute("data-graph-node"), true);
  });

  els.knowledgeSvg.addEventListener("keydown", function (event) {
    if (event.key !== "Enter" && event.key !== " ") return;
    var node = event.target.closest("[data-graph-node]");
    if (!node) return;
    event.preventDefault();
    selectGraphNode(node.getAttribute("data-graph-node"), true);
  });

  els.graphInspector.addEventListener("click", function (event) {
    var related = event.target.closest("[data-graph-select]");
    if (related) {
      selectGraphNode(related.getAttribute("data-graph-select"), false);
      return;
    }
    var dossier = event.target.closest("[data-graph-dossier]");
    if (dossier) openDossier(dossier.getAttribute("data-graph-dossier"));
  });

  els.tracePathBtn.addEventListener("click", beginTrace);

  /* -----------------------------------------------------------------------
   *  Story playground
   * --------------------------------------------------------------------- */

  function sequenceById(id) {
    return DATA.sequence.items.filter(function (item) { return item.id === id; })[0];
  }

  function renderSequence() {
    els.sequenceBoard.innerHTML = DATA.sequence.order.map(function (id, index) {
      var item = sequenceById(id);
      if (!item) return "";
      return [
        '<button class="path-card" type="button" data-sequence-step="', item.step, '">',
        '<span class="path-check" aria-hidden="true">✓</span>',
        '<span class="path-number">CLUE ', String.fromCharCode(65 + index), "</span>",
        '<span class="path-emoji" aria-hidden="true">', esc(item.emoji), "</span>",
        '<span class="path-text">', bi(item.textEn, item.textZh), "</span>",
        "</button>"
      ].join("");
    }).join("");
  }

  function setSequenceFeedback(kind, en, zh) {
    els.sequenceFeedback.className = "lab-feedback" + (kind ? " " + kind : "");
    els.sequenceFeedback.innerHTML = bi(en, zh);
  }

  function finishSequence() {
    els.sequenceFeedback.className = "lab-feedback success";
    els.sequenceFeedback.innerHTML =
      "<strong>" + bi("Trail complete!", "路线完成！") + "</strong>" +
      "<p>" + bi(
        "Every event is back in story order.",
        "所有事件都回到正确的故事顺序了。"
      ) + "</p>" +
      '<button class="reset-quiz" type="button" data-reset-trail="1">' +
      bi("Play again", "再玩一次") + "</button>";
    if (window.Mario) window.Mario.confetti(34);
  }

  function resetSequence() {
    state.sequenceNext = 0;
    state.sequenceDone = 0;
    els.sequenceScore.textContent = "0";
    renderSequence();
    setSequenceFeedback("", "Start with what happened first.", "先找一找：故事最早发生了什么？");
  }

  function renderVocabulary() {
    els.vocabGrid.innerHTML = DATA.vocabulary.map(function (word, index) {
      return [
        '<button class="word-card" type="button" data-word-index="', index, '" data-word-mode="word">',
        '<span class="word-top"><span class="word-emoji" aria-hidden="true">', esc(word.emoji), "</span>",
        '<span class="word-name">', esc(word.word), "</span>",
        '<span class="word-ipa">', esc(word.ipa), "</span></span>",
        '<span class="word-meaning">', bi(word.meaningEn, word.meaningZh), "</span>",
        '<span class="word-context">', bi(word.contextEn, word.contextZh), "</span>",
        '<span class="word-tip">', bi("Tap again for the example sentence", "再点一次听例句"), "</span>",
        "</button>"
      ].join("");
    }).join("");
  }

  function renderLifeMissions() {
    els.lifeMissions.innerHTML = DATA.lifeMissions.map(function (mission, missionIndex) {
      var choices = mission.choices.map(function (choice, choiceIndex) {
        return '<button class="life-option" type="button" data-mission="' + missionIndex +
          '" data-choice="' + choiceIndex + '">' + bi(choice.en, choice.zh) + "</button>";
      }).join("");

      return [
        '<article class="life-card" data-life-card="', missionIndex, '">',
        '<div class="life-head"><span aria-hidden="true">', esc(mission.emoji), "</span>",
        "<h3>", bi(mission.titleEn, mission.titleZh), "</h3></div>",
        '<p class="life-prompt">', bi(mission.promptEn, mission.promptZh), "</p>",
        '<div class="life-options">', choices, "</div>",
        '<p class="life-feedback" hidden></p>',
        "</article>"
      ].join("");
    }).join("");
  }

  function quizResultCopy(score, total) {
    if (score === total) {
      return {
        en: "Dragon Master in training! You caught every story clue.",
        zh: "驯龙师见习生满分！你抓住了故事里的每一条线索。"
      };
    }
    if (score >= total - 1) {
      return {
        en: "Strong work! One more look at the chapter will make your trail perfect.",
        zh: "很棒！再回看一次章节，你的路线就完美啦。"
      };
    }
    if (score >= Math.ceil(total / 2)) {
      return {
        en: "Good start. Revisit the stone door page, then try again if you like.",
        zh: "不错的开始。回看石门那一页，想再玩时就来试试。"
      };
    }
    return {
      en: "Keep exploring. This is only a game, so read the story page and try again whenever you like.",
      zh: "继续探索吧。这只是游戏，可以随时回到故事页，再玩一次。"
    };
  }

  function renderQuiz() {
    state.quizAnswered = 0;
    state.quizScore = 0;
    els.quizScore.textContent = "0";
    els.quizComplete.hidden = true;
    els.quizComplete.innerHTML = "";
    els.resetQuiz.innerHTML = bi("Play again", "再玩一次");
    els.resetQuiz.hidden = true;

    els.quizBoard.innerHTML = DATA.quiz.map(function (question, qIndex) {
      var options = question.options.map(function (option, oIndex) {
        return [
          '<button class="quiz-option" type="button" data-q="', qIndex, '" data-o="', oIndex, '">',
          '<span class="option-letter">', String.fromCharCode(65 + oIndex), "</span>",
          "<span>", bi(option.en, option.zh), "</span></button>"
        ].join("");
      }).join("");

      return [
        '<article class="quiz-card" data-quiz-card="', qIndex, '">',
        '<p class="quiz-question">', bi(question.questionEn, question.questionZh), "</p>",
        '<div class="quiz-options">', options, "</div>",
        '<div class="quiz-explanation" hidden>',
        bi(question.explanationEn, question.explanationZh),
        "</div></article>"
      ].join("");
    }).join("");
  }

  els.sequenceBoard.addEventListener("click", function (event) {
    var card = event.target.closest(".path-card");
    if (!card || card.classList.contains("is-done")) return;

    var step = Number(card.getAttribute("data-sequence-step"));
    if (step !== state.sequenceNext + 1) {
      card.classList.remove("is-wrong");
      void card.offsetWidth;
      card.classList.add("is-wrong");
      setTimeout(function () { card.classList.remove("is-wrong"); }, 420);
      setSequenceFeedback(
        "retry",
        "Not yet. Find the earliest event that is still missing.",
        "还不是这一步。找找看，最早发生、但还没点亮的是哪件事？"
      );
      if (window.Mario) window.Mario.beep("wrong");
      return;
    }

    card.classList.add("is-done");
    state.sequenceNext += 1;
    state.sequenceDone += 1;
    els.sequenceScore.textContent = String(state.sequenceDone);
    setSequenceFeedback(
      "success",
      "The path glows. That is the right next step!",
      "路线亮起来了！这一步接对了。"
    );
    if (window.Mario) window.Mario.beep("correct");

    if (state.sequenceNext === DATA.sequence.items.length) finishSequence();
  });

  els.sequenceFeedback.addEventListener("click", function (event) {
    if (event.target.closest("[data-reset-trail]")) resetSequence();
  });

  els.vocabGrid.addEventListener("click", function (event) {
    var card = event.target.closest(".word-card");
    if (!card) return;
    if (card.classList.contains("is-speaking")) {
      if (window.Mario) window.Mario.stop();
      return;
    }

    var word = DATA.vocabulary[Number(card.getAttribute("data-word-index"))];
    var mode = card.getAttribute("data-word-mode");
    if (!word || !window.Mario) return;

    var text = mode === "sentence" ? word.contextEn : word.word;
    card.setAttribute("data-word-mode", mode === "sentence" ? "word" : "sentence");
    window.Mario.speak(text, {
      lang: "en-US",
      rate: mode === "sentence" ? 0.78 : 0.7,
      button: card
    });
  });

  els.lifeMissions.addEventListener("click", function (event) {
    var option = event.target.closest(".life-option");
    if (!option) return;

    var missionIndex = Number(option.getAttribute("data-mission"));
    var choiceIndex = Number(option.getAttribute("data-choice"));
    var card = els.lifeMissions.querySelector('[data-life-card="' + missionIndex + '"]');
    var mission = DATA.lifeMissions[missionIndex];
    if (!card || !mission || card.getAttribute("data-answered") === "1") return;

    var correct = choiceIndex === mission.answer;
    card.setAttribute("data-answered", "1");
    card.querySelectorAll(".life-option").forEach(function (button) {
      button.disabled = true;
      if (Number(button.getAttribute("data-choice")) === mission.answer) {
        button.classList.add("is-correct");
      }
    });
    if (!correct) option.classList.add("is-wrong");

    var feedback = card.querySelector(".life-feedback");
    feedback.hidden = false;
    feedback.innerHTML = bi(mission.explanationEn, mission.explanationZh);
    if (window.Mario) {
      window.Mario.beep(correct ? "correct" : "wrong");
      if (correct) window.Mario.confetti(18);
    }
  });

  els.quizBoard.addEventListener("click", function (event) {
    var option = event.target.closest(".quiz-option");
    if (!option) return;

    var qIndex = Number(option.getAttribute("data-q"));
    var oIndex = Number(option.getAttribute("data-o"));
    var card = els.quizBoard.querySelector('[data-quiz-card="' + qIndex + '"]');
    if (!card || card.getAttribute("data-answered") === "1") return;

    var question = DATA.quiz[qIndex];
    var correct = oIndex === question.answer;
    card.setAttribute("data-answered", "1");
    card.classList.add("is-answered");

    card.querySelectorAll(".quiz-option").forEach(function (button) {
      button.disabled = true;
      if (Number(button.getAttribute("data-o")) === question.answer) {
        button.classList.add("is-correct");
      }
    });
    if (!correct) option.classList.add("is-wrong");

    var explanation = card.querySelector(".quiz-explanation");
    if (explanation) explanation.hidden = false;

    state.quizAnswered += 1;
    if (correct) state.quizScore += 1;
    els.quizScore.textContent = String(state.quizScore);
    if (window.Mario) window.Mario.beep(correct ? "correct" : "wrong");

    if (state.quizAnswered === DATA.quiz.length) {
      var copy = quizResultCopy(state.quizScore, DATA.quiz.length);
      els.quizComplete.innerHTML =
        "<strong>" + esc(state.quizScore) + " / " + DATA.quiz.length + " · " +
        bi(
          state.quizScore === DATA.quiz.length ? "Perfect trail" : "Trail complete",
          state.quizScore === DATA.quiz.length ? "完美通关" : "完成挑战"
        ) +
        "</strong><p>" + bi(copy.en, copy.zh) + "</p>";
      els.quizComplete.hidden = false;
      els.resetQuiz.hidden = false;
      if (window.Mario) {
        window.Mario.confetti();
        window.Mario.reportQuiz(
          "dragon-masters-01-01",
          "Dragon Masters #1 · Chapter 1",
          "🐉",
          state.quizScore,
          DATA.quiz.length
        );
      }
    }
  });

  els.resetQuiz.addEventListener("click", renderQuiz);

  els.labTabs.addEventListener("click", function (event) {
    var tab = event.target.closest("[data-lab-tab]");
    if (!tab) return;
    var name = tab.getAttribute("data-lab-tab");

    Array.prototype.forEach.call(els.labTabs.querySelectorAll("[data-lab-tab]"), function (button) {
      var active = button === tab;
      button.classList.toggle("active", active);
      button.setAttribute("aria-selected", active ? "true" : "false");
    });

    Array.prototype.forEach.call(document.querySelectorAll("[data-lab-panel]"), function (panel) {
      var active = panel.getAttribute("data-lab-panel") === name;
      panel.classList.toggle("active", active);
      panel.hidden = !active;
    });
    if (window.Mario) window.Mario.beep("correct");
  });

  /* -----------------------------------------------------------------------
   *  Language, dragon speech, progress, and boot
   * --------------------------------------------------------------------- */

  function voiceMessage(lang) {
    if (!window.Mario || !window.Mario.supported) {
      return {
        en: "This browser cannot speak yet. A grown-up can read the story with you.",
        zh: "这个浏览器暂时不能朗读，可以请大人陪你一起读。"
      };
    }
    if (lang === "zh") {
      return {
        en: "Uses the native Chinese voice on this device.",
        zh: "使用设备自带的中文语音朗读，无需下载。"
      };
    }
    if (lang === "both") {
      return {
        en: "Each listen button chooses the matching native language voice.",
        zh: "每个朗读按钮会自动使用对应的本机语言语音。"
      };
    }
    return {
      en: "Uses the native English voice on this device. No download needed.",
      zh: "使用设备自带的英文语音朗读，无需下载。"
    };
  }

  function updateVoiceNote() {
    var message = voiceMessage(state.lang);
    if (state.lang === "zh") {
      els.voiceNote.textContent = message.zh;
    } else if (state.lang === "both") {
      els.voiceNote.textContent = message.en + " · " + message.zh;
    } else {
      els.voiceNote.textContent = message.en;
    }
    els.voiceDot.className = "voice-dot " +
      (window.Mario && window.Mario.supported ? "ready" : "unavailable");
  }

  function setLanguage(lang) {
    if (["en", "zh", "both"].indexOf(lang) === -1) lang = "en";
    state.lang = lang;
    body.classList.remove("lang-en", "lang-zh", "lang-both");
    body.classList.add("lang-" + lang);
    document.documentElement.lang = lang === "zh" ? "zh-CN" : "en";

    els.langToggle.querySelectorAll(".lang-btn").forEach(function (button) {
      var active = button.getAttribute("data-lang") === lang;
      button.classList.toggle("active", active);
      button.setAttribute("aria-pressed", active ? "true" : "false");
    });

    updateVoiceNote();
    if (els.dossierDialog.open && state.dossierId) {
      renderDossier(archiveById(state.dossierId));
      if (window.Mario) window.Mario.init(els.dossierDialog);
    }
    try { localStorage.setItem("dragonMastersLang", lang); } catch (e) {}
  }

  function updateReadingProgress() {
    var doc = document.documentElement;
    var max = Math.max(0, doc.scrollHeight - window.innerHeight);
    var progress = max > 0 ? Math.min(100, (window.scrollY / max) * 100) : 0;
    els.readingProgress.style.width = progress.toFixed(2) + "%";
  }

  els.langToggle.addEventListener("click", function (event) {
    var button = event.target.closest(".lang-btn");
    if (button) setLanguage(button.getAttribute("data-lang"));
  });

  els.dragonTap.addEventListener("click", function () {
    if (els.dragonSpeech.hidden) {
      state.dragonSpeechIndex = 0;
      els.dragonSpeech.hidden = false;
    } else {
      state.dragonSpeechIndex = (state.dragonSpeechIndex + 1) % DRAGON_SPEECH.length;
    }

    var message = DRAGON_SPEECH[state.dragonSpeechIndex];
    els.dragonSpeechMessage.innerHTML = bi(message.en, message.zh);
    els.dragonTap.setAttribute("aria-expanded", "true");
    if (window.Mario) window.Mario.beep("correct");
  });

  els.dragonSpeechClose.addEventListener("click", function () {
    els.dragonSpeech.hidden = true;
    els.dragonTap.setAttribute("aria-expanded", "false");
    els.dragonTap.focus();
  });

  window.addEventListener("scroll", updateReadingProgress, { passive: true });
  window.addEventListener("resize", updateReadingProgress, { passive: true });

  function boot() {
    renderSceneTabs();
    renderArchive();
    renderGraph();
    renderSequence();
    renderVocabulary();
    renderLifeMissions();
    renderQuiz();
    showScene(0, false);

    var saved = "en";
    try { saved = localStorage.getItem("dragonMastersLang") || "en"; } catch (e) {}
    setLanguage(saved);
    updateReadingProgress();
    els.dragonTap.setAttribute("aria-expanded", "false");
    els.dragonSpeechMessage.innerHTML = bi(DRAGON_SPEECH[0].en, DRAGON_SPEECH[0].zh);

    if (window.Mario) window.Mario.init(document);
    setTimeout(updateVoiceNote, 900);
  }

  boot();
})();
