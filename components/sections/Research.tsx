'use client';

import { motion } from 'framer-motion';
import { FileText, Loader2, CheckCircle2 } from 'lucide-react';
import { SectionHeading } from '@/components/shared/SectionHeading';
import { GlassCard } from '@/components/shared/GlassCard';
import { cn } from '@/lib/utils';
import type { DbResearch } from '@/lib/data';

interface ResearchProps {
  research: DbResearch[];
}

export function Research({ research }: ResearchProps) {
  return (
    <section id="research" className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
      <SectionHeading
        eyebrow="research"
        title="Research"
        description="Security research papers I'm working on."
      />

      <div className="grid gap-6 lg:grid-cols-2">
        {research.map((paper, i) => {
          const published = paper.status === 'Published';
          return (
            <motion.div
              key={paper.slug}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ delay: i * 0.1 }}
            >
              <GlassCard className="p-6 h-full">
                <div className="flex items-start justify-between gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
                    <FileText className="h-5 w-5" />
                  </span>
                  <span
                    className={cn(
                      'inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-xs font-medium',
                      published
                        ? 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30'
                        : 'text-blue-400 bg-blue-500/10 border-blue-500/30'
                    )}
                  >
                    {published ? (
                      <CheckCircle2 className="h-3 w-3" />
                    ) : (
                      <Loader2 className="h-3 w-3 animate-spin" />
                    )}
                    {paper.status}
                  </span>
                </div>

                <h3 className="mt-4 text-base font-semibold">{paper.title}</h3>
                <p className="mt-1 text-xs text-muted-foreground">
                  {paper.authors.join(', ')} · {paper.date}
                </p>
                <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
                  {paper.abstract}
                </p>

                <div className="mt-3 flex flex-wrap gap-1.5">
                  {paper.tags.map((t) => (
                    <span
                      key={t}
                      className="rounded-md border border-border bg-white/5 px-2 py-0.5 font-mono text-xs text-muted-foreground"
                    >
                      {t}
                    </span>
                  ))}
                </div>

                {!published && (
                  <div className="mt-5">
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-xs text-muted-foreground">Writing Progress</span>
                      <span className="font-mono text-xs text-emerald-400">{paper.progress}%</span>
                    </div>
                    <div className="h-1.5 w-full rounded-full bg-white/5 overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${paper.progress}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-blue-500"
                      />
                    </div>
                  </div>
                )}
              </GlassCard>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
