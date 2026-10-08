/* Shared script for every page: common menu, footer, structured data (JSON-LD) and small helpers.
   To add a tool: add it to TOOLS, then to index.html, its category home page, sitemap.xml and llms.txt.
   TOOLS: [category, schema.org application category, tools, category home page]. */
var SITE_NAME = 'FreeToolBox';
var REPO_URL = 'https://github.com/smiluv/toolbox';
var TOOLS = [
  ['Finance', 'FinanceApplication', [
    ['compound-interest-calculator', 'Compound Interest Calculator'],
    ['home-loan-calculator', 'Home Loan Calculator'],
    ['mortgage-payoff-calculator', 'Mortgage Payoff Calculator'],
    ['auto-loan-calculator', 'Auto Loan Calculator'],
    ['irr-calculator', 'IRR Calculator'],
    ['roi-calculator', 'ROI Calculator'],
    ['salary-to-hourly-calculator', 'Salary to Hourly Converter'],
    ['income-tax-calculator', 'Income Tax Calculator'],
    ['tds-calculator', 'TDS Calculator (India)'],
    ['gst-calculator', 'GST Calculator (India)'],
    ['gst-invoice-generator', 'GST Invoice / Bill Generator'],
    ['currency-converter', 'Currency Converter'],
    ['tip-calculator', 'Tip Calculator'],
    ['bill-splitter', 'Bill Splitter'],
    ['percentage-calculator', 'Percentage Calculator'],
    ['discount-calculator', 'Discount Calculator']
  ], 'finance-calculators'],
  ['Text & Code', 'DeveloperApplication', [
    ['word-counter', 'Word & Character Counter'],
    ['case-converter', 'Case Converter'],
    ['duplicate-line-remover', 'Duplicate Line Remover'],
    ['text-alphabetizer', 'Text Alphabetizer / Sorter'],
    ['json-formatter', 'JSON Formatter & Validator'],
    ['markdown-to-html', 'Markdown to HTML Converter'],
    ['base64-encoder-decoder', 'Base64 Encoder / Decoder'],
    ['url-encoder-decoder', 'URL Encoder / Decoder'],
    ['regex-tester', 'Regex Tester']
  ], 'text-code-tools'],
  ['CSS & Security', 'DeveloperApplication', [
    ['box-shadow-generator', 'CSS Box Shadow Generator'],
    ['css-gradient-generator', 'CSS Gradient Generator'],
    ['border-radius-generator', 'Border Radius Generator'],
    ['css-animation-generator', 'CSS Keyframe Animation Generator'],
    ['password-generator', 'Secure Password Generator'],
    ['uuid-generator', 'UUID / GUID Generator'],
    ['hash-generator', 'MD5 / SHA256 Hash Generator']
  ], 'css-security-tools'],
  ['Converters', 'UtilitiesApplication', [
    ['length-converter', 'Length Converter'],
    ['weight-converter', 'Weight Converter'],
    ['temperature-converter', 'Temperature Converter'],
    ['volume-converter', 'Volume Converter'],
    ['speed-converter', 'Speed Converter'],
    ['time-zone-converter', 'Time Zone Converter'],
    ['color-converter', 'Color Converter (HEX / RGB / HSL)'],
    ['qr-code-generator', 'QR Code Generator'],
    ['barcode-generator', 'Barcode Generator'],
    ['placeholder-image-generator', 'Placeholder Image Generator'],
    ['lorem-ipsum-generator', 'Lorem Ipsum Generator'],
    ['random-name-picker', 'Random Name Picker Wheel'],
    ['dice-roller', 'Dice Roller'],
    ['random-number-generator', 'Random Number Generator']
  ], 'converters-generators'],
  ['Health & Time', 'LifestyleApplication', [
    ['bmi-calculator', 'BMI Calculator'],
    ['bmr-calorie-calculator', 'BMR & Calorie Calculator'],
    ['one-rep-max-calculator', 'One Rep Max Calculator'],
    ['running-pace-calculator', 'Running Pace Calculator'],
    ['pomodoro-timer', 'Pomodoro Timer'],
    ['online-stopwatch', 'Online Stopwatch'],
    ['countdown-timer', 'Countdown Timer'],
    ['days-between-dates-calculator', 'Days Between Dates'],
    ['pregnancy-due-date-calculator', 'Pregnancy Due Date Calculator']
  ], 'health-time-tools'],
  ['Media', 'MultimediaApplication', [
    ['image-compressor', 'Image Compressor'],
    ['online-whiteboard', 'Online Whiteboard'],
    ['online-metronome', 'Online Metronome'],
    ['white-noise-generator', 'White Noise & Tone Generator']
  ], 'media-tools']
];

