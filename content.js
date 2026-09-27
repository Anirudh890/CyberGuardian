// ---------------------------------------------------------------
// EDIT THIS FILE to add tools, change wording, or add new points.
// You never need to touch style.css or script.js for content changes.
// ---------------------------------------------------------------

// Color options for each category. Pick one of: blue, teal, coral, amber, purple, pink
const ramps = {
  blue:{tint:'#e6f1fb',accent:'#0c7bd6',dark:'#0c447c'},
  teal:{tint:'#e1f5ee',accent:'#0f9e73',dark:'#085041'},
  coral:{tint:'#faece7',accent:'#d85a30',dark:'#712b13'},
  amber:{tint:'#faeeda',accent:'#c7860f',dark:'#633806'},
  purple:{tint:'#eeedfe',accent:'#6c62d9',dark:'#3c3489'},
  pink:{tint:'#fbeaf0',accent:'#d4537e',dark:'#72243e'}
};

// Icon shapes used in the sidebar. Add a new key here if you add a new
// category and want a distinct icon for it.
const icons = {
  mail:'<path d="M4 6h16v12H4z"/><path d="M4 7l8 6 8-6"/>',
  phone:'<path d="M6 3h4l1 5-2.5 2a13 13 0 006 6l2-2.5 5 1v4a2 2 0 01-2 2C10 21 3 14 3 5a2 2 0 012-2z"/>',
  bank:'<path d="M3 10l9-6 9 6"/><path d="M5 10v9M9 10v9M15 10v9M19 10v9"/><path d="M3 21h18"/>',
  chat:'<path d="M4 5h16v10H8l-4 4z"/>',
  share:'<circle cx="6" cy="12" r="2.5"/><circle cx="18" cy="6" r="2.5"/><circle cx="18" cy="18" r="2.5"/><path d="M8.2 10.8L15.8 7.2M8.2 13.2l7.6 3.6"/>',
  globe:'<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a14 14 0 010 18M12 3a14 14 0 000 18"/>',
  wifi:'<path d="M2 9c6-5 14-5 20 0"/><path d="M5.5 13c4-3.5 9-3.5 13 0"/><path d="M9 17c2-1.7 4-1.7 6 0"/><circle cx="12" cy="20" r="1"/>',
  key:'<circle cx="8" cy="12" r="4"/><path d="M12 12h9M17 12v4M20 12v3"/>',
  device:'<rect x="7" y="2" width="10" height="20" rx="2"/><path d="M11 19h2"/>',
  usb:'<rect x="9" y="3" width="6" height="8" rx="1"/><path d="M12 11v6"/><circle cx="8" cy="19" r="2"/><circle cx="16" cy="19" r="2"/><path d="M12 17H8M12 17h4"/>',
  book:'<path d="M4 4h11a3 3 0 013 3v13H7a3 3 0 00-3 3z"/><path d="M4 4v16"/>',
  sun:'<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M2 12h2M20 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4"/>',
  moon:'<path d="M20 14.5A8.5 8.5 0 019.5 4a8.5 8.5 0 1010.5 10.5z"/>',
  bubblePhone:'<path d="M4 4h13a3 3 0 013 3v7a3 3 0 01-3 3H9l-5 4z"/><path d="M9.5 8.3c.4 1.4 1.4 2.6 2.6 3.1l.7-1c.3-.4.9-.5 1.3-.2l1.2.8c.3.2.4.6.2 1a2.6 2.6 0 01-3 1.3 6.4 6.4 0 01-4.2-4.3 2.6 2.6 0 011.2-3c.3-.2.7-.1 1 .2l.7 1.2c.2.4.2.7-.1 1z"/>',
  bubbleShield:'<path d="M4 4h13a3 3 0 013 3v7a3 3 0 01-3 3H9l-5 4z"/><path d="M12 6.5l3 1.2v2.3c0 2-1.3 3.3-3 3.8-1.7-.5-3-1.8-3-3.8V7.7z"/>',
  bubbleArrow:'<path d="M20 4h-13a3 3 0 00-3 3v7a3 3 0 003 3h6l5 4z"/><path d="M8.5 10.3l7-2.3-2.6 6.8-1.6-2.6-2.8-1.9z"/>',
  bubbleBolt:'<path d="M4 4h13a3 3 0 013 3v7a3 3 0 01-3 3H9l-5 4z"/><path d="M13 6.5l-4 5h2.5L11 15l4-5h-2.5l.5-3.5z"/>'
};

