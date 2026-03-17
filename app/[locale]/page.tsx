'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useTranslations, useLocale } from 'next-intl';
import { projects } from '@/lib/projects';
import AnimatedSkills from '@/components/ui/AnimatedSkills';
import AnimatedProjects from '@/components/ui/AnimatedProjects';
import OtherProjects from '@/components/ui/OtherProjects';
import BootWrapper from '@/components/ui/BootWrapper';

export default function Home() {
    const t = useTranslations();
    const locale = useLocale();
    const [visibleLines, setVisibleLines] = useState(0);
    const [typedText, setTypedText] = useState('');
    const [isTyping, setIsTyping] = useState(false);

    const lines = [
        { prompt: '$ whoami', output: t('hero.whoami'), promptColor: 'text-emerald-400' },
        { prompt: '$ location', output: t('hero.location'), promptColor: 'text-cyan-400' },
        { prompt: '$ role', output: t('hero.role'), promptColor: 'text-blue-400' },
        { prompt: '$ focus', output: t('hero.focus'), promptColor: 'text-purple-400' },
        { prompt: '$ status', output: t('hero.status'), promptColor: 'text-amber-400' },
    ];

    useEffect(() => {
        if (visibleLines >= lines.length) return;
        if (isTyping) return;
        const delay = setTimeout(() => {
            setIsTyping(true);
            setTypedText('');
        }, 300);
        return () => clearTimeout(delay);
    }, [visibleLines, isTyping]);

    useEffect(() => {
        if (!isTyping) return;
        if (visibleLines >= lines.length) return;
        const fullText = lines[visibleLines].prompt;
        if (typedText.length < fullText.length) {
            const t = setTimeout(() => {
                setTypedText(fullText.slice(0, typedText.length + 1));
            }, 55);
            return () => clearTimeout(t);
        } else {
            const timer = setTimeout(() => {
                setVisibleLines((v) => v + 1);
                setIsTyping(false);
                setTypedText('');
            }, 300);
            return () => clearTimeout(timer);
        }
    }, [isTyping, typedText, visibleLines]);

    return (
        <BootWrapper>
            <main className="mx-auto max-w-3xl px-6 py-24">

                {/* Hero */}
                <div className="flex flex-col-reverse gap-8 mb-16 sm:flex-row sm:items-start sm:gap-10">
                    <div className="flex-1 min-w-0">
                        <div
                            className="rounded-lg border border-neutral-700 bg-neutral-900 overflow-hidden"
                            style={{ boxShadow: '0 0 30px rgba(0, 180, 216, 0.12), 0 0 60px rgba(0, 180, 216, 0.05)' }}
                        >
                            <div className="flex items-center gap-2 px-4 py-3 border-b border-neutral-800 bg-neutral-950">
                                <span className="h-3 w-3 rounded-full bg-red-500/80" />
                                <span className="h-3 w-3 rounded-full bg-yellow-500/80" />
                                <span className="h-3 w-3 rounded-full bg-green-500/80" />
                                <span className="ml-3 font-mono text-xs text-neutral-500">Eddy Mouity</span>
                            </div>
                            <div className="px-5 py-5 font-mono text-sm flex flex-col gap-4">
                                {lines.slice(0, visibleLines).map((line, i) => (
                                    <div key={i} className="flex flex-col gap-1 animate-fadeIn" style={{ animationDelay: `${i * 50}ms` }}>
                                        <span className={`${line.promptColor} font-semibold`}>{line.prompt}</span>
                                        <span className="text-neutral-200 pl-2 text-xs leading-relaxed">{line.output}</span>
                                    </div>
                                ))}
                                {isTyping && visibleLines < lines.length && (
                                    <div className="flex flex-col gap-1">
                                        <span className={`${lines[visibleLines].promptColor} font-semibold`}>
                                            {typedText}<span className="animate-pulse">▋</span>
                                        </span>
                                    </div>
                                )}
                                {!isTyping && visibleLines < lines.length && (
                                    <span className={`${lines[visibleLines].promptColor} animate-pulse`}>▋</span>
                                )}
                                {visibleLines >= lines.length && (
                                    <div className="flex items-center gap-4 mt-1 animate-fadeIn">
                                        <span className="text-cyan-400">$ </span>
                                        <Link href={`/${locale}/contact`} className="rounded border border-cyan-500 px-4 py-1.5 text-xs font-semibold text-cyan-400 hover:bg-cyan-500 hover:text-white transition-all duration-200">
                                            {t('hero.cta_contact')}
                                        </Link>
                                        <a href="#projects" className="text-xs text-neutral-500 hover:text-neutral-300 transition-colors">
                                            {t('hero.cta_projects')}
                                        </a>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-center sm:block shrink-0">
                        <img
                            src="/photo/resume.jpg"
                            alt="BornToShine"
                            style={{ width: '144px', height: '144px' }}
                            className="rounded-full object-cover border-2 border-cyan-500/30"
                        />
                    </div>
                </div>

                <hr className="border-neutral-800 mb-12" />

                <p id="projects" className="font-mono text-xs font-bold uppercase tracking-widest text-neutral-600 mb-6">
                    {t('sections.projects')}
                </p>
                <AnimatedProjects projects={projects} />
                <OtherProjects />

                <hr className="border-neutral-800 my-12" />

                <p id="skills" className="font-mono text-xs font-bold uppercase tracking-widest text-neutral-600 mb-6">
                    {t('sections.skills')}
                </p>
                <AnimatedSkills />

                <hr className="border-neutral-800 my-12" />

                <p className="font-mono text-xs font-bold uppercase tracking-widest text-neutral-600 mb-4">
                    {t('sections.about')}
                </p>
                <div className="flex flex-col gap-4 text-sm text-neutral-500 leading-relaxed">
                    <p>{t('about.p1')}</p>
                    <p>{t('about.p2')}</p>
                    <p>
                        {t('about.p3')}{' '}
                        <Link href={`/${locale}/contact`} className="text-cyan-400 hover:text-cyan-300 transition-colors">
                            {t('about.cta_contact')} →
                        </Link>
                    </p>
                </div>

            </main>
        </BootWrapper>

    );
}
