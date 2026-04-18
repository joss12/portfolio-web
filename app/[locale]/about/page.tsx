import AnimatedSkills from '@/components/ui/AnimatedSkills';
import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import Link from 'next/link';
import DocumentPicker from '@/components/ui/DocumentPicker';

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('about');
  return {
    title: 'About',
    description: t('p1').slice(0, 120),
  };
}

const timeline = [
  {
    period: '2025 — Now',
    title: 'API Desing & Systems Projects',
    description:
      'scratch — DNS resolvers, gossip caches, language interpreters, Api-Engine, Url Shorter.',
  },
  {
    period: '2024',
    title: 'Go Deep Dive',
    description:
      'Focused on Go internals — memory management, escape analysis, concurrency patterns, interfaces, and benchmarking.',
  },
  {
    period: '2023',
    title: 'JavaScript / TypeScript, Node.js & ExpressJs',
    description:
      'NodeJs Internals, API design, Rate limiting, WebSocket fanout, CLI tooling, and CI/CD with GitHub Actions.',
  },
  {
    period: 'Earlier',
    title: 'Foundations',
    description:
      'Programming, Docker, SQL/NoSQL, HTTP fundamentals, and performance profiling.',
  },
];

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations('about');
  const ts = await getTranslations('sections');

  return (
    <main className="mx-auto max-w-3xl px-6 py-24">
      <p className="mb-6 font-mono text-xs font-semibold tracking-widest text-cyan-500 uppercase">
        {t('eyebrow')}
      </p>
      <h1 className="mb-6 text-3xl leading-tight font-bold tracking-tight whitespace-pre-line text-white">
        {t('title')}
      </h1>

      <div className="mb-16 flex max-w-xl flex-col gap-4 text-sm leading-relaxed text-neutral-400">
        <p>{t('p1')}</p>
        <p>{t('p2')}</p>
        <p>{t('p3')}</p>
      </div>

      <hr className="mb-12 border-neutral-800" />

      <p className="mb-8 font-mono text-xs font-bold tracking-widest text-neutral-600 uppercase">
        {ts('timeline')}
      </p>

      <div className="relative mb-16 flex flex-col gap-0">
        <div className="absolute top-2 bottom-2 left-1.5 w-px bg-neutral-800" />
        {timeline.map((item, i) => (
          <div key={i} className="relative flex gap-6 pb-10 last:pb-0">
            <div className="relative z-10 mt-1.5 h-3 w-3 shrink-0 rounded-full border-2 border-cyan-500 bg-neutral-950" />
            <div className="flex flex-col gap-1">
              <span className="font-mono text-xs text-neutral-600">
                {item.period}
              </span>
              <span className="text-sm font-semibold text-white">
                {item.title}
              </span>
              <p className="text-sm leading-relaxed text-neutral-500">
                {item.description}
              </p>
            </div>
          </div>
        ))}
      </div>

      <hr className="mb-12 border-neutral-800" />

      <AnimatedSkills />

      <hr className="my-12 border-neutral-800" />

      <div className="flex flex-wrap items-center gap-3">
        <Link
          href={`/${locale}/contact`}
          className="rounded-lg bg-cyan-600 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-cyan-500"
        >
          {t('cta_contact')}
        </Link>
        <DocumentPicker label={t('cta_resume')} />
        <a
          href="https://github.com/joss12"
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-neutral-400 transition-colors hover:text-white"
        >
          {t('cta_github')}
        </a>
      </div>
    </main>
  );
}
