import { notFound } from 'next/navigation';
import { projects } from '@/lib/projects';
import ProgressBar from '@/components/ui/ProgressBar';
import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';

export async function generateMetadata(
    { params }: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
    const { slug } = await params;
    const project = projects.find((p) => p.slug === slug);
    if (!project) return { title: 'Project Not Found' };
    return {
        title: project.name,
        description: project.tagline,
    };
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string; locale: string }> }) {
    const { slug, locale } = await params;
    const project = projects.find((p) => p.slug === slug);
    if (!project) notFound();

    const t = await getTranslations('project');

    const sections = [
        { key: 'problem', label: t('problem') },
        { key: 'priorArt', label: t('prior_art') },
        { key: 'designDecisions', label: t('design_decisions') },
        { key: 'architecture', label: t('architecture') },
        { key: 'reflection', label: t('reflection') },
    ];

    return (
        <main className="mx-auto max-w-3xl px-6 py-24">
            <ProgressBar />

            <nav className="flex items-center gap-2 font-mono text-xs text-neutral-600 mb-10">
                <a href={`/${locale}`} className="hover:text-neutral-400 transition-colors">{t('back')}</a>
                <span>/</span>
                <span>Projects</span>
                <span>/</span>
                <span className="text-neutral-400">{project.name}</span>
            </nav>

            <div className="mb-4">
                <span className={`inline-flex items-center gap-2 font-mono text-xs font-semibold px-3 py-1 rounded-full border ${project.status === 'complete'
                        ? 'text-emerald-400 bg-emerald-400/10 border-emerald-400/20'
                        : 'text-amber-400 bg-amber-400/10 border-amber-400/20'
                    }`}>
                    {project.status === 'complete' ? t('complete') : t('wip')}
                </span>
            </div>

            <h1 className="text-3xl font-bold tracking-tight text-white mb-4 leading-tight">
                {project.name}
            </h1>

            <div className="border-l-2 border-cyan-500 pl-4 mb-10">
                <p className="text-neutral-400 text-sm leading-relaxed">{project.tagline}</p>
            </div>

            <div className="rounded-lg border border-neutral-800 overflow-hidden mb-14 text-sm">
                {[
                    { label: t('stack'), value: project.stack },
                    { label: t('repo'), value: project.repo, isLink: true },
                    { label: t('status'), value: project.status === 'complete' ? t('complete') : t('wip') },
                    { label: t('concepts'), value: project.concepts },
                ].map((row) => (
                    <div key={row.label} className="grid grid-cols-1 gap-1 sm:grid-cols-4 border-b border-neutral-800 last:border-b-0">
                        <div className="px-4 pt-3 pb-1 sm:py-3 font-mono text-xs font-semibold uppercase tracking-widest text-neutral-600 bg-neutral-900">
                            {row.label}
                        </div>
                        <div className="col-span-3 px-4 pb-3 pt-1 sm:py-3 text-neutral-400">
                            {row.isLink
                                ? <a href={row.value} target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:text-cyan-300 transition-colors">{row.value} ↗</a>
                                : row.value
                            }
                        </div>
                    </div>
                ))}
            </div>

            {sections.map(({ key, label }) => {
                const text = project.content?.[key as keyof typeof project.content];
                return (
                    <div key={key} className="mb-12">
                        <h2 className="text-base font-semibold text-white mb-4 pb-3 border-b border-neutral-800">
                            {label}
                        </h2>
                        {text ? (
                            <p className="text-sm text-neutral-400 leading-relaxed whitespace-pre-line">{text}</p>
                        ) : (
                            <div className="rounded-lg border border-dashed border-neutral-800 px-5 py-4 font-mono text-xs text-neutral-700">
                                {t('coming_soon')}
                            </div>
                        )}
                    </div>
                );
            })}

        </main>
    );
}