$(function () {
  var page = location.pathname.split('/').pop().replace(/\.html$/, '') || 'index', cat = null, tool = null;
  var hub = TOOLS.filter(function (c) { return c[3] === page; })[0];

  var nav = TOOLS.map(function (c) {
    var links = c[2].map(function (t) {
      if (t[0] === page) { cat = c; tool = t; }
      return '<a href="' + t[0] + '.html"' + (t[0] === page ? ' class="on" aria-current="page"' : '') + '>' + t[1] + '</a>';
    }).join('');
    return '<details><summary>' + c[0] + '</summary><div class="drop' + (c[2].length > 10 ? ' cols' : '') + '">' +
      '<a class="hub' + (c === hub ? ' on" aria-current="page' : '') + '" href="' + c[3] + '.html">See all ' + c[2].length + ' ' + c[0] + ' tools &rarr;</a>' + links + '</div></details>';
  }).join('');
  $('body').prepend('<header class="top"><div class="wrap site-bar"><a class="brand" href="index.html">Free<span>ToolBox</span></a>' +
    '<nav class="nav" aria-label="All tools">' + nav + '</nav>' +
    '<a class="gh-btn" href="' + REPO_URL + '" target="_blank" rel="noopener" title="Open source: view the code on GitHub" aria-label="Open source: view the code on GitHub">' +
    '<svg viewBox="0 0 16 16" width="18" height="18" aria-hidden="true"><path fill="currentColor" d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0016 8c0-4.42-3.58-8-8-8z"/></svg>' +
    '<span>Open source</span></a><button class="theme-btn"></button>' +
    '<button class="menu-btn" aria-label="Open menu" aria-expanded="false">&#9776;</button></div></header>');

  // Theme toggle; the saved choice is applied early by the one-line script in each page's <head>.
  var root = document.documentElement;
  function isDark() { return root.dataset.theme ? root.dataset.theme === 'dark' : matchMedia('(prefers-color-scheme: dark)').matches; }
  function themeIcon() { $('.theme-btn').html(isDark() ? '&#9728;&#65039;' : '&#127769;').attr('aria-label', isDark() ? 'Switch to light theme' : 'Switch to dark theme').attr('title', isDark() ? 'Light theme' : 'Dark theme'); }
  $('.theme-btn').on('click', function () {
    root.dataset.theme = isDark() ? 'light' : 'dark';
    try { localStorage.setItem('theme', root.dataset.theme); } catch (e) { }
    themeIcon(); rebuildCharts();
  });
  themeIcon();
  matchMedia('(prefers-color-scheme: dark)').addEventListener('change', rebuildCharts);

  $('.nav details').on('toggle', function () { if (this.open) $('.nav details').not(this).prop('open', false); });
  $(document).on('click', function (e) { if (!$(e.target).closest('.nav').length) $('.nav details').prop('open', false); });
  $('.menu-btn').on('click', function (e) { e.stopPropagation(); $(this).attr('aria-expanded', $('.nav').toggleClass('open').hasClass('open')); });

  var related = cat ? '<h3><a href="' + cat[3] + '.html">More ' + cat[0] + ' tools</a></h3><div class="related">' + cat[2].filter(function (t) { return t[0] !== page; })
    .map(function (t) { return '<a href="' + t[0] + '.html">' + t[1] + '</a>'; }).join('') + '</div>'
    : '<h3>Tool collections</h3><div class="related">' + TOOLS.filter(function (c) { return c !== hub; })
    .map(function (c) { return '<a href="' + c[3] + '.html">' + c[0] + ' tools</a>'; }).join('') + '</div>';

  // Breadcrumbs: Home > category home page > tool.
  var crumbs = cat || hub ? [['index.html', 'Home'], [(cat || hub)[3] + '.html', (cat || hub)[0] + ' tools']].concat(tool ? [[page + '.html', tool[1]]] : []) : [];
  if (crumbs.length) $('main h1').first().before('<nav class="crumbs" aria-label="Breadcrumb">' + crumbs.map(function (c, i) {
    return i < crumbs.length - 1 ? '<a href="' + c[0] + '">' + esc(c[1]) + '</a>' : '<span aria-current="page">' + esc(c[1]) + '</span>';
  }).join(' <span aria-hidden="true">&rsaquo;</span> ') + '</nav>');
  $('body').append('<footer class="foot"><div class="wrap">' + related +
    '<p class="muted">All tools run 100% in your browser: no sign-up, no tracking of your inputs, nothing is stored on a server. <a href="index.html">Browse all free online tools</a>.</p>' +
    '<p class="muted">' + SITE_NAME + ' is open source, so anyone can check exactly what runs on these pages. <a href="' + REPO_URL + '" target="_blank" rel="noopener">View the code on GitHub</a> &middot; ' +
    '<a href="' + REPO_URL + '/issues" target="_blank" rel="noopener">Report a bug</a> &middot; <a href="' + REPO_URL + '#contributing" target="_blank" rel="noopener">Contribute</a></p>' +
    '<p class="muted">&copy; ' + new Date().getFullYear() + ' <a href="https://smilu.net" target="_blank" rel="noopener">smilu.net</a>. ' + SITE_NAME + ' is a smilu.net project.</p></div></footer>');

  // <select data-deeplink="param">: page.html?param=<option data-slug or value> opens that option, and its data-h1 /
  // data-title / data-desc replace the H1, <title> and meta description, so each option is its own indexable URL.
  $('select[data-deeplink]').first().each(function () {
    var sel = $(this), key = sel.data('deeplink'), h1 = $('h1').first(), desc = $('meta[name=description]');
    var base = { h1: h1.text(), title: document.title, desc: desc.attr('content') }, canon = $('link[rel=canonical]');
    var url = canon.attr('href') || location.origin + location.pathname;
    function show(push) {
      var o = sel.find(':selected'), slug = o.data('slug') || o.val();
      h1.text(o.data('h1') || base.h1); document.title = o.data('title') || base.title; desc.attr('content', o.data('desc') || base.desc);
      canon.attr('href', url + '?' + key + '=' + encodeURIComponent(slug));
      if (push) history.replaceState(null, '', '?' + key + '=' + encodeURIComponent(slug));
    }
    var want = String(new URLSearchParams(location.search).get(key) || '').toLowerCase();
    var hit = want && sel.find('option').filter(function () { return String($(this).data('slug')).toLowerCase() === want || this.value.toLowerCase() === want; }).first();
    if (hit && hit.length) { sel.val(hit.val()).trigger('change'); show(false); }
    sel.on('change', function () { show(true); });
  });

  // Structured data for Google rich results and AI answer engines, built from the page's own meta tags and FAQ.
  var ld = [];
  if (cat) ld.push({
    '@context': 'https://schema.org', '@type': 'WebApplication', name: $('h1').first().text(), url: $('link[rel=canonical]').attr('href') || location.href,
    description: $('meta[name=description]').attr('content'), keywords: $('meta[name=keywords]').attr('content'),
    applicationCategory: cat[1], operatingSystem: 'Any (web browser)', isAccessibleForFree: true, browserRequirements: 'Requires JavaScript',
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' }
  });
  var faq = $('.about details').map(function () {
    return { '@type': 'Question', name: $(this).children('summary').text(), acceptedAnswer: { '@type': 'Answer', text: $(this).children().not('summary').text() } };
  }).get();
  if (faq.length) ld.push({ '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: faq });
  if (crumbs.length) ld.push({ '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: crumbs.map(function (c, i) {
    return { '@type': 'ListItem', position: i + 1, name: c[1], item: new URL(c[0], location.href).href };
  }) });
  var list = $('.tools a').map(function (i) { return { '@type': 'ListItem', position: i + 1, name: $(this).find('b').text(), url: this.href }; }).get();
  if (list.length) ld.push({ '@context': 'https://schema.org', '@type': 'ItemList', name: $('h1').first().text(), itemListElement: list });
  if (ld.length) { var s = document.createElement('script'); s.type = 'application/ld+json'; s.text = JSON.stringify(ld); document.head.appendChild(s); }

  // <input data-monthly="#annual"> mirrors an annual amount as a monthly one, both ways.
  $('[data-monthly]').each(function () {
    var m = $(this), a = $(m.data('monthly')), r2 = function (x) { return Math.round(x * 100) / 100; };
    m.on('input change', function () { a.val(m.val() === '' ? '' : r2(m.val() * 12)); });
    a.on('input change', function () { m.val(a.val() === '' ? '' : r2(a.val() / 12)); }).trigger('change');
  });

  // Pages that define a global calc() get live recalculation on any input change.
  if (typeof window.calc === 'function') { $(document).on('input change', '.card :input', function () { calc(); }); calc(); }

  // <label>Text <span class="v"></span><input type="range"></label> shows the slider value.
  // <div data-term="#input"><button data-v="30">…</button></div> = preset/toggle buttons that set that slider or hidden input.
  function syncRanges() {
    $('input[type=range]').each(function () { $(this).closest('label').find('.v').text(this.value); });
    $('[data-term]').each(function () { var v = $($(this).data('term')).val(); $(this).find('[data-v]').each(function () { var on = String($(this).data('v')) === v; $(this).toggleClass('on', on).attr('aria-pressed', on); }); });
  }
  $(document).on('input change', syncRanges); syncRanges();
  $(document).on('click', '[data-term] [data-v]', function () { $($(this).closest('[data-term]').data('term')).val($(this).data('v')).trigger('input'); });

  $(document).on('click', '[data-copy]', function () {
    var b = $(this), $t = $(b.data('copy')), label = b.data('label') || b.text();
    b.data('label', label);
    copyText($t.is(':input') ? $t.val() : $t.text());
    b.text('Copied!'); setTimeout(function () { b.text(label); }, 1200);
  });
});

