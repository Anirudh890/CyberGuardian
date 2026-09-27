// ---------------------------------------------------------------
// EDIT THIS FILE to add tools, change wording, or add new points.
// You never need to touch style.css or script.js for content changes.
// ---------------------------------------------------------------

// Color options for each category and app.
const ramps = {
  blue:{tint:'#e6f1fb',accent:'#0c7bd6',darkAccent:'#63b3ff',dark:'#0c447c'},
  teal:{tint:'#e1f5ee',accent:'#0f9e73',darkAccent:'#51d9ad',dark:'#085041'},
  coral:{tint:'#faece7',accent:'#d85a30',darkAccent:'#ff8b69',dark:'#712b13'},
  amber:{tint:'#faeeda',accent:'#c7860f',darkAccent:'#f0ba57',dark:'#633806'},
  purple:{tint:'#eeedfe',accent:'#6c62d9',darkAccent:'#a69cff',dark:'#3c3489'},
  pink:{tint:'#fbeaf0',accent:'#d4537e',darkAccent:'#ff8eb2',dark:'#72243e'},

  // Messaging app colours
  green:{tint:'#e8f8ef',accent:'#25a95a',darkAccent:'#56d889',dark:'#176b39'},
  sky:{tint:'#e8f5fd',accent:'#229ed9',darkAccent:'#57c7ff',dark:'#12618a'},
  messenger:{tint:'#eaf3ff',accent:'#0084ff',darkAccent:'#66adff',dark:'#0059ad'}
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
  warning:'<path d="M12 3l9 16H3z"/><path d="M12 9v4M12 17h.01"/>',
  refresh:'<path d="M20 11a8 8 0 00-14.8-4L3 9"/><path d="M3 4v5h5"/><path d="M4 13a8 8 0 0014.8 4L21 15"/><path d="M21 20v-5h-5"/>',
  lock:'<rect x="5" y="10" width="14" height="11" rx="2"/><path d="M8 10V7a4 4 0 018 0v3"/>',
  cart:'<circle cx="9" cy="19" r="1.5"/><circle cx="17" cy="19" r="1.5"/><path d="M3 4h2l2.2 10.5h9.9L20 7H6"/>',
  recovery:'<path d="M4 8a8 8 0 111.7 8.7"/><path d="M4 4v4h4"/><path d="M12 7v5l3 2"/>',
  privacy:'<path d="M12 3s7 3 7 9a7 7 0 01-14 0c0-6 7-9 7-9z"/><path d="M9 12a3 3 0 006 0c0-1.7-1.3-3-3-3s-3 1.3-3 3z"/>',
  incident:'<path d="M5 14a7 7 0 0114 0v5H5z"/><path d="M8 14v-2a4 4 0 018 0v2"/><path d="M12 7V3"/>',
  shield:'<path d="M12 3l7 3v5c0 4.5-2.8 8-7 10-4.2-2-7-5.5-7-10V6z"/>',
  book:'<path d="M4 4h11a3 3 0 013 3v13H7a3 3 0 00-3 3z"/><path d="M4 4v16"/>',
  sun:'<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M2 12h2M20 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4"/>',
  moon:'<path d="M20 14.5A8.5 8.5 0 019.5 4a8.5 8.5 0 1010.5 10.5z"/>',
  bubblePhone:'<path d="M4 4h13a3 3 0 013 3v7a3 3 0 01-3 3H9l-5 4z"/><path d="M9.5 8.3c.4 1.4 1.4 2.6 2.6 3.1l.7-1c.3-.4.9-.5 1.3-.2l1.2.8c.3.2.4.6.2 1a2.6 2.6 0 01-3 1.3 6.4 6.4 0 01-4.2-4.3 2.6 2.6 0 011.2-3c.3-.2.7-.1 1 .2l.7 1.2c.2.4.2.7-.1 1z"/>',
  bubbleShield:'<path d="M4 4h13a3 3 0 013 3v7a3 3 0 01-3 3H9l-5 4z"/><path d="M12 6.5l3 1.2v2.3c0 2-1.3 3.3-3 3.8-1.7-.5-3-1.8-3-3.8V7.7z"/>',
  bubbleArrow:'<path d="M20 4h-13a3 3 0 00-3 3v7a3 3 0 003 3h6l5 4z"/><path d="M8.5 10.3l7-2.3-2.6 6.8-1.6-2.6-2.8-1.9z"/>',
  bubbleBolt:'<path d="M4 4h13a3 3 0 013 3v7a3 3 0 01-3 3H9l-5 4z"/><path d="M13 6.5l-4 5h2.5L11 15l4-5h-2.5l.5-3.5z"/>',
  bubbleApple:'<path d="M4 4h13a3 3 0 013 3v7a3 3 0 01-3 3H9l-5 4z"/><path d="M9 10.5c.8-.8 1.8-.8 2.6 0M12.4 10.5c.8-.8 1.8-.8 2.6 0"/>'
};

