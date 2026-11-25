'use client';

import Link from 'next/link';
import { useLocale } from 'next-intl';

import {
  ArrowUpRight,
  ArrowRight,
  Github,
  Linkedin,
  MapPin,
  Globe2,
  Mail,
  BriefcaseBusiness,
} from 'lucide-react';

import DocumentPicker from '@/components/ui/DocumentPicker';

const content = {
  en: {
    role: 'Independent Software Developer',

    description:
      'Building reliable web applications, backend systems and digital solutions for businesses, startups and engineering teams.',

    location: 'Based in South Korea',

    languages: 'English · Korean · French',

    servicesTitle: 'Services',

    exploreTitle: 'Explore',

    contactTitle: "Let's work together",

    contactDescription:
      'Have a project in mind or looking for a software developer? Get in touch to discuss your requirements.',

    startProject: 'Start a project',

    employment: 'Employment inquiries',

    resume: 'Download résumé',

    availability: 'Available for new opportunities',

    copyright: 'All rights reserved.',

    builtWith: 'Designed and developed with',

    services: [
      {
        id: 'web-development',
        label: 'Web Development',
      },
      {
        id: 'backend-api',
        label: 'Backend & API Development',
      },
      {
        id: 'ecommerce',
        label: 'E-Commerce Development',
      },
      {
        id: 'full-stack-development',
        label: 'Full Stack Development',
      },
      {
        id: 'mvp',
        label: 'MVP Development',
      },
      {
        id: 'maintenance',
        label: 'Maintenance & Integration',
      },
    ],

    navigation: [
      {
        label: 'Home',
        path: '',
      },
      {
        label: 'Services',
        path: '#services',
      },
      {
        label: 'Selected Projects',
        path: '#projects',
      },
      {
        label: 'Lab',
        path: '#engineering',
      },
      {
        label: 'Technical Skills',
        path: '#skills',
      },
      {
        label: 'About Me',
        path: '/about',
      },
      {
        label: 'Contact',
        path: '/contact',
      },
    ],
  },

  ko: {
    role: '독립 소프트웨어 개발자',

    description:
      '기업, 스타트업 및 개발팀을 위한 안정적인 웹 애플리케이션, 백엔드 시스템 및 디지털 솔루션을 개발합니다.',

    location: '대한민국 거주',

    languages: '영어 · 한국어 · 프랑스어',

    servicesTitle: '제공 서비스',

    exploreTitle: '둘러보기',

    contactTitle: '함께 프로젝트를 시작하세요',

    contactDescription:
      '새로운 프로젝트 또는 개발자 채용을 고려하고 계신다면 언제든지 문의해 주세요.',

    startProject: '프로젝트 문의하기',

    employment: '채용 및 협업 문의',

    resume: '이력서 다운로드',

    availability: '새로운 프로젝트 및 채용 기회 환영',

    copyright: '모든 권리 보유.',

    builtWith: '사용 기술',

    services: [
      {
        id: 'web-development',
        label: '웹 애플리케이션 개발',
      },
      {
        id: 'backend-api',
        label: '백엔드 및 API 개발',
      },
      {
        id: 'ecommerce',
        label: '이커머스 개발',
      },
      {
        id: 'full-stack-development',
        label: '풀스택 개발',
      },
      {
        id: 'mvp',
        label: 'MVP 개발',
      },
      {
        id: 'maintenance',
        label: '유지보수 및 시스템 연동',
      },
    ],

    navigation: [
      {
        label: '홈',
        path: '',
      },
      {
        label: '서비스',
        path: '#services',
      },
      {
        label: '주요 프로젝트',
        path: '#projects',
      },
      {
        label: '랩',
        path: '#engineering',
      },
      {
        label: '기술 역량',
        path: '#skills',
      },
      {
        label: '개발자 소개',
        path: '/about',
      },
      {
        label: '문의',
        path: '/contact',
      },
    ],
  },

  fr: {
    role: 'Développeur logiciel indépendant',

    description:
      'Développement d’applications web, de systèmes backend et de solutions numériques fiables pour les entreprises, startups et équipes techniques.',

    location: 'Basé en Corée du Sud',

    languages: 'Anglais · Coréen · Français',

    servicesTitle: 'Services',

    exploreTitle: 'Découvrir',

    contactTitle: 'Travaillons ensemble',

    contactDescription:
      'Vous avez un projet ou recherchez un développeur logiciel ? Discutons de vos besoins et de vos objectifs.',

    startProject: 'Démarrer un projet',

    employment: 'Opportunités professionnelles',

    resume: 'Télécharger mon CV',

    availability: 'Disponible pour de nouvelles opportunités',

    copyright: 'Tous droits réservés.',

    builtWith: 'Conçu et développé avec',

    services: [
      {
        id: 'web-development',
        label: 'Développement web',
      },
      {
        id: 'backend-api',
        label: 'Développement Backend et API',
      },
      {
        id: 'ecommerce',
        label: 'Développement E-Commerce',
      },
      {
        id: 'full-stack-development',
        label: 'Développement Full Stack',
      },
      {
        id: 'mvp',
        label: 'Développement MVP',
      },
      {
        id: 'maintenance',
        label: 'Maintenance et intégration',
      },
    ],

    navigation: [
      {
        label: 'Accueil',
        path: '',
      },
      {
        label: 'Services',
        path: '#services',
      },
      {
        label: 'Projets sélectionnés',
        path: '#projects',
      },
      {
        label: 'Lab',
        path: '#engineering',
      },
      {
        label: 'Compétences techniques',
        path: '#skills',
      },
      {
        label: 'À propos',
        path: '/about',
      },
      {
        label: 'Contact',
        path: '/contact',
      },
    ],
  },
} as const;

