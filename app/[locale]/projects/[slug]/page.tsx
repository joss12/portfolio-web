import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';

import {
  getTranslations,
  setRequestLocale,
} from 'next-intl/server';

import { projects } from '@/lib/projects';

import {
  SITE_URL,
  SITE_NAME,
  SOCIAL_IMAGE,
  absoluteUrl,
  localizedUrl,
  normalizeLocale,
  createPageMetadata,
} from '@/lib/seo';

import ProgressBar from '@/components/ui/ProgressBar';

type PageProps = {
  params: Promise<{
    slug: string;
    locale: string;
  }>;
};

export function generateStaticParams() {
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug, locale } = await params;

  const project = projects.find(
    (item) => item.slug === slug,
  );

  if (!project) {
    return {
      title: 'Project Not Found',

      robots: {
        index: false,
        follow: false,
      },
    };
  }

  const keywords = [
    ...project.stack.split('·'),
    ...project.concepts.split('·'),
  ]
    .map((item) => item.trim())
    .filter(Boolean);

  return createPageMetadata({
    locale,
    title: project.name,
    description: project.tagline,
    path: `projects/${project.slug}`,
    image: project.image || SOCIAL_IMAGE,
    imageAlt: project.name,
    keywords,
  });
}

export default async function ProjectPage({
  params,
}: PageProps) {
  const { slug, locale } = await params;

  setRequestLocale(locale);

  const project = projects.find(
    (item) => item.slug === slug,
  );

  if (!project) {
    notFound();
  }

  const t = await getTranslations({
    locale,
    namespace: 'project',
  });

  const language = normalizeLocale(locale);

  const homePath = `/${language}`;

  const projectUrl = localizedUrl(
    language,
    `projects/${project.slug}`,
  );

  const isComplete =
    project.status === 'complete';

  const technologyStack = project.stack
    .split('·')
    .map((technology) => technology.trim())
    .filter(Boolean);

  const concepts = project.concepts
    .split('·')
    .map((concept) => concept.trim())
    .filter(Boolean);

  const sections = [
    {
      key: 'problem',
      label: t('problem'),
    },
    {
      key: 'priorArt',
      label: t('prior_art'),
    },
    {
      key: 'designDecisions',
      label: t('design_decisions'),
    },
    {
      key: 'architecture',
      label: t('architecture'),
    },
    {
      key: 'reflection',
      label: t('reflection'),
    },
  ] as const;

  const translations = {
    en: {
      home: 'Home',

      breadcrumb: 'Breadcrumb',

      projects: 'Projects',

      overview: 'Project overview',

      liveDemo: 'Live Demo',

      repository: 'GitHub Repository',

      documentation: 'API Documentation',

      engineering: 'Engineering Case Study',

      engineeringDescription:
        'The technical decisions, implementation and architecture behind this project.',

      technologies: 'Technology Stack',

      concepts: 'Core Concepts',

      contactTitle:
        'Have a similar project in mind?',

      contactDescription:
        'Let’s discuss your web application, backend system or custom software requirements.',

      contact: 'Start a Project',

      allProjects: 'View All Projects',

      preview: 'Project preview',
    },

    ko: {
      home: '홈',

      breadcrumb: '현재 위치',

      projects: '프로젝트',

      overview: '프로젝트 개요',

      liveDemo: '라이브 데모',

      repository: 'GitHub 저장소',

      documentation: 'API 문서',

      engineering: '엔지니어링 사례 연구',

      engineeringDescription:
        '프로젝트의 설계, 구현 및 기술적 의사결정.',

      technologies: '기술 스택',

      concepts: '핵심 기술',

      contactTitle:
        '비슷한 프로젝트가 필요하신가요?',

      contactDescription:
        '웹 애플리케이션, 백엔드 시스템 및 맞춤형 소프트웨어 개발에 대해 이야기해 보세요.',

      contact: '프로젝트 문의',

      allProjects: '모든 프로젝트 보기',

      preview: '프로젝트 미리보기',
    },

    fr: {
      home: 'Accueil',

      breadcrumb: 'Fil d’Ariane',

      projects: 'Projets',

      overview: 'Présentation du projet',

      liveDemo: 'Démo en direct',

      repository: 'Dépôt GitHub',

      documentation: 'Documentation API',

      engineering: 'Étude technique',

      engineeringDescription:
        'Conception, implémentation et décisions techniques du projet.',

      technologies: 'Technologies',

      concepts: 'Concepts clés',

      contactTitle:
        'Vous avez un projet similaire ?',

      contactDescription:
        'Discutons de votre application web, système backend ou logiciel sur mesure.',

      contact: 'Discuter de votre projet',

      allProjects: 'Voir tous les projets',

      preview: 'Aperçu du projet',
    },
  } as const;

  const copy = translations[language];

  const structuredData = {
    '@context': 'https://schema.org',

    '@graph': [
      {
        '@type': 'CreativeWork',

        '@id': `${projectUrl}#project`,

        name: project.name,

        description: project.description,

        url: projectUrl,

        image: absoluteUrl(
          project.image || SOCIAL_IMAGE,
        ),

        inLanguage: 'en',

        creator: {
          '@type': 'Person',

          '@id': `${SITE_URL}/#person`,

          name: SITE_NAME,
        },

        keywords: [
          ...technologyStack,
          ...concepts,
        ],

        ...(project.repo
          ? {
              relatedLink: project.repo,
            }
          : {}),
      },

      {
        '@type': 'BreadcrumbList',

        itemListElement: [
          {
            '@type': 'ListItem',

            position: 1,

            name: copy.home,

            item: localizedUrl(language),
          },

          {
            '@type': 'ListItem',

            position: 2,

            name: copy.projects,

            item: `${localizedUrl(language)}#projects`,
          },

          {
            '@type': 'ListItem',

            position: 3,

            name: project.name,

            item: projectUrl,
          },
        ],
      },
    ],
  };

  return (
    <main className="mx-auto w-full max-w-5xl px-5 pt-28 pb-20 sm:px-8">

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            structuredData,
          ).replace(/</g, '\\u003c'),
        }}
      />

      <ProgressBar />

      {/* ========================================
          BREADCRUMB NAVIGATION
      ======================================== */}

      <nav
        aria-label={copy.breadcrumb}
        className="
          mb-10 flex flex-wrap items-center
          gap-2 text-xs text-text-muted
        "
      >

        <Link
          href={homePath}
          className="
            transition-colors
            hover:text-foreground
          "
        >
          {t('back')}
        </Link>

        <span
          aria-hidden="true"
          className="text-text-muted opacity-60"
        >
          /
        </span>

        <Link
          href={`${homePath}#projects`}
          className="
            transition-colors
            hover:text-foreground
          "
        >
          {copy.projects}
        </Link>

        <span
          aria-hidden="true"
          className="text-text-muted opacity-60"
        >
          /
        </span>

        <span
          aria-current="page"
          className="text-text-secondary"
        >
          {project.name}
        </span>

      </nav>

      {/* ========================================
          PROJECT HEADER
      ======================================== */}

      <header className="mb-10">

        <div className="mb-5 flex flex-wrap items-center gap-3">

          {/* Project category */}

          <span
            className={`
              inline-flex items-center
              rounded-md px-3 py-1
              text-xs font-medium
              ${project.tagColor}
              light-project-tag
            `}
          >
            {project.tag}
          </span>

          {/* Project status */}

          <span
            className={`
              inline-flex items-center
              gap-2 rounded-full border
              px-3 py-1 text-xs font-medium
              ${
                isComplete
                  ? 'border-success/20 bg-success/10 text-success'
                  : 'border-warning/20 bg-warning/10 text-warning'
              }
            `}
          >

            <span
              aria-hidden="true"
              className={`
                h-1.5 w-1.5 rounded-full
                ${
                  isComplete
                    ? 'bg-success'
                    : 'bg-warning'
                }
              `}
            />

            {isComplete
              ? t('complete')
              : t('wip')}

          </span>

        </div>

        <h1
          className="
            mb-5 text-3xl leading-tight
            font-bold tracking-tight
            text-foreground
            sm:text-4xl lg:text-5xl
          "
        >
          {project.name}
        </h1>

        <p
          lang="en"
          className="
            max-w-3xl text-base
            leading-relaxed
            text-text-secondary
            sm:text-lg
          "
        >
          {project.tagline}
        </p>

        {/* Project actions */}

        <div className="mt-7 flex flex-wrap items-center gap-3">

          {project.live && (
            <a
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
              className="
                inline-flex items-center gap-2
                rounded-lg bg-primary
                px-5 py-3 text-sm
                font-medium text-white
                transition-colors
                hover:bg-primary-hover
              "
            >
              {copy.liveDemo}

              <span aria-hidden="true">
                ↗
              </span>
            </a>
          )}

          {project.repo && (
            <a
              href={project.repo}
              target="_blank"
              rel="noopener noreferrer"
              className="
                inline-flex items-center gap-2
                rounded-lg border border-border
                bg-surface px-5 py-3
                text-sm font-medium
                text-foreground
                transition-colors
                hover:border-border-hover
                hover:bg-surface-hover
              "
            >
              {copy.repository}

              <span aria-hidden="true">
                ↗
              </span>
            </a>
          )}

          {project.swagger && (
            <a
              href={project.swagger}
              target="_blank"
              rel="noopener noreferrer"
              className="
                inline-flex items-center gap-2
                rounded-lg border border-border
                px-5 py-3 text-sm
                font-medium text-text-secondary
                transition-colors
                hover:border-border-hover
                hover:text-foreground
              "
            >
              {copy.documentation}

              <span aria-hidden="true">
                ↗
              </span>
            </a>
          )}

        </div>

      </header>

      {/* ========================================
          PROJECT PREVIEW
      ======================================== */}

      {project.image && (
        <figure className="mb-12">

          <div
            className="
              relative aspect-video
              overflow-hidden rounded-xl
              border border-border
              bg-background-secondary
            "
          >

            <Image
              src={project.image}
              alt={`${project.name} — ${copy.preview}`}
              fill
              preload
              quality={75}
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 90vw, 960px"
              className="object-contain"
            />

          </div>

        </figure>
      )}

      {/* ========================================
          PROJECT OVERVIEW
      ======================================== */}

      <section className="mb-12">

        <h2
          className="
            mb-4 text-xl font-semibold
            tracking-tight text-foreground
          "
        >
          {copy.overview}
        </h2>

        <p
          lang="en"
          className="
            max-w-3xl text-sm
            leading-7 text-text-secondary
            sm:text-base
          "
        >
          {project.description}
        </p>

      </section>

      {/* ========================================
          TECHNOLOGY AND CONCEPTS
      ======================================== */}

      <section className="mb-16 grid grid-cols-1 gap-5 md:grid-cols-2">

        {/* Technology stack */}

        <div
          className="
            rounded-xl border border-border
            bg-surface p-6
          "
        >

          <h2
            className="
              mb-5 text-sm font-semibold
              text-foreground
            "
          >
            {copy.technologies}
          </h2>

          <div className="flex flex-wrap gap-2">

            {technologyStack.map(
              (technology, index) => (
                <span
                  key={`${technology}-${index}`}
                  className="
                    rounded-md border border-border
                    bg-background-secondary
                    px-3 py-1.5 text-xs
                    text-text-secondary
                  "
                >
                  {technology}
                </span>
              ),
            )}

          </div>

        </div>

        {/* Core concepts */}

        <div
          className="
            rounded-xl border border-border
            bg-surface p-6
          "
        >

          <h2
            className="
              mb-5 text-sm font-semibold
              text-foreground
            "
          >
            {copy.concepts}
          </h2>

          <div className="flex flex-wrap gap-2">

            {concepts.map(
              (concept, index) => (
                <span
                  key={`${concept}-${index}`}
                  className="
                    rounded-md border
                    border-primary/15
                    bg-primary/5
                    px-3 py-1.5 text-xs
                    text-primary-light
                  "
                >
                  {concept}
                </span>
              ),
            )}

          </div>

        </div>

      </section>

      {/* ========================================
          ENGINEERING CASE STUDY
      ======================================== */}

      <section className="mb-16">

        <div className="mb-10 border-b border-border pb-6">

          <h2
            className="
              mb-3 text-2xl font-bold
              tracking-tight text-foreground
            "
          >
            {copy.engineering}
          </h2>

          <p
            className="
              text-sm leading-relaxed
              text-text-muted
            "
          >
            {copy.engineeringDescription}
          </p>

        </div>

        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[200px_minmax(0,1fr)]">

          {/* Case study navigation */}

          <aside className="hidden lg:block">

            <nav
              aria-label={copy.engineering}
              className="
                sticky top-28
                flex flex-col gap-1
                border-l border-border
              "
            >

              {sections.map(({ key, label }) => (
                <a
                  key={key}
                  href={`#${key}`}
                  className="
                    border-l border-transparent
                    px-4 py-2.5 text-xs
                    leading-relaxed text-text-muted
                    transition-colors
                    hover:border-primary
                    hover:text-foreground
                  "
                >
                  {label}
                </a>
              ))}

            </nav>

          </aside>

          {/* Case study content */}

          <div className="min-w-0 space-y-10">

            {sections.map(
              ({ key, label }, index) => {
                const text =
                  project.content?.[key];

                return (
                  <article
                    key={key}
                    id={key}
                    className="
                      scroll-mt-28
                      border-b border-border
                      pb-10 last:border-b-0
                      last:pb-0
                    "
                  >

                    <div className="mb-5 flex items-center gap-3">

                      <span
                        aria-hidden="true"
                        className="
                          font-mono text-xs
                          text-primary-light
                        "
                      >
                        {String(index + 1).padStart(
                          2,
                          '0',
                        )}
                      </span>

                      <h3
                        className="
                          text-lg font-semibold
                          tracking-tight
                          text-foreground
                        "
                      >
                        {label}
                      </h3>

                    </div>

                    {text ? (
                      <p
                        lang="en"
                        className="
                          text-sm leading-7
                          whitespace-pre-line
                          text-text-secondary
                          sm:text-base sm:leading-8
                        "
                      >
                        {text}
                      </p>
                    ) : (
                      <div
                        className="
                          rounded-lg border
                          border-dashed border-border
                          px-5 py-4 text-xs
                          text-text-muted
                        "
                      >
                        {t('coming_soon')}
                      </div>
                    )}

                  </article>
                );
              },
            )}

          </div>

        </div>

      </section>

      {/* ========================================
          COMMERCIAL CALL TO ACTION
      ======================================== */}

      <section
        className="
          rounded-xl border border-border
          bg-surface p-7 sm:p-10
        "
      >

        <div className="max-w-2xl">

          <h2
            className="
              mb-3 text-xl font-semibold
              tracking-tight text-foreground
              sm:text-2xl
            "
          >
            {copy.contactTitle}
          </h2>

          <p
            className="
              mb-6 text-sm leading-relaxed
              text-text-secondary
            "
          >
            {copy.contactDescription}
          </p>

          <div className="flex flex-wrap items-center gap-3">

            <Link
              href={`${homePath}/contact`}
              className="
                inline-flex items-center gap-2
                rounded-lg bg-primary
                px-5 py-3 text-sm
                font-medium text-white
                transition-colors
                hover:bg-primary-hover
              "
            >
              {copy.contact}

              <span aria-hidden="true">
                →
              </span>
            </Link>

            <Link
              href={`${homePath}#projects`}
              className="
                inline-flex items-center gap-2
                rounded-lg border border-border
                px-5 py-3 text-sm
                font-medium text-text-secondary
                transition-colors
                hover:border-border-hover
                hover:text-foreground
              "
            >
              {copy.allProjects}
            </Link>

          </div>

        </div>

      </section>

    </main>
  );
}
