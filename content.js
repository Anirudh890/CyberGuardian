// ---------------------------------------------------------------
// EDIT THIS FILE to change wording, add topics, or add points.
// script.js and style.css don't need to change for content edits.
// Keep topics to about 3 points; put shared advice in "essentials".
// ---------------------------------------------------------------

const ramps = {
  blue:{tint:'#e6f1fb',accent:'#0c7bd6',darkAccent:'#63b3ff'},
  teal:{tint:'#e1f5ee',accent:'#0f9e73',darkAccent:'#51d9ad'},
  coral:{tint:'#faece7',accent:'#d85a30',darkAccent:'#ff8b69'},
  amber:{tint:'#faeeda',accent:'#c7860f',darkAccent:'#f0ba57'},
  purple:{tint:'#eeedfe',accent:'#6c62d9',darkAccent:'#a69cff'},
  pink:{tint:'#fbeaf0',accent:'#d4537e',darkAccent:'#ff8eb2'},
  green:{tint:'#e8f8ef',accent:'#25a95a',darkAccent:'#56d889'},
  sky:{tint:'#e8f5fd',accent:'#229ed9',darkAccent:'#57c7ff'},
  messenger:{tint:'#eaf3ff',accent:'#0084ff',darkAccent:'#66adff'}
};

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
  warning:'<path d="M12 3l9 16H3z"/><path d="M12 9v4M12 17h.01"/>',
  refresh:'<path d="M20 11a8 8 0 00-14.8-4L3 9"/><path d="M3 4v5h5"/><path d="M4 13a8 8 0 0014.8 4L21 15"/><path d="M21 20v-5h-5"/>',
  lock:'<rect x="5" y="10" width="14" height="11" rx="2"/><path d="M8 10V7a4 4 0 018 0v3"/>',
  privacy:'<path d="M12 3s7 3 7 9a7 7 0 01-14 0c0-6 7-9 7-9z"/><path d="M9 12a3 3 0 006 0c0-1.700-1.300-3-3-3s-3 1.300-3 3z"/>',
  incident:'<path d="M5 14a7 7 0 0114 0v5H5z"/><path d="M8 14v-2a4 4 0 018 0v2"/><path d="M12 7V3"/>',
  shield:'<path d="M12 3l7 3v5c0 4.500-2.800 8-7 10-4.200-2-7-5.500-7-10V6z"/>',
  check:'<circle cx="12" cy="12" r="9"/><path d="M8 12.500l2.700 2.700L16 9.500"/>'
};

// The single landing-page toggle: what to do in each situation.
const modes = {
  safe:{
    kicker:'HOW IT WORKS',
    steps:[
      ['Read the points','Short reminders. No technical background required.'],
      ['Put a few into practice','You do not have to change everything at once.']
    ],
    link:['Start with the five essentials →','essentials']
  },
  help:{
    kicker:'WHAT TO DO NOW',
    steps:[
      ['Protect your money and accounts','Call your bank or payment provider first and ask them to block or freeze.'],
      ['Report it','Contact your country’s national cyber or fraud helpline, or the police.'],
      ['Keep the evidence','Save screenshots, numbers and payment details, then change affected passwords.']
    ],
    link:['See the full steps →','incident-security'],
    situations:[ // optional picker: tailored steps for common situations
      {id:'sent',g:'Money',label:'I sent money',steps:[
        ['Call your bank or payment provider now','Ask them to stop or recall the payment. Minutes matter.'],
        ['Report it','Contact your country’s national cyber or fraud helpline, or the police.'],
        ['Keep the evidence','Save screenshots, numbers and payment details. Do not reply to the scammer.']]},
      {id:'code',g:'Accounts',label:'I shared a code',steps:[
        ['Change it now','Change the password or PIN from the official app or site, never from a link.'],
        ['Sign out everywhere','End other sessions and turn on two-step login.'],
        ['Watch your money','If payments are involved, call the number on your bank card.']]},
      {id:'hacked',g:'Accounts',label:'Account hacked',steps:[
        ['Recover it from the official site','Use the service’s own recovery page.'],
        ['Secure your email','Change its password and turn on two-step login.'],
        ['Warn your contacts','Tell friends to ignore odd messages from you.']]},
      {id:'lost',g:'Phone & device',label:'Lost my phone',steps:[
        ['Lock or erase it','Use Find My Device or your Apple or Google account.'],
        ['Call your mobile provider','Ask them to block the SIM.'],
        ['Change key passwords','Start with email and banking, and tell your bank.']]}
    ]
  }
};

