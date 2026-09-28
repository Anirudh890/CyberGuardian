// ---------------------------------------------------------------
// You shouldn't need to edit this file to change content.
// Edit content.js instead.
// ---------------------------------------------------------------

const $ = id => document.getElementById(id);

function svgIcon(name, cls, width){
  return `<span class="${cls}"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="${width}" stroke-linecap="round" stroke-linejoin="round">${icons[name]}</svg></span>`;
}
const icon = name => svgIcon(name, 'icon', 1.6);
const iconBadge = name => svgIcon(name, 'icon-badge', 1.7);

const groupLabels = {
  security:'Information security',
  privacy:'Data privacy',
  incidents:'Something happened',
  checkup:'Self check-up',
  tryit:'Try it',
  curious:'For the curious'
};
const groupOrder = ['security','privacy','incidents','checkup','tryit','curious'];

let current = location.hash.slice(1) || null;
let currentApp = 0;
let theme = 'light';
let mode = 'safe';
let situation = null;
let scamAns = scamCheck.questions.map(() => null);
let spotAns = spot.map(() => null);
const load = key => { try { return new Set(JSON.parse(localStorage.getItem(key)) || []); } catch (e) { return new Set(); } };
const save = (key, set) => { try { localStorage.setItem(key, JSON.stringify([...set])); } catch (e) {} };
let done = load('cg-core3');
let extraDone = load('cg-extra');

const sidebar = $('sidebar');
const backdrop = $('backdrop');
const openTopicsButton = $('openTopics');
const closeTopicsButton = $('closeTopics');
const welcome = $('welcome');
const main = $('main');

sidebar.inert = true;

function applyTheme(){
  document.documentElement.setAttribute('data-theme', theme);
}

function accentFor(ramp){
  return theme === 'dark' ? ramp.darkAccent : ramp.accent;
}

function setTopicsOpen(isOpen){
  sidebar.classList.toggle('open', isOpen);
  sidebar.inert = !isOpen;
  backdrop.classList.toggle('visible', isOpen);
  sidebar.setAttribute('aria-hidden', isOpen ? 'false' : 'true');
  openTopicsButton.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
  if (isOpen) closeTopicsButton.focus();
}

// Navigation uses the URL hash, so Back works and topics can be linked.
function go(id){
  current = id || null;
  currentApp = 0;
  setTopicsOpen(false);
  if (location.hash.slice(1) !== (id || '')) location.hash = id || '';
  else render();
}

function renderMode(){
  const m = modes[mode];
  const sit = mode === 'help' ? m.situations.find(x => x.id === situation) : null;
  $('cardKicker').textContent = m.kicker;
  $('welcomeCard').classList.toggle('help', mode === 'help');
  document.querySelectorAll('.mode-toggle button').forEach(b =>
    b.setAttribute('aria-pressed', b.dataset.mode === mode ? 'true' : 'false'));
  $('modeBody').innerHTML =
    (mode === 'help' ? `<div class="chips" role="group" aria-label="What happened?">${m.situations.map(x =>
      `<button type="button" class="chip" data-sit="${x.id}" aria-pressed="${x.id === situation}">${x.label}</button>`).join('')}<button type="button" class="chip chip-more" data-go="situations">More situations →</button></div>` : '') +
    (sit ? sit.steps : m.steps).map((st, i) => `
    <div class="guide-step">
      <span class="step-number">0${i + 1}</span>
      <span class="step-body"><strong>${st[0]}</strong><span>${st[1]}</span></span>
    </div>`).join('') +
    `<button type="button" class="card-link" data-go="${m.link[1]}">${m.link[0]}</button>`;
}

const STAR = '<svg class="star" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2.5l2.9 6 6.6.9-4.8 4.6 1.2 6.5L12 17.4 6.1 20.5l1.2-6.5L2.5 9.4l6.6-.9z"/></svg>';

const BADGE = '<svg class="badge" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2l8 4.5v9L12 22l-8-6.5v-9z"/><path class="b-star" d="M12 7.5l1.4 2.8 3.1.4-2.2 2.1.5 3.1-2.8-1.5-2.8 1.5.5-3.1-2.2-2.1 3.1-.4z"/></svg>';

