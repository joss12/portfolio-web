'use client';

import { usePathname, useRouter } from 'next/navigation';
import { Github, Menu, X } from 'lucide-react';
import { useState } from 'react';
import { useLocale, useTranslations } from 'next-intl';

const locales = [
    { code: 'en', label: 'EN' },
    { code: 'fr', label: 'FR' },
    { code: 'ko', label: 'KR' },
];

export default function Navbar() {
    const t = useTranslations('nav');
    const locale = useLocale();
    const pathname = usePathname();
    const router = useRouter();
    const [menuOpen, setMenuOpen] = useState(false);

    const isOnHome = pathname === `/${locale}` || pathname === `/${locale}/`;

    const isActive = (href: string) => {
        if (href.includes('/#')) return false;
        return (
            (pathname === `/${locale}/about` && href.includes('/about')) ||
            (pathname === `/${locale}/contact` && href.includes('/contact'))
        );
    };

    const handleBrandClick = (e: React.MouseEvent) => {
        e.preventDefault();
        if (isOnHome) {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        } else {
            router.push(`/${locale}`);
        }
    };

    const handleHashClick = (e: React.MouseEvent, hash: string) => {
        e.preventDefault();
        if (isOnHome) {
            document.getElementById(hash)?.scrollIntoView({ behavior: 'smooth' });
        } else {
            router.push(`/${locale}/#${hash}`);
        }
    };

    const switchLocale = (newLocale: string) => {
        const segments = pathname.split('/');
        segments[1] = newLocale;
        router.push(segments.join('/'));
    };

    const baseCls = 'text-sm transition-colors text-neutral-400 hover:text-white';
    const activeCls = 'text-sm transition-colors text-cyan-400 font-medium';

    return (
        <header className="fixed top-0 inset-x-0 z-50 h-14 border-b border-neutral-800 bg-neutral-950/80 backdrop-blur-md">
            <div className="mx-auto flex h-full max-w-5xl items-center justify-between px-6">

                <a href={`/${locale}`} onClick={handleBrandClick} className="font-mono text-sm font-semibold text-cyan-400 cursor-pointer">
                    BornToShine <span className="text-neutral-500">/</span>
                </a>

                <nav className="hidden md:flex items-center gap-6">
                    <a href={`/${locale}/#projects`} onClick={(e) => handleHashClick(e, 'projects')} className={baseCls}>{t('projects')}</a>
                    <a href={`/${locale}/#skills`} onClick={(e) => handleHashClick(e, 'skills')} className={baseCls}>{t('skills')}</a>
                    <a href={`/${locale}/about`} className={isActive(`/${locale}/about`) ? activeCls : baseCls}>{t('about')}</a>
                    <a href={`/${locale}/contact`} className={isActive(`/${locale}/contact`) ? activeCls : baseCls}>{t('contact')}</a>
                    <a href="/resume/resume.pdf" download className="rounded border border-neutral-700 px-3 py-1.5 font-mono text-xs text-neutral-300 transition-colors hover:border-cyan-500 hover:text-cyan-400">{t('resume')}</a>

                    <div className="flex items-center gap-1 border border-neutral-800 rounded-lg px-2 py-1">
                        {locales.map((loc, i) => (
                            <span key={loc.code} className="flex items-center gap-1">
                                <button onClick={() => switchLocale(loc.code)} className={locale === loc.code ? 'font-mono text-xs text-cyan-400 font-semibold' : 'font-mono text-xs text-neutral-600 hover:text-neutral-300'}>
                                    {loc.label}
                                </button>
                                {i < locales.length - 1 && <span className="text-neutral-800 text-xs">/</span>}
                            </span>
                        ))}
                    </div>

                    <a href="https://github.com/joss12" target="_blank" rel="noopener noreferrer" className="text-neutral-400 transition-colors hover:text-cyan-400">
                        <Github size={17} />
                    </a>
                </nav>

                <button className="md:hidden text-neutral-400 hover:text-white transition-colors" onClick={() => setMenuOpen((v) => !v)}>
                    {menuOpen ? <X size={20} /> : <Menu size={20} />}
                </button>
            </div>

            {menuOpen && (
                <div className="md:hidden border-t border-neutral-800 bg-neutral-950 px-6 py-4 flex flex-col gap-4">
                    <a href={`/${locale}/#projects`} onClick={(e) => { handleHashClick(e, 'projects'); setMenuOpen(false); }} className={baseCls}>{t('projects')}</a>
                    <a href={`/${locale}/#skills`} onClick={(e) => { handleHashClick(e, 'skills'); setMenuOpen(false); }} className={baseCls}>{t('skills')}</a>
                    <a href={`/${locale}/about`} onClick={() => setMenuOpen(false)} className={isActive(`/${locale}/about`) ? activeCls : baseCls}>{t('about')}</a>
                    <a href={`/${locale}/contact`} onClick={() => setMenuOpen(false)} className={isActive(`/${locale}/contact`) ? activeCls : baseCls}>{t('contact')}</a>
                    <a href="/resume/resume.pdf" download className="font-mono text-xs text-neutral-300 hover:text-cyan-400 transition-colors">{t('resume')}</a>

                    <div className="flex items-center gap-2">
                        {locales.map((loc) => (
                            <button key={loc.code} onClick={() => { switchLocale(loc.code); setMenuOpen(false); }} className={locale === loc.code ? 'font-mono text-xs text-cyan-400 font-semibold' : 'font-mono text-xs text-neutral-600 hover:text-neutral-300'}>
                                {loc.label}
                            </button>
                        ))}
                    </div>

                    <a href="https://github.com/joss12" target="_blank" rel="noopener noreferrer" className="text-sm text-neutral-400 hover:text-white transition-colors">
                        GitHub ↗
                    </a>
                </div>
            )}
        </header>
    );
}
