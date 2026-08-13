'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import {
  Github,
  Linkedin,
  FileDown,
  ArrowRight,
  ChevronDown,
} from 'lucide-react';
import Link from 'next/link';
import { profile } from '@/data/profile';
import { siteConfig } from '@/lib/site-config';

function useTypingEffect(
  words: string[],
  typingSpeed = 90,
  deletingSpeed = 45,
  pause = 1400
) {
  const [index, setIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (!words.length) return;

    if (!deleting && subIndex === words[index].length) {
      const timer = setTimeout(() => setDeleting(true), pause);
      return () => clearTimeout(timer);
    }

    if (deleting && subIndex === 0) {
      setDeleting(false);
      setIndex((current) => (current + 1) % words.length);
      return;
    }

    const timer = setTimeout(
      () => {
        setSubIndex((current) => current + (deleting ? -1 : 1));
      },
      deleting ? deletingSpeed : typingSpeed
    );

    return () => clearTimeout(timer);
  }, [
    subIndex,
    index,
    deleting,
    words,
    typingSpeed,
    deletingSpeed,
    pause,
  ]);

  return words[index]?.substring(0, subIndex) ?? '';
}

export function Hero() {
  const typed = useTypingEffect(profile.taglines.slice(1));

  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden pt-16">
      <div className="absolute inset-0 bg-grid opacity-40" />
      <div className="absolute inset-0 bg-radial-fade" />

      <div className="relative mx-auto max-w-4xl px-4 text-center sm:px-6">
        {/* Availability */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="glass mb-6 inline-flex items-center gap-2 rounded-full px-4 py-1.5"
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
          </span>

          <span className="font-mono text-xs text-muted-foreground">
            Open to opportunities
          </span>
        </motion.div>

        {/* Terminal prompt */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-3 font-mono text-sm text-emerald-400"
        >
          $ whoami
        </motion.p>

        {/* Main identity */}
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-4xl font-bold tracking-tight sm:text-6xl"
        >
          {profile.taglines[0]}
        </motion.h1>

        {/* Typing role */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-4 flex h-8 items-center justify-center"
        >
          <span className="font-mono text-lg text-muted-foreground sm:text-xl">
            <span className="text-emerald-400">&gt;</span>{' '}
            {typed}
            <span className="ml-0.5 inline-block h-5 w-0.5 animate-blink bg-emerald-400 align-middle" />
          </span>
        </motion.div>

        {/* Introduction */}
        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mx-auto mt-6 max-w-xl text-sm leading-relaxed text-muted-foreground sm:text-base"
        >
          Based in {profile.location}. Focused on web application security,
          penetration testing, vulnerability assessment, and continuous
          cybersecurity research.
        </motion.p>

        {/* CTA buttons */}
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
            className="glass glass-hover inline-flex items-center justify-center gap-2 rounded-lg px-5 py-2.5 text-sm font-medium text-foreground"
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

        {/* Social links */}
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
            className="glass glass-hover flex h-10 w-10 items-center justify-center rounded-lg text-muted-foreground hover:text-emerald-400"
          >
            <Github className="h-5 w-5" />
          </Link>

          <Link
            href={siteConfig.social.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="glass glass-hover flex h-10 w-10 items-center justify-center rounded-lg text-muted-foreground hover:text-emerald-400"
          >
            <Linkedin className="h-5 w-5" />
          </Link>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 8, 0] }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          delay: 1,
        }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <ChevronDown className="h-5 w-5 text-muted-foreground" />
      </motion.div>
    </section>
  );
}