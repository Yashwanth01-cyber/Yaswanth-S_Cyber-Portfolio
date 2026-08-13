'use client';

import { motion } from 'framer-motion';
import {
  FlaskConical,
  ArrowRight,
  Activity,
  Layers,
  ExternalLink,
  CheckCircle2,
  ShieldCheck,
  Target,
} from 'lucide-react';

import { SectionHeading } from '@/components/shared/SectionHeading';
import { GlassCard } from '@/components/shared/GlassCard';

interface LabsData {
  totalCompleted: number;
  currentModule: string;
  latestLab: {
    title: string;
    module: string;
    date: string;
  };
  nextLab: {
    title: string;
    module: string;
  };
  recentActivity: Array<{
    title: string;
    module: string;
    date: string;
  }>;
  moduleProgress: Array<{
    module: string;
    completed: number;
    total: number;
  }>;
}

interface LabsProps {
  labs: LabsData;
}

export function Labs({ labs }: LabsProps) {
  const totalCompleted = labs.moduleProgress.reduce(
    (sum, module) => sum + module.completed,
    0
  );

  const totalLabs = labs.moduleProgress.reduce(
    (sum, module) => sum + module.total,
    0
  );

  const overallProgress =
    totalLabs > 0
      ? Math.round((totalCompleted / totalLabs) * 100)
      : 0;

  const currentModuleProgress =
    labs.moduleProgress.find(
      (module) => module.module === labs.currentModule
    ) ?? labs.moduleProgress[0];

  return (
    <section
      id="labs"
      className="mx-auto max-w-6xl px-4 py-20 sm:px-6"
    >
      <SectionHeading
        eyebrow="hands-on-security"
        title="Security Labs"
        description="Practical cybersecurity training through PortSwigger Web Security Academy, Burp Suite, and controlled web application security labs."
      />

      <div className="grid gap-6 lg:grid-cols-3">
        {/* LEFT COLUMN */}
        <div className="space-y-4 lg:col-span-1">
          {/* Overall Progress */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
          >
            <GlassCard className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-emerald-500/20 bg-emerald-500/10">
                  <FlaskConical className="h-5 w-5 text-emerald-400" />
                </div>

                <span className="rounded-full border border-emerald-500/20 bg-emerald-500/10 px-2.5 py-1 text-[11px] font-medium text-emerald-400">
                  Active Learning
                </span>
              </div>

              <div className="mt-5">
                <div className="flex items-end justify-between gap-3">
                  <div>
                    <div className="text-4xl font-bold tabular-nums text-emerald-400">
                      {labs.totalCompleted}
                    </div>

                    <p className="mt-1 text-xs text-muted-foreground">
                      Labs Completed
                    </p>
                  </div>

                  <div className="text-right">
                    <div className="text-lg font-semibold">
                      {overallProgress}%
                    </div>

                    <p className="text-[11px] text-muted-foreground">
                      roadmap progress
                    </p>
                  </div>
                </div>

                <div className="mt-5 h-2 w-full overflow-hidden rounded-full bg-white/5">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{
                      width: `${overallProgress}%`,
                    }}
                    viewport={{ once: true }}
                    transition={{
                      duration: 0.8,
                      ease: 'easeOut',
                    }}
                    className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-blue-500"
                  />
                </div>

                <div className="mt-2 flex items-center justify-between text-xs text-muted-foreground">
                  <span>
                    {totalCompleted} / {totalLabs} tracked labs
                  </span>

                  <span>{overallProgress}%</span>
                </div>
              </div>

              {currentModuleProgress && (
                <div className="mt-5 rounded-xl border border-border/50 bg-white/[0.02] p-3">
                  <p className="text-[11px] uppercase tracking-wide text-muted-foreground">
                    Current Module
                  </p>

                  <div className="mt-1 flex items-center gap-2">
                    <ShieldCheck className="h-3.5 w-3.5 text-emerald-400" />

                    <p className="text-sm font-semibold text-emerald-400">
                      {labs.currentModule}
                    </p>
                  </div>

                  <p className="mt-1 text-xs text-muted-foreground">
                    {currentModuleProgress.completed} /{' '}
                    {currentModuleProgress.total} completed
                  </p>
                </div>
              )}

              <p className="mt-4 text-[11px] leading-relaxed text-muted-foreground">
                Currently progressing through PortSwigger Web Security
                Academy with a focus on access-control vulnerabilities.
              </p>

              <a
                href="https://portswigger.net/web-security"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex items-center gap-1.5 text-xs font-medium text-emerald-400 transition-colors hover:text-emerald-300"
              >
                Open Web Security Academy
                <ExternalLink className="h-3 w-3" />
              </a>
            </GlassCard>
          </motion.div>

          {/* Current Focus */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ delay: 0.1 }}
          >
            <GlassCard className="p-5">
              <div className="mb-3 flex items-center gap-2">
                <Layers className="h-4 w-4 text-blue-400" />

                <h3 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                  Current Learning Focus
                </h3>
              </div>

              <p className="text-sm font-semibold">
                {labs.currentModule}
              </p>

              <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                Practicing authorization vulnerabilities, IDOR,
                privilege escalation, and access-control bypass
                techniques using Burp Suite.
              </p>
            </GlassCard>
          </motion.div>

          {/* Next Challenge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ delay: 0.15 }}
          >
            <GlassCard className="p-5">
              <div className="mb-3 flex items-center gap-2">
                <Target className="h-4 w-4 text-blue-400" />

                <h3 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                  Next Challenge
                </h3>
              </div>

              <p className="text-sm font-semibold leading-relaxed">
                {labs.nextLab.title}
              </p>

              <p className="mt-1 text-xs text-muted-foreground">
                {labs.nextLab.module}
              </p>

              <span className="mt-3 inline-flex rounded-full border border-blue-500/20 bg-blue-500/10 px-2 py-1 text-[11px] text-blue-400">
                Up Next
              </span>
            </GlassCard>
          </motion.div>
        </div>

        {/* RIGHT COLUMN */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ delay: 0.1 }}
          className="lg:col-span-2"
        >
          <GlassCard className="h-full p-6">
            {/* Latest Lab */}
            <div>
              <div className="mb-4 flex items-center gap-2">
                <FlaskConical className="h-4 w-4 text-emerald-400" />

                <h3 className="text-sm font-semibold">
                  Latest Completed Lab
                </h3>

                <span className="ml-auto text-xs text-muted-foreground">
                  {labs.latestLab.date}
                </span>
              </div>

              <div className="rounded-xl border border-emerald-500/10 bg-emerald-500/[0.03] p-5">
                <div className="flex items-start gap-3">
                  <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-emerald-500/10">
                    <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                  </div>

                  <div className="min-w-0">
                    <p className="text-sm font-semibold leading-relaxed">
                      {labs.latestLab.title}
                    </p>

                    <p className="mt-1 text-xs text-muted-foreground">
                      {labs.latestLab.module}
                    </p>
                  </div>
                </div>

                <p className="mt-4 text-xs leading-relaxed text-muted-foreground">
                  Completed as part of hands-on access-control testing
                  using Burp Suite and PortSwigger Web Security Academy.
                </p>

                <div className="mt-4 flex flex-wrap items-center gap-2">
                  <span className="inline-flex rounded-full border border-emerald-500/20 bg-emerald-500/10 px-2 py-1 text-[11px] text-emerald-400">
                    Completed
                  </span>

                  <span className="inline-flex rounded-full border border-border bg-white/[0.02] px-2 py-1 text-[11px] text-muted-foreground">
                    Burp Suite
                  </span>

                  <span className="inline-flex rounded-full border border-border bg-white/[0.02] px-2 py-1 text-[11px] text-muted-foreground">
                    Access Control
                  </span>
                </div>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="mt-6 border-t border-border/50 pt-6">
              <div className="mb-4 flex items-center gap-2">
                <Activity className="h-4 w-4 text-blue-400" />

                <h3 className="text-sm font-semibold">
                  Recent Activity
                </h3>
              </div>

              <div className="space-y-2">
                {labs.recentActivity.map((activity, index) => (
                  <motion.div
                    key={`${activity.title}-${activity.date}-${index}`}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.05 }}
                    className="flex items-center justify-between gap-3 rounded-lg border border-border/50 bg-white/[0.02] px-3 py-3"
                  >
                    <div className="min-w-0">
                      <p className="flex items-center gap-2 text-sm">
                        <CheckCircle2 className="h-3.5 w-3.5 shrink-0 text-emerald-400" />

                        <span className="truncate">
                          {activity.title}
                        </span>
                      </p>

                      <p className="mt-0.5 pl-5 text-xs text-muted-foreground">
                        {activity.module}
                      </p>
                    </div>

                    <span className="shrink-0 font-mono text-xs text-muted-foreground">
                      {activity.date}
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Learning Roadmap */}
            <div className="mt-6 border-t border-border/50 pt-6">
              <div className="mb-4 flex items-center justify-between">
                <h3 className="text-sm font-semibold">
                  Learning Roadmap
                </h3>

                <span className="text-xs text-muted-foreground">
                  {labs.moduleProgress.length} modules tracked
                </span>
              </div>

              <div className="space-y-4">
                {labs.moduleProgress.map((module) => {
                  const percentage =
                    module.total > 0
                      ? Math.round(
                          (module.completed / module.total) * 100
                        )
                      : 0;

                  const isCurrent =
                    module.module === labs.currentModule;

                  return (
                    <div key={module.module}>
                      <div className="mb-1.5 flex items-center justify-between gap-3">
                        <div className="flex min-w-0 items-center gap-2">
                          {isCurrent && (
                            <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-400" />
                          )}

                          <span
                            className={
                              isCurrent
                                ? 'truncate text-xs font-medium text-emerald-400'
                                : 'truncate text-xs text-muted-foreground'
                            }
                          >
                            {module.module}
                          </span>
                        </div>

                        <span className="shrink-0 font-mono text-xs text-muted-foreground">
                          {module.completed === 0
                            ? 'Upcoming'
                            : `${module.completed}/${module.total}`}
                        </span>
                      </div>

                      <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/5">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{
                            width: `${percentage}%`,
                          }}
                          viewport={{ once: true }}
                          transition={{
                            duration: 0.6,
                            delay: 0.05,
                          }}
                          className="h-full rounded-full bg-emerald-500"
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </GlassCard>
        </motion.div>
      </div>
    </section>
  );
}