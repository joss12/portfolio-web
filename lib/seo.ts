import type { Metadata } from 'next';

export const SITE_URL =
  'https://www.eddymouity.dev';

export const SITE_NAME = 'Eddy Mouity';

export const LOCALES = [
  'en',
  'ko',
  'fr',
] as const;

export type SiteLocale =
  (typeof LOCALES)[number];

export type PageName =
  | 'home'
  | 'about'
  | 'contact';

export const DEFAULT_LOCALE: SiteLocale = 'en';

export const SOCIAL_IMAGE = '/og/cover.png';

export const PROFILE_IMAGE =
  '/photo/photo_final.jpeg';

export const SOCIAL_PROFILES = [
  'https://github.com/joss12',
  'https://www.linkedin.com/in/eddymouity',
];

const seoContent = {
  en: {
    role: 'Independent Software Developer',

    ogLocale: 'en_US',

    home: {
      title:
        'Eddy Mouity — Software Developer in South Korea',

      description:
        'Independent software developer in South Korea. Web applications, backend APIs, full stack development, e-commerce and MVP solutions for businesses and startups.',
    },

    about: {
      title: 'About | Software Developer',

      description:
        'Discover my software development background, technical expertise, engineering philosophy and approach to building reliable applications and backend systems.',
    },

    contact: {
      title: 'Contact | Software Development Inquiries',

      description:
        'Discuss your web application, backend API, full stack development, e-commerce platform, MVP or software development opportunity.',
    },

    keywords: [
      'Eddy Mouity',
      'Software Developer South Korea',
      'Independent Software Developer',
      'Freelance Software Developer',
      'Backend Developer',
      'Full Stack Developer',
      'Full Stack Development',
      'Full Stack Development South Korea',
      'Custom Software Development',
      'Web Application Development',
      'API Development',
      'E-Commerce Development',
      'MVP Development',
      'Software Maintenance',
      'System Integration',
    ],

    services: [
      'Web Application Development',
      'Backend & API Development',
      'E-Commerce Development',
      'Full Stack Development',
      'MVP Development',
      'Maintenance & Integration',
    ],
  },

  ko: {
    role: '독립 소프트웨어 개발자',

    ogLocale: 'ko_KR',

    home: {
      title:
        'Eddy Mouity — 한국 소프트웨어 개발자',

      description:
        '한국에서 활동하는 독립 소프트웨어 개발자입니다. 기업과 스타트업을 위한 웹 애플리케이션, 백엔드 API, 풀스택 개발, 쇼핑몰 및 MVP 개발 서비스를 제공합니다.',
    },

    about: {
      title: '개발자 소개 | 소프트웨어 개발자',

      description:
        '소프트웨어 개발 경력, 기술 역량, 개발 철학 및 안정적인 웹 애플리케이션과 백엔드 시스템 개발 접근 방식을 소개합니다.',
    },

    contact: {
      title: '문의 | 소프트웨어 개발 및 프로젝트 상담',

      description:
        '웹 애플리케이션, 백엔드 API, 풀스택 개발, 쇼핑몰, MVP 개발 및 개발자 채용에 대해 문의해 주세요.',
    },

    keywords: [
      'Eddy Mouity',
      '한국 소프트웨어 개발자',
      '프리랜서 개발자',
      '백엔드 개발자',
      '풀스택 개발자',
      '풀스택 개발',
      '풀스택 웹 개발',
      '웹 개발자',
      '웹 애플리케이션 개발',
      '맞춤형 소프트웨어 개발',
      'API 개발',
      '쇼핑몰 개발',
      'MVP 개발',
      '소프트웨어 유지보수',
      '시스템 연동',
      '경기도 개발자',
    ],

    services: [
      '웹 애플리케이션 개발',
      '백엔드 및 API 개발',
      '이커머스 개발',
      '풀스택 개발',
      'MVP 개발',
      '유지보수 및 시스템 연동',
    ],
  },

  fr: {
    role: 'Développeur logiciel indépendant',

    ogLocale: 'fr_FR',

    home: {
      title:
        'Eddy Mouity — Développeur logiciel en Corée du Sud',

      description:
        'Développeur logiciel indépendant en Corée du Sud. Applications web, API backend, développement full stack, e-commerce et MVP pour entreprises et startups.',
    },

    about: {
      title: 'À propos | Développeur logiciel',

      description:
        'Découvrez mon parcours, mon expertise technique, ma philosophie de développement et mon approche de la conception de logiciels fiables.',
    },

    contact: {
      title: 'Contact | Développement logiciel',

      description:
        'Discutons de votre application web, API backend, développement full stack, plateforme e-commerce, MVP ou opportunité professionnelle.',
    },

    keywords: [
      'Eddy Mouity',
      'Développeur logiciel',
      'Développeur indépendant',
      'Développeur backend',
      'Développeur full stack',
      'Développement full stack',
      'Développement web full stack',
      'Développeur en Corée du Sud',
      'Développement web',
      'Développement API',
      'Développement e-commerce',
      'Logiciels sur mesure',
      'Développement MVP',
      'Maintenance logicielle',
      'Intégration de systèmes',
    ],

    services: [
      'Développement d’applications web',
      'Développement backend et API',
      'Développement e-commerce',
      'Développement Full Stack',
      'Développement MVP',
      'Maintenance et intégration',
    ],
  },
} as const;

const technologyKeywords = [
  'Node.js',
  'JavaScript',
  'TypeScript',
  'Go',
  'Golang',
  'Java',
  'Spring Boot',
  'React',
  'Next.js',
  'PostgreSQL',
  'Software Engineering',
];

