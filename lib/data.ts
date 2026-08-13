import { projects as staticProjects } from '@/data/projects';
import { experience as staticExperience } from '@/data/experience';
import { certifications as staticCerts } from '@/data/certifications';
import { labs as staticLabs } from '@/data/labs';
import { research as staticResearch } from '@/data/research';
import { timeline as staticTimeline } from '@/data/timeline';
import { blogs as staticBlogs } from '@/data/blogs';

export interface DbProject {
  slug: string;
  name: string;
  tagline: string;
  overview: string;
  technologies: string[];
  features: string[];
  architecture: string;
  github: string;
  liveDemo: string;
  status: string;
  screenshots: string[];
}

export interface DbExperience {
  company: string;
  role: string;
  duration: string;
  period: string;
  description: string;
  highlights: string[];
}

export interface DbCertification {
  name: string;
  issuer: string;
  date: string;
  credentialId: string;
  url: string;
  status: string;
  type: string;
}

export interface DbLab {
  title: string;
  module: string;
  status: string;
  completedAt: string | null;
}

export interface DbResearch {
  slug: string;
  title: string;
  abstract: string;
  status: string;
  progress: number;
  date: string;
  authors: string[];
  tags: string[];
}

export interface DbTimelineEvent {
  event: string;
  date: string;
  icon: string;
}

export interface DbBlogPost {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  readTime: string;
  tags: string[];
}

export async function getProjects(): Promise<DbProject[]> {
  return staticProjects.map((p) => ({
    slug: p.slug,
    name: p.name,
    tagline: p.tagline,
    overview: p.overview,
    technologies: p.technologies,
    features: p.features,
    architecture: p.architecture,
    github: p.github,
    liveDemo: p.liveDemo,
    status: p.status,
    screenshots: p.screenshots,
  }));
}

export async function getExperiences(): Promise<DbExperience[]> {
  return staticExperience.map((e) => ({
    company: e.company,
    role: e.role,
    duration: e.duration,
    period: e.period,
    description: e.description,
    highlights: e.highlights,
  }));
}

export async function getCertifications(): Promise<DbCertification[]> {
  return staticCerts.map((c) => ({
    name: c.name,
    issuer: c.issuer,
    date: c.date,
    credentialId: c.credentialId,
    url: c.url,
    status: c.status,
    type: c.type || 'Certification',
  }));
}

export async function getLabs() {
  return staticLabs;
}

export async function getResearch(): Promise<DbResearch[]> {
  return staticResearch.map((r) => ({
    slug: r.slug,
    title: r.title,
    abstract: r.abstract,
    status: r.status,
    progress: r.progress,
    date: r.date,
    authors: r.authors,
    tags: r.tags,
  }));
}

export async function getTimeline(): Promise<DbTimelineEvent[]> {
  return staticTimeline.map((t) => ({
    event: t.event,
    date: t.date,
    icon: t.icon,
  }));
}

export async function getBlogPosts(): Promise<DbBlogPost[]> {
  return staticBlogs.map((b) => ({
    slug: b.slug,
    title: b.title,
    excerpt: b.excerpt,
    content: '',
    date: b.date,
    readTime: b.readTime,
    tags: b.tags,
  }));
}

export async function getBlogPostBySlug(
  slug: string
): Promise<DbBlogPost | null> {
  const posts = await getBlogPosts();

  return posts.find((p) => p.slug === slug) ?? null;
}