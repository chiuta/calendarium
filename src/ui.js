/* CALENDARIUM · interfața. Folosește din ambalaj: PLUGINS, DATA, I18N, tr(), fmt() și funcțiile din engine.mjs. */
var STORE_KEY = 'calendarium.state';
var reg = PLUGINS;
var state = loadState();
var cur = { el: null, lang: 'en', L: null };
var grid = null;          // luna afișată în vederea lunară: {cal, y, m, leap}
var listCache = {};

function loadState() {
  var s = { jd: null, cal: 'gregorian', other: 'julian' };
  try {
    var raw = JSON.parse(localStorage.getItem(STORE_KEY));
    if (raw && typeof raw.jd === 'number' && isFinite(raw.jd) && raw.jd > JD_MIN && raw.jd < JD_MAX && ORDER.indexOf(raw.cal) >= 0) {
      s.jd = Math.floor(raw.jd + 0.5) - 0.5;
      s.cal = raw.cal;
      if (ORDER.indexOf(raw.other) >= 0 && gridable(raw.other)) s.other = raw.other;
    }
  } catch (e) { /* stocarea poate lipsi sau conține altceva */ }
  if (s.jd === null) s.jd = todayJD();
  return s;
}
function saveState() { try { localStorage.setItem(STORE_KEY, JSON.stringify({ jd: state.jd, cal: state.cal, other: state.other })); } catch (e) { /* ignorat */ } }
function todayJD() { var t = new Date(); return reg.gregorian.toJD(t.getFullYear(), t.getMonth() + 1, t.getDate()); }
function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }

function makeL(lang) {
  function list(k) { var key = lang + '/' + k; if (!listCache[key]) listCache[key] = tr(lang, k).split('|'); return listCache[key]; }
  return {
    lang: lang,
    t: function (k) { return tr(lang, k); },
    list: list,
    month: function (m) { return list('mon')[m - 1]; },
    date: function (d, m, y) { return tr(lang, 'dfmt').replace('{d}', d).replace('{m}', m).replace('{y}', y); },
    mtitle: function (m, y) { return tr(lang, 'mfmt').replace('{m}', m).replace('{y}', y); },
    era: function (y) { return y >= 1 ? String(y) : (1 - y) + ' ' + tr(lang, 'bce'); }
  };
}
function fmtG(jd) { return reg.gregorian.format(reg.gregorian.fromJD(jd), cur.L); }
function fmtJ(jd) { return reg.julian.format(reg.julian.fromJD(jd), cur.L); }
function calName(id) { return cur.L.t('cal_' + id); }
function gridable(id) { return id !== 'maya' && id !== 'mars'; }
function pad2(n) { return n < 10 ? '0' + n : String(n); }
function refYear(id) { var t = reg[id].fromJD(todayJD()); return isValidDate(t) ? t.year : 2000; }

