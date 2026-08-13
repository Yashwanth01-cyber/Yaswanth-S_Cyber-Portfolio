/** @type {Array<{ category: string; icon: string; items: Array<{ name: string; level: 'Beginner' | 'Intermediate' }> }>} */
export const skills = [
  {
    category: 'Programming',
    icon: 'Code2',
    items: [
      { name: 'Python', level: 'Intermediate' },
      { name: 'Java', level: 'Beginner' },
      { name: 'JavaScript', level: 'Beginner' },
      { name: 'SQL', level: 'Beginner' },
    ],
  },

  {
    category: 'Networking',
    icon: 'Network',
    items: [
      { name: 'TCP/IP', level: 'Intermediate' },
      { name: 'DNS', level: 'Intermediate' },
      { name: 'HTTP', level: 'Intermediate' },
      { name: 'OSI Model', level: 'Intermediate' },
      { name: 'Ports & Services', level: 'Intermediate' },
    ],
  },

  {
    category: 'Cybersecurity Tools',
    icon: 'Terminal',
    items: [
      { name: 'Nmap', level: 'Intermediate' },
      { name: 'Wireshark', level: 'Intermediate' },
      { name: 'Burp Suite', level: 'Beginner' },
      { name: 'Kali Linux', level: 'Beginner' },
      { name: 'Metasploit', level: 'Beginner' },
      { name: 'Git & GitHub', level: 'Intermediate' },
    ],
  },

  {
    category: 'Web Security',
    icon: 'Globe',
    items: [
      { name: 'HTTP Requests', level: 'Intermediate' },
      { name: 'Cookies & Sessions', level: 'Beginner' },
      { name: 'Access Control', level: 'Beginner' },
      { name: 'Web Application Security', level: 'Beginner' },
    ],
  },

  {
    category: 'Security Concepts',
    icon: 'ShieldCheck',
    items: [
      { name: 'OWASP Top 10', level: 'Intermediate' },
      { name: 'Vulnerability Assessment', level: 'Intermediate' },
      { name: 'Penetration Testing', level: 'Beginner' },
      { name: 'Secure Software Development', level: 'Beginner' },
      { name: 'OSINT', level: 'Beginner' },
    ],
  },
];

export const levelStyles = {
  Beginner: {
    label: 'Beginner',
    className: 'bg-red-500/10 text-red-400 border-red-500/30',
  },

  Intermediate: {
    label: 'Intermediate',
    className: 'bg-blue-500/10 text-blue-400 border-blue-500/30',
  },
};