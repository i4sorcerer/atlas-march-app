#!/usr/bin/env node
/*
 * 主题看板统一生成器（强制生成规约）
 * ------------------------------------------------------------------
 * 作用：所有主题看板 HTML 一律由本脚本产出。样式取自统一模板
 *       docs/insights/_templates/dashboard.html 的 <style> 块，
 *       板块骨架由本脚本固定渲染。禁止任何主题从零手写 HTML。
 *
 * 用法：
 *   node docs/insights/_templates/generate.js \
 *        --template docs/insights/_templates/dashboard.html \
 *        --data /tmp/<topic>.json \
 *        --out docs/insights/<topic>/index.html
 *   （--template 有默认值，可省略）
 *
 * 数据 JSON 结构（schema）：
 * {
 *   "topic": "主题名",
 *   "subMeta": "执行日/口径等一行说明，如 每日快讯+高质清单 · 数据窗 2026-01~2026-09",
 *   "itemSummary": "累计条目说明，如 累计 36 条跨源权威条目 · 官方一手 + 国际第三方",
 *   "badges": ["徽章1", "徽章2", ...],
 *   "archive": ["2026-09-26", "2026-09-25"],      // 历史快照日期，最早在前；可空
 *   "changes": { "add": ["..."], "fix": ["..."], "keep": ["..."] },
 *   "overviewPastHtml": "<p>已沉淀事实 HTML…</p>",
 *   "trends": [ { "cls": "trend|tbd|tline|focus|null", "label": "核心趋势", "text": "…" } ],
 *   "trendBlocks": [ { "title": "…", "text": "…" } ],   // ② 趋势与规律 卡片
 *   "timeline": [ { "date": "2026-09-22", "text": "…", "cls": "new|null" } ],
 *   "judge": [ { "title": "…", "text": "…" } ],          // ③ 研判 卡片
 *   "relationMain": ["链条1", "..."],                    // ④ 传导链
 *   "relationExt":  ["接口1", "..."] ,                   // ④ 外部接口
 *   "signals":  [ { "text": "…", "focus": true } ],      // ⑤ 待观察
 *   "items": [ { "date": "2026-09-27", "title": "…", "url": "…", "source": "…",
 *                "dim": "维度", "isNew": true, "tbd": false, "feedback": "—" } ],
 *   "customSections": [ { "title": "各国发射概览", "note": "…", "head": ["列1","列2"],
 *                          "rows": [ ["<span class=flag>🇨🇳</span> 中国", "69 次"] ],   // 单元格：HTML 原文透传
 *                          "foot": "表尾注HTML（可选）" } ],
 *   "footerNote": "底部流水线说明（可选，覆盖默认）"
 * }
 *
 * 固定板块「◆马斯克帝国关系网图」（2026-10-13 新增能力）：
 *   当 topic === "关于马斯克的一切" 时，每次运行固定自动渲染在 ④关联脉络 之后，
 *   无需任何数据字段。SVG 为固定版式（中心=马斯克 + 四大业务集群 + 政治接口），
 *   节点完整覆盖飞书「马斯克综合跟踪 · 主题词典」全量 15 词条（含全部商业公司：
 *   Elon Musk/Tesla/SpaceX/X/The Boring Company/Gigafactory 及公司实体 xAI/Neuralink/
 *   Starlink，一个不漏），并附 SolarCity（历史·已并入）补全版图。其他主题不受影响。
 *   词典新增词条时需同步更新 renderEmpire 中的固定节点清单。
 * ------------------------------------------------------------------
 */

const fs = require('fs');
const path = require('path');