function num(sel) { var v = parseFloat($(sel).val()); return isNaN(v) ? 0 : v; }
function fmt(n, d) { d = d == null ? 2 : d; return isFinite(n) ? Number(n).toLocaleString(undefined, { minimumFractionDigits: d, maximumFractionDigits: d }) : '—'; }
function fmtSig(x) {
  if (!isFinite(x)) return '—';
  if (x === 0) return '0';
  var a = Math.abs(x);
  return a >= 1e-6 && a < 1e15 ? (+x.toPrecision(10)).toLocaleString(undefined, { maximumFractionDigits: 10 }) : x.toExponential(6);
}
function pad(n) { return String(n).padStart(2, '0'); }
function esc(s) { return String(s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); }

function copyText(v) {
  if (navigator.clipboard && window.isSecureContext) return navigator.clipboard.writeText(v);
  var t = $('<textarea>').val(v).appendTo('body').select(); document.execCommand('copy'); t.remove();
}

// Unbiased cryptographic random integer in [min, max].
function randInt(min, max) {
  var range = max - min + 1;
  if (range > 4294967296) return min + Math.floor(Math.random() * range);
  var lim = Math.floor(4294967296 / range) * range, a = new Uint32Array(1);
  do { crypto.getRandomValues(a); } while (a[0] >= lim);
  return min + a[0] % range;
}