// The self check-up: tick what you have done. Each action carries an impact
// weight; weights add up to 100 so the score reads as a percentage.
const checkup = {
  bands:[ // [minimum %, level, note]
    [0,'Just starting','Start with one step. Your email login is the highest-impact place to begin.'],
    [1,'Good start','Nice start. Every step you add makes you a harder target.'],
    [34,'Making progress','Well done. You have covered a good share of what matters most.'],
    [67,'Nearly there','Great work. You are only a step or two from fully prepped.'],
    [100,'Fully prepped','Gold star! The core steps are done. Level up below for a platinum badge.']
  ],
  items:[ // [action, hint, impact %]
    ['Two-step login on your email','Your email can reset every other account.',20],
    ['UPI and payment alerts switched on','So you see every payment straight away.',15],
    ['Two-step verification in WhatsApp','Settings › Account › Two-step verification.',12],
    ['A screen lock and automatic updates','Phone locked, updates switched on.',12],
    ['A unique password for your email','Long, and not used anywhere else.',12],
    ['Your bank’s real number saved','Copy it from your card or passbook, not from a message.',9],
    ['The national cyber helpline saved','In India this is 1930. Save it before you need it.',10],
    ['One family member told the essentials','Share the five rules. Parents are often targeted first.',10]
  ],
  extras:[ // level-up steps, [topic id, action]. Finish them all for the platinum badge.
    ['messaging','Review linked devices in WhatsApp and remove unknown ones'],
    ['messaging','Set who can add you to groups'],
    ['banking','Turn on app lock in your payment apps'],
    ['phone','Turn on spam-call or unknown-caller filtering'],
    ['email','Check your email’s recent sign-in activity'],
    ['browser','Turn off site notifications you do not need'],
    ['passwords','Save backup codes for your main accounts'],
    ['passwords','Update your recovery phone number and email'],
    ['data-privacy','Review app permissions: location, camera, contacts'],
    ['data-privacy','Lock your Aadhaar biometrics (UIDAI)'],
    ['social','Limit who can see your profile and posts'],
    ['phone-device','Turn on Find My Device'],
    ['wifi','Change your router’s default admin password'],
    ['backups','Back up your photos to a second place']
  ]
};

