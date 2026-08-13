'use client';

import { motion } from 'framer-motion';
import { Briefcase, Calendar } from 'lucide-react';
import { SectionHeading } from '@/components/shared/SectionHeading';
import { GlassCard } from '@/components/shared/GlassCard';
import type { DbExperience } from '@/lib/data';

interface ExperienceProps {
  experiences: DbExperience[];
}

export function Experience({ experiences }: ExperienceProps) {
  return (
    <section
      id="experience"
      className="mx-auto max-w-6xl px-4 py-20 sm:px-6"
    >
      <SectionHeading
        eyebrow="internships"
        title="Internships"
        description="Hands-on experience across cybersecurity, security testing, and analysis."
      />

      <div className="relative">
        {/* Timeline line */}
        <div className="absolute left-4 top-0 bottom-0 w-px bg-gradient-to-b from-emerald-500/40 via-border to-transparent sm:left-1/2" />

        <div className="space-y-8">
          {experiences.map((exp, i) => (
            <motion.div
              key={`${exp.company}-${exp.role}`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ delay: i * 0.1 }}
              className={`relative pl-12 sm:pl-0 ${
                i % 2 === 0
                  ? 'sm:pr-[55%]'
                  : 'sm:pl-[55%]'
              }`}
            >
              {/* Timeline marker */}
              <div
                className={`absolute left-4 top-2 -translate-x-1/2 sm:left-1/2 ${
                  i % 2 === 0
                    ? 'sm:left-[45%] sm:translate-x-1/2'
                    : 'sm:-translate-x-1/2'
                }`}
              >
                <span className="flex h-3 w-3 rounded-full bg-emerald-500 ring-4 ring-emerald-500/20" />
              </div>

              <GlassCard className="p-5">
                {/* Role */}
                <div className="mb-1 flex items-center gap-2">
                  <Briefcase className="h-4 w-4 text-emerald-400" />

                  <h3 className="text-sm font-semibold">
                    {exp.role}
                  </h3>
                </div>

                {/* Company + period */}
                <div className="mb-3 flex flex-wrap items-center gap-x-4 gap-y-1">
                  <span className="text-sm text-muted-foreground">
                    {exp.company}
                  </span>

                  <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
                    <Calendar className="h-3 w-3" />
                    {exp.period} • {exp.duration}
                  </span>
                </div>

                {/* Description */}
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {exp.description}
                </p>

                {/* Highlights */}
                {exp.highlights.length > 0 && (
                  <ul className="mt-3 space-y-1">
                    {exp.highlights.map((highlight) => (
                      <li
                        key={highlight}
                        className="flex items-start gap-2 text-xs text-muted-foreground"
                      >
                        <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-emerald-400" />

                        <span>{highlight}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}