'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin, FileDown, ArrowRight, ChevronDown } from 'lucide-react';
import Link from 'next/link';
import { profile } from '@/data/profile';
import { siteConfig } from '@/lib/site-config';

function useTypingEffect(words: string[], typingSpeed = 90, deletingSpeed = 45, pause = 1400) {
  const [index, setIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (index >= words.length) return;

    if (!deleting && subIndex === words[index].length) {
      const t = setTimeout(() => setDeleting(true), pause);
      return () => clearTimeout(t);
    }
    if (deleting && subIndex === 0) {
      setDeleting(false);
      setIndex((i) => (i + 1) % words.length);
      return;
    }

    const t = setTimeout(() => {
      setSubIndex((s) => s + (deleting ? -1 : 1));
    }, deleting ? deletingSpeed : typingSpeed);
    return () => clearTimeout(t);
  }, [subIndex, index, deleting, words, typingSpeed, deletingSpeed, pause]);

  return words[index]?.substring(0, subIndex) || '';
}

export function Hero() {
  const typed = useTypingEffect(profile.taglines.slice(1));

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
      <div className="absolute inset-0 bg-grid opacity-40" />
      <div className="absolute inset-0 bg-radial-fade" />

      <div className="relative mx-auto max-w-4xl px-4 text-center sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 rounded-full glass px-4 py-1.5 mb-6"
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
          </span>
          <span className="font-mono text-xs text-muted-foreground">
            Open to opportunities
          </span>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="font-mono text-sm text-emerald-400 mb-3"
        >
          $ whoami
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-4xl font-bold tracking-tight sm:text-6xl"
        >
          {profile.taglines[0]}
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-4 h-8 flex items-center justify-center"
        >
          <span className="font-mono text-lg text-muted-foreground sm:text-xl">
            <span className="text-emerald-400">&gt;</span> {typed}
            <span className="ml-0.5 inline-block w-0.5 h-5 bg-emerald-400 animate-blink align-middle" />
          </span>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-6 max-w-xl mx-auto text-sm text-muted-foreground sm:text-base"
        >
          Based in {profile.location}. Focused on web application security,
          penetration testing, and vulnerability assessment. Currently progressing
          through PortSwigger&apos;s Web Security Academy.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4"
        >
          <Link
            href={siteConfig.resumePath}
            download
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-emerald-500 px-5 py-2.5 text-sm font-medium text-black transition-all hover:bg-emerald-400 hover:shadow-[0_0_24px_rgba(0,255,136,0.4)]"
          >
            <FileDown className="h-4 w-4" />
            Download Resume
          </Link>
          <Link
            href="/#projects"
            className="inline-flex items-center justify-center gap-2 rounded-lg glass glass-hover px-5 py-2.5 text-sm font-medium text-foreground"
          >
            View Projects
            <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            href="/#contact"
            className="inline-flex items-center justify-center gap-2 rounded-lg px-5 py-2.5 text-sm font-medium text-muted-foreground hover:text-emerald-400"
          >
            Contact
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="mt-8 flex items-center justify-center gap-3"
        >
          <Link
            href={siteConfig.social.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="flex h-10 w-10 items-center justify-center rounded-lg glass glass-hover text-muted-foreground hover:text-emerald-400"
          >
            <Github className="h-5 w-5" />
          </Link>
          <Link
            href={siteConfig.social.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="flex h-10 w-10 items-center justify-center rounded-lg glass glass-hover text-muted-foreground hover:text-emerald-400"
          >
            <Linkedin className="h-5 w-5" />
          </Link>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 8, 0] }}
        transition={{ duration: 1.5, repeat: Infinity, delay: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <ChevronDown className="h-5 w-5 text-muted-foreground" />
      </motion.div>
    </section>
  );
}
