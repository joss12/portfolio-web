'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useLocale } from 'next-intl';

import type { Project } from '@/lib/projects';

const translations = {
  en: {
    completed: 'Completed',
    inProgress: 'Work in progress',
    viewProject: 'View project',
    preview: 'Project preview',
  },

  ko: {
    completed: '완료',
    inProgress: '개발 중',
    viewProject: '프로젝트 보기',
    preview: '프로젝트 미리보기',
  },

  fr: {
    completed: 'Terminé',
    inProgress: 'En cours',
    viewProject: 'Voir le projet',
    preview: 'Aperçu du projet',
  },
} as const;

type SupportedLocale = keyof typeof translations;

type ProjectCardProps = {
  project: Project;
  locale: string;
  copy: (typeof translations)[SupportedLocale];
};

function ProjectCard({
  project,
  locale,
  copy,
}: ProjectCardProps) {
  const isComplete =
    project.status === 'complete';

  const status = isComplete
    ? copy.completed
    : copy.inProgress;

  return (
    <li className="h-full min-w-0">
      <Link
        href={`/${locale}/projects/${project.slug}`}
        className="
          group
          flex h-full flex-col
          overflow-hidden rounded-xl
          border border-border
          bg-surface
          shadow-sm shadow-black/5
          transition-all duration-300
          hover:border-primary/35
          hover:bg-surface-hover
          hover:shadow-xl
          hover:shadow-black/10
          dark:border-neutral-800
          dark:bg-neutral-900
          dark:hover:border-neutral-600
          dark:hover:bg-neutral-900
          dark:hover:shadow-black/20
          focus-visible:outline-2
          focus-visible:outline-offset-4
          focus-visible:outline-primary
          motion-safe:hover:-translate-y-1
          motion-reduce:transition-none
        "
      >
        {project.image && (
          <div
            className="
              relative aspect-video w-full
              overflow-hidden
              border-b border-border
              bg-background-secondary
              dark:border-neutral-800
              dark:bg-neutral-950
            "
          >
            <Image
              src={project.image}
              alt={`${project.name} — ${copy.preview}`}
              fill
              loading="lazy"
              quality={75}
              sizes="
                (max-width: 639px) 100vw,
                (max-width: 1023px) 50vw,
                600px
              "
              className="
                object-contain
                motion-safe:transition-transform
                motion-safe:duration-500
                motion-safe:group-hover:scale-[1.02]
              "
            />
          </div>
        )}

        <div className="flex flex-1 flex-col p-5 sm:p-6">
          <div className="mb-3 flex items-start justify-between gap-4">
            <h3
              className="
                min-w-0 break-words
                text-base font-semibold
                leading-snug
                text-foreground
                transition-colors
                group-hover:text-primary-light
                dark:text-white
                dark:group-hover:text-cyan-400
              "
            >
              {project.name}
            </h3>

            <span
              title={status}
              className="mt-2 flex shrink-0 items-center"
            >
              <span
                aria-hidden="true"
                className={`
                  h-1.5 w-1.5
                  rounded-full
                  ${
                    isComplete
                      ? 'bg-success dark:bg-emerald-400'
                      : 'bg-warning dark:bg-amber-400'
                  }
                `}
              />

              <span className="sr-only">
                {status}
              </span>
            </span>
          </div>

          <p
            lang="en"
            className="
              mb-6 flex-1
              break-words
              text-sm leading-relaxed
              text-text-secondary
              dark:text-neutral-400
            "
          >
            {project.description}
          </p>

          <div
            className="
              mt-auto flex flex-wrap
              items-center justify-between
              gap-3
              border-t border-border
              pt-4
              dark:border-neutral-800
            "
          >
            <span
              className={`
                rounded-md
                px-2.5 py-1
                font-mono text-xs font-medium
                ${project.tagColor}
                light-project-tag
              `}
            >
              {project.tag}
            </span>

            <span
              className="
                text-xs font-medium
                text-text-muted
                transition-colors
                group-hover:text-primary-light
                dark:text-neutral-400
                dark:group-hover:text-cyan-400
              "
            >
              {copy.viewProject}

              <span
                aria-hidden="true"
                className="
                  ml-1.5 inline-block
                  motion-safe:transition-transform
                  motion-safe:group-hover:translate-x-1
                "
              >
                →
              </span>
            </span>
          </div>
        </div>
      </Link>
    </li>
  );
}

type AnimatedProjectsProps = {
  projects: Project[];
};

export default function AnimatedProjects({
  projects,
}: AnimatedProjectsProps) {
  const locale = useLocale();

  const language: SupportedLocale =
    locale === 'ko' || locale === 'fr'
      ? locale
      : 'en';

  const copy = translations[language];

  return (
    <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2">
      {projects.map((project) => (
        <ProjectCard
          key={project.slug}
          project={project}
          locale={language}
          copy={copy}
        />
      ))}
    </ul>
  );
}
