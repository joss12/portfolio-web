'use client';

import Link from 'next/link';
import { useTranslations, useLocale } from 'next-intl';

export default function Footer() {
  const t = useTranslations('footer');
  const locale = useLocale();

  return (
    <footer className="mt-24 border-t border-neutral-800">
      <div className="mx-auto flex max-w-5xl flex-col gap-6 px-6 py-10 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-col gap-1">
          <span className="font-mono text-sm font-semibold text-cyan-400">
            BornToShine
          </span>
          <span className="text-xs text-neutral-600">{t('tagline')}</span>
        </div>
        <nav className="flex flex-wrap gap-6">
          {[
            { label: 'Projects', href: `/${locale}/#projects` },
            { label: 'About', href: `/${locale}/about` },
            { label: 'Contact', href: `/${locale}/contact` },
            {
              label: 'GitHub',
              href: 'https://github.com/joss12',
              external: true,
            },
            {
              label: 'LinkedIn',
              href: 'https://www.linkedin.com/in/eddymouity',
              external: true,
            },
          ].map((link) =>
            link.external ? (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-neutral-500 transition-colors hover:text-cyan-400"
              >
                {link.label} ↗
              </a>
            ) : (
              <Link
                key={link.label}
                href={link.href}
                className="text-xs text-neutral-500 transition-colors hover:text-cyan-400"
              >
                {link.label}
              </Link>
            )
          )}
        </nav>
        <span className="font-mono text-xs text-neutral-700">
          © {new Date().getFullYear()} BornToShine
        </span>
      </div>
    </footer>
  );
}