/* ---------- câmpurile de intrare ---------- */
function fieldLabel(f) {
  var L = cur.L;
  if (f === 'year') return L.t('lbl_year');
  if (f === 'month') return L.t('lbl_month');
  if (f === 'day') return L.t('lbl_day');
  if (f === 'leap') return L.t('lbl_leap');
  if (f === 'msd') return L.t('lbl_msd');
  return f.charAt(0).toUpperCase() + f.slice(1);   // baktun, katun, tun, uinal, kin: nume proprii
}
function fieldValue(d, f) {
  var v = d ? d[f] : NaN;
  if (typeof v !== 'number' || !isFinite(v)) return '';
  return f === 'msd' ? v.toFixed(3) : String(v);
}
function monthOptions(id, year, selected) {
  var p = reg[id], list = p.monthList ? p.monthList(year, cur.L) : [];
  return list.map(function (o) { return '<option value="' + o.v + '"' + (o.v === selected ? ' selected' : '') + '>' + esc(o.n) + '</option>'; }).join('');
}
var CAUTION = { hebrew: 'lim_4', hijri: 'lim_1', persian: 'lim_2', chinese: 'lim_3', maya: 'lim_4', mars: 'lim_5' };
function renderCaution() {
  var host = cur.el.querySelector('#cal-caution'), k = CAUTION[state.cal], t = k ? cur.L.t(k) : '';
  if (state.cal === 'maya') t = cur.L.t('hint_maya') + ' ' + t;
  host.textContent = t;
  host.hidden = !t;
}
function onPaste(ev) {
  if (state.cal !== 'maya' || !ev.clipboardData) return;
  var text = String(ev.clipboardData.getData('text') || '');
  var parts = text.indexOf('.') >= 0 ? parseLongCount(text) : null;
  if (!parts) return;
  ev.preventDefault();
  ['baktun', 'katun', 'tun', 'uinal', 'kin'].forEach(function (k, i) { var e = cur.el.querySelector('#cal-f-' + k); if (e) e.value = String(parts[i]); });
  onFieldsChange({ target: cur.el.querySelector('#cal-f-baktun') });
}
function renderFields() {
  var p = reg[state.cal], d = p.fromJD(state.jd), ok = isValidDate(d), html = '';
  p.fields.forEach(function (f) {
    var idf = 'cal-f-' + f, label = fieldLabel(f);
    if (f === 'month') html += '<label class="cal-f" for="' + idf + '"><span>' + esc(label) + '</span><select id="' + idf + '" class="sel cal-inp" data-f="month">' + monthOptions(state.cal, ok ? d.year : refYear(state.cal), ok ? d.month : -1) + '</select></label>';
    else if (f === 'leap') html += '<label class="cal-f cal-chk" for="' + idf + '"><input type="checkbox" id="' + idf + '" data-f="leap"' + (ok && d.leap ? ' checked' : '') + '><span>' + esc(label) + '</span></label>';
    else html += '<label class="cal-f" for="' + idf + '"><span>' + esc(label) + '</span><input type="number" step="' + (f === 'msd' ? 'any' : '1') + '" inputmode="' + (f === 'msd' ? 'decimal' : 'numeric') + '" id="' + idf + '" class="cal-inp" data-f="' + f + '" value="' + esc(ok ? fieldValue(d, f) : '') + '"></label>';
  });
  cur.el.querySelector('#cal-fields').innerHTML = html;
  renderCaution();
  if (ok) setMessage('', false); else setMessage(fmt(cur.L.t('err_range'), calName(state.cal)), true);
}
function fillFields() {
  var p = reg[state.cal], d = p.fromJD(state.jd), ok = isValidDate(d);
  p.fields.forEach(function (f) {
    var e = cur.el.querySelector('#cal-f-' + f);
    if (!e) return;
    if (f === 'leap') e.checked = ok && !!d.leap;
    else if (f === 'month') { e.innerHTML = monthOptions(state.cal, ok ? d.year : refYear(state.cal), ok ? d.month : -1); if (ok) e.value = String(d.month); }
    else e.value = ok ? fieldValue(d, f) : '';
  });
  if (ok) setMessage('', false); else setMessage(fmt(cur.L.t('err_range'), calName(state.cal)), true);
}
function readFields() {
  var p = reg[state.cal], vals = [];
  p.fields.forEach(function (f) {
    var e = cur.el.querySelector('#cal-f-' + f);
    if (f === 'leap') { vals.push(!!(e && e.checked)); return; }
    var raw = e ? String(e.value).trim() : '';
    vals.push(raw === '' ? NaN : Number(raw));
  });
  return vals;
}
function setMessage(text, bad) {
  var m = cur.el.querySelector('#cal-msg');
  m.textContent = text || '';
  m.className = 'cal-msg' + (bad ? ' cal-bad' : '');
}
function onFieldsChange(ev) {
  var p = reg[state.cal];
  if (ev && ev.target && ev.target.getAttribute && ev.target.getAttribute('data-f') === 'year' && p.monthList) {
    var ms = cur.el.querySelector('#cal-f-month'), y = Number(ev.target.value);
    if (ms && ev.target.value !== '' && isFinite(y)) {
      var keep = ms.value;
      ms.innerHTML = monthOptions(state.cal, y, Number(keep));
      if (ms.querySelector('option[value="' + keep + '"]')) ms.value = keep; else ms.selectedIndex = 0;
    }
  }
  var vals = readFields();
  var bad = vals.some(function (v) { return typeof v === 'number' && !isFinite(v); }) ||
    vals.some(function (v, i) { return p.fields[i] !== 'msd' && typeof v === 'number' && Math.floor(v) !== v; });
  if (bad) { setMessage(cur.L.t('err_nan'), true); return; }
  var r = toJDChecked(reg, state.cal, vals);
  if (!r.ok) { setMessage(fmt(cur.L.t(r.why === 'range' ? 'err_range' : 'err_nodate'), calName(state.cal)), true); return; }
  setMessage('', false);
  state.jd = Math.floor(r.jd + 0.5) - 0.5;
  saveState();
  renderOutputs();
}

