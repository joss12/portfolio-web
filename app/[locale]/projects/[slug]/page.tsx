import { notFound } from 'next/navigation';
import { projects } from '@/lib/projects';
import ProgressBar from '@/components/ui/ProgressBar';
import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) return { title: 'Project Not Found' };
  return {
    title: project.name,
    description: project.tagline,
  };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string; locale: string }>;
}) {
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

      <nav className="mb-10 flex items-center gap-2 font-mono text-xs text-neutral-600">
        <a
          href={`/${locale}`}
          className="transition-colors hover:text-neutral-400"
        >
          {t('back')}
        </a>
        <span>/</span>
        <span>Projects</span>
        <span>/</span>
        <span className="text-neutral-400">{project.name}</span>
      </nav>

      <div className="mb-4">
        <span
          className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 font-mono text-xs font-semibold ${
            project.status === 'complete'
              ? 'border-emerald-400/20 bg-emerald-400/10 text-emerald-400'
              : 'border-amber-400/20 bg-amber-400/10 text-amber-400'
          }`}
        >
          {project.status === 'complete' ? t('complete') : t('wip')}
        </span>
      </div>

      <h1 className="mb-4 text-3xl leading-tight font-bold tracking-tight text-white">
        {project.name}
      </h1>

      <div className="mb-10 border-l-2 border-cyan-500 pl-4">
        <p className="text-sm leading-relaxed text-neutral-400">
          {project.tagline}
        </p>
      </div>

      <div className="mb-14 overflow-hidden rounded-lg border border-neutral-800 text-sm">
        {[
          { label: t('stack'), value: project.stack },
          { label: t('repo'), value: project.repo, isLink: true },
          ...(project.swagger
            ? [{ label: 'Live Docs', value: project.swagger, isLink: true }]
            : []),
          {
            label: t('status'),
            value: project.status === 'complete' ? t('complete') : t('wip'),
          },
          { label: t('concepts'), value: project.concepts },
        ].map((row) => (
          <div
            key={row.label}
            className="grid grid-cols-1 gap-1 border-b border-neutral-800 last:border-b-0 sm:grid-cols-4"
          >
            <div className="bg-neutral-900 px-4 pt-3 pb-1 font-mono text-xs font-semibold tracking-widest text-neutral-600 uppercase sm:py-3">
              {row.label}
            </div>
            <div className="col-span-3 px-4 pt-1 pb-3 text-neutral-400 sm:py-3">
              {row.isLink ? (
                <a
                  href={row.value}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-cyan-400 transition-colors hover:text-cyan-300"
                >
                  {row.value} ↗
                </a>
              ) : (
                row.value
              )}
            </div>
          </div>
        ))}
      </div>

      {sections.map(({ key, label }) => {
        const text = project.content?.[key as keyof typeof project.content];
        return (
          <div key={key} className="mb-12">
            <h2 className="mb-4 border-b border-neutral-800 pb-3 text-base font-semibold text-white">
              {label}
            </h2>
            {text ? (
              <p className="text-sm leading-relaxed whitespace-pre-line text-neutral-400">
                {text}
              </p>
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
