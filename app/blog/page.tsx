import Link from 'next/link';
import { Calendar, Clock, ArrowRight } from 'lucide-react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { SectionHeading } from '@/components/shared/SectionHeading';
import { GlassCard } from '@/components/shared/GlassCard';
import { getBlogPosts } from '@/lib/data';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Cybersecurity articles and write-ups by Yaswanth S.',
};

function formatDate(d: string) {
  return new Date(d).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
}

export default async function BlogPage() {
  const posts = await getBlogPosts();

  return (
    <>
      <Navbar />
      <main className="mx-auto max-w-4xl px-4 py-28 sm:px-6">
        <SectionHeading
          eyebrow="blog"
          title="Blog"
          description="Write-ups on web security, tools, and offensive security techniques."
        />

        <div className="space-y-4">
          {posts.map((post) => (
            <Link key={post.slug} href={`/blog/${post.slug}`}>
              <GlassCard className="p-6 group">
                <div className="flex items-center gap-3 text-xs text-muted-foreground mb-2">
                  <span className="inline-flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    {formatDate(post.date)}
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {post.readTime}
                  </span>
                </div>
                <h3 className="text-lg font-semibold group-hover:text-emerald-400 transition-colors">
                  {post.title}
                </h3>
                <p className="mt-1 text-sm text-muted-foreground">{post.excerpt}</p>
                <div className="mt-3 flex items-center justify-between">
                  <div className="flex flex-wrap gap-1.5">
                    {post.tags.map((t) => (
                      <span
                        key={t}
                        className="rounded-md border border-border bg-white/5 px-2 py-0.5 font-mono text-xs text-muted-foreground"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                  <span className="inline-flex items-center gap-1 text-xs text-emerald-400 opacity-0 group-hover:opacity-100 transition-opacity">
                    Read <ArrowRight className="h-3 w-3" />
                  </span>
                </div>
              </GlassCard>
            </Link>
          ))}
        </div>
      </main>
      <Footer />
    </>
  );
}
