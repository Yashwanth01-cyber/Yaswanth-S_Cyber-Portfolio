'use client';

import { useEffect, useState } from 'react';

const skillReel = [
  'CYBERSECURITY',
  'PYTHON',
  'REACT',
  'FASTAPI',
  'AI / ML',
  'NETWORK SECURITY',
  'CLOUD',
  'VAPT',
];

const projectReel = [
  'SENTINELX',
  'MANUFACTURING ERP',
  'TALKSHIELD',
  'SECURITY LABS',
  'FULL-STACK SYSTEMS',
];

const focusReel = [
  'OFFENSIVE SECURITY',
  'WEB SECURITY',
  'NETWORKING',
  'AI SECURITY',
  'FULL STACK',
  'THREAT INTELLIGENCE',
];

function ReelRow({
  items,
  direction,
  label,
}: {
  items: string[];
  direction: 'left' | 'right';
  label: string;
}) {
  const [paused, setPaused] = useState(false);

  return (
    <div className="relative overflow-hidden border-y border-white/[0.06]">
      <div className="mx-auto flex max-w-7xl items-center gap-5 px-6 py-3 sm:px-8">
        <span className="shrink-0 font-mono text-[9px] uppercase tracking-[0.28em] text-cyan-300/50">
          {label}
        </span>

        <div
          className="min-w-0 overflow-hidden"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onTouchStart={() => setPaused(true)}
          onTouchEnd={() => setPaused(false)}
        >
          <div
            className={`${direction === 'left' ? 'reel-track-left' : 'reel-track-right'} flex gap-3`}
            style={{
              animationPlayState: paused ? 'paused' : 'running',
            }}
          >
            {[...items, ...items].map((item, index) => (
              <div
                key={`${item}-${index}`}
                className="group flex shrink-0 items-center gap-3 rounded-full border border-white/[0.08] bg-white/[0.025] px-4 py-2 transition-all duration-300 hover:border-cyan-400/30 hover:bg-cyan-400/[0.06]"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-cyan-300 shadow-[0_0_10px_rgba(34,211,238,0.75)] transition-all duration-300 group-hover:scale-125" />

                <span className="whitespace-nowrap font-mono text-[10px] font-medium tracking-[0.16em] text-slate-400 transition-colors duration-300 group-hover:text-cyan-200">
                  {item}
                </span>

                <span className="text-[10px] text-slate-700">
                  /
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export function IntelligenceReels() {
  return (
    <section
      aria-label="Technical focus"
      className="relative z-10 overflow-hidden py-8"
    >
      <div className="mb-5 mx-auto max-w-7xl px-6 sm:px-8">
        <div className="font-mono text-[10px] uppercase tracking-[0.35em] text-slate-600">
          Live capability stream
        </div>
      </div>

      <div className="space-y-2">
        <ReelRow
          items={skillReel}
          direction="left"
          label="STACK"
        />

        <ReelRow
          items={projectReel}
          direction="right"
          label="SYSTEMS"
        />

        <ReelRow
          items={focusReel}
          direction="left"
          label="FOCUS"
        />
      </div>
    </section>
  );
}
