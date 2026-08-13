'use client';

import { motion } from 'framer-motion';
import {
  Award,
  ExternalLink,
  Briefcase,
  GraduationCap,
  BookOpen,
  Trophy,
  Code2,
  ShieldCheck,
} from 'lucide-react';

import { SectionHeading } from '@/components/shared/SectionHeading';
import { GlassCard } from '@/components/shared/GlassCard';
import { cn } from '@/lib/utils';
import type { DbCertification } from '@/lib/data';

interface CertificationsProps {
  certifications: DbCertification[];
}

const categoryConfig: Record<
  string,
  {
    label: string;
    icon: typeof Award;
    description: string;
  }
> = {
  Certification: {
    label: 'Cybersecurity Certifications',
    icon: ShieldCheck,
    description: 'Professional cybersecurity credentials and certifications.',
  },

  Internship: {
    label: 'Internships',
    icon: Briefcase,
    description: 'Industry internship experience and practical training.',
  },

  Training: {
    label: 'Training',
    icon: GraduationCap,
    description: 'Specialized cybersecurity training programs.',
  },

  'Job Simulation': {
    label: 'Job Simulations',
    icon: Trophy,
    description: 'Industry-focused virtual work experience programs.',
  },

  'Professional Program': {
    label: 'Professional Programs',
    icon: Code2,
    description: 'Technology and professional development programs.',
  },

  Learning: {
    label: 'Current Learning',
    icon: BookOpen,
    description: 'Security learning currently in progress.',
  },
};

const categoryOrder = [
  'Certification',
  'Internship',
  'Training',
  'Job Simulation',
  'Professional Program',
  'Learning',
];

export function Certifications({
  certifications,
}: CertificationsProps) {
  const grouped = categoryOrder
    .map((type) => ({
      type,
      items: certifications.filter((cert) => cert.type === type),
    }))
    .filter((group) => group.items.length > 0);

  return (
    <section
      id="certifications"
      className="mx-auto max-w-6xl px-4 py-20 sm:px-6"
    >
      <SectionHeading
        eyebrow="credentials"
        title="Certifications & Credentials"
        description="Professional certifications, internships, training, and industry programs that support my cybersecurity journey."
      />

      <div className="space-y-12">
        {grouped.map((group, groupIndex) => {
          const config =
            categoryConfig[group.type] ?? categoryConfig.Certification;

          const Icon = config.icon;

          return (
            <motion.div
              key={group.type}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ delay: groupIndex * 0.08 }}
            >
              {/* Category heading */}
              <div className="mb-5 flex items-start gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-emerald-500/20 bg-emerald-500/10 text-emerald-400">
                  <Icon className="h-5 w-5" />
                </div>

                <div>
                  <h3 className="text-base font-semibold">
                    {config.label}
                  </h3>

                  <p className="mt-1 text-sm text-muted-foreground">
                    {config.description}
                  </p>
                </div>
              </div>

              {/* Cards */}
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {group.items.map((cert, i) => {
                  const inProgress = cert.status === 'In Progress';

                  return (
                    <motion.div
                      key={`${cert.name}-${cert.issuer}-${i}`}
                      initial={{ opacity: 0, y: 15 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.05 }}
                    >
                      <GlassCard className="flex h-full flex-col p-5">
                        {/* Top row */}
                        <div className="flex items-start justify-between gap-3">
                          <span
                            className={cn(
                              'flex h-9 w-9 items-center justify-center rounded-lg border',
                              inProgress
                                ? 'border-blue-500/20 bg-blue-500/10 text-blue-400'
                                : 'border-emerald-500/20 bg-emerald-500/10 text-emerald-400'
                            )}
                          >
                            <Award className="h-4 w-4" />
                          </span>

                          <span
                            className={cn(
                              'rounded-full border px-2 py-0.5 text-xs font-medium',
                              inProgress
                                ? 'border-blue-500/30 bg-blue-500/10 text-blue-400'
                                : 'border-emerald-500/30 bg-emerald-500/10 text-emerald-400'
                            )}
                          >
                            {cert.status}
                          </span>
                        </div>

                        {/* Certificate name */}
                        <h4 className="mt-4 text-sm font-semibold leading-snug">
                          {cert.name}
                        </h4>

                        {/* Issuer + date */}
                        <p className="mt-1 text-xs text-muted-foreground">
                          {cert.issuer} • {cert.date}
                        </p>

                        {/* Credential */}
                        <div className="mt-auto pt-5">
                          <div className="flex items-center justify-between gap-3">
                            <span className="min-w-0 truncate font-mono text-xs text-muted-foreground/70">
                              ID: {cert.credentialId}
                            </span>

                            {cert.url && cert.url !== '#' && (
                              <a
                                href={cert.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex shrink-0 items-center gap-1 text-xs font-medium text-emerald-400 transition-colors hover:text-emerald-300"
                              >
                                View
                                <ExternalLink className="h-3 w-3" />
                              </a>
                            )}
                          </div>
                        </div>
                      </GlassCard>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}