/* ---------- rezultate ---------- */
function chip(label, value) { return '<li><b>' + esc(value) + '</b>' + esc(label) + '</li>'; }
function renderResults() {
  var L = cur.L, jd = state.jd, jdn = jdnOf(jd), all = convertAll(reg, jd);
  var iso = isoWeek(reg, jd);
  var chips = chip(L.t('r_jd'), jd.toFixed(1)) + chip(L.t('r_jdn'), String(jdn)) + chip(L.t('r_mjd'), mjdOf(jd).toFixed(1)) +
    chip(L.t('r_wd'), L.list('wd')[weekdayOf(jdn)]) + chip(L.t('r_week'), iso.year + '-W' + pad2(iso.week)) + chip(L.t('r_doy'), String(dayOfYear(reg, jd))) + chip(L.t('r_unix'), String(unixDays(jd)));
  var rows = '';
  GROUPS.forEach(function (g) {
    var body = '';
    g[1].forEach(function (id) {
      if (!reg[id]) return;
      var d = all[id], text = d ? reg[id].format(d, L) : '';
      body += '<tr><th scope="row">' + esc(calName(id)) + '</th><td class="cal-val">' + (d ? esc(text) : '— <span class="cal-na">' + esc(L.t('na')) + '</span>') + '</td><td>' +
        (d ? '<button type="button" class="btn cal-copy" data-text="' + esc(text) + '">' + esc(L.t('copy')) + '</button>' : '') + '</td></tr>';
    });
    rows += '<tbody><tr class="cal-grp"><th colspan="3" scope="colgroup">' + esc(L.t(g[0])) + '</th></tr>' + body + '</tbody>';
  });
  cur.el.querySelector('#cal-chips').innerHTML = chips;
  cur.el.querySelector('#cal-res').innerHTML = rows;
}

