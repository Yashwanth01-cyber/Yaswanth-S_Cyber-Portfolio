'use client';

import { motion } from 'framer-motion';
import { FlaskConical, ArrowRight, Activity, Layers } from 'lucide-react';
import { SectionHeading } from '@/components/shared/SectionHeading';
import { GlassCard } from '@/components/shared/GlassCard';

interface LabsData {
  totalCompleted: number;
  currentModule: string;
  latestLab: { title: string; module: string; date: string };
  nextLab: { title: string; module: string };
  recentActivity: Array<{ title: string; module: string; date: string }>;
  moduleProgress: Array<{ module: string; completed: number; total: number }>;
}

interface LabsProps {
  labs: LabsData;
}

export function Labs({ labs }: LabsProps) {
  const totalCompleted = labs.moduleProgress.reduce((s, m) => s + m.completed, 0);
  const totalLabs = labs.moduleProgress.reduce((s, m) => s + m.total, 0);
  const overallProgress = totalLabs > 0 ? Math.round((totalCompleted / totalLabs) * 100) : 0;

  return (
    <section id="labs" className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
      <SectionHeading
        eyebrow="portswigger"
        title="Hands-on Security Labs"
        description="Practical cybersecurity training through PortSwigger Web Security Academy, Burp Suite, and hands-on web application security labs."
      />

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-1 space-y-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
          >
            <GlassCard className="p-6 text-center">
              <div className="text-4xl font-bold text-emerald-400 tabular-nums">
                {labs.totalCompleted}
              </div>
              <div className="mt-1 text-xs text-muted-foreground">PortSwigger Progress</div>
              <div className="mt-4 h-2 w-full rounded-full bg-white/5 overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: `${overallProgress}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, ease: 'easeOut' }}
                  className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-blue-500"
                />
              </div>
              <div className="mt-2 text-xs text-muted-foreground">
                  {labs.moduleProgress[0].completed} / {labs.moduleProgress[0].total} Access Control Labs
              </div>

              <p className="mt-1 text-[11px] text-emerald-400">
                  Currently progressing through PortSwigger Web Security Academy
              </p>
            </GlassCard>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ delay: 0.1 }}
          >
            <GlassCard className="p-5">
              <div className="flex items-center gap-2 mb-3">
                <Layers className="h-4 w-4 text-blue-400" />
                <h3 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                  Current Learning Focus
                </h3>
              </div>
              <p className="text-sm font-semibold">
                  {labs.currentModule}
              </p>

              <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                  Learning authorization vulnerabilities,
                  IDOR, privilege escalation and access
                  control bypass techniques using Burp Suite.
              </p>
            </GlassCard>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ delay: 0.15 }}
          >
            <GlassCard className="p-5">
              <div className="flex items-center gap-2 mb-3">
                <ArrowRight className="h-4 w-4 text-red-400" />
                <h3 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                  Upcoming Challenge
                </h3>
              </div>
              <p className="text-sm font-semibold">
                  {labs.nextLab.title}
              </p>

              <p className="mt-1 text-xs text-muted-foreground">
                  {labs.nextLab.module}
              </p>

              <span className="mt-3 inline-flex rounded-full bg-blue-500/10 px-2 py-1 text-[11px] text-blue-400">
                  Next Objective
              </span>
            </GlassCard>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ delay: 0.1 }}
          className="lg:col-span-2"
        >
          <GlassCard className="p-6 h-full">
            <div className="flex items-center gap-2 mb-5">
              <FlaskConical className="h-4 w-4 text-emerald-400" />
              <h3 className="text-sm font-semibold">
                Latest Lab
              </h3>
              <span className="ml-auto text-xs text-muted-foreground">{labs.latestLab.date}</span>
            </div>
            <p className="text-base font-semibold mb-2">
              {labs.latestLab.title}
            </p>

            <p className="text-xs text-muted-foreground mb-4">
              Successfully completed while practicing authorization vulnerability testing using Burp Suite and PortSwigger Web Security Academy.
            </p>

            <span className="inline-flex rounded-full bg-emerald-500/10 px-2 py-1 text-[11px] text-emerald-400">
              ✔ Completed
            </span>

            <div className="flex items-center gap-2 mb-4">
              <Activity className="h-4 w-4 text-blue-400" />
              <h3 className="text-sm font-semibold">Recent Activity</h3>
            </div>
            <div className="space-y-2">
              {labs.recentActivity.map((a, i) => (
                <motion.div
                  key={a.title}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  className="flex items-center justify-between rounded-lg border border-border/50 bg-white/[0.02] px-3 py-2"
                >
                  <div>
                    <p className="text-sm">
                      ✔ {a.title}
                    </p>
                    <p className="text-xs text-muted-foreground">{a.module}</p>
                  </div>
                  <span className="font-mono text-xs text-muted-foreground">{a.date}</span>
                </motion.div>
              ))}
            </div>

            <div className="mt-6 pt-5 border-t border-border/50">
              <h3 className="mb-3 text-sm font-semibold">Learning Roadmap</h3>
              <div className="space-y-3">
                {labs.moduleProgress.map((m) => {
                  const pct = Math.round((m.completed / m.total) * 100);
                  return (
                    <div key={m.module}>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs text-muted-foreground">{m.module}</span>
                        <span className="font-mono text-xs text-muted-foreground">
                          {m.completed === 0
                            ? 'Upcoming'
                            : `${m.completed}/${m.total}`}
                        </span>
                      </div>
                      <div className="h-1.5 w-full rounded-full bg-white/5 overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${pct}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.6 }}
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
