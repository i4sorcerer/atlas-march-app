// ============ 数据加载层（可扩展） ============
// 设计目标：让"后续加世界史 / 其他地区包"变成零代码改动。
//
// 数据来源分两层：
//  1) 内置兜底：js/data.js 里的 HISTORY_DATA（同步嵌入），保证直接
//     双击 index.html（file:// 协议）也能跑，不被 fetch/CORS 拦截。
//  2) 可扩展数据层：data/*.json。
//      - china 由类型分文件提供：data/eras.json / kings.json / events.json
//        （若可 fetch，则用它们覆盖内置兜底，数据更全）。
//      - 其他地区按"约定文件名"提供：data/<region>.json，例如
//        data/world.json、data/europe.json、data/asia.json ……
//        想加哪个地区，只要把对应 json 丢进 data/ 目录即可。
//
// 支持的地区名与 eras.json 的 meta.extensibility.regions 保持一致。

const KNOWN_REGIONS = ["china", "world", "asia", "europe", "americas", "africa", "oceania"];

const STATE = { region: "china" };
let HISTORY_DATASETS = {}; // { china:{eras,kings,events}, world:{...}, ... }

function _clone(obj) { return JSON.parse(JSON.stringify(obj)); }

// 统一抓取；失败（file:// 或 404）返回 null，由兜底逻辑接手
async function _fetchJSON(path) {
  try {
    const res = await fetch(path, { cache: "no-store" });
    if (!res.ok) return null;
    return await res.json();
  } catch (e) {
    return null;
  }
}

// 从任意 pack 对象中抽取 {eras,kings,events}，忽略 meta 等字段
function _extractPack(pack) {
  if (!pack || typeof pack !== "object") return { eras: [], kings: [], events: [] };
  return {
    eras: Array.isArray(pack.eras) ? pack.eras : [],
    kings: Array.isArray(pack.kings) ? pack.kings : [],
    events: Array.isArray(pack.events) ? pack.events : []
  };
}

// 给包内每条数据打上 region 标记（与 events.json 的 region 字段风格一致）
function _tagRegion(pack, region) {
  const out = _extractPack(pack);
  out.events = out.events.map(e => ({ ...e, region: e.region || region }));
  out.eras = out.eras.map(e => ({ ...e, region: e.region || region }));
  out.kings = out.kings.map(e => ({ ...e, region: e.region || region }));
  return out;
}

// 读取某地区的测验题：data/<region>-quiz.json 里的 quiz 数组。
// 找不到（file:// 或 404）时回退 fallback（china 用内置 QUIZ_BANK，其他地区用空数组）。
async function _loadRegionQuiz(region, fallback) {
  const d = await _fetchJSON(`data/${region}-quiz.json`);
  if (d && Array.isArray(d.quiz) && d.quiz.length) {
    return d.quiz.map(q => ({ ...q, region: q.region || region }));
  }
  return fallback;
}

// 启动加载：填充 HISTORY_DATASETS，并把 HISTORY_DATA 设为默认地区
async function initDataLoader() {
  const embedded = _clone(HISTORY_DATA); // 兜底（china 子集）
  HISTORY_DATASETS = {};

  // 1) china：先放内置兜底，再用类型分文件逐个覆盖（避免重复拼接）
  const china = {
    eras: embedded.eras || [],
    kings: embedded.kings || [],
    events: embedded.events || []
  };
  const chinaFiles = { eras: "data/eras.json", kings: "data/kings.json", events: "data/events.json" };
  for (const key of ["eras", "kings", "events"]) {
    const d = await _fetchJSON(chinaFiles[key]);
    if (d) {
      const arr = d[key] || d.eras || d.kings || d.events;
      if (Array.isArray(arr) && arr.length) china[key] = arr;
    }
  }
  // china 的测验题：可被 data/china-quiz.json 覆盖，否则用内置 QUIZ_BANK 兜底
  china.quiz = await _loadRegionQuiz("china", (typeof QUIZ_BANK !== "undefined") ? QUIZ_BANK : []);
  HISTORY_DATASETS.china = china;

  // 2) 其他地区：约定文件 data/<region>.json
  for (const region of KNOWN_REGIONS) {
    if (region === "china") continue;
    const d = await _fetchJSON(`data/${region}.json`);
    if (d) {
      const ds = _tagRegion(d, region);
      ds.quiz = await _loadRegionQuiz(region, []); // 其他地区默认无题，由 <region>-quiz.json 提供
      HISTORY_DATASETS[region] = ds;
    }
  }

  // 3) 默认地区
  STATE.region = "china";
  HISTORY_DATA = HISTORY_DATASETS.china;
}

// 切换地区：成功渲染返回 true；没有对应数据包时显示占位提示
async function setRegion(region) {
  if (!HISTORY_DATASETS[region]) {
    // 按需再试一次（比如用户中途才丢进来的包）
    const d = await _fetchJSON(`data/${region}.json`);
    if (d) HISTORY_DATASETS[region] = _tagRegion(d, region);
  }

  if (!HISTORY_DATASETS[region]) {
    showRegionEmpty(region);
    return false;
  }

  STATE.region = region;
  HISTORY_DATA = HISTORY_DATASETS[region];
  refreshRegion();
  return true;
}

// 重新渲染所有数据驱动的区块
function refreshRegion() {
  if (typeof resetKingsFilter === "function") resetKingsFilter();
  if (typeof resetQuiz === "function") resetQuiz(); // 切换地区时重置进行中的测验
  if (typeof renderTimeline === "function") renderTimeline();
  if (typeof renderEras === "function") renderEras();
  if (typeof renderKings === "function") renderKings();
  if (typeof renderEvents === "function") renderEvents();
}

// 返回当前地区的测验题库（没有对应包时返回空数组）
function getQuizBank() {
  const ds = HISTORY_DATASETS[STATE.region];
  return (ds && Array.isArray(ds.quiz)) ? ds.quiz : [];
}

// 数据包缺失时的友好占位（区块里提示如何添加）
function showRegionEmpty(region) {
  const label = region === "world" ? "世界史" : region;
  const msg = `🌍 ${label}内容包还没加进来～<br>把 <b>data/${region}.json</b> 丢进项目就能看啦！`;
  const ph = `<div class="region-empty">${msg}</div>`;
  ["timelineWrap", "eraGrid", "kingGrid", "eventsGrid"].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.innerHTML = ph;
  });
}
