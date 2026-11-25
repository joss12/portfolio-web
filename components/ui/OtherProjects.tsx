'use client';

import { useLocale } from 'next-intl';

import { ChevronDown } from 'lucide-react';

import { otherProjects } from '@/lib/projects';

const translations = {
  en: {
    title: 'Other projects',
    purpose: 'Why:',
    repository: 'GitHub repository',
  },

  ko: {
    title: '기타 프로젝트',
    purpose: '개발 목적:',
    repository: 'GitHub 저장소',
  },

  fr: {
    title: 'Autres projets',
    purpose: 'Objectif :',
    repository: 'Dépôt GitHub',
  },
} as const;

export default function OtherProjects() {
  const locale = useLocale();

  const language =
    locale === 'ko' || locale === 'fr'
      ? locale
      : 'en';

  const copy = translations[language];

  return (
    <details className="group/disclosure mt-6">
      <summary
        className="
          inline-flex min-h-11
          cursor-pointer list-none
          items-center gap-2
          rounded-lg
          border border-border
          bg-surface
          px-4 py-2.5
          font-mono text-xs font-semibold
          text-text-secondary
          transition-colors
          hover:border-primary/35
          hover:bg-surface-hover
          hover:text-primary-light
          dark:border-neutral-800
          dark:bg-transparent
          dark:text-neutral-400
          dark:hover:border-cyan-500/30
          dark:hover:text-neutral-200
          focus-visible:outline-2
          focus-visible:outline-offset-4
          focus-visible:outline-primary
          [&::-webkit-details-marker]:hidden
        "
      >
        <ChevronDown
          size={14}
          aria-hidden="true"
          className="
            shrink-0
            group-open/disclosure:rotate-180
            motion-safe:transition-transform
          "
        />

        {copy.title}

        <span
          className="
            ml-1 rounded-full
            bg-surface-elevated
            px-2 py-0.5
            text-xs text-text-secondary
            dark:bg-neutral-800
            dark:text-neutral-400
          "
        >
          {otherProjects.length}
        </span>
      </summary>

      <ul className="mt-4 flex flex-col gap-3">
        {otherProjects.map((project) => (
          <li
            key={project.name}
            className="
              min-w-0 rounded-lg
              border border-border
              bg-surface p-5
              transition-colors duration-300
              hover:border-border-hover
              hover:bg-surface-hover
              dark:border-neutral-800
              dark:bg-neutral-900/50
              dark:hover:border-neutral-700
              dark:hover:bg-neutral-900/50
            "
          >
            <div
              className="
                mb-3 flex flex-wrap
                items-start justify-between
                gap-3
              "
            >
              <div className="flex min-w-0 flex-wrap items-center gap-3">
                <h3
                  className="
                    break-words
                    text-sm font-semibold
                    text-foreground
                    dark:text-white
                  "
                >
                  {project.name}
                </h3>

                <span
                  className={`
                    rounded
                    px-2 py-0.5
                    font-mono text-xs font-semibold
                    ${project.tagColor}
                    light-project-tag
                  `}
                >
                  {project.tag}
                </span>
              </div>

              <a
                href={project.repo}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${project.name} — ${copy.repository}`}
                className="
                  shrink-0 rounded-sm
                  font-mono text-xs
                  text-text-muted
                  transition-colors
                  hover:text-primary-light
                  dark:text-neutral-400
                  dark:hover:text-cyan-400
                  focus-visible:outline-2
                  focus-visible:outline-offset-4
                  focus-visible:outline-primary
                "
              >
                GitHub

                <span aria-hidden="true">
                  {' '}↗
                </span>
              </a>
            </div>

            <p
              lang="en"
              className="
                mb-3 break-words
                text-sm leading-relaxed
                text-text-secondary
                dark:text-neutral-400
              "
            >
              {project.description}
            </p>

            <div
              className="
                border-l-2
                border-primary/25
                pl-3
                dark:border-cyan-500/20
              "
            >
              <p
                className="
                  text-xs leading-relaxed
                  text-text-muted
                  dark:text-neutral-400
                "
              >
                <span
                  className="
                    font-semibold
                    text-text-secondary
                    dark:text-neutral-300
                  "
                >
                  {copy.purpose}{' '}
                </span>

                <span lang="en">
                  {project.purpose}
                </span>
              </p>
            </div>
          </li>
        ))}
      </ul>
    </details>
  );
}