// ---- Charts: pages that use these load Chart.js (CDN) before site.js. ----
var COLORS = ['#2563eb', '#f59e0b', '#16a34a', '#a855f7', '#ef4444', '#06b6d4', '#ec4899', '#84cc16'], CHARTS = {};
var compactFmt = new Intl.NumberFormat(undefined, { notation: 'compact', maximumFractionDigits: 1 });
function compact(v) { return compactFmt.format(v); }
function cssVar(n) { return getComputedStyle(document.documentElement).getPropertyValue(n).trim(); }
function sum(a, k) { return a.reduce(function (s, r) { return s + (k == null ? r : r[k]); }, 0); }

// Creates the chart on first call, then updates it in place so it animates. Values in tooltips are formatted as money.
function drawChart(id, cfg) {
  if (!window.Chart) return;
  cfg.options = $.extend(true, {
    maintainAspectRatio: false,
    plugins: { legend: { labels: { usePointStyle: true } }, tooltip: { callbacks: { label: function (t) {
      var v = t.parsed !== null && typeof t.parsed === 'object' ? t.parsed[t.chart.options.indexAxis === 'y' ? 'x' : 'y'] : t.parsed;
      return ' ' + (t.dataset.label || t.label) + ': ' + fmt(v);
    } } } }
  }, cfg.options);
  var c = CHARTS[id];
  if (c && c.config.type === cfg.type && c.data.datasets.length === cfg.data.datasets.length) {
    c.data.labels = cfg.data.labels;
    cfg.data.datasets.forEach(function (d, i) { $.extend(c.data.datasets[i], d); });
    c.options = cfg.options;
    return c.update();
  }
  if (c) c.destroy();
  Chart.defaults.color = cssVar('--muted');
  Chart.defaults.borderColor = cssVar('--line');
  Chart.defaults.font.family = getComputedStyle(document.body).fontFamily;
  CHARTS[id] = new Chart(id, cfg);
}
// Charts take theme colours when created, so recreate them all after a theme switch.
function rebuildCharts() {
  if ($.isEmptyObject(CHARTS)) return;
  $.each(CHARTS, function (k, c) { c.destroy(); }); CHARTS = {};
  if (typeof window.calc === 'function') calc();
}
// parts: [[label, value, colour]] -> doughnut chart plus an HTML legend (<ul>) with amounts and shares.
function donut(id, legend, parts) {
  var total = sum(parts.map(function (p) { return Math.max(p[1], 0); })), d = total >= 10000 ? 0 : 2;
  $(legend).html(parts.map(function (p) {
    return '<li><i style="background:' + p[2] + '"></i><span>' + esc(p[0]) + ' <small>' + fmt(total ? p[1] / total * 100 : 0, 1) + '%</small></span><b>' + fmt(p[1], d) + '</b></li>';
  }).join(''));
  drawChart(id, {
    type: 'doughnut',
    data: { labels: parts.map(function (p) { return p[0]; }), datasets: [{ data: parts.map(function (p) { return Math.max(p[1], 0); }), backgroundColor: parts.map(function (p) { return p[2]; }), borderColor: cssVar('--card'), borderWidth: 2, hoverOffset: 10 }] },
    options: { cutout: '70%', layout: { padding: 6 }, plugins: { legend: { display: false } } }
  });
  return total;
}

