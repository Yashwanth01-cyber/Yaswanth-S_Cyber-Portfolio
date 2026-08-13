'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Github,
  Linkedin,
  Mail,
  Phone,
  MapPin,
  Send,
  Loader2,
  CheckCircle2,
  AlertCircle,
} from 'lucide-react';

import { profile } from '@/data/profile';
import { SectionHeading } from '@/components/shared/SectionHeading';
import { GlassCard } from '@/components/shared/GlassCard';

export function Contact() {
  const [status, setStatus] = useState<
    'idle' | 'sending' | 'sent' | 'error'
  >('idle');

  const [errorMessage, setErrorMessage] = useState('');

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setStatus('sending');
    setErrorMessage('');

    const form = e.currentTarget;
    const data = new FormData(form);

    try {
      const response = await fetch(
        'https://formspree.io/f/myegpgre',
        {
          method: 'POST',
          body: data,
          headers: {
            Accept: 'application/json',
          },
        }
      );

      if (response.ok) {
        setStatus('sent');
        form.reset();

        setTimeout(() => {
          setStatus('idle');
        }, 4000);
      } else {
        const result = await response.json().catch(() => null);

        setStatus('error');
        setErrorMessage(
          result?.errors?.[0]?.message ||
            'Something went wrong. Please try again.'
        );
      }
    } catch {
      setStatus('error');
      setErrorMessage(
        'Unable to send your message. Please try again later.'
      );
    }
  };

  const contactItems = [
    {
      icon: Mail,
      label: 'Email',
      value: profile.email,
      href: `mailto:${profile.email}`,
    },
    {
      icon: Phone,
      label: 'Phone',
      value: profile.phone,
      href: `tel:${profile.phone.replace(/\s/g, '')}`,
    },
    {
      icon: MapPin,
      label: 'Location',
      value: profile.location,
      href: null,
    },
    {
      icon: Github,
      label: 'GitHub',
      value: 'Yashwanth01-cyber',
      href: profile.social.github,
    },
    {
      icon: Linkedin,
      label: 'LinkedIn',
      value: 'yaswanths196',
      href: profile.social.linkedin,
    },
  ];

  return (
    <section
      id="contact"
      className="mx-auto max-w-6xl px-4 py-20 sm:px-6"
    >
      <SectionHeading
        eyebrow="contact"
        title="Get In Touch"
        description="Open to cybersecurity internships, collaborations, and security research opportunities."
      />

      <div className="grid gap-6 lg:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
        >
          <GlassCard className="h-full p-6">
            <h3 className="mb-4 text-sm font-semibold">
              Contact Details
            </h3>

            <div className="space-y-3">
              {contactItems.map((item) => {
                const Icon = item.icon;

                const content = (
                  <div className="flex items-center gap-3 rounded-lg border border-border/50 bg-white/[0.02] px-3 py-2.5 transition-colors hover:border-emerald-500/30">
                    <span className="flex h-8 w-8 items-center justify-center rounded-lg border border-emerald-500/20 bg-emerald-500/10 text-emerald-400">
                      <Icon className="h-4 w-4" />
                    </span>

                    <div>
                      <p className="text-xs text-muted-foreground">
                        {item.label}
                      </p>
                      <p className="text-sm">{item.value}</p>
                    </div>
                  </div>
                );

                return item.href ? (
                  <a
                    key={item.label}
                    href={item.href}
                    target={
                      item.href.startsWith('http')
                        ? '_blank'
                        : undefined
                    }
                    rel="noopener noreferrer"
                    className="block"
                  >
                    {content}
                  </a>
                ) : (
                  <div key={item.label}>{content}</div>
                );
              })}
            </div>
          </GlassCard>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ delay: 0.1 }}
        >
          <GlassCard className="h-full p-6">
            <h3 className="mb-4 text-sm font-semibold">
              Send a Message
            </h3>

            <form onSubmit={onSubmit} className="space-y-4">
              <div>
                <label
                  htmlFor="name"
                  className="mb-1.5 block text-xs text-muted-foreground"
                >
                  Name
                </label>

                <input
                  id="name"
                  name="name"
                  required
                  className="flex h-10 w-full rounded-md border border-input bg-white/5 px-3 py-2 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/50"
                  placeholder="Your name"
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="mb-1.5 block text-xs text-muted-foreground"
                >
                  Email
                </label>

                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  className="flex h-10 w-full rounded-md border border-input bg-white/5 px-3 py-2 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/50"
                  placeholder="you@example.com"
                />
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="mb-1.5 block text-xs text-muted-foreground"
                >
                  Message
                </label>

                <textarea
                  id="message"
                  name="message"
                  required
                  rows={4}
                  className="flex min-h-[80px] w-full rounded-md border border-input bg-white/5 px-3 py-2 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/50"
                  placeholder="Your message..."
                />
              </div>

              {status === 'error' && (
                <div className="flex items-start gap-2 rounded-lg border border-red-500/20 bg-red-500/10 px-3 py-2.5 text-xs text-red-400">
                  <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
                  <span>{errorMessage}</span>
                </div>
              )}

              {status === 'sent' && (
                <div className="flex items-center gap-2 rounded-lg border border-emerald-500/20 bg-emerald-500/10 px-3 py-2.5 text-xs text-emerald-400">
                  <CheckCircle2 className="h-4 w-4 shrink-0" />
                  <span>
                    Message sent successfully. Thank you for reaching out!
                  </span>
                </div>
              )}

              <button
                type="submit"
                disabled={status === 'sending'}
                className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-emerald-500 px-5 py-2.5 text-sm font-medium text-black transition-all hover:bg-emerald-400 hover:shadow-[0_0_24px_rgba(0,255,136,0.4)] disabled:cursor-not-allowed disabled:opacity-70"
              >
                {status === 'idle' && (
                  <>
                    <Send className="h-4 w-4" />
                    Send Message
                  </>
                )}

                {status === 'sending' && (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Sending...
                  </>
                )}

                {status === 'sent' && (
                  <>
                    <CheckCircle2 className="h-4 w-4" />
                    Message Sent
                  </>
                )}

                {status === 'error' && (
                  <>
                    <Send className="h-4 w-4" />
                    Try Again
                  </>
                )}
              </button>
            </form>
          </GlassCard>
        </motion.div>
      </div>
    </section>
  );
}