function score(){
  return checkup.items.reduce((sum, it, i) => sum + (done.has(i) ? it[2] : 0), 0);
}

function covered(id){
  const idx = checkup.extras.map((e, i) => [e[0], i]).filter(e => e[0] === id);
  return idx.length > 0 && idx.every(e => extraDone.has(e[1]));
}

function updateScore(){
  const pct = score();
  const band = checkup.bands.filter(b => pct >= b[0]).pop();
  const ex = extraDone.size, exTotal = checkup.extras.length;
  const platinum = pct === 100 && ex === exTotal;
  document.querySelectorAll('.check-pct').forEach(el => el.textContent = pct + '%');
  document.querySelectorAll('.meter').forEach(m => [...m.children].forEach((seg, i) =>
    seg.style.setProperty('--f', Math.max(0, Math.min(1, (pct - i * 100 / 3) / (100 / 3))) * 100 + '%')));
  document.querySelectorAll('.star').forEach(el => el.classList.toggle('gold', pct === 100));
  document.querySelectorAll('.badge').forEach(el => el.classList.toggle('platinum', platinum));
  $('bubbleNote').textContent = `${band[1]} · ${ex} of ${exTotal} extras`;
  if ($('level')){
    const next = checkup.items.filter((it, i) => !done.has(i)).sort((a, b) => b[2] - a[2])[0];
    $('level').textContent = platinum ? 'Platinum' : band[1];
    $('extraCount').textContent = `${ex} of ${exTotal}`;
    $('cuNote').textContent = platinum
      ? 'Platinum! You have covered the essentials and every level-up step. Well done.'
      : band[2] + (next ? ` Next best step: ${next[0].toLowerCase()}.` : ' Open Level up below to earn the platinum badge.');
  }
}

function renderSidebar(){
  const nav = $('items');
  nav.innerHTML = '';

  groupOrder.forEach(group => {
    const groupItems = data.filter(item => item.group === group);
    if (!groupItems.length) return;

    const section = document.createElement('section');
    section.className = 'sidebar-group';
    section.setAttribute('aria-labelledby', `group-${group}`);
    section.innerHTML = `<div class="sidebar-group-title" id="group-${group}">${groupLabels[group]}</div>`;

    groupItems.forEach(t => {
      const r = ramps[t.color] || ramps.blue;
      const el = document.createElement('button');
      el.type = 'button';
      el.className = 'item' + (t.id === current ? ' active' : '');
      el.style.setProperty('--tint', r.tint);
      el.style.setProperty('--accent', accentFor(r));
      el.innerHTML = `
        ${iconBadge(t.icon)}
        <span class="item-copy">
          <strong>${t.label}</strong>
          <small>${t.description}</small>
        </span>${covered(t.id) ? '<span class="done-tick" role="img" aria-label="Level-up steps done">✓</span>' : ''}`;
      el.onclick = () => go(t.id);
      section.appendChild(el);
    });

    nav.appendChild(section);
  });
}

function checkupHTML(){
  const groups = {};
  checkup.extras.forEach((e, i) => (groups[e[0]] = groups[e[0]] || []).push([i, e[1]]));
  return `
    <div class="checkup-status"><span class="level" id="level"></span><span class="cu-score"><span class="check-pct"></span>${STAR}${BADGE}</span></div>
    <span class="meter meter-lg"><i></i><i></i><i></i></span>
    <p class="cu-note" id="cuNote"></p>
    <div class="points">
      ${checkup.items.map((c, i) => `
        <label class="point check">
          <input type="checkbox" data-i="${i}" ${done.has(i) ? 'checked' : ''}>
          <p><strong>${c[0]}</strong><small>${c[1]}</small></p>
          <span class="impact">+${c[2]}%</span>
        </label>`).join('')}
    </div>
    <details class="levelup">
      <summary>Level up <span class="lu-count" id="extraCount"></span></summary>
      ${Object.entries(groups).map(([id, list]) => `
        <div class="lu-group">
          <div class="lu-head"><b>${data.find(t => t.id === id).label}</b><button type="button" class="reset" data-go="${id}">Open topic →</button></div>
          ${list.map(([i, text]) => `
            <label class="point check"><input type="checkbox" data-x="${i}" ${extraDone.has(i) ? 'checked' : ''}><p>${text}</p></label>`).join('')}
        </div>`).join('')}
    </details>`;
}

