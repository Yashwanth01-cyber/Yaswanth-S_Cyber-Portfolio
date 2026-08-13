'use client';

import { motion } from 'framer-motion';
import { Award, ExternalLink } from 'lucide-react';
import { SectionHeading } from '@/components/shared/SectionHeading';
import { GlassCard } from '@/components/shared/GlassCard';
import { cn } from '@/lib/utils';
import type { DbCertification } from '@/lib/data';

interface CertificationsProps {
  certifications: DbCertification[];
}

export function Certifications({ certifications }: CertificationsProps) {
  return (
    <section id="certifications" className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
      <SectionHeading
        eyebrow="certifications"
        title="Certifications"
        description="Professional credentials and training I've completed."
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {certifications.map((cert, i) => {
          const inProgress = cert.status === 'In Progress';
          return (
            <motion.div
              key={cert.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ delay: i * 0.05 }}
            >
              <GlassCard className="p-5 h-full flex flex-col">
                <div className="flex items-start justify-between gap-3">
                  <span
                    className={cn(
                      'flex h-9 w-9 items-center justify-center rounded-lg border',
                      inProgress
                        ? 'bg-blue-500/10 border-blue-500/20 text-blue-400'
                        : 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400'
                    )}
                  >
                    <Award className="h-4 w-4" />
                  </span>
                  <span
                    className={cn(
                      'rounded-full border px-2 py-0.5 text-xs font-medium',
                      inProgress
                        ? 'text-blue-400 bg-blue-500/10 border-blue-500/30'
                        : 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30'
                    )}
                  >
                    {cert.status}
                  </span>
                </div>

                <h3 className="mt-3 text-sm font-semibold leading-snug">{cert.name}</h3>
                <p className="mt-1 text-xs text-muted-foreground">{cert.issuer} · {cert.date}</p>

                <div className="mt-auto pt-4 flex items-center justify-between">
                  <span className="font-mono text-xs text-muted-foreground/70">
                    ID: {cert.credentialId}
                  </span>
                  {cert.url !== '#' && (
                    <a
                      href={cert.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-xs text-emerald-400 hover:text-emerald-300"
                    >
                      View Certificate <ExternalLink className="h-3 w-3" />
                    </a>
                  )}
                </div>
              </GlassCard>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
