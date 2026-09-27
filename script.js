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

let current = null;
let currentApp = 0;
let theme = 'light';

const groupLabels = {
  security:'Information security',
  privacy:'Data privacy',
  incidents:'Something happened'
};

const categoryLabels = {
  email:'Communication',
  phone:'Calls & messages',
  banking:'Money & payments',
  messaging:'Chat & messaging',
  social:'Social & sharing',
  browser:'Web browsing',
  wifi:'Network security',
  passwords:'Account security',
  'phone-device':'Device security',
  usb:'Physical media',
  scams:'Scams & social engineering',
  'updates-backups':'Updates & backups',
  'privacy-permissions':'Privacy & permissions',
  shopping:'Online shopping',
  'accounts-recovery':'Account security',
  'data-privacy':'Data privacy',
  'incident-security':'Security incident help',
  'incident-privacy':'Privacy incident help'
};

const groupOrder = ['security','privacy','incidents'];

const sidebar = document.getElementById('sidebar');
const backdrop = document.getElementById('backdrop');
const openTopicsButton = document.getElementById('openTopics');
const closeTopicsButton = document.getElementById('closeTopics');
const startButton = document.getElementById('startButton');
const welcome = document.getElementById('welcome');
const main = document.getElementById('main');
const sidebarHome = document.getElementById('sidebarHome');

function applyTheme(){
  document.documentElement.setAttribute('data-theme', theme);
}

function accentFor(ramp){
  return theme === 'dark' ? (ramp.darkAccent || ramp.accent) : ramp.accent;
}

function setTopicsOpen(isOpen){
  sidebar.classList.toggle('open', isOpen);
  backdrop.classList.toggle('visible', isOpen);
  sidebar.setAttribute('aria-hidden', isOpen ? 'false' : 'true');
  openTopicsButton.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
  if (isOpen){ closeTopicsButton.focus(); }
}

document.getElementById('themeToggle').onclick = () => {
  theme = theme === 'light' ? 'dark' : 'light';
  applyTheme();
  render();
};

function goHome(){
  current = null;
  currentApp = 0;
  setTopicsOpen(false);
  render();
}

document.getElementById('brandHome').onclick = goHome;
sidebarHome.onclick = goHome;
openTopicsButton.onclick = () => setTopicsOpen(true);
closeTopicsButton.onclick = () => setTopicsOpen(false);
backdrop.onclick = () => setTopicsOpen(false);
startButton.onclick = () => setTopicsOpen(true);

document.querySelectorAll('[data-open-topics]').forEach(button => {
  button.addEventListener('click', () => setTopicsOpen(true));
});

document.querySelectorAll('.pillar-link').forEach(button => {
  button.addEventListener('click', () => {
    const group = button.dataset.pillar;
    setTopicsOpen(true);
    requestAnimationFrame(() => {
      const heading = document.getElementById(`group-${group}`);
      if (heading) heading.scrollIntoView({ block: 'start', behavior: 'smooth' });
    });
  });
});

document.addEventListener('keydown', event => {
  if (event.key === 'Escape') setTopicsOpen(false);
});

function renderSidebar(){
  const sb = document.getElementById('items');
  sb.innerHTML = '';

  groupOrder.forEach(group => {
    const groupItems = data.filter(item => item.group === group);
    if (!groupItems.length) return;

    const section = document.createElement('section');
    section.className = 'sidebar-group';
    section.setAttribute('aria-labelledby', `group-${group}`);

    const heading = document.createElement('div');
    heading.className = 'sidebar-group-title';
    heading.id = `group-${group}`;
    heading.textContent = groupLabels[group];
    section.appendChild(heading);

    groupItems.forEach(t => {
      const r = ramps[t.color] || ramps.blue;
      const accent = accentFor(r);
      const el = document.createElement('button');
      el.type = 'button';
      el.className = 'item' + (t.id === current ? ' active' : '');
      el.style.setProperty('--tint', r.tint);
      el.style.setProperty('--accent', accent);
      el.innerHTML = `
        ${iconBadge(t.icon)}
        <span class="item-copy">
          <strong>${t.label}</strong>
          <small>${t.description}</small>
        </span>`;
      el.onclick = () => {
        current = t.id;
        currentApp = 0;
        setTopicsOpen(false);
        render();
      };
      section.appendChild(el);
    });

    sb.appendChild(section);
  });
}

function render(){
  renderSidebar();

  if (!current){
    welcome.hidden = false;
    main.hidden = true;
    main.innerHTML = '';
    return;
  }

  const item = data.find(t => t.id === current);
  if (!item){
    goHome();
    return;
  }

  welcome.hidden = true;
  main.hidden = false;

  const rr = ramps[item.color] || ramps.blue;
  const accent = accentFor(rr);
  main.style.setProperty('--tint', rr.tint);
  main.style.setProperty('--accent', accent);

  const hasApps = !!item.apps;
  const currentAppData = hasApps ? item.apps[currentApp] : null;
  const points = hasApps ? currentAppData.points : item.points;
  const contentLabel = categoryLabels[item.id] || groupLabels[item.group] || 'Guide';

  main.innerHTML = `
    <div class="content-head">
      <span class="tag">${icon(item.icon)}${contentLabel}</span>
      <button class="content-home" type="button" aria-label="Back to CyberGuide home">Home</button>
    </div>
    <h1>${item.label}${currentAppData ? ` <span class="app-heading">· ${currentAppData.name}</span>` : ''}</h1>
    <p class="lede">${item.description}</p>
    ${hasApps ? `<div class="subtabs" id="subtabs" aria-label="Choose an app"></div>` : ''}
    <div class="points">
      ${points.map((p, i) => `
        <div class="point">
          <div class="num">${i + 1}</div>
          <p>${p}</p>
        </div>`).join('')}
    </div>`;

  main.querySelector('.content-home').onclick = goHome;

  if (hasApps){
    const tabWrap = document.getElementById('subtabs');
    item.apps.forEach((a, i) => {
      const ar = ramps[a.color] || rr;
      const appAccent = accentFor(ar);
      const tb = document.createElement('button');
      tb.type = 'button';
      tb.className = 'subtab' + (i === currentApp ? ' active' : '');
      tb.textContent = a.name;
      tb.style.setProperty('--accent', appAccent);
      tb.style.setProperty('--tint', ar.tint);
      tb.onclick = () => {
        currentApp = i;
        render();
      };
      tabWrap.appendChild(tb);
    });
  }
}

applyTheme();
render();