/* ---------- vederea lunară ---------- */
function syncGridToState() {
  var id = gridable(state.cal) ? state.cal : 'gregorian';
  var d = reg[id].fromJD(state.jd);
  if (!isValidDate(d)) { id = 'gregorian'; d = reg.gregorian.fromJD(state.jd); }
  grid = { cal: id, y: d.year, m: d.month, leap: !!d.leap && id === 'chinese' };
}
function shortMonth(id, d) {
  var p = reg[id];
  if (id === 'gregorian' || id === 'julian' || id === 'revised-julian') return cur.L.month(d.month).slice(0, 3);
  if (id === 'hebrew') return p.monthName(d.year, d.month).slice(0, 5);
  return p.NAMES ? p.NAMES[d.month - 1].slice(0, 5) : '';
}
function otherLabel(other, od) {
  if (!od) return '';
  if (other === 'chinese') return (od.leap ? '+' : '') + od.month + '/' + od.day;
  return od.day + (od.day === 1 ? ' ' + shortMonth(other, od) : '');
}
function renderGrid() {
  var L = cur.L, host = document.getElementById('cal-gridbox');
  if (!host) return;
  if (!grid) syncGridToState();
  var other = state.other === grid.cal ? (grid.cal === 'gregorian' ? 'julian' : 'gregorian') : state.other;
  var g = monthGrid(reg, grid.cal, grid.y, grid.m, grid.leap, other);
  var opts = ORDER.filter(gridable).map(function (id) { return id === grid.cal ? '' : '<option value="' + id + '"' + (id === other ? ' selected' : '') + '>' + esc(calName(id)) + '</option>'; }).join('');
  var head = '<div class="cal-gridbar"><button type="button" class="btn" data-act="prev" aria-label="' + esc(L.t('prev')) + '">‹</button><strong class="cal-gtitle" id="cal-gtitle"></strong><button type="button" class="btn" data-act="next" aria-label="' + esc(L.t('next')) + '">›</button>' +
    '<label class="cal-f"><span>' + esc(L.t('lbl_other')) + '</span><select id="cal-other" class="sel cal-inp">' + opts + '</select></label></div>';
  if (!g) { host.innerHTML = head + '<p class="note">' + esc(L.t('na')) + '</p>'; return; }
  var gp = reg[grid.cal], title = gp.monthTitle ? gp.monthTitle(grid.y, grid.m, grid.leap, L) : gp.format({ year: grid.y, month: grid.m, day: 1, leap: grid.leap }, L);
  var wdn = L.list('wd'), heads = '', i, k;
  for (i = 0; i < 7; i++) heads += '<th scope="col"><abbr title="' + esc(wdn[(i + 1) % 7]) + '">' + esc(wdn[(i + 1) % 7].slice(0, 3)) + '</abbr></th>';
  var cells = '', rowsHtml = '', col = g.startOffset;
  for (k = 0; k < col; k++) cells += '<td class="cal-empty"></td>';
  g.days.forEach(function (day) {
    var sel = jdnOf(day.jd) === jdnOf(state.jd);
    cells += '<td><button type="button" class="cal-cell' + (sel ? ' cal-on' : '') + '" data-jd="' + day.jd + '"' + (sel ? ' aria-current="date"' : '') + '><span>' + day.day + '</span><small>' + esc(otherLabel(other, day.other)) + '</small></button></td>';
    col++;
    if (col === 7) { rowsHtml += '<tr>' + cells + '</tr>'; cells = ''; col = 0; }
  });
  if (cells) { for (k = col; k < 7; k++) cells += '<td class="cal-empty"></td>'; rowsHtml += '<tr>' + cells + '</tr>'; }
  host.innerHTML = head + '<div class="tblw"><table class="cal-grid"><caption class="cal-cap">' + esc(L.t('grid_hint')) + '</caption><thead><tr>' + heads + '</tr></thead><tbody>' + rowsHtml + '</tbody></table></div>';
  host.querySelector('#cal-gtitle').textContent = title;
}
function onGridClick(ev) {
  var t = ev.target.closest ? ev.target.closest('button') : null;
  if (!t) return;
  var act = t.getAttribute('data-act');
  if (act === 'prev' || act === 'next') {
    var g = monthGrid(reg, grid.cal, grid.y, grid.m, grid.leap, null);
    if (!g) return;
    var d = reg[grid.cal].fromJD(act === 'next' ? g.first + g.days.length : g.first - 1);
    if (!isValidDate(d)) return;
    grid = { cal: grid.cal, y: d.year, m: d.month, leap: !!d.leap && grid.cal === 'chinese' };
    renderGrid();
  } else if (t.getAttribute('data-jd')) {
    var jd = Number(t.getAttribute('data-jd'));
    if (!isFinite(jd)) return;
    state.jd = jd;
    saveState();
    fillFields();
    renderOutputs();
  }
}

