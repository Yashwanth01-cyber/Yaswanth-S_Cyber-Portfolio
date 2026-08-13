import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Calendar, Clock, ArrowLeft, Tag } from 'lucide-react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { GlassCard } from '@/components/shared/GlassCard';
import { getBlogPosts, getBlogPostBySlug } from '@/lib/data';
import { renderMarkdown } from '@/lib/markdown';
import type { Metadata } from 'next';

interface PageProps {
  params: { slug: string };
}

export async function generateStaticParams() {
  const posts = await getBlogPosts();
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const post = await getBlogPostBySlug(params.slug);
  if (!post) return { title: 'Post Not Found' };
  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: 'article',
      publishedTime: post.date,
    },
  };
}

function formatDate(d: string) {
  return new Date(d).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
}

export default async function BlogPostPage({ params }: PageProps) {
  const post = await getBlogPostBySlug(params.slug);
  if (!post) notFound();

  const html = renderMarkdown(post.content);

  return (
    <>
      <Navbar />
      <main className="mx-auto max-w-3xl px-4 py-28 sm:px-6">
        <Link
          href="/blog"
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-emerald-400 mb-6"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to blog
        </Link>

        <article>
          <div className="flex items-center gap-3 text-xs text-muted-foreground mb-3">
            <span className="inline-flex items-center gap-1">
              <Calendar className="h-3 w-3" />
              {formatDate(post.date)}
            </span>
            <span className="inline-flex items-center gap-1">
              <Clock className="h-3 w-3" />
              {post.readTime}
            </span>
          </div>

          <h1 className="text-3xl font-bold tracking-tight mb-3">{post.title}</h1>

          <div className="flex flex-wrap gap-1.5 mb-8">
            {post.tags.map((t) => (
              <span
                key={t}
                className="inline-flex items-center gap-1 rounded-md border border-border bg-white/5 px-2 py-0.5 font-mono text-xs text-muted-foreground"
              >
                <Tag className="h-2.5 w-2.5" />
                {t}
              </span>
            ))}
          </div>

          <GlassCard className="p-6 sm:p-8" hover={false}>
            <div
              className="prose prose-invert max-w-none text-sm"
              dangerouslySetInnerHTML={{ __html: html }}
            />
          </GlassCard>
        </article>
      </main>
      <Footer />
    </>
  );
}
