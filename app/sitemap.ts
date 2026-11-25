import type { MetadataRoute } from 'next';

import { projects } from '@/lib/projects';

import {
  LOCALES,
  localizedUrl,
  languageAlternates,
} from '@/lib/seo';

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages = [
    {
      path: '',
      priority: 1,
      changeFrequency: 'weekly',
    },

    {
      path: 'about',
      priority: 0.8,
      changeFrequency: 'monthly',
    },

    {
      path: 'contact',
      priority: 0.8,
      changeFrequency: 'monthly',
    },
  ] as const;

  const staticEntries: MetadataRoute.Sitemap =
    LOCALES.flatMap((locale) =>
      staticPages.map((page) => ({
        url: localizedUrl(
          locale,
          page.path,
        ),

        priority: page.priority,

        changeFrequency:
          page.changeFrequency,

        alternates: {
          languages: languageAlternates(
            page.path,
          ),
        },
      })),
    );

  const projectEntries: MetadataRoute.Sitemap =
    LOCALES.flatMap((locale) =>
      projects.map((project) => {
        const path =
          `projects/${project.slug}`;

        return {
          url: localizedUrl(
            locale,
            path,
          ),

          priority: 0.7,

          changeFrequency:
            'monthly' as const,

          alternates: {
            languages:
              languageAlternates(path),
          },
        };
      }),
    );

  return [
    ...staticEntries,
    ...projectEntries,
  ];
}
