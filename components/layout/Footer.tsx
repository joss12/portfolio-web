'use client';

import Link from 'next/link';
import { useTranslations, useLocale } from 'next-intl';

export default function Footer() {
    const t = useTranslations('footer');
    const locale = useLocale();

    return (
        <footer className="border-t border-neutral-800 mt-24">
            <div className="mx-auto max-w-5xl px-6 py-10 flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex flex-col gap-1">
                    <span className="font-mono text-sm font-semibold text-cyan-400">BornToShine</span>
                    <span className="text-xs text-neutral-600">{t('tagline')}</span>
                </div>
                <nav className="flex flex-wrap gap-6">
                    {[
                        { label: 'Projects', href: `/${locale}/#projects` },
                        { label: 'About', href: `/${locale}/about` },
                        { label: 'Contact', href: `/${locale}/contact` },
                        { label: 'GitHub', href: 'https://github.com/joss12', external: true },
                    ].map((link) => (
                        link.external
                            ? <a key={link.label} href={link.href} target="_blank" rel="noopener noreferrer" className="text-xs text-neutral-500 hover:text-cyan-400 transition-colors">{link.label} ↗</a>
                            : <Link key={link.label} href={link.href} className="text-xs text-neutral-500 hover:text-cyan-400 transition-colors">{link.label}</Link>
                    ))}
                </nav>
                <span className="font-mono text-xs text-neutral-700">
                    © {new Date().getFullYear()} BornToShine
                </span>
            </div>
        </footer>
    );
}