function arg(name, def) {
  const i = process.argv.indexOf(name);
  return i >= 0 && process.argv[i + 1] !== undefined ? process.argv[i + 1] : def;
}
function esc(s) {
  return String(s == null ? '' : s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}
function li(items) { return (items || []).map((x) => `<li>${x}</li>`).join(''); }

function renderHeader(d) {
  const badges = (d.badges || []).map((b) => `<span class="badge">${esc(b)}</span>`).join('');
  const arch = (d.archive || [])
    .map((dt, i) =>
      `<a href="./archive/${dt}.html" style="color:#2456c4;font-weight:700;text-decoration:underline;background:rgba(36,86,196,.10);padding:2px 9px;border-radius:6px;${i ? 'margin-left:6px;' : ''}">${dt}</a>`
    )
    .join('');
  const archLine = arch
    ? `<div class="sub" style="margin-top:8px;font-size:12.5px;">历史归档（每日快照）：${arch}</div>`
    : `<div class="sub" style="margin-top:8px;font-size:12.5px;">历史归档：暂无可比快照（首期）</div>`;
  return `
  <header>
    <div class="crumb"><a href="../../index.html">个人洞察</a> / ${esc(d.topic)}</div>
    <h1>${esc(d.topic)} · 研判看板</h1>
    <div class="sub">${esc(d.subMeta || '')}</div>
    ${d.itemSummary ? `<div class="sub" style="margin-top:2px;">${esc(d.itemSummary)}</div>` : ''}
    <div class="badges">${badges}</div>
    ${archLine}
  </header>`;
}

function renderChanges(d) {
  const c = d.changes || {};
  return `
  <section>
    <h2><span class="idx">◎</span> 较上次运行变化清单（自动区）</h2>
    <div class="grid">
      <div class="cell"><b>➕ 新增（本窗）+${(c.add || []).length}</b><ul class="timeline" style="margin-top:6px">${li(c.add)}</ul></div>
      <div class="cell"><b>♻ 修正 / 升级</b><ul class="timeline" style="margin-top:6px">${li(c.fix)}</ul></div>
      <div class="cell"><b>⏸ 未变（延续判断）</b><ul class="timeline" style="margin-top:6px">${li(c.keep)}</ul></div>
    </div>
  </section>`;
}

function renderOverview(d) {
  const trends = (d.trends || []).map((t) => {
    const cls = t.cls && t.cls !== 'null' ? `<span class="${esc(t.cls)}">${esc(t.label || t.cls)}</span>` : (t.label ? `<b>${esc(t.label)}</b>` : '');
    return `<li>${cls ? cls + '　' : ''}${t.text}</li>`;
  }).join('');
  return `
  <section>
    <h2><span class="idx">①</span> 本期综述</h2>
    <div class="cell" style="margin-bottom:12px"><b>已沉淀事实</b>${d.overviewPastHtml || ''}</div>
    <div class="cell">
      <b>最新趋势速递（本章新增）</b>
      <ul class="timeline" style="margin-top:8px">${trends}</ul>
    </div>
  </section>`;
}

function renderCustom(d) {
  return (d.customSections || []).map((s) => {
    const head = (s.head || []).map((h) => `<th>${h}</th>`).join('');
    const rows = (s.rows || []).map((r) => `<tr>${r.map((c) => `<td>${c}</td>`).join('')}</tr>`).join('');
    return `
  <section>
    <h2><span class="idx">★</span> ${esc(s.title)}${s.note ? `<span style="color:var(--muted);font-size:12px;margin-left:8px;">${esc(s.note)}</span>` : ''}</h2>
    <table class="table"><thead><tr>${head}</tr></thead><tbody>${rows}</tbody></table>
    ${s.foot ? `<div class="sub" style="margin-top:8px;font-size:12px;">${s.foot}</div>` : ''}
  </section>`;
  }).join('');
}

function renderTrend(d) {
  const blocks = (d.trendBlocks || []).map((b) => `<div class="cell"><b>${esc(b.title)}</b><p>${b.text}</p></div>`).join('');
  const tl = (d.timeline || []).map((t) =>
    `<li><b>${esc(t.date)}</b>　${t.cls && t.cls !== 'null' ? `<span class="${esc(t.cls)}">` : ''}${t.text}${t.cls && t.cls !== 'null' ? '</span>' : ''}</li>`
  ).join('');
  return `
  <section>
    <h2><span class="idx">②</span> 趋势与规律</h2>
    <div class="grid">${blocks}</div>
    <h2 style="margin-top:18px">关键时间线（近段）</h2>
    <ul class="timeline">${tl}</ul>
  </section>`;
}

function renderJudge(d) {
  const cards = (d.judge || []).map((j) => `<div class="cell"><b>${esc(j.title)}</b><p>${j.text}</p></div>`).join('');
  return `
  <section>
    <h2><span class="idx">③</span> 研判与方向</h2>
    <div class="grid">${cards}</div>
  </section>`;
}

function renderRelation(d) {
  return `
  <section>
    <h2><span class="idx">④</span> 关联脉络</h2>
    <div class="grid2">
      <div class="cell"><b>传导链（本轮更新）</b><ul class="timeline" style="margin-top:6px">${li(d.relationMain)}</ul></div>
      <div class="cell"><b>外部接口</b><ul class="timeline" style="margin-top:6px">${li(d.relationExt)}</ul></div>
    </div>
  </section>`;
}

function renderSignals(d) {
  const rows = (d.signals || []).map((s) =>
    `<label><input type="checkbox"> ${s.focus ? `<span class="focus">${esc(s.text)}</span>` : esc(s.text)}</label>`
  ).join('');
  return `
  <section>
    <h2><span class="idx">⑤</span> 待观察信号（leading indicators）</h2>
    <div class="cheq">${rows}</div>
  </section>`;
}

function renderItems(d) {
  const rows = (d.items || []).map((it) => {
    const star = it.isNew ? '★ ' : '';
    const cell = it.tbd
      ? `<span class="flag">${it.url ? `<a href="${esc(it.url)}" target="_blank" rel="noopener">${star}${esc(it.title)}</a>` : `${star}${esc(it.title)}`}</span>`
      : (it.url ? `<a href="${esc(it.url)}" target="_blank" rel="noopener">${star}${esc(it.title)}</a>` : `${star}${esc(it.title)}`);
    return `<tr><td>${esc(it.date)}</td><td>${cell}</td><td>${esc(it.source)}</td><td>${esc(it.dim)}</td><td class="hand">${esc(it.feedback || '—')}</td></tr>`;
  }).join('');
  return `
  <section>
    <h2><span class="idx">⑥</span> 高质条目 <span style="font-size:12px;font-weight:400;color:var(--muted);">（★=本窗新增）</span></h2>
    <table class="table">
      <thead><tr><th>日期</th><th>条目</th><th>来源</th><th>维度</th><th>反馈</th></tr></thead>
      <tbody>${rows}</tbody>
    </table>
  </section>`;
}

function renderFooter() {
  return `
  <footer>本页由主题跟踪流水线（采集 → 精筛 → 洞察研判 → 呈现 · 统一模板 dashboard.html + generate.js 生成）产出；反馈列对应飞书条目库赞/踩，用于反哺后续研判。</footer>`;
}

/* —— 固定板块：马斯克帝国关系网图（仅马斯克主题，每次固定输出） ——
   节点清单 = 飞书主题词典全量词条（商业公司无遗漏）+ SolarCity 历史补充。
   版式固定：中心马斯克 + 四大业务集群（汽车能源/航天卫星/AI社交/医疗基建）+ 政治接口。 */
function renderEmpire(d) {
  if (d.topic !== '关于马斯克的一切') return '';
  const E = (cls, cx, cy, rx, ry, t1, t2) =>
    `<ellipse class="${cls}" cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}"/>` +
    `<text class="${cls === 'hub' ? 'hubt' : cls === 'ext' ? 'extt' : 'cot'}" x="${cx}" y="${t2 ? cy - 4 : cy + 1}" text-anchor="middle" dominant-baseline="middle">${esc(t1)}</text>` +
    (t2 ? `<text class="${cls === 'hub' ? 'hubs' : 'lg'}" x="${cx}" y="${cy + 17}" text-anchor="middle">${esc(t2)}</text>` : '');
  const R = (cls, x, y, w, h, t) =>
    `<rect class="${cls}" x="${x}" y="${y}" width="${w}" height="${h}" rx="9"/>` +
    `<text class="${cls === 'hist' ? 'histt' : cls === 'ext' ? 'extt' : 'prt'}" x="${x + w / 2}" y="${y + h / 2 + 1}" text-anchor="middle" dominant-baseline="middle">${esc(t)}</text>`;
  const G = (x, y, w, h, t, s) =>
    `<rect class="gbox" x="${x}" y="${y}" width="${w}" height="${h}" rx="14"/>` +
    `<text class="gtit" x="${x + 16}" y="${y + 24}">${esc(t)}</text>` +
    `<text class="gsub" x="${x + 16}" y="${y + 42}">${esc(s)}</text>`;
  const svg = `
<svg viewBox="0 0 1000 710" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="马斯克帝国关系网图">
  <!-- 四大业务集群 -->
  ${G(18, 14, 444, 272, '汽车 · 能源与机器人（Tesla 体系）', '档案词条：Gigafactory / Optimus / FSD / Cybercab · Robotaxi')}
  ${G(538, 14, 444, 272, '航天 · 卫星与发射（SpaceX 体系）', '档案词条：Starlink 星链 / Starship 星舰')}
  ${G(18, 398, 444, 218, 'AI · 模型与社交（xAI / X 体系）', '档案词条：xAI / Grok / X（原Twitter）')}
  ${G(538, 398, 444, 218, '前沿医疗与基建', '档案词条：Neuralink / The Boring Company')}
  <!-- 枢纽辐射线：马斯克 → 各集群核心公司 -->
  <path class="ln" d="M382,210 L466,295"/>
  <path class="ln" d="M618,210 L534,295"/>
  <path class="ln" d="M455,455 L466,365"/>
  <path class="ln" d="M437,560 H495 V370"/>
  <path class="ln" d="M510,370 V560 H772"/>
  <path class="ln" d="M510,470 H556"/>
  <path class="dl" d="M500,370 V626"/>
  <!-- 集群内部归属线 -->
  <path class="ln" style="stroke-width:1.3" d="M210,462 H303"/>
  <!-- 中心：马斯克 -->
  ${E('hub', 500, 330, 70, 40, 'Elon Musk', '马斯克 · 帝国中枢')}
  <!-- Tesla 体系 -->
  ${E('co', 382, 176, 72, 34, 'Tesla 特斯拉')}
  ${R('pr', 40, 76, 150, 40, 'Gigafactory 超级工厂')}
  ${R('pr', 204, 76, 130, 40, 'Optimus 人形机器人')}
  ${R('pr', 348, 76, 92, 40, 'FSD 全自动驾驶')}
  ${R('pr', 40, 136, 186, 40, 'Cybercab / Robotaxi')}
  ${R('hist', 40, 196, 178, 40, 'SolarCity（历史并入）')}
  <!-- SpaceX 体系 -->
  ${E('co', 618, 176, 72, 34, 'SpaceX')}
  ${R('pr', 700, 76, 150, 40, 'Starlink 星链')}
  ${R('pr', 700, 136, 150, 40, 'Starship 星舰')}
  <text class="lg" x="700" y="212">载人/货运龙飞船 · 猎鹰9（运载背景）</text>
  <!-- xAI / X 体系 -->
  ${E('co', 380, 455, 75, 34, 'xAI')}
  ${E('co', 372, 560, 65, 32, 'X 平台')}
  ${R('pr', 60, 440, 150, 44, 'Grok / Grok Bot')}
  <text class="lg" x="34" y="606">注：xAI 收购 X（330 亿美元口径 · 待核）</text>
  <!-- Neuralink / Boring -->
  ${E('co', 640, 470, 84, 34, 'Neuralink')}
  ${E('co', 860, 560, 88, 34, 'The Boring Company')}
  <text class="lg" x="560" y="606">隧道延伸：拉斯维加斯环 · 迪拜 Loop · 阿布扎比</text>
  <!-- 政治接口 -->
  <rect class="ext" x="410" y="626" width="180" height="46" rx="10"/>
  <text class="extt" x="500" y="645" text-anchor="middle" dominant-baseline="middle">DOGE 政府效率部</text>
  <text class="lg" x="500" y="663" text-anchor="middle">政治接口 · 非商业实体</text>
  <!-- 图例 -->
  <ellipse class="co" cx="30" cy="690" rx="9" ry="7"/><text class="lg" x="46" y="694">公司主体（档案词条）</text>
  <rect class="pr" x="170" y="683" width="24" height="14" rx="4"/><text class="lg" x="200" y="694">核心业务/产品</text>
  <rect class="hist" x="310" y="683" width="24" height="14" rx="4"/><text class="lg" x="340" y="694">历史·已并入</text>
  <line class="ln" x1="440" y1="690" x2="474" y2="690"/><text class="lg" x="480" y="694">马斯克控制/创立</text>
  <line class="dl" x1="600" y1="690" x2="634" y2="690"/><text class="lg" x="640" y="694">政治接口（虚线）</text>
  <text class="lg" x="740" y="694">节点=飞书主题词典全量 15 词条（商业公司无遗漏）</text>
</svg>`;
  const syn = [
    'Tesla 斥资约 20 亿美元投资 xAI（2026-01 Series E）',
    'Grok → X 生态 + Tesla 车机 / Robotaxi 语音任务',
    'SpaceX 发债 400 亿美元购英伟达芯片 ⇄ SpaceXSI（原xAI部门）算力',
    'Terafab：特斯拉 + SpaceX 自研芯片，降依赖英伟达/台积电',
    'Starlink D2D 频谱 ⇄ X 内容分发与账号体系',
    'Optimus 量产 ⇄ 中国供应链（磁体/审厂）'
  ].map((s) => `<span>${esc(s)}</span>`).join('');
  return `
  <section>
    <h2><span class="idx">◆</span> 马斯克帝国关系网图<span style="color:var(--muted);font-size:12px;margin-left:8px;">固定板块 · 每期输出 · 节点=飞书主题词典全量词条（商业公司无遗漏）</span></h2>
    <div class="empire">${svg}</div>
    <div class="syn">${syn}</div>
  </section>`;
}

function main() {
  const tmplPath = arg('--template', path.join(__dirname, 'dashboard.html'));
  const dataPath = arg('--data');
  const outPath = arg('--out');
  if (!dataPath || !outPath) {
    console.error('用法: node generate.js --data <data.json> --out <out.html> [--template <template.html>]');
    process.exit(1);
  }
  const d = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
  const tmpl = fs.readFileSync(tmplPath, 'utf8');
  const tmplNoComments = tmpl.replace(/<!--[\s\S]*?-->/g, '');
  const style = (tmplNoComments.match(/<style>([\s\S]*?)<\/style>/) || [])[1] || '';
  const body = [
    renderHeader(d),
    renderChanges(d),
    renderOverview(d),
    renderCustom(d),
    renderTrend(d),
    renderJudge(d),
    renderRelation(d),
    renderEmpire(d),
    renderSignals(d),
    renderItems(d),
    renderFooter()
  ].join('\n');
  const html = `<!DOCTYPE html>
<html lang="zh-CN">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${esc(d.topic)} · 研判看板</title>
<!-- 统一模板生成：docs/insights/_templates/dashboard.html + generate.js -->
<style>${style}</style>
</head>
<body>
<div class="wrap">
${body}
</div>
</body>
</html>
`;
  fs.mkdirSync(path.dirname(outPath), { recursive: true });
  fs.writeFileSync(outPath, html, 'utf8');
  console.log('OK ->', outPath, `（${body.length}+ 字符）`);
}

main();