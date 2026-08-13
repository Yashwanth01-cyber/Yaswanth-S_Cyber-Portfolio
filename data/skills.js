/** @type {Array<{ category: string; icon: string; items: Array<{ name: string; level: 'Beginner' | 'Intermediate' | 'Advanced' }> }>} */
export const skills = [
  {
    category: 'Programming',
    icon: 'Code2',
    items: [
      { name: 'Python', level: 'Beginner' },
      { name: 'Java', level: 'Beginner' },
      { name: 'JavaScript', level: 'Beginner' },
      { name: 'SQL', level: 'Beginner' },
      { name: 'C', level: 'Beginner' },
    ],
  },
  {
    category: 'Networking',
    icon: 'Network',
    items: [
      { name: 'TCP/IP', level: 'Intermediate' },
      { name: 'DNS', level: 'Intermediate' },
      { name: 'HTTP', level: 'Advanced' },
      { name: 'OSI', level: 'Intermediate' },
      { name: 'Ports', level: 'Advanced' },
    ],
  },
  {
    category: 'Cybersecurity Tools',
    icon: 'Terminal',
    items: [
      { name: 'Burp Suite', level: 'Beginner' },
      { name: 'Nmap', level: 'Intermediate' },
      { name: 'Wireshark', level: 'Intermediate' },
      { name: 'Kali Linux', level: 'Beginner' },
      { name: 'Metasploit', level: 'Intermediate' },
      { name: 'John the Ripper', level: 'Beginner' },
      { name: 'Git', level: 'Intermediate' },
      { name: 'GitHub', level: 'Intermediate' },
    ],
  },
  {
    category: 'Web Security',
    icon: 'Globe',
    items: [
      { name: 'HTTP Requests', level: 'Intermediate' },
      { name: 'Cookies', level: 'Beginner' },
      { name: 'Sessions', level: 'Beginner' },
      { name: 'Access Control', level: 'Beginner' },
      { name: 'Authentication', level: 'Advanced' },
    ],
  },
  {
    category: 'Security Concepts',
    icon: 'ShieldCheck',
    items: [
      { name: 'OWASP Top 10', level: 'Intermediate' },
      { name: 'Penetration Testing', level: 'Intermediate' },
      { name: 'Vulnerability Assessment', level: 'Intermediate' },
      { name: 'Secure Coding', level: 'Intermediate' },
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
  Advanced: {
    label: 'Advanced',
    className: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30',
  },
};
