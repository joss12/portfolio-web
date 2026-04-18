'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useTranslations, useLocale } from 'next-intl';
import { projects } from '@/lib/projects';
import AnimatedSkills from '@/components/ui/AnimatedSkills';
import AnimatedProjects from '@/components/ui/AnimatedProjects';
import OtherProjects from '@/components/ui/OtherProjects';
import BootWrapper from '@/components/ui/BootWrapper';
import Image from 'next/image';

export default function Home() {
  const t = useTranslations();
  const locale = useLocale();
  const [visibleLines, setVisibleLines] = useState(0);
  const [typedText, setTypedText] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const lines = [
    {
      prompt: '$ whoami',
      output: t('hero.whoami'),
      promptColor: 'text-emerald-400',
    },
    {
      prompt: '$ location',
      output: t('hero.location'),
      promptColor: 'text-cyan-400',
    },
    { prompt: '$ role', output: t('hero.role'), promptColor: 'text-blue-400' },
    {
      prompt: '$ focus',
      output: t('hero.focus'),
      promptColor: 'text-purple-400',
    },
    {
      prompt: '$ status',
      output: t('hero.status'),
      promptColor: 'text-amber-400',
    },
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
        <div className="mb-16 flex flex-col-reverse gap-8 sm:flex-row sm:items-center sm:gap-10">
          {/* Left — terminal */}
          <div className="min-w-0 flex-1">
            <div
              className="overflow-hidden rounded-lg border border-neutral-700 bg-neutral-900"
              style={{
                boxShadow:
                  '0 0 30px rgba(0, 180, 216, 0.12), 0 0 60px rgba(0, 180, 216, 0.05)',
              }}
            >
              <div className="flex items-center gap-2 border-b border-neutral-800 bg-neutral-950 px-4 py-3">
                <span className="h-3 w-3 rounded-full bg-red-500/80" />
                <span className="h-3 w-3 rounded-full bg-yellow-500/80" />
                <span className="h-3 w-3 rounded-full bg-green-500/80" />
                <span className="ml-3 font-mono text-xs text-neutral-500">
                  Eddy Mouity
                </span>
              </div>
              <div className="flex flex-col gap-4 px-5 py-5 font-mono text-sm">
                {lines.slice(0, visibleLines).map((line, i) => (
                  <div
                    key={i}
                    className="animate-fadeIn flex flex-col gap-1"
                    style={{ animationDelay: `${i * 50}ms` }}
                  >
                    <span className={`${line.promptColor} font-semibold`}>
                      {line.prompt}
                    </span>
                    <span className="pl-2 text-xs leading-relaxed text-neutral-200">
                      {line.output}
                    </span>
                  </div>
                ))}
                {isTyping && visibleLines < lines.length && (
                  <div className="flex flex-col gap-1">
                    <span
                      className={`${lines[visibleLines].promptColor} font-semibold`}
                    >
                      {typedText}
                      <span className="animate-pulse">▋</span>
                    </span>
                  </div>
                )}
                {!isTyping && visibleLines < lines.length && (
                  <span
                    className={`${lines[visibleLines].promptColor} animate-pulse`}
                  >
                    ▋
                  </span>
                )}
                {visibleLines >= lines.length && (
                  <div className="animate-fadeIn mt-1 flex items-center gap-4">
                    <span className="text-cyan-400">$ </span>
                    <Link
                      href={`/${locale}/contact`}
                      className="rounded border border-cyan-500 px-4 py-1.5 text-xs font-semibold text-cyan-400 transition-all duration-200 hover:bg-cyan-500 hover:text-white"
                    >
                      {t('hero.cta_contact')}
                    </Link>
                    <a
                      href="#projects"
                      className="text-xs text-neutral-500 transition-colors hover:text-neutral-300"
                    >
                      {t('hero.cta_projects')}
                    </a>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right — photo */}
          <div className="flex shrink-0 justify-center sm:block">
            <div
              className="relative overflow-hidden rounded-2xl"
              style={{ width: '200px', height: '260px' }}
            >
              <Image
                src="/photo/last.jpeg"
                alt="Eddy Mouity"
                fill
                quality={100}
                priority
                sizes="200px"
                className="object-cover object-top"
              />
              <div
                className="absolute inset-0"
                style={{
                  background:
                    'linear-gradient(to bottom, transparent 60%, rgba(5,13,31,0.85) 100%)',
                }}
              />
              <div
                className="absolute inset-0"
                style={{
                  boxShadow:
                    '0 0 0 1.5px rgba(0,180,216,0.25), 0 8px 32px rgba(0,0,0,0.4)',
                }}
              />
            </div>
          </div>
        </div>

        <hr className="mb-12 border-neutral-800" />

        {/* Projects */}
        <p
          id="projects"
          className="mb-6 font-mono text-xs font-bold tracking-widest text-neutral-600 uppercase"
        >
          {t('sections.projects')}
        </p>
        <AnimatedProjects projects={projects} />
        <OtherProjects />

        <hr className="my-12 border-neutral-800" />

        {/* Skills */}
        <p
          id="skills"
          className="mb-6 font-mono text-xs font-bold tracking-widest text-neutral-600 uppercase"
        >
          {t('sections.skills')}
        </p>
        <AnimatedSkills />

        <hr className="my-12 border-neutral-800" />

        {/* About */}
        <p className="mb-4 font-mono text-xs font-bold tracking-widest text-neutral-600 uppercase">
          {t('sections.about')}
        </p>
        <div className="flex flex-col gap-4 text-sm leading-relaxed text-neutral-500">
          <p>{t('about.p1')}</p>
          <p>{t('about.p2')}</p>
          <p>
            {t('about.p3')}{' '}
            <Link
              href={`/${locale}/contact`}
              className="text-cyan-400 transition-colors hover:text-cyan-300"
            >
              {t('about.cta_contact')} →
            </Link>
          </p>
        </div>
      </main>
    </BootWrapper>
  );
}