// The "More situations" page: the four quick ones above plus these.
// Steps are plain sentences (or [title, detail] pairs).
const sitGroups = ['Money','Accounts','Phone & device','Personal information','Unwanted contact'];
const moreSituations = [
  {id:'debit',g:'Money',label:'A payment I do not recognise',steps:['Call your bank or payment provider now and report it.','Ask them to block the card or account if needed.','Change your banking passwords and PINs.']},
  {id:'remote',g:'Money',label:'I let someone control my device',steps:['Disconnect from the internet and close the remote-access app.','Uninstall it, then change important passwords from another device.','Call your bank and tell them.']},
  {id:'arrest',g:'Money',label:'A “police” or “digital arrest” call',steps:['Hang up. No agency arrests people or takes money over a video call.','Tell a family member and do not pay anything.','Report it to your national cyber helpline or the police.']},
  {id:'invest',g:'Money',label:'I paid into a fake investment or job',steps:['Stop paying. Never pay a “release” or “tax” fee.','Contact your bank and report it to the helpline or police.','Save chats, links and payment proofs.']},
  {id:'phish',g:'Accounts',label:'I entered a password on a fake site',steps:['Change that password from the real site now.','Change it anywhere you reused it and turn on two-step login.','Check recent activity for anything you did not do.']},
  {id:'wa',g:'Accounts',label:'My WhatsApp was taken over',steps:['Register your number again on your phone to log the thief out.','Turn on two-step verification.','Tell your contacts not to trust messages from you.']},
  {id:'sim',g:'Accounts',label:'My phone suddenly lost signal',steps:['Call your mobile provider from another phone. It may be a SIM swap.','Tell your bank and change your email password.','Watch for codes you did not request.']},
  {id:'malware',g:'Phone & device',label:'I installed a suspicious app',steps:['Uninstall it and stop entering passwords or payment details.','Update your phone and run a security scan.','Change key passwords from a clean device.']},
  {id:'breach',g:'Personal information',label:'A company told me of a data breach',steps:['Read the official notice to see what was exposed.','Change the password, and anywhere you reused it.','Watch for phishing that mentions the breach.']},
  {id:'id',g:'Personal information',label:'I sent ID documents to a scammer',steps:['Tell the issuer of the document and your bank.','Watch for accounts or loans you did not open.','Save what you sent and when.']},
  {id:'photo',g:'Personal information',label:'Someone threatens to share my photos',steps:['Do not pay and stop replying. You are not to blame.','Save the messages, then block and report the account.','Report to your national helpline or the police, and talk to someone you trust.']},
  {id:'stalk',g:'Unwanted contact',label:'Repeated unwanted contact',steps:['Save evidence and block the sender.','Report the account to the service.','Tighten your privacy settings and tell someone you trust.']},
  {id:'fake',g:'Unwanted contact',label:'Someone is pretending to be me',steps:['Report the fake profile to the platform.','Warn your contacts.','Save screenshots and links.']}
];

// "Is this a scam?" quick check: the number of yes answers picks the verdict.
const scamCheck = {
  questions:[
    'Did they contact you first, out of the blue?',
    'Are they rushing or scaring you?',
    'Do they want money, a code, a PIN or remote access?'
  ],
  verdicts:[ // [level, title, text] for 0, 1 and 2+ yes answers
    ['low','Lower risk so far','No classic warning signs here. If anything still feels off, check with the real organisation using a number you already have.'],
    ['mid','Be careful','One warning sign is enough to slow down. Do not act yet. Check using a number or app you already trust.'],
    ['high','Very likely a scam','Stop. Do not reply, pay or share anything. Hang up, then contact the real organisation yourself.']
  ]
};

// "Spot the scam": [message, is it a scam?, why]. The messages are made up.
const spot = [
  ['“Your bank account will be blocked today. Update your KYC now: kyc-update-now.example”',true,'A threat, a deadline and a link. Banks do not ask you to update details through a texted link.'],
  ['“482915 is your login code. Do not share it with anyone.” (you had just tried to log in)',false,'A genuine code arrives only when you asked for it and asks nothing of you. The scam is anyone asking you to read it out.'],
  ['“Hi Mum, this is my new number. I dropped my phone. Can you send money urgently?”',true,'New number, urgency and money. Call the number you already have before doing anything.']
];

// Tip of the day: one is shown per day, rotating through the list.
const tips = [
  'Save your bank’s real number in your phone today.',
  'A real bank will never ask for your PIN, even on a call from “the fraud team”.',
  'Pause before you tap. Scammers count on a quick reaction.',
  'Two-step login on your email protects every other account.',
  'Sure it is a friend asking for money? Call them on the number you already have.',
  'Found a “too good to be true” investment tip? It is.',
  'Let unknown numbers go to voicemail. Real callers leave a message.',
  'Type your bank’s address yourself instead of following a link.',
  'Nobody legitimate needs you to install an app during a call.',
  'Check your payment alerts today. Do they all look familiar?',
  'A rushed request is a reason to slow down, not speed up.',
  'Update your phone tonight. It takes a minute and closes real gaps.'
];

