export const projects = [
  {
    slug: 'talkshield',
    name: 'TalkShield',
    tagline: 'Secure real-time communication platform',
    overview:
      'TalkShield is a secure messaging and communication platform designed with end-to-end encryption principles, focusing on protecting user conversations from interception and tampering.',
    technologies: ['React', 'Node.js', 'Socket.IO', 'WebRTC', 'JWT', 'MongoDB'],
    features: [
      'End-to-end encrypted messaging',
      'Real-time voice and video calls',
      'Secure session management',
      'Role-based access control',
      'Audit logging for all actions',
    ],
    architecture:
      'Client-server architecture with WebSocket gateways, JWT-based authentication, and a dedicated encryption layer handling key exchange and message sealing.',
    github: 'https://github.com/Yashwanth01-cyber/talkshield',
    liveDemo: '#',
    status: 'Active Development',
    screenshots: [],
  },
  {
    slug: 'sentinelx',
    name: 'SentinelX',
    tagline: 'Vulnerability assessment and reporting toolkit',
    overview:
      'SentinelX is a lightweight vulnerability assessment toolkit that automates reconnaissance, scanning, and structured reporting to help security teams triage findings faster.',
    technologies: ['Python', 'Flask', 'Nmap', 'SQLite', 'Jinja2'],
    features: [
      'Automated network reconnaissance',
      'Service and version detection',
      'CVE cross-referencing',
      'Structured PDF report generation',
      'Scan history and diffing',
    ],
    architecture:
      'Modular Python pipeline feeding a Flask web front-end; scan results persist in SQLite and render into templated reports.',
    github: 'https://github.com/Yashwanth01-cyber/sentinelx',
    liveDemo: '#',
    status: 'Active Development',
    screenshots: [],
  },
];
