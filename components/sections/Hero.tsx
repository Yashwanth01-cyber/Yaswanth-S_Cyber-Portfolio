'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import {
  Github,
  Linkedin,
  FileDown,
  ArrowRight,
  ChevronDown,
  ShieldCheck,
  Terminal,
  Activity,
  Radar,
} from 'lucide-react';
import Link from 'next/link';
import { profile } from '@/data/profile';
import { siteConfig } from '@/lib/site-config';

function useTypingEffect(
  words: string[],
  typingSpeed = 75,
  deletingSpeed = 38,
  pause = 1600
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

const telemetry = [
  {
    icon: Activity,
    label: 'SYSTEM',
    value: 'ONLINE',
    tone: 'text-emerald-300',
  },
  {
    icon: ShieldCheck,
    label: 'SECURITY',
    value: 'ACTIVE',
    tone: 'text-cyan-300',
  },
  {
    icon: Radar,
    label: 'INTELLIGENCE',
    value: 'MONITORING',
    tone: 'text-violet-300',
  },
];

export function Hero() {
  const typed = useTypingEffect(profile.taglines.slice(1));

  return (
    <section className="relative flex min-h-[calc(100vh-4rem)] items-center overflow-hidden pt-20 pb-20">
      {/* Local hero atmosphere */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-[8%] top-[18%] h-72 w-72 rounded-full bg-cyan-400/[0.08] blur-[100px]" />
        <div className="absolute right-[5%] top-[25%] h-80 w-80 rounded-full bg-violet-500/[0.08] blur-[110px]" />

        {/* Decorative orbital rings */}
        <div className="absolute right-[7%] top-1/2 hidden h-[420px] w-[420px] -translate-y-1/2 rounded-full border border-cyan-300/[0.07] lg:block" />
        <div className="absolute right-[11%] top-1/2 hidden h-[330px] w-[330px] -translate-y-1/2 rounded-full border border-violet-300/[0.08] lg:block" />
        <div className="absolute right-[16%] top-1/2 hidden h-[235px] w-[235px] -translate-y-1/2 rounded-full border border-pink-300/[0.08] lg:block" />

        {/* Center node */}
        <motion.div
          animate={{
            scale: [1, 1.08, 1],
            opacity: [0.55, 0.9, 0.55],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="absolute right-[calc(7%+190px)] top-1/2 hidden h-3 w-3 -translate-y-1/2 rounded-full bg-cyan-300 shadow-[0_0_30px_rgba(34,211,238,0.9)] lg:block"
        />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 sm:px-8 mobile-page-container">
        <div className="grid items-center gap-14 lg:grid-cols-[1.2fr_0.8fr]">
          {/* Main identity */}
          <div>
            {/* System label */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-6 flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.32em]"
            >
              <span className="flex items-center gap-2 text-emerald-300">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.8)]" />
                SYSTEM ONLINE
              </span>

              <span className="text-slate-700">/</span>

              <span className="text-slate-500">
                YASWANTH.OS
              </span>
            </motion.div>

            {/* Command */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.08 }}
              className="mb-4 flex items-center gap-2 font-mono text-xs text-cyan-400/70"
            >
              <Terminal className="h-3.5 w-3.5" />
              <span>identity://initialize</span>
              <span className="terminal-cursor" />
            </motion.div>

            {/* Name */}
            <motion.h1
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.7,
                delay: 0.15,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="hero-identity-title max-w-4xl text-[clamp(3.4rem,9vw,8rem)] font-black leading-[0.84] tracking-[-0.07em] text-white"
            >
              {profile.taglines[0]}
            </motion.h1>

            {/* Role */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mt-7 min-h-9"
            >
              <span className="font-mono text-base text-slate-500 sm:text-xl">
                <span className="text-cyan-400">&gt;</span>{' '}
                <span className="text-cyan-200">
                  {typed}
                </span>
                <span className="ml-1 inline-block h-5 w-[2px] animate-blink bg-cyan-300 align-middle" />
              </span>
            </motion.div>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mt-6 max-w-2xl text-sm leading-7 text-slate-400 sm:text-base"
            >
              Based in{' '}
              <span className="text-slate-200">
                {profile.location}
              </span>
              . Building systems, exploring attack surfaces, and turning
              cybersecurity research into practical engineering.
            </motion.p>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="mt-8 flex flex-col gap-3 sm:flex-row"
            >
              <Link
                href="/#projects"
                className="group inline-flex items-center justify-center gap-2 rounded-lg bg-cyan-400 px-6 py-3 text-sm font-semibold text-slate-950 transition-all duration-300 hover:bg-cyan-300 hover:shadow-[0_0_35px_rgba(34,211,238,0.35)]"
              >
                View Systems
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>

              <Link
                href={siteConfig.resumePath}
                download
                className="glass glass-hover inline-flex items-center justify-center gap-2 rounded-lg px-6 py-3 text-sm font-medium text-slate-200"
              >
                <FileDown className="h-4 w-4 text-cyan-300" />
                Resume
              </Link>

              <Link
                href="/#contact"
                className="inline-flex items-center justify-center rounded-lg px-5 py-3 text-sm font-medium text-slate-500 transition-colors hover:text-cyan-300"
              >
                Connect
              </Link>
            </motion.div>

            {/* Social */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="mt-7 flex items-center gap-2"
            >
              <Link
                href={siteConfig.social.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="glass glass-hover flex h-9 w-9 items-center justify-center rounded-lg text-slate-500 hover:text-cyan-300"
              >
                <Github className="h-4 w-4" />
              </Link>

              <Link
                href={siteConfig.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="glass glass-hover flex h-9 w-9 items-center justify-center rounded-lg text-slate-500 hover:text-cyan-300"
              >
                <Linkedin className="h-4 w-4" />
              </Link>

              <span className="ml-2 font-mono text-[9px] uppercase tracking-[0.25em] text-slate-700">
                secure connection
              </span>
            </motion.div>
          </div>

          {/* Intelligence panel */}
          <motion.div
            initial={{ opacity: 0, x: 35, scale: 0.96 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{
              duration: 0.8,
              delay: 0.35,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="hidden lg:block"
          >
            <div className="animate-float-slow relative mx-auto max-w-md">
              {/* Panel glow */}
              <div className="absolute -inset-5 rounded-[2rem] bg-cyan-400/[0.04] blur-2xl" />

              <div className="glass scan-line relative overflow-hidden rounded-2xl border-cyan-400/15 p-5">
                {/* Header */}
                <div className="flex items-center justify-between border-b border-white/[0.07] pb-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-cyan-400/20 bg-cyan-400/[0.06]">
                      <ShieldCheck className="h-4 w-4 text-cyan-300" />
                    </div>

                    <div>
                      <div className="font-mono text-[10px] font-semibold tracking-[0.2em] text-slate-300">
                        SECURITY CORE
                      </div>
                      <div className="mt-1 font-mono text-[8px] uppercase tracking-[0.18em] text-slate-600">
                        digital identity node
                      </div>
                    </div>
                  </div>

                  <span className="font-mono text-[9px] text-emerald-300">
                    v2.0
                  </span>
                </div>

                {/* Telemetry */}
                <div className="mt-5 space-y-2">
                  {telemetry.map((item, index) => {
                    const Icon = item.icon;

                    return (
                      <motion.div
                        key={item.label}
                        initial={{ opacity: 0, x: 10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{
                          duration: 0.4,
                          delay: 0.7 + index * 0.12,
                        }}
                        className="flex items-center justify-between rounded-lg border border-white/[0.05] bg-white/[0.02] px-3 py-3"
                      >
                        <div className="flex items-center gap-3">
                          <Icon className="h-3.5 w-3.5 text-slate-500" />

                          <span className="font-mono text-[9px] tracking-[0.18em] text-slate-500">
                            {item.label}
                          </span>
                        </div>

                        <span
                          className={`font-mono text-[9px] tracking-[0.16em] ${item.tone}`}
                        >
                          ● {item.value}
                        </span>
                      </motion.div>
                    );
                  })}
                </div>

                {/* Mini telemetry graph */}
                <div className="mt-5 rounded-lg border border-white/[0.05] bg-black/20 p-4">
                  <div className="mb-3 flex items-center justify-between">
                    <span className="font-mono text-[8px] uppercase tracking-[0.2em] text-slate-600">
                      activity stream
                    </span>

                    <span className="font-mono text-[8px] text-cyan-400/70">
                      LIVE
                    </span>
                  </div>

                  <div className="flex h-16 items-end gap-1">
                    {[22, 34, 27, 46, 39, 58, 44, 66, 52, 72, 61, 78, 55, 70, 84, 63, 76, 88, 69, 82].map(
                      (height, index) => (
                        <motion.div
                          key={index}
                          initial={{ height: 0 }}
                          animate={{ height: `${height}%` }}
                          transition={{
                            duration: 0.5,
                            delay: 0.8 + index * 0.025,
                          }}
                          className="flex-1 rounded-t-sm bg-gradient-to-t from-cyan-500/10 to-cyan-300/60"
                        />
                      )
                    )}
                  </div>
                </div>

                {/* Footer */}
                <div className="mt-5 flex items-center justify-between border-t border-white/[0.07] pt-4">
                  <span className="font-mono text-[8px] uppercase tracking-[0.18em] text-slate-600">
                    attack surface intelligence
                  </span>

                  <span className="flex items-center gap-1.5 font-mono text-[8px] text-emerald-300">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)]" />
                    READY
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Bottom telemetry strip */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-16 grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-white/[0.06] bg-white/[0.04] sm:grid-cols-4"
        >
          {[
            ['LOCATION', profile.location],
            ['MODE', 'OFFENSIVE SECURITY'],
            ['STATUS', 'AVAILABLE'],
            ['INTERFACE', 'YASWANTH.OS'],
          ].map(([label, value]) => (
            <div
              key={label}
              className="bg-[#050914]/70 px-4 py-3 backdrop-blur-xl"
            >
              <div className="font-mono text-[8px] uppercase tracking-[0.22em] text-slate-600">
                {label}
              </div>
              <div className="mt-1 truncate font-mono text-[9px] tracking-[0.08em] text-slate-300">
                {value}
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 7, 0] }}
        transition={{
          opacity: { duration: 0.8, delay: 1.1 },
          y: { duration: 1.5, repeat: Infinity },
        }}
        className="absolute bottom-5 left-1/2 -translate-x-1/2"
      >
        <div className="flex flex-col items-center gap-1">
          <span className="font-mono text-[7px] uppercase tracking-[0.3em] text-slate-700">
            scroll
          </span>
          <ChevronDown className="h-4 w-4 text-cyan-400/50" />
        </div>
      </motion.div>
    </section>
  );
}


