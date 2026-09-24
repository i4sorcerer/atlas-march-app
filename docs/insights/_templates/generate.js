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