// items: [[title, detail, value, colour]] -> rows with bars scaled to the largest value; on = index to highlight.
function compareBars(sel, items, on) {
  var max = Math.max.apply(null, items.map(function (x) { return x[2]; })) || 1;
  $(sel).html(items.map(function (x, k) {
    return '<div class="cmp-row' + (k === on ? ' on' : '') + '"><div class="cmp-head"><b>' + x[0] + '</b><span>' + x[1] + '</span></div>' +
      '<div class="cmp-bar"><i style="width:' + Math.max(x[2], 0) / max * 100 + '%;background:' + x[3] + '"></i></div></div>';
  }).join(''));
}

// ---- Loans ----
function dur(m) { return ((m >= 12 ? Math.floor(m / 12) + ' yr' + (m >= 24 ? 's' : '') + ' ' : '') + (m % 12 ? m % 12 + ' mo' : '')).trim(); }
function emiFor(P, i, N) { return i ? P * i / (1 - Math.pow(1 + i, -N)) : P / N; }
// Reducing-balance schedule, one row per month: [principal, interest, balance]. pay = EMI plus any extra.
function amortize(L, i, pay, maxN) {
  var rows = [], it, pr;
  while (L > 0.005 && rows.length < (maxN || 1200)) { it = L * i; pr = Math.min(pay - it, L); if (pr <= 0) break; L -= pr; rows.push([pr, it, L]); }
  return rows;
}
// Yearly principal/interest bars and the balance line; base = schedule without extra payments (dashed line).
function amortChart(id, rows, base) {
  var labels = [], P = [], I = [], B = [], BB = [], last = function (s) { return s.length ? s[s.length - 1][2] : 0; };
  for (var y = 0; y < Math.ceil(Math.max(rows.length, base ? base.length : 0) / 12); y++) {
    var s = rows.slice(y * 12, y * 12 + 12);
    labels.push(y + 1); P.push(sum(s, 0)); I.push(sum(s, 1)); B.push(last(s));
    if (base) BB.push(last(base.slice(y * 12, y * 12 + 12)));
  }
  drawChart(id, {
    type: 'bar',
    data: { labels: labels, datasets: [
      { label: 'Principal paid', data: P, backgroundColor: COLORS[0], stack: 's', borderRadius: 3, order: 1 },
      { label: 'Interest paid', data: I, backgroundColor: COLORS[1], stack: 's', borderRadius: 3, order: 1 },
      { type: 'line', label: 'Balance owed', data: B, borderColor: COLORS[2], backgroundColor: 'rgba(22,163,74,.12)', fill: true, tension: 0.3, pointRadius: 0, pointHoverRadius: 5, yAxisID: 'y1', order: 0 },
      { type: 'line', label: 'Balance without extra payments', data: base ? BB : [], borderColor: cssVar('--muted'), borderDash: [6, 4], borderWidth: 2, tension: 0.3, pointRadius: 0, pointHoverRadius: 4, yAxisID: 'y1', order: 0 }
    ] },
    options: {
      interaction: { mode: 'index', intersect: false },
      scales: {
        x: { stacked: true, title: { display: true, text: 'Year' }, grid: { display: false } },
        y: { stacked: true, title: { display: true, text: 'Paid per year' }, ticks: { callback: compact } },
        y1: { position: 'right', beginAtZero: true, grid: { drawOnChartArea: false }, title: { display: true, text: 'Balance owed' }, ticks: { callback: compact } }
      },
      plugins: { legend: { labels: { filter: function (it, d) { return d.datasets[it.datasetIndex].data.length; } } }, tooltip: { callbacks: { title: function (t) { return 'Year ' + t[0].label; } } } }
    }
  });
}