// The main category list shown in the sidebar.
// To add a new category, copy one of these objects and change the values.
// Categories can either have "points" directly, or an "apps" array if the
// category needs to be split into sub-apps (see "messaging" below).
const data = [
  {id:'email',label:'Email',color:'blue',icon:'mail',
   points:['Check the sender address, not just the name shown.',
    'Never click a link asking you to "verify" your account urgently.',
    'Hover before you tap — see where a link actually goes.',
    "Don't open attachments you weren't expecting.",
    'Turn on two-step login for your email account.']},

  {id:'phone',label:'Phone & SMS',color:'coral',icon:'phone',
   points:["Banks and government agencies don't ask for codes by text.",
    'A call demanding immediate payment is a red flag, always.',
    "Don't call back numbers left in a scary voicemail.",
    "Unknown links in texts: don't tap, just delete.",
    'Let unknown numbers go to voicemail first.']},

  {id:'banking',label:'Banking apps',color:'teal',icon:'bank',
   points:["Only download your bank's app from the official app store.",
    'Set up alerts for every transaction, however small.',
    'Never share a one-time code with anyone who calls you.',
    'Use a different password here than anywhere else.',
    'Log out fully on shared or public computers.']},

  {id:'messaging',label:'Messaging apps',color:'purple',icon:'chat',
   apps:[
     {name:'WhatsApp',icon:'bubblePhone',points:[
       'Turn on two-step verification with a PIN.',
       'Urgent money request from "family"? Call them to confirm first.',
       "Don't open a forwarded link without checking who sent it originally.",
       'Check who can see your photo and "last seen" in privacy settings.',
       'Block and report numbers that message you out of nowhere.']},
     {name:'Signal',icon:'bubbleShield',points:[
       'Verify the safety number with close contacts for extra certainty.',
       'Turn on disappearing messages for sensitive chats.',
       "Lock the app with your phone's fingerprint or face unlock.",
       "Don't trust group invites from people you don't know.",
       'Keep the app updated — updates often close security gaps.']},
     {name:'Telegram',icon:'bubbleArrow',points:[
       "Regular chats aren't private by default — use \"Secret Chat\" for sensitive topics.",
       'Be cautious of unknown channels or bots asking for personal details.',
       'Turn on two-step verification in privacy settings.',
       'No "official support" contacts you first — that\'s a scam pattern.',
       'Control who can add you to groups in privacy settings.']},
     {name:'Messenger',icon:'bubbleBolt',points:[
       'Turn on login alerts to know if someone else accesses your account.',
       "Be skeptical of urgent money requests, even from friends' accounts.",
       'Use encrypted chats for anything sensitive.',
       "Don't click links from accounts that suddenly message after being silent.",
       "Review connected apps and remove ones you don't recognize."]}
   ]},

  {id:'social',label:'Social media',color:'pink',icon:'share',
   points:['Placeholder point one.','Placeholder point two.','Placeholder point three.']},

  {id:'browser',label:'Browser & web',color:'amber',icon:'globe',
   points:['Placeholder point one.','Placeholder point two.','Placeholder point three.']},

  {id:'wifi',label:'Wi-Fi',color:'blue',icon:'wifi',
   points:['Placeholder point one.','Placeholder point two.','Placeholder point three.']},

  {id:'passwords',label:'Passwords & logins',color:'coral',icon:'key',
   points:['Placeholder point one.','Placeholder point two.','Placeholder point three.']},

  {id:'phone-device',label:'Your smartphone',color:'teal',icon:'device',
   points:['Placeholder point one.','Placeholder point two.','Placeholder point three.']},

  {id:'usb',label:'USB & physical media',color:'purple',icon:'usb',
   points:['Placeholder point one.','Placeholder point two.','Placeholder point three.']}
];

// The glossary section sits separately at the bottom of the sidebar.
const glossary = {id:'glossary',label:'Confusing terms',color:'pink',icon:'book',
  points:['Bug bounty vs. penetration test — one is ongoing and open, the other is a scoped, time-boxed test.',
          'Virus vs. malware — a virus is one type of malware, not the whole category.',
          '2FA vs. MFA — MFA just means two or more, 2FA is the two-step version of it.']};
