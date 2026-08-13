'use client';

import { motion } from 'framer-motion';
import {
  Rocket, Briefcase, Terminal, Radar, Activity, Bug, ShieldCheck, Database,
  type LucideIcon,
} from 'lucide-react';
import { SectionHeading } from '@/components/shared/SectionHeading';
import { GlassCard } from '@/components/shared/GlassCard';
import type { DbTimelineEvent } from '@/lib/data';

const iconMap: Record<string, LucideIcon> = {
  Rocket, Briefcase, Terminal, Radar, Activity, Bug, ShieldCheck, Database,
};

interface TimelineProps {
  timeline: DbTimelineEvent[];
}

function formatDate(d: string) {
  const [y, m] = d.split('-');
  const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  return `${months[parseInt(m, 10) - 1]} ${y}`;
}

export function Timeline({ timeline }: TimelineProps) {
  return (
    <section id="timeline" className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
      <SectionHeading
        eyebrow="timeline"
        title="Learning Timeline"
        description="My cybersecurity learning journey, milestone by milestone."
      />

      <div className="relative">
        <div className="absolute left-4 top-0 bottom-0 w-px bg-gradient-to-b from-emerald-500/40 via-border to-transparent" />

        <div className="space-y-6">
          {timeline.map((item, i) => {
            const Icon = iconMap[item.icon] ?? Rocket;
            return (
              <motion.div
                key={item.event}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ delay: i * 0.05 }}
                className="relative pl-12"
              >
                <div className="absolute left-4 top-3 -translate-x-1/2">
                  <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
                    <Icon className="h-4 w-4" />
                  </span>
                </div>

                <GlassCard className="p-4">
                  <div className="flex items-center justify-between gap-3">
                    <p className="text-sm font-medium">{item.event}</p>
                    <span className="shrink-0 font-mono text-xs text-muted-foreground">
                      {formatDate(item.date)}
                    </span>
                  </div>
                </GlassCard>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
