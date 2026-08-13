import Link from 'next/link';
import { Github, Linkedin, Mail, Shield } from 'lucide-react';
import { profile } from '@/data/profile';
import { siteConfig } from '@/lib/site-config';

export function Footer() {
  return (
    <footer className="border-t border-border/50 mt-24">
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
          <div className="flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
              <Shield className="h-4 w-4" />
            </span>
            <span className="font-mono text-sm text-muted-foreground">
              <span className="text-emerald-400">~/</span>yaswanth
            </span>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href={siteConfig.social.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-9 w-9 items-center justify-center rounded-lg glass glass-hover text-muted-foreground hover:text-emerald-400"
              aria-label="GitHub"
            >
              <Github className="h-4 w-4" />
            </Link>
            <Link
              href={siteConfig.social.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-9 w-9 items-center justify-center rounded-lg glass glass-hover text-muted-foreground hover:text-emerald-400"
              aria-label="LinkedIn"
            >
              <Linkedin className="h-4 w-4" />
            </Link>
            <Link
              href={`mailto:${profile.email}`}
              className="flex h-9 w-9 items-center justify-center rounded-lg glass glass-hover text-muted-foreground hover:text-emerald-400"
              aria-label="Email"
            >
              <Mail className="h-4 w-4" />
            </Link>
          </div>
        </div>

        <p className="mt-6 text-center text-xs text-muted-foreground">
          &copy; {new Date().getFullYear()} {profile.name}.
        </p>
      </div>
    </footer>
  );
}
