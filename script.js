// ---------------------------------------------------------------
// You shouldn't need to edit this file to add content.
// To add tools, apps, or points, edit content.js instead.
// ---------------------------------------------------------------

function icon(name){
  return `<span class="icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">${icons[name]}</svg></span>`;
}
function iconBadge(name){
  return `<span class="icon-badge"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round">${icons[name]}</svg></span>`;
}

let current = 'email';
let currentApp = 0;
let theme = 'light';

function applyTheme(){
  document.documentElement.setAttribute('data-theme', theme);
}
document.getElementById('themeToggle').onclick = () => {
  theme = theme === 'light' ? 'dark' : 'light';
  applyTheme();
};

function render(){
  const sb = document.getElementById('items');
  sb.innerHTML = '';
  data.forEach(t => {
    const r = ramps[t.color];
    const el = document.createElement('div');
    el.className = 'item' + (t.id === current ? ' active' : '');
    el.style.setProperty('--tint', r.tint);
    el.style.setProperty('--accent', r.accent);
    el.innerHTML = iconBadge(t.icon) + t.label;
    el.onclick = () => { current = t.id; currentApp = 0; render(); };
    sb.appendChild(el);
  });

  const gWrap = document.getElementById('glossaryWrap');
  gWrap.innerHTML = '';
  const r = ramps[glossary.color];
  const gEl = document.createElement('div');
  gEl.className = 'item' + (current === glossary.id ? ' active' : '');
  gEl.style.setProperty('--tint', r.tint);
  gEl.style.setProperty('--accent', r.accent);
  gEl.innerHTML = iconBadge(glossary.icon) + glossary.label;
  gEl.onclick = () => { current = glossary.id; render(); };
  gWrap.appendChild(gEl);

  const item = data.find(t => t.id === current) || glossary;
  const rr = ramps[item.color];
  const main = document.getElementById('main');
  main.style.setProperty('--tint', rr.tint);
  main.style.setProperty('--accent', rr.accent);

  const hasApps = !!item.apps;
  const points = hasApps ? item.apps[currentApp].points : item.points;

  main.innerHTML = `
    <span class="tag" style="background:${rr.tint};color:${rr.accent}">${icon(item.icon)}${item === glossary ? 'Baseline' : 'Everyday tool'}</span>
    <h1>${item.label}</h1>
    <p class="lede">Plain, no-jargon points — tap through, no scrolling essays.</p>
    ${hasApps ? `<div class="subtabs" id="subtabs"></div>` : ''}
    <div class="points">
      ${points.map((p, i) => `
        <div class="point">
          <div class="num" style="background:${rr.tint};color:${rr.accent}">${i + 1}</div>
          <p>${p}</p>
        </div>`).join('')}
    </div>`;

  if (hasApps){
    const tabWrap = document.getElementById('subtabs');
    item.apps.forEach((a, i) => {
      const tb = document.createElement('div');
      tb.className = 'subtab' + (i === currentApp ? ' active' : '');
      tb.textContent = a.name;
      tb.style.setProperty('--accent', rr.accent);
      tb.onclick = () => { currentApp = i; render(); };
      tabWrap.appendChild(tb);
    });
  }
}

applyTheme();
render();
