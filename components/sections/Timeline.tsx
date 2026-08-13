'use client';

import { motion } from 'framer-motion';
import {
  Rocket,
  Briefcase,
  Terminal,
  Radar,
  Activity,
  Bug,
  ShieldCheck,
  Database,
  Network,
  Shield,
  Crosshair,
  BookOpen,
  type LucideIcon,
} from 'lucide-react';
import { SectionHeading } from '@/components/shared/SectionHeading';
import { GlassCard } from '@/components/shared/GlassCard';
import type { DbTimelineEvent } from '@/lib/data';

const iconMap: Record<string, LucideIcon> = {
  Rocket,
  Briefcase,
  Terminal,
  Radar,
  Activity,
  Bug,
  ShieldCheck,
  Database,
  Network,
  Shield,
  Crosshair,
  BookOpen,
};

interface TimelineProps {
  timeline: DbTimelineEvent[];
}

function formatDate(date: string) {
  if (!date || !date.trim()) {
    return 'Currently Learning';
  }

  // Supports YYYY-MM
  const [year, month] = date.split('-');

  if (year && month) {
    const months = [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ];

    const monthIndex = Number.parseInt(month, 10) - 1;

    if (monthIndex >= 0 && monthIndex < 12) {
      return `${months[monthIndex]} ${year}`;
    }
  }

  // Supports existing values such as "April 2025"
  return date;
}

export function Timeline({ timeline }: TimelineProps) {
  return (
    <section
      id="timeline"
      className="mx-auto max-w-6xl px-4 py-20 sm:px-6"
    >
      <SectionHeading
        eyebrow="timeline"
        title="Learning Timeline"
        description="My cybersecurity learning journey, milestone by milestone."
      />

      <div className="relative">
        {/* Timeline line */}
        <div className="absolute bottom-0 left-4 top-0 w-px bg-gradient-to-b from-emerald-500/50 via-border to-transparent" />

        <div className="space-y-6">
          {timeline.map((item, i) => {
            const Icon = iconMap[item.icon] ?? Rocket;
            const isCurrent = !item.date || !item.date.trim();

            return (
              <motion.div
                key={`${item.event}-${i}`}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ delay: i * 0.05 }}
                className="relative pl-12"
              >
                {/* Timeline icon */}
                <div className="absolute left-4 top-3 -translate-x-1/2">
                  <span
                    className={`flex h-8 w-8 items-center justify-center rounded-lg border ${
                      isCurrent
                        ? 'border-blue-500/30 bg-blue-500/10 text-blue-400'
                        : 'border-emerald-500/30 bg-emerald-500/10 text-emerald-400'
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                  </span>
                </div>

                <GlassCard className="p-4 transition-colors hover:border-emerald-500/20">
                  <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-medium">
                        {item.event}
                      </p>

                      {isCurrent && (
                        <span className="inline-flex items-center rounded-full border border-blue-500/30 bg-blue-500/10 px-2 py-0.5 text-[10px] font-medium text-blue-400">
                          Current
                        </span>
                      )}
                    </div>

                    <span
                      className={`shrink-0 font-mono text-xs ${
                        isCurrent
                          ? 'text-blue-400'
                          : 'text-muted-foreground'
                      }`}
                    >
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