function scamCheckHTML(){
  return `
    <div class="points">
      ${scamCheck.questions.map((q, i) => `
        <div class="point">
          <div class="num">${i + 1}</div>
          <div class="q-body"><p>${q}</p>
            <div class="yn">
              <button type="button" class="yn-btn" data-q="${i}" data-a="1">Yes</button>
              <button type="button" class="yn-btn" data-q="${i}" data-a="0">No</button>
            </div></div>
        </div>`).join('')}
    </div>
    <div class="verdict" id="verdict" aria-live="polite" hidden></div>`;
}

function updateScamCheck(){
  document.querySelectorAll('[data-q]').forEach(b =>
    b.setAttribute('aria-pressed', String(scamAns[b.dataset.q] === +b.dataset.a)));
  const box = $('verdict');
  const all = scamAns.every(a => a !== null);
  box.hidden = !all;
  if (!all) return;
  const yes = scamAns.reduce((n, a) => n + a, 0);
  const [level, title, text] = scamCheck.verdicts[Math.min(yes, 2)];
  box.className = 'verdict v-' + level;
  box.innerHTML = `<b>${title}</b><p>${text}</p><button type="button" class="reset" data-reset="scam">Start again</button>`;
}

function spotHTML(){
  return `
    <div class="points">
      ${spot.map((s, i) => `
        <div class="point">
          <div class="num">${i + 1}</div>
          <div class="spot-body"><blockquote>${s[0]}</blockquote>
            <div class="yn">
              <button type="button" class="yn-btn" data-spot="${i}" data-a="0">Real</button>
              <button type="button" class="yn-btn" data-spot="${i}" data-a="1">Scam</button>
            </div>
            <p class="spot-result" id="sr${i}" aria-live="polite"></p></div>
        </div>`).join('')}
    </div>
    <p class="cu-note" id="spotScore"></p>`;
}

function updateSpot(){
  spot.forEach((s, i) => {
    const a = spotAns[i];
    const right = a === +s[1];
    document.querySelectorAll(`[data-spot="${i}"]`).forEach(b => {
      b.setAttribute('aria-pressed', String(a === +b.dataset.a));
      b.disabled = a !== null;
    });
    const r = $('sr' + i);
    r.className = 'spot-result' + (a === null ? '' : right ? ' ok' : ' bad');
    r.textContent = a === null ? '' : (right ? 'Correct. ' : 'Not quite. ') + s[2];
  });
  const correct = spotAns.filter((a, i) => a === +spot[i][1]).length;
  $('spotScore').innerHTML = spotAns.every(a => a !== null)
    ? `You got ${correct} of ${spot.length}. <button type="button" class="reset" data-reset="spot">Try again</button>` : '';
}

function situationsHTML(){
  const all = [...modes.help.situations, ...moreSituations];
  return sitGroups.map(g => `
    <h2 class="grp">${g}</h2>
    <div class="points">
      ${all.filter(x => x.g === g).map(x => `
        <details class="point sit">
          <summary>${x.label}</summary>
          <ol>${x.steps.map(st => `<li>${Array.isArray(st) ? `<b>${st[0]}</b> ${st[1]}` : st}</li>`).join('')}</ol>
        </details>`).join('')}
    </div>`).join('');
}

const views = { checkup:checkupHTML, scamcheck:scamCheckHTML, spot:spotHTML, situations:situationsHTML };
const updaters = { checkup:updateScore, scamcheck:updateScamCheck, spot:updateSpot };

