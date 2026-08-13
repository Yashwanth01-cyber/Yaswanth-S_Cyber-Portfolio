'use client';

import { motion } from 'framer-motion';
import { FolderGit2, Briefcase, Award, FlaskConical, BookOpen, Clock } from 'lucide-react';
import { GlassCard } from '@/components/shared/GlassCard';

interface StatsProps {
  projectCount: number;
  experienceCount: number;
  certCount: number;
  labsCompleted: number;
  githubRepos: number;
  learningHours: number;
}

export function Stats({
  projectCount,
  experienceCount,
  certCount,
  labsCompleted,
  githubRepos,
  learningHours,
}: StatsProps) {
  const stats = [
    { label: 'Projects', value: projectCount, icon: FolderGit2, color: 'text-emerald-400' },
    { label: 'Internships', value: experienceCount, icon: Briefcase, color: 'text-blue-400' },
    { label: 'Certifications', value: certCount, icon: Award, color: 'text-red-400' },
    { label: 'Labs Completed', value: labsCompleted, icon: FlaskConical, color: 'text-emerald-400' },
    { label: 'GitHub Repos', value: githubRepos, icon: BookOpen, color: 'text-blue-400' },
    { label: 'Learning Hours', value: learningHours, icon: Clock, color: 'text-red-400' },
  ];

  return (
    <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
        {stats.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ delay: i * 0.05 }}
            >
              <GlassCard className="p-4 text-center">
                <Icon className={`mx-auto mb-2 h-5 w-5 ${stat.color}`} />
                <div className="text-2xl font-bold tabular-nums">{stat.value}</div>
                <div className="mt-0.5 text-xs text-muted-foreground">{stat.label}</div>
              </GlassCard>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