function downloadCanvas(canvas, name) { var a = document.createElement('a'); a.download = name; a.href = canvas.toDataURL('image/png'); a.click(); }

// Shared AudioContext; call ac() from a click handler first so browsers allow sound.
var _ac;
function ac() { _ac = _ac || new (window.AudioContext || window.webkitAudioContext)(); if (_ac.state === 'suspended') _ac.resume(); return _ac; }
function beep(freq, times) {
  try {
    var a = ac(), t = a.currentTime;
    for (var i = 0; i < (times || 3); i++) {
      var o = a.createOscillator(), g = a.createGain(), s = t + i * 0.4;
      o.frequency.value = freq || 880; o.connect(g); g.connect(a.destination);
      g.gain.setValueAtTime(0.3, s); g.gain.exponentialRampToValueAtTime(0.001, s + 0.3);
      o.start(s); o.stop(s + 0.3);
    }
  } catch (e) { }
}

// Unit converter used by length/weight/temperature/volume/speed pages.
// units: { label: factorToBase } or { label: [toBaseFn, fromBaseFn] } for non-linear scales.
function unitConverter(units, from, to) {
  var keys = Object.keys(units), opts = keys.map(function (k) { return '<option>' + k + '</option>'; }).join('');
  var toBase = function (u, v) { return typeof u === 'number' ? v * u : u[0](v); };
  var fromBase = function (u, b) { return typeof u === 'number' ? b / u : u[1](b); };
  $('#from').html(opts).val(from || keys[0]);
  $('#to').html(opts).val(to || keys[1]);
  window.calc = function () {
    var v = parseFloat($('#val').val());
    if (isNaN(v)) { $('#out').text('Enter a number to convert.'); $('#all').empty(); return; }
    var base = toBase(units[$('#from').val()], v);
    $('#out').html(fmtSig(v) + ' ' + esc($('#from').val()) + ' =<br><span class="big">' + fmtSig(fromBase(units[$('#to').val()], base)) + '</span> ' + esc($('#to').val()));
    $('#all').html('<tr><th>Unit</th><th>Value</th></tr>' + keys.map(function (k) { return '<tr><td>' + k + '</td><td>' + fmtSig(fromBase(units[k], base)) + '</td></tr>'; }).join(''));
  };
  $('#swap').on('click', function () { var f = $('#from').val(); $('#from').val($('#to').val()); $('#to').val(f); calc(); });
}