/* ---------- panouri: România, termeni solari, atlas, limite ---------- */
function renderRo() {
  var L = cur.L, host = document.getElementById('cal-robox');
  if (!host) return;
  var s = romanianStyle(reg, state.jd), gy = reg.gregorian.fromJD(state.jd).year;
  var h = '<p>' + esc(L.t('ro_intro')) + '</p><ul class="cal-list"><li>' + esc(fmt(L.t('ro_old'), fmtJ(state.jd))) + '</li><li>' + esc(fmt(L.t('ro_new'), fmtG(state.jd))) + '</li><li>' + esc(fmt(L.t('ro_gap'), s.gap)) + '</li>';
  if (s.revised && isValidDate(s.revised)) h += '<li>' + esc(fmt(L.t('ro_rj'), reg['revised-julian'].format(s.revised, L))) + '</li>';
  h += '</ul>';
  if (gy >= 1800 && gy <= 2100) h += '<p class="cal-badge">' + esc(L.t(s.civilIsOld ? 'ro_civil_old' : 'ro_civil_new')) + '</p>';
  else if (gy < 1800) h += '<p class="note">' + esc(L.t('ro_ab')) + '</p>';
  h += '<p class="note">' + esc(L.t('ro_trans')) + '</p><h3>' + esc(L.t('ro_ev_h')) + '</h3><ul class="cal-list">';
  RO_EVENTS.forEach(function (e) { h += '<li>' + esc(L.t(e.key)) + (e.verified ? '' : ' <span class="tag">' + esc(L.t('ro_unver')) + '</span>') + '</li>'; });
  h += '</ul>';
  if (gy >= 1583 && gy <= 9999) {
    h += '<h3>' + esc(fmt(L.t('easter_h'), gy)) + '</h3><ul class="cal-list"><li>' + esc(fmt(L.t('easter_w'), reg.gregorian.format(easterGregorian(gy), L))) + '</li><li>' + esc(fmt(L.t('easter_o'), reg.gregorian.format(orthodoxEasterGregorian(reg, gy), L))) + '</li></ul>';
  }
  host.innerHTML = h;
}
function renderTerms() {
  var L = cur.L, host = document.getElementById('cal-termsbox');
  if (!host) return;
  var gy = reg.gregorian.fromJD(state.jd).year, terms = reg.chinese.solarTerms(gy), ny = reg.chinese.toJD(gy, 1, 1, false);
  var title = document.getElementById('cal-terms-h');
  if (title) title.textContent = fmt(L.t('h_terms'), gy);
  if (!terms.length) { host.innerHTML = '<p class="note">' + esc(calName('chinese') + ': ' + L.t('na')) + '</p>'; return; }
  var rows = terms.map(function (t) {
    return '<tr><th scope="row">' + esc(t.hanzi + ' ' + t.pinyin) + '</th><td>' + t.lambda + '°</td><td>' + esc(fmtG(t.jdn - 0.5)) + '</td></tr>';
  }).join('');
  host.innerHTML = '<p class="note">' + esc(L.t('terms_hint')) + '</p>' + (isFinite(ny) ? '<p><strong>' + esc(fmt(L.t('cny'), gy, fmtG(ny))) + '</strong></p>' : '') +
    '<div class="tblw"><table class="tbl"><thead><tr><th scope="col">' + esc(L.t('th_term')) + '</th><th scope="col">' + esc(L.t('th_lon')) + '</th><th scope="col">' + esc(L.t('th_date')) + '</th></tr></thead><tbody>' + rows + '</tbody></table></div>';
}
function srcHtml(s) {
  function link(u) { return '<a href="' + esc(u) + '" target="_blank" rel="noopener noreferrer">' + esc(u.replace(/^https?:\/\/(en\.)?/, '')) + '</a>'; }
  if (/^https?:\/\/\S+$/.test(s)) return link(s);
  var m = /^(.*?)(https?:\/\/\S+)$/.exec(s);
  return m ? esc(m[1]) + link(m[2]) : esc(s);
}
function renderAtlas() {
  var L = cur.L, host = document.getElementById('cal-atlasbox');
  if (!host) return;
  var rows = ORDER.filter(function (id) { return DATA[id]; }).map(function (id) {
    var d = DATA[id], src = d.sources.map(srcHtml).join('<br>');
    var ep = isFinite(d.epoch_jd) ? (d.epoch_jd < 2299160.5 ? fmtJ(d.epoch_jd) + ' (' + L.t('cal_julian').split(' (')[0] + ')' : fmtG(d.epoch_jd)) : '';
    return '<tr><th scope="row">' + esc(calName(id)) + '<br><code>' + esc(d.plugin) + '</code></th><td>' + esc(L.t('reg_' + id)) + '</td><td>' + esc(String(d.epoch_jd)) + '<br><small>' + esc(ep) + '</small></td><td>' + esc(L.t('rule_' + id)) + '</td><td class="cal-src">' + src + '</td></tr>';
  }).join('');
  host.innerHTML = '<p class="note">' + esc(L.t('atlas_note')) + '</p><div class="tblw"><table class="tbl"><thead><tr><th scope="col">' + esc(L.t('th_name')) + '</th><th scope="col">' + esc(L.t('th_region')) + '</th><th scope="col">' + esc(L.t('th_epoch')) + '</th><th scope="col">' + esc(L.t('th_rule')) + '</th><th scope="col">' + esc(L.t('th_src')) + '</th></tr></thead><tbody>' + rows + '</tbody></table></div>';
}
function renderLimits() {
  var L = cur.L, host = document.getElementById('cal-limbox');
  if (!host) return;
  var h = '<ul class="cal-list">';
  for (var i = 1; i <= 6; i++) h += '<li>' + esc(L.t('lim_' + i)) + '</li>';
  host.innerHTML = h + '</ul>';
}
function renderOutputs() {
  renderResults();
  syncGridToState();
  renderGrid();
  renderRo();
  renderTerms();
}

