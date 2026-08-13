'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Github, ExternalLink, ChevronDown, Cpu, CheckCircle2, Loader2 } from 'lucide-react';
import { SectionHeading } from '@/components/shared/SectionHeading';
import { GlassCard } from '@/components/shared/GlassCard';
import { cn } from '@/lib/utils';
import type { DbProject } from '@/lib/data';

const statusStyles: Record<string, string> = {
  'Active Development': 'text-blue-400 bg-blue-500/10 border-blue-500/30',
  Completed: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30',
  'On Hold': 'text-muted-foreground bg-muted/20 border-border',
};

interface ProjectsProps {
  projects: DbProject[];
}

export function Projects({ projects }: ProjectsProps) {
  const [expanded, setExpanded] = useState<string | null>(null);

  return (
    <section id="projects" className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
      <SectionHeading
        eyebrow="projects"
        title="Projects"
        description="Hands-on security tools and applications I'm building."
      />

      <div className="grid gap-6 lg:grid-cols-2">
        {projects.map((project, i) => {
          const isOpen = expanded === project.slug;
          return (
            <motion.div
              key={project.slug}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ delay: i * 0.1 }}
            >
              <GlassCard className="p-6 h-full flex flex-col">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="text-lg font-semibold">{project.name}</h3>
                    <p className="mt-1 text-sm text-muted-foreground">{project.tagline}</p>
                  </div>
                  <span
                    className={cn(
                      'shrink-0 inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-xs font-medium',
                      statusStyles[project.status] ?? statusStyles['Active Development']
                    )}
                  >
                    {project.status === 'Active Development' && (
                      <Loader2 className="h-3 w-3 animate-spin" />
                    )}
                    {project.status}
                  </span>
                </div>

                <p className="mt-4 text-sm text-muted-foreground leading-relaxed">
                  {project.overview}
                </p>

                <div className="mt-4 flex flex-wrap gap-1.5">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="rounded-md border border-border bg-white/5 px-2 py-0.5 font-mono text-xs text-muted-foreground"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <button
                  onClick={() => setExpanded(isOpen ? null : project.slug)}
                  className="mt-4 inline-flex items-center gap-1 text-xs font-medium text-emerald-400 hover:text-emerald-300"
                >
                  {isOpen ? 'Hide details' : 'View details'}
                  <ChevronDown
                    className={cn('h-3.5 w-3.5 transition-transform', isOpen && 'rotate-180')}
                  />
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="mt-4 space-y-4 border-t border-border/50 pt-4">
                        <div>
                          <div className="flex items-center gap-1.5 mb-1.5">
                            <Cpu className="h-3.5 w-3.5 text-emerald-400" />
                            <h4 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                              Architecture
                            </h4>
                          </div>
                          <p className="text-sm text-muted-foreground leading-relaxed">
                            {project.architecture}
                          </p>
                        </div>
                        <div>
                          <h4 className="mb-1.5 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                            Features
                          </h4>
                          <ul className="space-y-1">
                            {project.features.map((f) => (
                              <li key={f} className="flex items-start gap-2 text-sm text-muted-foreground">
                                <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-emerald-400" />
                                {f}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                <div className="mt-auto flex items-center gap-3 pt-5">
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground hover:text-emerald-400"
                  >
                    <Github className="h-4 w-4" />
                    GitHub
                  </a>
                  <a
                    href={project.liveDemo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={cn(
                      'inline-flex items-center gap-1.5 text-xs font-medium',
                      project.liveDemo === '#'
                        ? 'text-muted-foreground/50 pointer-events-none'
                        : 'text-muted-foreground hover:text-emerald-400'
                    )}
                  >
                    <ExternalLink className="h-4 w-4" />
                    Live Demo
                  </a>
                </div>
              </GlassCard>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