type SupportedLocale = keyof typeof content;

const footerLinkClass = `
  inline-flex items-center gap-2
  text-sm leading-6
  text-text-secondary
  transition-colors
  hover:text-primary-light
`;

const socialLinkClass = `
  flex h-10 w-10
  items-center justify-center
  rounded-xl border border-border
  bg-surface
  text-text-secondary
  transition-all
  hover:-translate-y-0.5
  hover:border-primary/40
  hover:bg-surface-hover
  hover:text-primary-light
`;

export default function Footer() {
  const locale = useLocale();

  const language: SupportedLocale =
    locale === 'ko' || locale === 'fr'
      ? locale
      : 'en';

  const copy = content[language];

  const homePath = `/${locale}`;

  const contactPath = `${homePath}/contact`;

  const currentYear = new Date().getFullYear();

  return (
    <footer
      className="
        relative isolate overflow-hidden
        border-t border-border
        bg-background-secondary
      "
    >
      {/* Subtle background decoration */}

      <div
        aria-hidden="true"
        className="
          pointer-events-none absolute
          -bottom-48 -left-48 -z-10
          h-[500px] w-[500px]
          rounded-full bg-primary/[0.025]
          blur-[130px]
          dark:bg-primary/5
        "
      />

      <div className="site-container">

        {/* Main footer content */}

        <div
          className="
            grid gap-x-10 gap-y-12
            py-14 md:grid-cols-2
            md:py-16
            xl:grid-cols-[1.35fr_1fr_0.85fr_1.15fr]
          "
        >

          {/* Column 1 — Professional identity */}

          <div>
            <Link
              href={homePath}
              className="group inline-flex items-center gap-3"
            >
              <div
                className="
                  flex h-12 w-12
                  shrink-0 items-center
                  justify-center rounded-xl
                  border border-primary/25
                  bg-primary/10
                  text-base font-bold
                  tracking-tight
                  text-primary-light
                  transition-colors
                  group-hover:bg-primary/20
                "
              >
                EM
              </div>

              <div>
                <p
                  className="
                    text-lg font-semibold
                    tracking-tight text-foreground
                  "
                >
                  Eddy Mouity
                </p>

                <p className="mt-1 text-xs leading-5 text-text-muted">
                  {copy.role}
                </p>
              </div>
            </Link>

            <p className="mt-6 max-w-sm text-sm leading-7 text-text-secondary">
              {copy.description}
            </p>

            {/* Location and languages */}

            <div className="mt-6 space-y-3">
              <div className="flex items-center gap-3 text-xs text-text-muted">
                <MapPin
                  size={16}
                  className="shrink-0 text-primary-light"
                />

                {copy.location}
              </div>

              <div className="flex items-center gap-3 text-xs text-text-muted">
                <Globe2
                  size={16}
                  className="shrink-0 text-primary-light"
                />

                {copy.languages}
              </div>
            </div>

            {/* Social profiles */}

            <div className="mt-7 flex flex-wrap gap-3">
              <a
                href="https://github.com/joss12"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className={socialLinkClass}
              >
                <Github size={19} strokeWidth={1.8} />
              </a>

              <a
                href="https://www.linkedin.com/in/eddymouity"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className={socialLinkClass}
              >
                <Linkedin size={19} strokeWidth={1.8} />
              </a>

              <Link
                href={contactPath}
                aria-label={copy.contactTitle}
                className={socialLinkClass}
              >
                <Mail size={19} strokeWidth={1.8} />
              </Link>
            </div>
          </div>

          {/* Column 2 — Commercial services */}

          <nav aria-label={copy.servicesTitle}>
            <h2 className="text-sm font-semibold tracking-tight text-foreground">
              {copy.servicesTitle}
            </h2>

            <ul className="mt-6 space-y-3.5">
              {copy.services.map((service) => (
                <li key={service.id}>
                  <Link
                    href={{
                      pathname: contactPath,
                      query: {
                        service: service.id,
                      },
                    }}
                    className={`group ${footerLinkClass}`}
                  >
                    <span>{service.label}</span>

                    <ArrowUpRight
                      size={13}
                      className="
                        shrink-0 opacity-0
                        transition-all
                        group-hover:opacity-100
                        group-focus-visible:opacity-100
                      "
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Column 3 — Website navigation */}

          <nav aria-label={copy.exploreTitle}>
            <h2 className="text-sm font-semibold tracking-tight text-foreground">
              {copy.exploreTitle}
            </h2>

            <ul className="mt-6 space-y-3.5">
              {copy.navigation.map((item) => (
                <li key={item.path}>
                  <Link
                    href={`${homePath}${item.path}`}
                    className={footerLinkClass}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Column 4 — Commercial conversion */}

          <div>
            <h2 className="text-sm font-semibold tracking-tight text-foreground">
              {copy.contactTitle}
            </h2>

            <p className="mt-6 text-sm leading-7 text-text-secondary">
              {copy.contactDescription}
            </p>

            <div className="mt-6 flex flex-col gap-3">
              <Link
                href={contactPath}
                className="btn-primary w-full justify-between"
              >
                {copy.startProject}

                <ArrowUpRight size={17} />
              </Link>

              <Link
                href={{
                  pathname: contactPath,
                  query: {
                    service: 'employment',
                  },
                }}
                className="
                  inline-flex min-h-11
                  items-center justify-between
                  gap-3 rounded-lg
                  border border-border
                  bg-surface px-4 py-3
                  text-xs font-medium
                  text-text-secondary
                  transition-colors
                  hover:border-primary/30
                  hover:bg-surface-hover
                  hover:text-foreground
                "
              >
                <span className="inline-flex items-center gap-2.5">
                  <BriefcaseBusiness
                    size={16}
                    className="shrink-0 text-primary-light"
                  />

                  {copy.employment}
                </span>

                <ArrowRight
                  size={15}
                  className="shrink-0"
                />
              </Link>

              <div className="mt-1">
                <DocumentPicker label={copy.resume} />
              </div>
            </div>
          </div>
        </div>

        {/* Footer bottom bar */}

        <div
          className="
            flex flex-col
            items-start justify-between
            gap-5 border-t border-border
            py-7 lg:flex-row lg:items-center
          "
        >

          {/* Copyright */}

          <p className="text-xs leading-6 text-text-muted">
            © {currentYear} Eddy Mouity.

            <span className="ml-1">
              {copy.copyright}
            </span>
          </p>

          {/* Technology credits */}

          <div className="flex flex-wrap items-center gap-2 text-xs text-text-muted">
            <span>{copy.builtWith}</span>

            <span className="font-medium text-text-secondary">
              Next.js
            </span>

            <span className="text-border-hover">
              ·
            </span>

            <span className="font-medium text-text-secondary">
              TypeScript
            </span>

            <span className="text-border-hover">
              ·
            </span>

            <span className="font-medium text-text-secondary">
              Tailwind CSS
            </span>
          </div>

          {/* Availability */}

          <div
            className="
              inline-flex items-center
              gap-2.5 rounded-full
              border border-success/20
              bg-success/5
              px-3.5 py-2
              text-[11px] font-medium
              text-success
            "
          >
            <span className="status-dot" />

            {copy.availability}
          </div>
        </div>
      </div>
    </footer>
  );
}