/* ---------- copiere ---------- */
function copyText(text, btn) {
  var label = btn.textContent;
  var done = function () { btn.textContent = cur.L.t('copied'); setTimeout(function () { btn.textContent = label; }, 1200); };
  var fallback = function () {
    var ta = document.createElement('textarea');
    ta.value = text; ta.setAttribute('readonly', ''); ta.className = 'cal-offscreen';
    document.body.appendChild(ta); ta.select();
    try { if (document.execCommand('copy')) done(); } catch (e) { /* ignorat */ }
    document.body.removeChild(ta);
  };
  if (navigator.clipboard && navigator.clipboard.writeText) { navigator.clipboard.writeText(text).then(done, fallback); return; }
  fallback();
}

/* ---------- montare ---------- */
function mount(el, lang) {
  cur.el = el; cur.lang = lang; cur.L = makeL(lang);
  var L = cur.L, card = el.parentNode;
  if (card && card.classList) card.classList.add('in');
  var sel = ORDER.filter(function (id) { return reg[id]; }).map(function (id) { return '<option value="' + id + '"' + (id === state.cal ? ' selected' : '') + '>' + esc(calName(id)) + '</option>'; }).join('');
  el.innerHTML = '<p class="cal-intro">' + esc(L.t('intro')) + '</p>' +
    '<form class="cal-form" novalidate><h3>' + esc(L.t('h_conv')) + '</h3><div class="cal-row"><label class="cal-f" for="cal-sel"><span>' + esc(L.t('lbl_cal')) + '</span><select id="cal-sel" class="sel cal-inp">' + sel + '</select></label>' +
    '<div class="cal-fields" id="cal-fields"></div><button type="button" class="btn" id="cal-today">' + esc(L.t('today')) + '</button></div>' +
    '<p class="note">' + esc(L.t('hint_year')) + '</p><p class="note cal-caution" id="cal-caution"></p><p class="cal-msg" id="cal-msg" role="status" aria-live="polite"></p></form>' +
    '<h3>' + esc(L.t('h_res')) + '</h3><ul class="cal-chips" id="cal-chips"></ul><div class="tblw"><table class="tbl cal-res" id="cal-res"></table></div>';
  // carduri suplimentare, puse imediat după cardul aplicației
  var extra = [['cal-grid-card', 'cal-grid-h', L.t('h_grid'), '<div id="cal-gridbox"></div>'], ['cal-ro-card', 'cal-ro-h', L.t('h_ro'), '<div id="cal-robox"></div>'],
    ['cal-terms-card', 'cal-terms-h', fmt(L.t('h_terms'), reg.gregorian.fromJD(state.jd).year), '<div id="cal-termsbox"></div>'], ['cal-atlas-card', 'cal-atlas-h', L.t('h_atlas'), '<div id="cal-atlasbox"></div>'], ['cal-lim-card', 'cal-lim-h', L.t('h_limits'), '<div id="cal-limbox"></div>']];
  var html = extra.map(function (x) { return '<section class="card rv in cal-card" id="' + x[0] + '"><h2 id="' + x[1] + '">' + esc(x[2]) + '</h2>' + x[3] + '</section>'; }).join('');
  if (card && card.insertAdjacentHTML) card.insertAdjacentHTML('afterend', html);
  renderFields();
  el.querySelector('#cal-sel').addEventListener('change', function (e) { if (ORDER.indexOf(e.target.value) < 0) return; state.cal = e.target.value; saveState(); renderFields(); renderOutputs(); });
  el.querySelector('#cal-fields').addEventListener('input', onFieldsChange);
  el.querySelector('#cal-fields').addEventListener('change', onFieldsChange);
  el.querySelector('#cal-fields').addEventListener('paste', onPaste);
  el.querySelector('#cal-today').addEventListener('click', function () { state.jd = todayJD(); saveState(); fillFields(); renderOutputs(); });
  el.addEventListener('click', function (ev) { var b = ev.target.closest ? ev.target.closest('.cal-copy') : null; if (b) copyText(b.getAttribute('data-text'), b); });
  var gb = document.getElementById('cal-gridbox');
  gb.addEventListener('click', onGridClick);
  gb.addEventListener('change', function (e) { if (e.target.id === 'cal-other' && ORDER.indexOf(e.target.value) >= 0 && gridable(e.target.value)) { state.other = e.target.value; saveState(); renderGrid(); } });
  renderAtlas();
  renderLimits();
  renderOutputs();
}
