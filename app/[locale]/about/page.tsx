import AnimatedSkills from '@/components/ui/AnimatedSkills';
import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import Link from 'next/link';

export async function generateMetadata(): Promise<Metadata> {
    const t = await getTranslations('about');
    return {
        title: 'About',
        description: t('p1').slice(0, 120),
    };
}

const timeline = [
    { period: '2025 — Now', title: 'Portfolio & Systems Projects', description: 'Building a backend engineering portfolio from scratch — DNS resolvers, gossip caches, P2P file sharing, language interpreters, and flash sale engines.' },
    { period: '2024', title: 'Go Deep Dive', description: 'Focused on Go internals — memory management, escape analysis, concurrency patterns, interfaces, and benchmarking.' },
    { period: '2023', title: 'TypeScript & Node.js', description: 'API design, rate limiting, WebSocket fanout, CLI tooling, and CI/CD with GitHub Actions.' },
    { period: 'Earlier', title: 'Foundations', description: 'Linux, Docker, SQL/NoSQL, HTTP fundamentals, and performance profiling.' },
];

export default async function AboutPage({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    const t = await getTranslations('about');
    const ts = await getTranslations('sections');

    return (
        <main className="mx-auto max-w-3xl px-6 py-24">

            <p className="font-mono text-xs font-semibold uppercase tracking-widest text-cyan-500 mb-6">
                {t('eyebrow')}
            </p>
            <h1 className="text-3xl font-bold tracking-tight text-white mb-6 leading-tight whitespace-pre-line">
                {t('title')}
            </h1>

            <div className="flex flex-col gap-4 text-sm text-neutral-400 leading-relaxed max-w-xl mb-16">
                <p>{t('p1')}</p>
                <p>{t('p2')}</p>
                <p>{t('p3')}</p>
            </div>

            <hr className="border-neutral-800 mb-12" />

            <p className="font-mono text-xs font-bold uppercase tracking-widest text-neutral-600 mb-8">
                {ts('timeline')}
            </p>

            <div className="relative flex flex-col gap-0 mb-16">
                <div className="absolute left-1.5 top-2 bottom-2 w-px bg-neutral-800" />
                {timeline.map((item, i) => (
                    <div key={i} className="relative flex gap-6 pb-10 last:pb-0">
                        <div className="relative z-10 mt-1.5 h-3 w-3 shrink-0 rounded-full border-2 border-cyan-500 bg-neutral-950" />
                        <div className="flex flex-col gap-1">
                            <span className="font-mono text-xs text-neutral-600">{item.period}</span>
                            <span className="text-sm font-semibold text-white">{item.title}</span>
                            <p className="text-sm text-neutral-500 leading-relaxed">{item.description}</p>
                        </div>
                    </div>
                ))}
            </div>

            <hr className="border-neutral-800 mb-12" />

            <AnimatedSkills />

            <hr className="border-neutral-800 my-12" />

            <div className="flex flex-wrap items-center gap-3">
                <Link href={`/${locale}/contact`} className="rounded-lg bg-cyan-600 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-cyan-500">
                    {t('cta_contact')}
                </Link>
                <a href="/resume/resume.pdf" download className="rounded-lg border border-neutral-700 px-5 py-2.5 text-sm font-semibold text-neutral-300 transition-colors hover:border-neutral-500 hover:text-white">
                    {t('cta_resume')}
                </a>
                <a href="https://github.com/joss12" target="_blank" rel="noopener noreferrer" className="text-sm text-neutral-400 transition-colors hover:text-white">
                    {t('cta_github')}
                </a>
            </div>

        </main>
    );
}
