import './globals.css';
import type { Metadata } from 'next';
import { Inter, JetBrains_Mono } from 'next/font/google';
import { siteConfig } from '@/lib/site-config';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const jetbrains = JetBrains_Mono({ subsets: ['latin'], variable: '--font-mono' });

export const metadata: Metadata = {
  metadataBase: new URL('https://yaswanthcyber.com'),
  title: {
    default: `${siteConfig.name} | ${siteConfig.title}`,
    template: `%s | ${siteConfig.name}`,
  },
  description:
    'Cybersecurity portfolio of Yaswanth S — Offensive Security Learner and future VAPT Engineer specializing in web application security, penetration testing, and vulnerability assessment.',
  keywords: [
    'Yaswanth S',
    'cybersecurity',
    'VAPT',
    'penetration testing',
    'offensive security',
    'web security',
    'OWASP',
    'PortSwigger',
  ],
  authors: [{ name: siteConfig.name }],
  creator: siteConfig.name,
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: '/',
    title: `${siteConfig.name} | ${siteConfig.title}`,
    description:
      'Offensive Security Learner and future VAPT Engineer. Explore my projects, certifications, and PortSwigger lab progress.',
    siteName: `${siteConfig.name} — Cybersecurity Portfolio`,
  },
  twitter: {
    card: 'summary_large_image',
    title: `${siteConfig.name} | ${siteConfig.title}`,
    description:
      'Offensive Security Learner and future VAPT Engineer. Explore my projects, certifications, and PortSwigger lab progress.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: siteConfig.name,
    jobTitle: 'Offensive Security Learner | Future VAPT Engineer',
    email: `mailto:${siteConfig.email}`,
    address: { '@type': 'PostalAddress', addressCountry: 'IN' },
    url: 'https://yaswanthcyber.com',
    sameAs: [siteConfig.social.linkedin, siteConfig.social.github],
  };

  return (
    <html lang="en" className={`${inter.variable} ${jetbrains.variable}`}>
      <body className="font-sans antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