function render(){
  renderSidebar();

  const item = data.find(t => t.id === current);
  if (!item){
    current = null;
    welcome.hidden = false;
    main.hidden = true;
    main.innerHTML = '';
    return;
  }

  welcome.hidden = true;
  main.hidden = false;

  const rr = ramps[item.color] || ramps.blue;
  main.style.setProperty('--tint', rr.tint);
  main.style.setProperty('--accent', accentFor(rr));

  const app = item.apps ? item.apps[currentApp] : null;
  const body = item.view ? views[item.view]() : `
    <div class="points">
      ${(app ? app.points : item.points).map((p, i) => `
        <div class="point">
          <div class="num">${i + 1}</div>
          <p>${p}</p>
        </div>`).join('')}
    </div>`;

  main.innerHTML = `
    <div class="content-head">
      <span class="tag">${icon(item.icon)}${item.tag}</span>
      <button class="content-home" type="button" data-go="">Home</button>
    </div>
    <h1>${item.label}${app ? ` <span class="app-heading">· ${app.name}</span>` : ''}</h1>
    <p class="lede">${item.description}</p>
    ${app ? '<div class="subtabs" id="subtabs" role="group" aria-label="Choose an app"></div>' : ''}
    ${body}`;

  if (app){
    const tabs = $('subtabs');
    item.apps.forEach((a, i) => {
      const ar = ramps[a.color] || rr;
      const tb = document.createElement('button');
      tb.type = 'button';
      tb.className = 'subtab' + (i === currentApp ? ' active' : '');
      tb.textContent = a.name;
      tb.setAttribute('aria-pressed', i === currentApp ? 'true' : 'false');
      tb.style.setProperty('--accent', accentFor(ar));
      tb.style.setProperty('--tint', ar.tint);
      tb.onclick = () => { currentApp = i; render(); };
      tabs.appendChild(tb);
    });
  }

  if (item.view && updaters[item.view]) updaters[item.view]();
}

document.addEventListener('click', e => {
  const goBtn = e.target.closest('[data-go]');
  if (goBtn) return go(goBtn.dataset.go);

  const modeBtn = e.target.closest('[data-mode]');
  if (modeBtn){ mode = modeBtn.dataset.mode; return renderMode(); }

  const sit = e.target.closest('[data-sit]');
  if (sit){
    situation = situation === sit.dataset.sit ? null : sit.dataset.sit;
    renderMode();
    return document.querySelector(`[data-sit="${sit.dataset.sit}"]`).focus();
  }

  const q = e.target.closest('[data-q]');
  if (q){ scamAns[q.dataset.q] = +q.dataset.a; return updateScamCheck(); }

  const sp = e.target.closest('[data-spot]');
  if (sp){ spotAns[sp.dataset.spot] = +sp.dataset.a; return updateSpot(); }

  const reset = e.target.closest('[data-reset]');
  if (reset){
    if (reset.dataset.reset === 'scam'){ scamAns.fill(null); updateScamCheck(); }
    else { spotAns.fill(null); updateSpot(); }
    return;
  }

  const pillar = e.target.closest('[data-pillar]');
  if (pillar){
    setTopicsOpen(true);
    requestAnimationFrame(() => {
      const heading = $(`group-${pillar.dataset.pillar}`);
      if (heading) heading.scrollIntoView({ block:'start', behavior:'smooth' });
    });
  }
});

main.addEventListener('change', e => {
  if (e.target.type !== 'checkbox') return;
  const extra = e.target.dataset.x !== undefined;
  const set = extra ? extraDone : done;
  const i = +(extra ? e.target.dataset.x : e.target.dataset.i);
  if (e.target.checked) set.add(i); else set.delete(i);
  save(extra ? 'cg-extra' : 'cg-core3', set);
  updateScore();
  if (extra) renderSidebar();
});

$('themeToggle').onclick = () => {
  theme = theme === 'light' ? 'dark' : 'light';
  applyTheme();
  render();
};
$('brandHome').onclick = () => go('');
$('topbarHome').onclick = () => go('');
$('sidebarHome').onclick = () => go('');
$('startButton').onclick = () => setTopicsOpen(true);
openTopicsButton.onclick = () => setTopicsOpen(true);
closeTopicsButton.onclick = () => setTopicsOpen(false);
backdrop.onclick = () => setTopicsOpen(false);
document.addEventListener('keydown', e => { if (e.key === 'Escape') setTopicsOpen(false); });

window.addEventListener('hashchange', () => {
  current = location.hash.slice(1) || null;
  currentApp = 0;
  render();
  const h = main.querySelector('h1');
  if (h){ h.tabIndex = -1; h.focus({ preventScroll:true }); }
});

$('tipText').textContent = tips[Math.floor(Date.now() / 864e5) % tips.length];
applyTheme();
renderMode();
render();
updateScore();