export function normalizeLocale(
  locale: string,
): SiteLocale {
  if (locale === 'ko' || locale === 'fr') {
    return locale;
  }

  return DEFAULT_LOCALE;
}

export function getSeoContent(locale: string) {
  return seoContent[normalizeLocale(locale)];
}

export function absoluteUrl(path = ''): string {
  return new URL(path || '/', SITE_URL).toString();
}

export function localizedUrl(
  locale: string,
  path = '',
): string {
  const language = normalizeLocale(locale);

  const cleanPath = path.replace(/^\/+|\/+$/g, '');

  return absoluteUrl(
    cleanPath
      ? `/${language}/${cleanPath}`
      : `/${language}`,
  );
}

export function languageAlternates(path = '') {
  return {
    en: localizedUrl('en', path),
    ko: localizedUrl('ko', path),
    fr: localizedUrl('fr', path),
    'x-default': localizedUrl(
      DEFAULT_LOCALE,
      path,
    ),
  };
}

type MetadataOptions = {
  locale: string;
  title: string;
  description: string;
  path?: string;
  image?: string;
  imageAlt?: string;
  keywords?: string[];
  type?: 'website' | 'profile';
  absoluteTitle?: boolean;
};

export function createPageMetadata({
  locale,
  title,
  description,
  path = '',
  image = SOCIAL_IMAGE,
  imageAlt = SITE_NAME,
  keywords = [],
  type = 'website',
  absoluteTitle = false,
}: MetadataOptions): Metadata {
  const language = normalizeLocale(locale);

  const copy = getSeoContent(language);

  const canonical = localizedUrl(
    language,
    path,
  );

  const imageUrl = absoluteUrl(image);

  const socialTitle = absoluteTitle
    ? title
    : `${title} · ${SITE_NAME}`;

  return {
    title: absoluteTitle
      ? { absolute: title }
      : title,

    description,

    keywords: [
      ...copy.keywords,
      ...technologyKeywords,
      ...keywords,
    ],

    alternates: {
      canonical,
      languages: languageAlternates(path),
    },

    openGraph: {
      type,
      url: canonical,
      siteName: SITE_NAME,
      title: socialTitle,
      description,
      locale: copy.ogLocale,

      alternateLocale: LOCALES
        .filter((item) => item !== language)
        .map(
          (item) =>
            seoContent[item].ogLocale,
        ),

      images: [
        {
          url: imageUrl,
          alt: imageAlt,
          ...(image === SOCIAL_IMAGE
            ? {
                width: 1200,
                height: 630,
              }
            : {}),
        },
      ],
    },

    twitter: {
      card: 'summary_large_image',
      title: socialTitle,
      description,
      images: [
        {
          url: imageUrl,
          alt: imageAlt,
        },
      ],
    },

    robots: {
      index: true,
      follow: true,

      googleBot: {
        index: true,
        follow: true,
        'max-image-preview': 'large',
        'max-snippet': -1,
        'max-video-preview': -1,
      },
    },
  };
}

export function getPageMetadata(
  locale: string,
  page: PageName,
): Metadata {
  const copy = getSeoContent(locale);

  const pageContent = copy[page];

  return createPageMetadata({
    locale,
    title: pageContent.title,
    description: pageContent.description,

    path: page === 'home' ? '' : page,

    type: page === 'about'
      ? 'profile'
      : 'website',

    absoluteTitle: page === 'home',
  });
}

export function getStructuredData(
  locale: string,
) {
  const language = normalizeLocale(locale);

  const copy = getSeoContent(language);

  const personId = `${SITE_URL}/#person`;

  const websiteId = `${SITE_URL}/#website`;

  return {
    '@context': 'https://schema.org',

    '@graph': [
      {
        '@type': 'Person',

        '@id': personId,

        name: SITE_NAME,

        url: localizedUrl(
          DEFAULT_LOCALE,
          'about',
        ),

        image: absoluteUrl(PROFILE_IMAGE),

        jobTitle: copy.role,

        description: copy.about.description,

        sameAs: SOCIAL_PROFILES,

        knowsLanguage: [
          'en',
          'ko',
          'fr',
        ],

        workLocation: {
          '@type': 'Place',

          address: {
            '@type': 'PostalAddress',
            addressCountry: 'KR',
          },
        },

        knowsAbout: [
          'Software Development',
          'Backend Development',
          'Web Development',
          'Full Stack Development',
          'API Design',
          'Distributed Systems',
          'Database Design',
          'Go',
          'Java',
          'Spring Boot',
          'Node.js',
          'TypeScript',
          'React',
          'Next.js',
        ],
      },

      {
        '@type': 'WebSite',

        '@id': websiteId,

        name: SITE_NAME,

        url: SITE_URL,

        description: copy.home.description,

        inLanguage: LOCALES,

        publisher: {
          '@id': personId,
        },
      },

      {
        '@type': 'ItemList',

        '@id':
          `${localizedUrl(language)}#services`,

        name: copy.role,

        itemListElement: copy.services.map(
          (service, index) => ({
            '@type': 'ListItem',

            position: index + 1,

            item: {
              '@type': 'Service',

              name: service,

              serviceType: service,

              provider: {
                '@id': personId,
              },

              areaServed: {
                '@type': 'Country',
                name: 'South Korea',
              },

              url:
                `${localizedUrl(language)}#services`,
            },
          }),
        ),
      },
    ],
  };
}
