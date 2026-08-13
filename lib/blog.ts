import { promises as fs } from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { blogs } from '@/data/blogs';

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  tags: string[];
  content: string;
}

export async function getAllPosts(): Promise<BlogPost[]> {
  const posts = await Promise.all(
    blogs.map(async (b) => {
      const fullPath = path.join(process.cwd(), 'content', 'blog', `${b.slug}.md`);
      const fileContents = await fs.readFile(fullPath, 'utf8');
      const { content } = matter(fileContents);
      return { ...b, content };
    })
  );
  return posts.sort((a, b) => (a.date < b.date ? 1 : -1));
}

export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  const posts = await getAllPosts();
  return posts.find((p) => p.slug === slug) ?? null;
}
