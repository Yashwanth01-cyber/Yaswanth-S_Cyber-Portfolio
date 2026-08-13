import { supabase } from '@/lib/supabase';
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
  const { data, error } = await supabase
    .from('projects')
    .select(
      'slug, name, tagline, overview, technologies, features, architecture, github_url, live_demo_url, status, screenshots, sort_order'
    )
    .order('sort_order', { ascending: true });

  if (error || !data || data.length === 0) {
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

  return data.map((r: Record<string, unknown>) => ({
    slug: r.slug as string,
    name: r.name as string,
    tagline: (r.tagline as string) || '',
    overview: (r.overview as string) || '',
    technologies: (r.technologies as string[]) || [],
    features: (r.features as string[]) || [],
    architecture: (r.architecture as string) || '',
    github: (r.github_url as string) || '#',
    liveDemo: (r.live_demo_url as string) || '#',
    status: (r.status as string) || 'Active Development',
    screenshots: (r.screenshots as string[]) || [],
  }));
}

export async function getExperiences(): Promise<DbExperience[]> {
  const { data, error } = await supabase
    .from('experiences')
    .select('company, role, duration, period, description, highlights, sort_order')
    .order('sort_order', { ascending: true });

  if (error || !data || data.length === 0) {
    return staticExperience.map((e) => ({
      company: e.company,
      role: e.role,
      duration: e.duration,
      period: e.period,
      description: e.description,
      highlights: e.highlights,
    }));
  }

  return data.map((r: Record<string, unknown>) => ({
    company: r.company as string,
    role: r.role as string,
    duration: (r.duration as string) || '',
    period: (r.period as string) || '',
    description: (r.description as string) || '',
    highlights: (r.highlights as string[]) || [],
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
  const { data, error } = await supabase
    .from('labs')
    .select('title, module, status, completed_at')
    .order('completed_at', { ascending: false, nullsFirst: false });

  if (error || !data || data.length === 0) {
    return staticLabs;
  }

  const completed = (data as Array<Record<string, unknown>>).filter(
    (r) => r.status === 'Completed'
  );

  const recentActivity = completed.slice(0, 5).map((r) => ({
    title: r.title as string,
    module: r.module as string,
    date: (r.completed_at as string) || '',
  }));

  const moduleMap = new Map<string, { completed: number; total: number }>();

  for (const r of data as Array<Record<string, unknown>>) {
    const mod = r.module as string;

    if (!moduleMap.has(mod)) {
      moduleMap.set(mod, {
        completed: 0,
        total: 0,
      });
    }

    const entry = moduleMap.get(mod)!;

    entry.total += 1;

    if (r.status === 'Completed') {
      entry.completed += 1;
    }
  }

  const moduleProgress = Array.from(moduleMap.entries()).map(
    ([module, v]) => ({
      module,
      completed: v.completed,
      total: v.total,
    })
  );

  const latest = completed[0];

  const inProgress = (data as Array<Record<string, unknown>>).find(
    (r) => r.status === 'In Progress'
  );

  return {
    totalCompleted: completed.length,

    currentModule: inProgress
      ? ((inProgress as Record<string, unknown>).module as string)
      : (moduleProgress[0]?.module ?? staticLabs.currentModule),

    latestLab: latest
      ? {
          title: (latest as Record<string, unknown>).title as string,
          module: (latest as Record<string, unknown>).module as string,
          date:
            ((latest as Record<string, unknown>).completed_at as string) || '',
        }
      : staticLabs.latestLab,

    nextLab: inProgress
      ? {
          title: (inProgress as Record<string, unknown>).title as string,
          module: (inProgress as Record<string, unknown>).module as string,
        }
      : staticLabs.nextLab,

    recentActivity:
      recentActivity.length > 0
        ? recentActivity
        : staticLabs.recentActivity,

    moduleProgress:
      moduleProgress.length > 0
        ? moduleProgress
        : staticLabs.moduleProgress,
  };
}

export async function getResearch(): Promise<DbResearch[]> {
  const { data, error } = await supabase
    .from('research_papers')
    .select('slug, title, abstract, status, progress, date, authors, tags')
    .order('date', { ascending: false });

  if (error || !data || data.length === 0) {
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

  return data.map((r: Record<string, unknown>) => ({
    slug: r.slug as string,
    title: r.title as string,
    abstract: (r.abstract as string) || '',
    status: (r.status as string) || 'Writing',
    progress: (r.progress as number) || 0,
    date: (r.date as string) || '',
    authors: (r.authors as string[]) || [],
    tags: (r.tags as string[]) || [],
  }));
}

export async function getTimeline(): Promise<DbTimelineEvent[]> {
  const { data, error } = await supabase
    .from('timeline_events')
    .select('event, date, icon, sort_order')
    .order('sort_order', { ascending: true });

  if (error || !data || data.length === 0) {
    return staticTimeline.map((t) => ({
      event: t.event,
      date: t.date,
      icon: t.icon,
    }));
  }

  return data.map((r: Record<string, unknown>) => ({
    event: r.event as string,
    date: r.date as string,
    icon: (r.icon as string) || 'Rocket',
  }));
}

export async function getBlogPosts(): Promise<DbBlogPost[]> {
  const { data, error } = await supabase
    .from('blog_posts')
    .select(
      'slug, title, excerpt, content, date, read_time, tags, published'
    )
    .eq('published', true)
    .order('date', { ascending: false });

  if (error || !data || data.length === 0) {
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

  return data.map((r: Record<string, unknown>) => ({
    slug: r.slug as string,
    title: r.title as string,
    excerpt: (r.excerpt as string) || '',
    content: (r.content as string) || '',
    date: (r.date as string) || '',
    readTime: (r.read_time as string) || '',
    tags: (r.tags as string[]) || [],
  }));
}

export async function getBlogPostBySlug(
  slug: string
): Promise<DbBlogPost | null> {
  const posts = await getBlogPosts();

  return posts.find((p) => p.slug === slug) ?? null;
}

export async function insertContactMessage(
  name: string,
  email: string,
  message: string
) {
  const { error } = await supabase
    .from('contact_messages')
    .insert({ name, email, message });

  return { error };
}