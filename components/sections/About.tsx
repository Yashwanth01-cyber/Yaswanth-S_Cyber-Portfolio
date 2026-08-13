'use client';

import { motion } from 'framer-motion';
import { Target, BookOpen, Award } from 'lucide-react';
import { profile } from '@/data/profile';
import { SectionHeading } from '@/components/shared/SectionHeading';
import { GlassCard } from '@/components/shared/GlassCard';

export function About() {
  return (
    <section id="about" className="py-20">
      <SectionHeading
        title="About Me"
        sub-title="My journey into cybersecurity and my career aspirations."
      />

      <div className="grid gap-6 lg:grid-cols-3">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          className="lg:col-span-2"
        >
          <GlassCard className="p-6 sm:p-8">
            <p className="text-sm leading-relaxed text-muted-foreground sm:text-base">
              {profile.about.intro}
            </p>

            <p className="mt-4 text-sm leading-relaxed text-muted-foreground sm:text-base">
              {profile.about.body}
            </p>
          </GlassCard>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ delay: 0.1 }}
        >
          <GlassCard className="p-6 h-full">
            <div className="flex items-center gap-2 mb-3">
              <Target className="h-5 w-5 text-emerald-400" />
              <h3 className="text-sm font-semibold text-foreground">
                Career Goal
              </h3>
            </div>

            <p className="text-sm text-muted-foreground leading-relaxed">
              {profile.about.careerGoal}
            </p>
          </GlassCard>
        </motion.div>
      </div>

      <div className="mt-6 grid gap-6 md:grid-cols-3">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
        >
          <GlassCard className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <BookOpen className="h-5 w-5 text-blue-400" />
              <h3 className="text-sm font-semibold text-foreground">
                Current Focus
              </h3>
            </div>

            <div className="space-y-2">
              {profile.currentFocus.map((item, index) => (
                <p
                  key={index}
                  className="font-mono text-sm text-muted-foreground"
                >
                  <span className="text-emerald-400">&gt;</span> {item}
                </p>
              ))}
            </div>
          </GlassCard>
        </motion.div>
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ delay: 0.05 }}
          >
            <GlassCard className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <BookOpen className="h-5 w-5 text-cyan-400" />
                <h3 className="text-sm font-semibold text-foreground">
                  Tools in Practice
                </h3>
              </div>

              <div className="flex flex-wrap gap-2">
                {profile.toolsInPractice.map((tool, index) => (
                  <span
                    key={index}
                    className="rounded-full border border-cyan-500/30 bg-cyan-500/10 px-3 py-1 text-xs text-cyan-300"
                  >
                    {tool}
                  </span>
                ))}
              </div>
            </GlassCard>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ delay: 0.1 }}
        >
          <GlassCard className="p-6">
            <div className="flex items-center gap-2 mb-3">
              <Award className="h-5 w-5 text-red-400" />
              <h3 className="text-sm font-semibold text-foreground">
                  Latest Milestone
              </h3>
            </div>

            <div className="space-y-2">
              <p className="font-semibold text-foreground">
                {profile.latestAchievement.title}
              </p>

              <p className="text-sm text-muted-foreground leading-relaxed">
                {profile.latestAchievement.description}
              </p>

              <p className="text-xs text-emerald-400">
                {profile.latestAchievement.date}
              </p>
            </div>
          </GlassCard>
        </motion.div>
      </div>
    </section>
  );
}