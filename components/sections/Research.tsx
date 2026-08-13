'use client';

import { motion } from 'framer-motion';
import {
  FileText,
  Loader2,
  CheckCircle2,
  ExternalLink,
  Users,
  Calendar,
  ArrowUpRight,
} from 'lucide-react';
import { SectionHeading } from '@/components/shared/SectionHeading';
import { GlassCard } from '@/components/shared/GlassCard';
import { cn } from '@/lib/utils';
import type { DbResearch } from '@/lib/data';

interface ResearchProps {
  research: DbResearch[];
}

export function Research({ research }: ResearchProps) {
  return (
    <section
      id="research"
      className="mx-auto max-w-6xl px-4 py-20 sm:px-6"
    >
      <SectionHeading
        eyebrow="research"
        title="Research"
        description="Security research, technical studies, and work in progress."
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
              <GlassCard className="p-6 h-full flex flex-col">
                {/* Header */}
                <div className="flex items-start justify-between gap-4">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-emerald-500/20 bg-emerald-500/10 text-emerald-400">
                    <FileText className="h-5 w-5" />
                  </span>

                  <span
                    className={cn(
                      'inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-medium',
                      published
                        ? 'border-emerald-500/30 bg-emerald-500/10 text-emerald-400'
                        : 'border-blue-500/30 bg-blue-500/10 text-blue-400'
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

                {/* Title */}
                <h3 className="mt-5 text-lg font-semibold leading-snug">
                  {paper.title}
                </h3>

                {/* Metadata */}
                <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-muted-foreground">
                  <span className="inline-flex items-center gap-1.5">
                    <Users className="h-3.5 w-3.5" />
                    {paper.authors.join(', ')}
                  </span>

                  <span className="inline-flex items-center gap-1.5">
                    <Calendar className="h-3.5 w-3.5" />
                    {paper.date}
                  </span>
                </div>

                {/* Abstract */}
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                  {paper.abstract}
                </p>

                {/* Tags */}
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {paper.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-md border border-border bg-white/5 px-2 py-1 font-mono text-xs text-muted-foreground"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Progress */}
                {!published && (
                  <div className="mt-6">
                    <div className="mb-2 flex items-center justify-between">
                      <span className="text-xs font-medium text-muted-foreground">
                        Research Progress
                      </span>

                      <span className="font-mono text-xs text-emerald-400">
                        {paper.progress}%
                      </span>
                    </div>

                    <div className="h-2 w-full overflow-hidden rounded-full bg-white/5">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${paper.progress}%` }}
                        viewport={{ once: true }}
                        transition={{
                          duration: 1,
                          ease: 'easeOut',
                        }}
                        className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-blue-500"
                      />
                    </div>
                  </div>
                )}

                {/* Actions */}
                <div className="mt-auto flex flex-wrap items-center gap-3 pt-6">
                  <a
                    href={
                      paper.slug === 'sentinelx'
                        ? '/SentinelX_Research_Paper.pdf'
                        : '#'
                    }
                    target="_blank"
                    rel="noopener noreferrer"
                    className={cn(
                      'inline-flex items-center gap-2 rounded-lg border px-3 py-2 text-xs font-medium transition-all',
                      paper.slug === 'sentinelx'
                        ? 'border-emerald-500/30 bg-emerald-500/10 text-emerald-400 hover:border-emerald-500/50 hover:bg-emerald-500/15 hover:text-emerald-300'
                        : 'pointer-events-none border-border text-muted-foreground/50'
                    )}
                  >
                    <FileText className="h-3.5 w-3.5" />
                    Read Research Paper
                    <ExternalLink className="h-3 w-3" />
                  </a>

                  <span className="inline-flex items-center gap-1.5 text-xs text-muted-foreground/60">
                    <ArrowUpRight className="h-3 w-3" />
                    Technical Research
                  </span>
                </div>
              </GlassCard>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}