'use client';

import { motion } from 'framer-motion';
import {
  Code2, Network, Terminal, Globe, ShieldCheck,
  type LucideIcon,
} from 'lucide-react';
import { skills, levelStyles } from '@/data/skills';
import { SectionHeading } from '@/components/shared/SectionHeading';
import { GlassCard } from '@/components/shared/GlassCard';
import { cn } from '@/lib/utils';

const iconMap: Record<string, LucideIcon> = {
  Code2, Network, Terminal, Globe, ShieldCheck,
};

export function Skills() {
  return (
    <section id="skills" className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
      <SectionHeading
        eyebrow="skills"
        title="Skills & Proficiency"
        description="Categorized by domain, tagged by proficiency level."
      />

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {skills.map((group, gi) => {
          const Icon = iconMap[group.icon] ?? Code2;
          return (
            <motion.div
              key={group.category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ delay: gi * 0.05 }}
            >
              <GlassCard className="p-6 h-full">
                <div className="flex items-center gap-2 mb-4">
                  <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
                    <Icon className="h-4 w-4" />
                  </span>
                  <h3 className="text-sm font-semibold">{group.category}</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {group.items.map((item) => {
                    const style = (levelStyles as Record<string, { label: string; className: string }>)[item.level];
                    return (
                      <div
                        key={item.name}
                        className="group relative inline-flex"
                      >
                        <span className="rounded-md border px-2.5 py-1 text-xs font-medium text-foreground">
                          {item.name}
                        </span>
                        <span
                          className={cn(
                            'rounded-md border px-2.5 py-1 text-xs font-medium -ml-2',
                            style?.className
                          )}
                        >
                          {style?.label}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </GlassCard>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