// Main guide content. Each entry has a group for navigation, a short
// description for the topic panel, and either points or an apps array.
const data = [
  {
    id:'email',group:'security',label:'Email',description:'Messages, links & attachments.',color:'blue',icon:'mail',
    points:[
      'Check the sender address, not just the name shown.',
      'Never click a link asking you to "verify" your account urgently.',
      'Hover before you tap — see where a link actually goes.',
      "Don't open attachments you weren't expecting.",
      'Turn on two-step login for your email account.',
      'Be suspicious of messages asking for passwords, codes, or money.',
      'If an email looks unusual, contact the sender another way.',
      'Check the spelling of website addresses before entering your password.',
      'Delete or report obvious scam emails instead of replying.',
      'Remember: seeing a familiar name does not mean the email is genuine.'
    ]
  },
  {
    id:'phone',group:'security',label:'Phone & SMS',description:'Calls, texts & verification codes.',color:'coral',icon:'phone',
    points:[
      'Never give a security code to someone who calls or texts asking for it.',
      'A call demanding immediate payment is a red flag.',
      "Don't call back numbers left in a scary voicemail.",
      "Unknown links in texts: don't tap, just delete.",
      'Let unknown numbers go to voicemail first.',
      'Be suspicious of texts saying you must act immediately.',
      'Do not trust a caller just because they know your name.',
      'If a caller claims to be your bank, call the bank using its official number.',
      'Do not send money because someone is pressuring you on the phone.',
      'If a text seems strange, contact the person another way before replying.'
    ]
  },
  {
    id:'banking',group:'security',label:'Banking apps',description:'Payments, alerts & account access.',color:'teal',icon:'bank',
    points:[
      "Only download your bank's app from the official app store.",
      'Set up alerts for every transaction, however small.',
      'Never share a one-time code with anyone who calls you.',
      'Use a different password here than anywhere else.',
      'Log out fully on shared or public computers.',
      'Check your bank account regularly for transactions you do not recognize.',
      'Do not use links in unexpected messages to reach your bank.',
      'If someone says your account is in danger, contact your bank directly.',
      'Never give remote access to your computer because someone claims to be your bank.',
      'Report suspicious transactions to your bank as soon as possible.'
    ]
  },
  {
    id:'messaging',group:'security',label:'Messaging apps',description:'Chat apps, groups & account recovery.',color:'purple',icon:'chat',
    apps:[
      {name:'WhatsApp',color:'green',icon:'bubblePhone',points:[
        'Turn on two-step verification with a PIN.',
        'Urgent money request from "family"? Call them to confirm first.',
        "Don't open a forwarded link without checking who sent it originally.",
        'Check who can see your photo and "last seen" in privacy settings.',
        'Block and report numbers that message you out of nowhere.',
        'Never share your WhatsApp verification code with anyone.',
        'Be careful with messages asking you to vote, win a prize, or claim money.',
        'Check carefully before adding someone to a group.',
        'Review linked devices and remove any you do not recognize.',
        'Keep WhatsApp updated to get the latest security fixes.'
      ]},
      {name:'Signal',color:'blue',icon:'bubbleShield',points:[
        'Verify the safety number with close contacts for extra certainty.',
        'Turn on disappearing messages for sensitive chats.',
        "Lock the app with your phone's fingerprint or face unlock.",
        "Don't trust group invites from people you don't know.",
        'Keep the app updated — updates often close security gaps.',
        'Never share a Signal verification code with anyone.',
        'Check a contact carefully before sending sensitive information.',
        'Be cautious with unexpected links or files, even from known contacts.',
        'Review who can see your profile information.',
        'If a contact suddenly asks for money, verify them another way.'
      ]},
      {name:'Telegram',color:'sky',icon:'bubbleArrow',points:[
        'Regular chats are not private by default — use "Secret Chat" for sensitive topics.',
        'Be cautious of unknown channels or bots asking for personal details.',
        'Turn on two-step verification in privacy settings.',
        'No "official support" contacts you first — that is a scam pattern.',
        'Control who can add you to groups in privacy settings.',
        'Never share login or verification codes with anyone.',
        'Be careful with links offering free money, prizes, or investments.',
        'Check usernames carefully — scammers can copy someone you know.',
        'Review active sessions and remove devices you do not recognize.',
        'Keep Telegram updated.'
      ]},
      {name:'Messenger',color:'messenger',icon:'bubbleBolt',points:[
        'Turn on login alerts to know if someone else accesses your account.',
        "Be skeptical of urgent money requests, even from friends' accounts.",
        'Use encrypted chats for anything sensitive.',
        "Don't click links from accounts that suddenly message after being silent.",
        "Review connected apps and remove ones you don't recognize.",
        'Never share a login or security code with anyone.',
        'Check the profile before trusting a new contact.',
        'Be careful with messages about prizes, refunds, or account problems.',
        'If a friend sends an unusual request, call them to confirm it is really them.',
        'Keep Messenger and Facebook updated.'
      ]},
      {name:'iMessage',color:'blue',icon:'bubbleApple',points:[
        'Be careful with unexpected messages asking you to click a link.',
        'Urgent money request from a friend or family member? Call them to confirm first.',
        'Never share verification codes sent to your phone.',
        'Check the contact carefully before sending sensitive information.',
        'Be cautious with links or attachments, even when they appear to come from someone you know.',
        'Turn on Stolen Device Protection on your iPhone if it is available to you.',
        'Use a strong device passcode and keep your iPhone updated.',
        'Be careful with messages claiming to be Apple Support or another official service.',
        'Block or report suspicious senders instead of continuing the conversation.',
        'Review which devices are signed in to your Apple Account and remove anything unfamiliar.'
      ]}
    ]
  },
  {
    id:'social',group:'security',label:'Social media',description:'Profiles, posts & impersonation.',color:'pink',icon:'share',
    points:[
      'Check who can see your posts before you share them.',
      'Be careful accepting friend requests from people you do not know.',
      'Do not post your home address, phone number, or other private details.',
      'Be suspicious of new accounts pretending to be friends or family.',
      'Never send money because someone contacts you through social media.',
      'Check the account name carefully — scammers often copy real profiles.',
      'Review which apps and websites have access to your social account.',
      'Turn on two-step login for your social media accounts.',
      'Think twice before posting photos showing tickets, documents, or personal information.',
      'If a message feels unusual, contact the person another way to check it is really them.'
    ]
  },
  {
    id:'browser',group:'security',label:'Browser & web',description:'Websites, downloads & pop-ups.',color:'amber',icon:'globe',
    points:[
      'Check the website address before entering a password or payment details.',
      'Look for spelling mistakes in website addresses — fake sites often use them.',
      'Do not trust a website just because it looks professional.',
      'Be careful with pop-ups telling you that your device has a virus.',
      'Do not call phone numbers shown in unexpected security warnings.',
      'Keep your web browser updated.',
      'Do not save passwords on shared or public computers.',
      'Be careful when downloading files from websites you do not know.',
      'Do not allow websites to send notifications unless you trust them.',
      'If a website asks for unusual information, stop and check why it needs it.'
    ]
  },
  {
    id:'wifi',group:'security',label:'Wi-Fi',description:'Home and public networks.',color:'blue',icon:'wifi',
    points:[
      'Give your home Wi-Fi a strong password.',
      'Change the Wi-Fi password if you think someone else knows it.',
      'Keep your router updated when updates are available.',
      'Do not use the same password for Wi-Fi and important accounts.',
      'Check the network name before joining public Wi-Fi.',
      'Avoid entering banking or other sensitive information on unknown Wi-Fi.',
      'Turn off automatic connection to Wi-Fi networks you do not know.',
      'Do not share your home Wi-Fi password publicly.',
      'Remove old or unknown devices from your home Wi-Fi when possible.',
      'Ask staff for the correct Wi-Fi name instead of guessing in public places.'
    ]
  },
  {
    id:'passwords',group:'security',label:'Passwords & logins',description:'Passwords, 2-step login & recovery.',color:'coral',icon:'key',
    points:[
      'Use a different password for every important account.',
      'Make important passwords long and difficult to guess.',
      'Never use your name, birthday, or address as a password.',
      'Do not use simple passwords like "123456" or "password".',
      'Use a password manager to remember your passwords.',
      'Turn on two-step login wherever it is offered.',
      'Never tell anyone your password or login code.',
      'Change a password immediately if you think someone knows it.',
      'Your email password should be unique and especially strong.',
      'Do not enter passwords on a computer you do not trust.'
    ]
  },
  {
    id:'phone-device',group:'security',label:'Your smartphone',description:'Device access, apps & permissions.',color:'teal',icon:'device',
    points:[
      'Use a PIN, password, fingerprint, or face unlock to lock your phone.',
      'Keep your phone updated.',
      'Turn on automatic updates if your phone offers them.',
      'Only install apps from the official app store.',
      'Delete apps you no longer use.',
      'Check what permissions each app has been given.',
      'Turn on Find My Device or the equivalent tracking feature.',
      'Do not leave your phone unlocked where others can access it.',
      'Set your phone to lock automatically after a short time.',
      'Know how to remotely lock or erase your phone if it is lost.'
    ]
  },
  {
    id:'usb',group:'security',label:'USB & physical media',description:'Drives, files & found devices.',color:'purple',icon:'usb',
    points:[
      'Do not plug in a USB drive you find lying around.',
      'Only use USB drives you trust.',
      'Scan unfamiliar USB drives before opening files on them.',
      'Do not accept USB drives from strangers.',
      'Keep important files backed up somewhere else.',
      'Eject USB drives safely before removing them.',
      'Do not leave USB drives containing private information unattended.',
      'Avoid using unknown USB drives on your work computer.',
      'Label your own USB drives so you know what they contain.',
      'If a USB drive behaves strangely, stop using it and ask for help.'
    ]
  },
  {
    id:'scams',group:'security',label:'Scams & social engineering',description:'Pressure tactics, impersonation & requests.',color:'coral',icon:'warning',
    points:[
      'Urgency is a common scam tactic — slow the conversation down before acting.',
      'A familiar name, logo, or caller ID does not prove who contacted you.',
      'Never share passwords, one-time codes, or recovery codes because someone asks for them.',
      'If someone asks for money, verify them using a different way to contact them.',
      'Be careful with requests to move a conversation to a new app or private channel.',
      'Remote-access requests deserve extra caution; use support you found yourself.',
      'Be suspicious of prizes, refunds, investments, or jobs that require payment first.',
      'Deepfake voices and videos can make fake requests look or sound convincing.',
      'When something feels rushed or unusual, stop and check the story independently.',
      'Report scams through the service involved and keep useful evidence such as screenshots.'
    ]
  },
  {
    id:'updates-backups',group:'security',label:'Updates & backups',description:'Keep devices current and copies available.',color:'teal',icon:'refresh',
    points:[
      'Install operating system and app updates when they become available.',
      'Turn on automatic updates where it makes sense.',
      'Update your browser, router, phone, and other connected devices too.',
      'Keep important photos and files in a second location.',
      'Check that backups are actually completing instead of assuming they are.',
      'Keep at least one backup separate from the device it came from.',
      'Back up files before major device changes or repairs.',
      'Do not keep your only copy of important documents on a USB drive.',
      'Replace or retire devices that no longer receive security updates when practical.',
      'Know how you would restore your important files after losing a device.'
    ]
  },
  {
    id:'privacy-permissions',group:'security',label:'Privacy & permissions',description:'What apps and sites can access.',color:'pink',icon:'lock',
    points:[
      'Review which apps can use your camera, microphone, contacts, photos, and location.',
      'Give an app only the access it actually needs.',
      'Turn off permissions you no longer want an app to have.',
      'Be cautious when a simple app asks for access to unrelated information.',
      'Review browser permissions for notifications, camera, microphone, and location.',
      'Check location sharing in maps, social apps, and photo apps.',
      'Remove apps you no longer use and review their permissions first.',
      'Do not approve permission requests just to get past a setup screen.',
      'Review privacy settings after major app or phone updates.',
      'When in doubt, look up why an app needs a permission before allowing it.'
    ]
  },
  {
    id:'shopping',group:'security',label:'Online shopping',description:'Stores, payments, delivery & refunds.',color:'amber',icon:'cart',
    points:[
      'Check the website address before entering payment details.',
      'Be cautious of unusually large discounts or pressure to buy immediately.',
      'Use payment methods that give you useful purchase records and dispute options.',
      'Check the seller and return policy before buying from an unfamiliar store.',
      'Be wary of messages asking you to pay a small delivery or customs fee.',
      'Do not let a seller rush you into using a payment method you did not choose.',
      'Keep order confirmations and receipts until the purchase is settled.',
      'Use a unique password for shopping accounts and turn on two-step login when available.',
      'Check your bank or card statement for unexpected charges after a purchase.',
      'When a refund message looks unusual, contact the store through its official website.'
    ]
  },
  {
    id:'accounts-recovery',group:'security',label:'Accounts & recovery',description:'Recovery details, sign-ins & locked accounts.',color:'blue',icon:'recovery',
    points:[
      'Keep your recovery email address and phone number up to date.',
      'Make sure your most important accounts have a recovery method you can actually use.',
      'Check recent sign-ins or active sessions when a service offers them.',
      'Remove old devices you no longer use from your account.',
      'Save backup codes somewhere safe when a service provides them.',
      'Do not store recovery codes in the same place as the account password.',
      'Use your primary email account carefully because it can help reset other accounts.',
      'Know how to contact a service through its official support route before you need it.',
      'If an account is locked unexpectedly, avoid making more changes through a suspicious message.',
      'After recovering an account, change the password and review sessions, recovery details, and 2-step login.'
    ]
  },
  {
    id:'data-privacy',group:'privacy',label:'Data privacy',description:'Personal information, tracking, sharing & control.',color:'purple',icon:'privacy',
    points:[
      'Share only the personal information a service actually needs.',
      'Check what an app or website says it will do with your information before signing up.',
      'Review privacy settings on social media, shopping sites, and major accounts.',
      'Turn off location sharing when a service does not need your location.',
      'Be careful with quizzes, forms, and surveys that ask for more personal detail than expected.',
      'Think before posting information that can reveal where you live, work, or regularly go.',
      'Delete old accounts you no longer use when practical.',
      'Be cautious about uploading identity documents, private photos, or sensitive files.',
      'Review browser cookies and tracking choices occasionally.',
      'When a service asks for personal information, pause and ask: do I need to share this at all?'
    ]
  },
  {
    id:'incident-security',group:'incidents',label:'Information security',description:'What to do after a security incident.',color:'coral',icon:'incident',
    points:[
      'Phishing email: stop before clicking again; if you entered a password, change it from the real website.',
      'Scam call or vishing: end the call, then contact the claimed organisation using a trusted number.',
      'Smishing text: do not follow the link; delete or report it and check the real account another way.',
      'Suspicious deepfake video or voice: verify the request through another channel before sending money or information.',
      'Account may be hacked: change the password, sign out other sessions, and turn on two-step login.',
      'Lost or stolen phone: use the device-finding service to lock it and contact your mobile provider if needed.',
      'Remote-access scam: disconnect the session, remove the remote-access software, and change important passwords.',
      'Malware or a strange pop-up: stop entering passwords or payment details and get help from a trusted source.',
      'Cyberstalking or repeated unwanted contact: save evidence, block where appropriate, and use the service reporting tools.',
      'Money sent to a scammer: contact the bank or payment provider immediately and keep the messages and transaction details.'
    ]
  },
  {
    id:'incident-privacy',group:'incidents',label:'Data privacy',description:'What to do after personal data is exposed.',color:'pink',icon:'shield',
    points:[
      'A company reports a breach: read the official notice and find out what information was affected.',
      'Your email or password was exposed: change the password and anywhere else you reused it.',
      'Personal ID information was exposed: watch for unusual account activity and use trusted guidance from the affected organisation.',
      'A private photo or document was shared: ask the recipient or platform to remove it and review who else can access it.',
      'An app collected information unexpectedly: review its permissions and privacy settings, then remove access you do not need.',
      'Your contact details are being misused: block unwanted messages and review what personal information is publicly visible.',
      'Someone posted your personal information: document it, report it to the platform, and consider whether other accounts expose the same details.',
      'You sent personal information to the wrong person: ask for deletion where practical and watch for follow-up misuse.',
      'You suspect identity misuse: contact the affected provider through an official channel and keep records of what happened.',
      'After any privacy incident: review passwords, permissions, public profiles, and the personal information you still share.'
    ]
  }
];