const data = [
  {id:'essentials',group:'security',label:'The essentials',description:'Five habits that stop most scams.',color:'coral',icon:'shield',tag:'Start here',
    points:[
      'Never share a code, PIN or password with anyone.',
      'Urgency or fear means stop. Hang up, then check for yourself.',
      'No bank, police or government office asks you to pay or move money over a call.',
      'You never need a PIN or a QR scan to receive money.',
      'Verify unusual requests another way, using a number you already have.'
    ]},
  {id:'scams',group:'security',label:'Scams to recognise',description:'The tricks you are most likely to meet.',color:'amber',icon:'warning',tag:'Scams',
    points:[
      '“Digital arrest” or fake police calls: no agency arrests or takes payment over a video call.',
      '“Account blocked” or KYC messages: use your bank’s app, never the link.',
      'Payment requests: entering a PIN or scanning a QR code only ever sends money.',
      'Investment tips and “part-time jobs”: never pay first in order to earn.',
      'Parcel or customs calls: hang up and check with the courier yourself.',
      'A relative in trouble from a new number: call the number you already have.'
    ]},
  {id:'email',group:'security',label:'Email & links',description:'Senders, links & attachments.',color:'blue',icon:'mail',tag:'Communication',
    points:[
      'Check the sender address, not just the name shown.',
      'Look at where a link goes before you tap it.',
      'Do not open attachments you were not expecting.'
    ]},
  {id:'phone',group:'security',label:'Calls & texts',description:'Callers, texts & verification codes.',color:'sky',icon:'phone',tag:'Calls & messages',
    points:[
      'Links in texts from unknown numbers: delete, do not tap.',
      'If a caller claims to be your bank, hang up and call the number on your card.',
      'Never install an app or share your screen because a caller asks.'
    ]},
  {id:'banking',group:'security',label:'Banking & payments',description:'Apps, alerts & account access.',color:'teal',icon:'bank',tag:'Money & payments',
    points:[
      'Download banking apps only from the official app store.',
      'Turn on alerts for every transaction, however small.',
      'Check your statements often and report anything unfamiliar straight away.'
    ]},
  {id:'messaging',group:'security',label:'Messaging apps',description:'Chat apps, groups & linked devices.',color:'purple',icon:'chat',tag:'Chat & messaging',
    apps:[
      {name:'WhatsApp',color:'green',points:[
        'Turn on two-step verification with a PIN.',
        'Review linked devices and remove any you do not recognise.',
        'Set who can see your photo and add you to groups.'
      ]},
      {name:'Signal',color:'blue',points:[
        'Turn on Registration Lock and set a PIN.',
        'Use disappearing messages for sensitive chats.',
        'Lock the app with your fingerprint or face.'
      ]},
      {name:'Telegram',color:'sky',points:[
        'Turn on two-step verification in privacy settings.',
        'Normal chats are not end-to-end encrypted: use Secret Chat for private topics.',
        'Review active sessions and remove devices you do not know.'
      ]},
      {name:'Messenger',color:'messenger',points:[
        'Turn on login alerts.',
        'Review where you are logged in and which apps are connected.',
        'A friend who suddenly asks for money may have been hacked.'
      ]},
      {name:'iMessage',color:'blue',points:[
        'Turn on Stolen Device Protection if it is available.',
        'Check which devices are signed in to your Apple Account.',
        'Be wary of messages claiming to be Apple Support.'
      ]}
    ]},
  {id:'social',group:'security',label:'Social media',description:'Profiles, posts & impersonation.',color:'pink',icon:'share',tag:'Social & sharing',
    points:[
      'Check who can see your posts, and keep addresses and documents off them.',
      'Fake profiles copy real people: check the account before you trust it.',
      'Review which apps and websites can access your account.'
    ]},
  {id:'browser',group:'security',label:'Browsing & shopping',description:'Websites, pop-ups & online payments.',color:'amber',icon:'globe',tag:'Web & shopping',
    points:[
      'Check the website address before entering a password or payment details.',
      'Pop-ups warning of a “virus”, and the numbers they show, are scams.',
      'Pay in ways that give you records and a way to dispute the charge.'
    ]},
  {id:'passwords',group:'security',label:'Passwords & accounts',description:'Logins, 2-step login & recovery.',color:'coral',icon:'key',tag:'Account security',
    points:[
      'Use a long, unique password for your email and a password manager for the rest.',
      'Turn on two-step login wherever it is offered.',
      'Keep recovery details current and save backup codes somewhere safe.'
    ]},
  {id:'phone-device',group:'security',label:'Your smartphone',description:'Locks, updates & lost phones.',color:'teal',icon:'device',tag:'Device security',
    points:[
      'Use a screen lock and turn on automatic updates.',
      'Install apps only from the official app store.',
      'Turn on Find My Device so you can lock or erase a lost phone.'
    ]},
  {id:'data-privacy',group:'privacy',label:'Data privacy',description:'Personal information, permissions & tracking.',color:'purple',icon:'privacy',tag:'Data privacy',
    points:[
      'Share only what a service actually needs. Ask: do I need to give this at all?',
      'Review app permissions and location sharing, and delete apps and accounts you no longer use.',
      'Be careful uploading ID documents and private photos.'
    ]},
  {id:'incident-security',group:'incidents',label:'Security incident',description:'What to do when something has gone wrong.',color:'coral',icon:'incident',tag:'Security incident help',
    points:[
      'Money sent to a scammer: contact your bank or payment provider now, then your national cyber helpline or the police.',
      'Account hacked or password entered on a fake site: change the password from the real website, sign out other sessions, turn on two-step login.',
      'Gave someone remote access: disconnect, remove the software and change important passwords.',
      'Lost or stolen phone: lock it with Find My Device and call your mobile provider.',
      'Harassment or a fake voice or video: save evidence, block, report to the service and verify requests another way.'
    ]},
  {id:'incident-privacy',group:'incidents',label:'Privacy incident',description:'What to do after personal data is exposed.',color:'pink',icon:'lock',tag:'Privacy incident help',
    points:[
      'Company breach notice: read what was affected and change reused passwords.',
      'Private photo or personal details posted: document it and ask the platform to remove it.',
      'Sent information to the wrong person: ask them to delete it and watch your accounts.',
      'Afterwards: review passwords, permissions and what you share publicly.'
    ]},
  {id:'situations',group:'incidents',label:'More situations',description:'Pick what happened. Short steps for each.',color:'coral',icon:'incident',tag:'Something happened',view:'situations'},
  {id:'checkup',group:'checkup',label:'Self check-up',description:'Eight core steps, plus level-ups.',color:'green',icon:'check',tag:'Quick check',view:'checkup'},
  {id:'scamcheck',group:'tryit',label:'Is this a scam?',description:'Three questions, one clear answer.',color:'coral',icon:'warning',tag:'Quick check',view:'scamcheck'},
  {id:'spot',group:'tryit',label:'Spot the scam',description:'Real or scam? Test your eye.',color:'amber',icon:'mail',tag:'Practice',view:'spot'},
  {id:'usb',group:'curious',label:'USB & found devices',description:'Drives, files & unknown devices.',color:'purple',icon:'usb',tag:'Physical media',
    points:[
      'Never plug in a USB drive you found or were handed by a stranger.',
      'Use only drives you trust, and keep private files off them.',
      'A drive that behaves strangely: stop using it and ask for help.'
    ]},
  {id:'wifi',group:'curious',label:'Wi-Fi & router',description:'Home and public networks.',color:'blue',icon:'wifi',tag:'Network security',
    points:[
      'Give home Wi-Fi a strong password and keep the router updated.',
      'Avoid banking on public Wi-Fi and check the network name first.',
      'Remove devices you do not recognise from your network.'
    ]},
  {id:'backups',group:'curious',label:'Updates & backups',description:'Keep devices current and files recoverable.',color:'teal',icon:'refresh',tag:'Updates & backups',
    points:[
      'Install updates when offered, including on your router and browser.',
      'Keep important photos and files in a second place.',
      'Check that backups really complete instead of assuming.'
    ]}
];
