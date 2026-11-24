'use client';

import Link from 'next/link';
import Image from 'next/image';

import { useLocale, useTranslations } from 'next-intl';

import {
  ArrowRight,
  ArrowUpRight,
  MapPin,
  Github,
  Globe2,
  Server,
  Layers3,
  Database,
} from 'lucide-react';

import { projects } from '@/lib/projects';

import AnimatedSkills from '@/components/ui/AnimatedSkills';
import AnimatedProjects from '@/components/ui/AnimatedProjects';
import OtherProjects from '@/components/ui/OtherProjects';
import Services from '@/components/ui/Services';

const content = {
  en: {
    availability: 'Available for new opportunities',
    role: 'Independent Software Developer',

    headline: 'Building software',
    headlineAccent: 'that makes a difference.',

    description:
      'I design and develop reliable web applications, scalable backend systems and digital solutions for businesses, startups and ambitious ideas.',

    primaryAction: 'Start a Project',
    secondaryAction: 'Explore My Work',

    location: 'Based in South Korea',
    profileRole: 'Software Developer',
    expertiseLabel: 'Core expertise',

    capabilities: {
      frontend: 'Web Applications',
      backend: 'Backend & APIs',
      architecture: 'Software Architecture',
      database: 'Database Systems',
    },

    projectsLabel: 'Portfolio',
    projectsTitle: 'Selected projects',

    projectsDescription:
      'A collection of applications and software systems built to solve practical problems and explore modern technologies.',

    engineeringLabel: 'Research & Development',
    engineeringTitle: 'Engineering Lab',

    engineeringDescription:
      'Exploring programming languages, networking, distributed systems and the fundamentals of software engineering.',

    skillsLabel: 'Technology',
    skillsTitle: 'Technical expertise',

    skillsDescription:
      'Modern technologies and engineering practices for building reliable, maintainable and scalable software.',

    aboutLabel: 'Introduction',
    aboutTitle: 'Behind the code',
    aboutAction: 'More about me',

    contactTitle: 'Have something in mind?',

    contactDescription:
      'Whether you need a new application, a reliable backend or help improving an existing system, I would be happy to discuss your project.',

    contactAction: "Let's Talk",
  },

  ko: {
    availability: '새로운 프로젝트 및 채용 기회 환영',
    role: '독립 소프트웨어 개발자',

    headline: '가치를 만드는',
    headlineAccent: '소프트웨어를 개발합니다.',

    description:
      '기업과 스타트업을 위한 안정적인 웹 애플리케이션, 확장 가능한 백엔드 시스템 및 디지털 솔루션을 설계하고 개발합니다.',

    primaryAction: '프로젝트 문의',
    secondaryAction: '프로젝트 보기',

    location: '대한민국 거주',
    profileRole: '소프트웨어 개발자',
    expertiseLabel: '핵심 전문 분야',

    capabilities: {
      frontend: '웹 애플리케이션',
      backend: '백엔드 및 API',
      architecture: '소프트웨어 아키텍처',
      database: '데이터베이스 시스템',
    },

    projectsLabel: '포트폴리오',
    projectsTitle: '주요 프로젝트',

    projectsDescription:
      '실제 문제를 해결하고 현대적인 기술을 탐구하기 위해 개발한 애플리케이션과 소프트웨어 시스템입니다.',

    engineeringLabel: '연구 및 개발',
    engineeringTitle: '기술 연구',

    engineeringDescription:
      '프로그래밍 언어, 네트워크, 분산 시스템 및 소프트웨어 엔지니어링의 핵심 기술을 탐구합니다.',

    skillsLabel: '기술',
    skillsTitle: '기술 전문성',

    skillsDescription:
      '안정적이고 유지보수가 쉬우며 확장 가능한 소프트웨어를 개발하기 위한 현대적인 기술과 개발 방법론입니다.',

    aboutLabel: '자기소개',
    aboutTitle: '개발자 소개',
    aboutAction: '더 알아보기',

    contactTitle: '함께 만들고 싶은 프로젝트가 있나요?',

    contactDescription:
      '새로운 애플리케이션 개발, 백엔드 구축 또는 기존 시스템 개선이 필요하다면 언제든지 문의해 주세요.',

    contactAction: '문의하기',
  },

  fr: {
    availability: 'Disponible pour de nouvelles opportunités',
    role: 'Développeur logiciel indépendant',

    headline: 'Créer des logiciels',
    headlineAccent: 'qui font la différence.',

    description:
      'Je conçois et développe des applications web fiables, des systèmes backend évolutifs et des solutions numériques pour les entreprises, les startups et les projets ambitieux.',

    primaryAction: 'Démarrer un projet',
    secondaryAction: 'Découvrir mes projets',

    location: 'Basé en Corée du Sud',
    profileRole: 'Développeur logiciel',
    expertiseLabel: 'Domaines d’expertise',

    capabilities: {
      frontend: 'Applications web',
      backend: 'Backend et API',
      architecture: 'Architecture logicielle',
      database: 'Bases de données',
    },

    projectsLabel: 'Portfolio',
    projectsTitle: 'Projets sélectionnés',

    projectsDescription:
      'Une sélection d’applications et de systèmes logiciels conçus pour résoudre des problèmes concrets et explorer les technologies modernes.',

    engineeringLabel: 'Recherche et développement',
    engineeringTitle: 'Laboratoire technique',

    engineeringDescription:
      'Exploration des langages de programmation, des réseaux, des systèmes distribués et des fondamentaux du génie logiciel.',

    skillsLabel: 'Technologies',
    skillsTitle: 'Expertise technique',

    skillsDescription:
      'Des technologies modernes et des pratiques d’ingénierie pour créer des logiciels fiables, maintenables et évolutifs.',

    aboutLabel: 'Présentation',
    aboutTitle: 'Derrière le code',
    aboutAction: 'En savoir plus',

    contactTitle: 'Vous avez un projet en tête ?',

    contactDescription:
      'Que vous ayez besoin d’une nouvelle application, d’un backend fiable ou d’améliorer un système existant, je serais ravi de discuter de votre projet.',

    contactAction: 'Discutons ensemble',
  },
} as const;

type SupportedLocale = keyof typeof content;

const technologies = [
  'Node.js',
  'TypeScript',
  'Go',
  'Java',
  'Spring Boot',
  'React',
  'Next.js',
  'PostgreSQL',
];

export default function Home() {
  const locale = useLocale();
  const t = useTranslations();

  const copy =
    content[locale as SupportedLocale] ?? content.en;

  const homePath = `/${locale}`;

  const capabilities = [
    {
      icon: Globe2,
      title: copy.capabilities.frontend,
    },
    {
      icon: Server,
      title: copy.capabilities.backend,
    },
    {
      icon: Layers3,
      title: copy.capabilities.architecture,
    },
    {
      icon: Database,
      title: copy.capabilities.database,
    },
  ];

  return (
    <main>
      {/* Hero */}

      <section
        id="home"
        className="relative isolate overflow-hidden"
      >
        <div
          aria-hidden="true"
          className="
            pointer-events-none absolute inset-0
            -z-10 overflow-hidden
          "
        >
          <div
            className="
              absolute -right-40 -top-40
              h-[600px] w-[600px]
              rounded-full bg-blue-600/10
              blur-[150px]
            "
          />

          <div
            className="
              absolute -bottom-40 -left-40
              h-[400px] w-[400px]
              rounded-full bg-cyan-500/5
              blur-[120px]
            "
          />

          <div
            className="absolute inset-0 opacity-[0.025]"
            style={{
              backgroundImage: `
                linear-gradient(
                  to right,
                  #94a3b8 1px,
                  transparent 1px
                ),
                linear-gradient(
                  to bottom,
                  #94a3b8 1px,
                  transparent 1px
                )
              `,
              backgroundSize: '64px 64px',
            }}
          />
        </div>

        <div
          className="
            site-container
            grid items-center gap-16
            py-20 md:py-28
            lg:min-h-[680px]
            lg:grid-cols-[1.35fr_0.65fr]
            lg:gap-20
          "
        >
          {/* Introduction */}

          <div className="min-w-0">
            <div
              className="
                mb-8 inline-flex items-center gap-2.5
                rounded-full border border-success/20
                bg-success/5 px-3.5 py-2
                text-xs font-medium text-success
              "
            >
              <span className="status-dot" />

              {copy.availability}
            </div>

            <p
              className="
                mb-5 text-sm font-semibold
                tracking-wide text-primary-light
                md:text-base
              "
            >
              {copy.role}
            </p>

            <h1
              className="
                max-w-3xl
                text-[clamp(2.8rem,5.5vw,5rem)]
                font-bold leading-[1.08]
                tracking-[-0.055em]
                text-foreground
              "
            >
              {copy.headline}

              <span
                className="
                  mt-2 block
                  bg-gradient-to-r
                  from-blue-400 via-sky-400
                  to-cyan-300
                  bg-clip-text text-transparent
                "
              >
                {copy.headlineAccent}
              </span>
            </h1>

            <p
              className="
                mt-7 max-w-xl
                text-base leading-relaxed
                text-text-secondary
                md:text-lg md:leading-8
              "
            >
              {copy.description}
            </p>

            <div
              className="
                mt-9 flex flex-wrap
                items-center gap-3
              "
            >
              <Link
                href={`${homePath}/contact`}
                className="btn-primary"
              >
                {copy.primaryAction}

                <ArrowUpRight size={18} />
              </Link>

              <Link
                href="#projects"
                className="btn-secondary"
              >
                {copy.secondaryAction}

                <ArrowRight size={17} />
              </Link>
            </div>

            <div
              className="
                mt-8 flex flex-wrap
                items-center gap-x-6 gap-y-3
                text-sm text-text-muted
              "
            >
              <span className="inline-flex items-center gap-2">
                <MapPin size={15} />

                {copy.location}
              </span>

              <a
                href="https://github.com/joss12"
                target="_blank"
                rel="noopener noreferrer"
                className="
                  inline-flex items-center gap-2
                  transition-colors
                  hover:text-foreground
                "
              >
                <Github size={16} />

                GitHub

                <ArrowUpRight size={12} />
              </a>
            </div>
          </div>

          {/* Profile */}

          <div
            className="
              relative mx-auto
              w-full max-w-[360px]
              lg:ml-auto lg:mr-0
            "
          >
            <div
              aria-hidden="true"
              className="
                absolute -inset-5
                rounded-[40px]
                bg-primary/10 blur-3xl
              "
            />

            <div
              className="
                relative overflow-hidden
                rounded-3xl border border-border
                bg-surface p-3
                shadow-2xl shadow-black/30
              "
            >
              <div
                className="
                  relative aspect-[4/5]
                  overflow-hidden rounded-2xl
                  bg-background-secondary
                "
              >
                <Image
                  src="/photo/photo_final.jpeg"
                  alt="Eddy Mouity"
                  fill
                  priority
                  quality={90}
                  sizes="(max-width: 768px) 90vw, 360px"
                  className="object-cover object-top"
                />

                <div
                  aria-hidden="true"
                  className="
                    absolute inset-0
                    bg-gradient-to-t
                    from-background/80
                    via-transparent
                    to-transparent
                  "
                />

                <div className="absolute inset-x-0 bottom-0 p-6">
                  <p
                    className="
                      text-2xl font-semibold
                      tracking-tight text-white
                    "
                  >
                    Eddy Mouity
                  </p>

                  <p className="mt-1 text-sm text-slate-300">
                    {copy.profileRole}
                  </p>
                </div>
              </div>

              <div className="px-3 pb-3 pt-5">
                <p
                  className="
                    mb-3 text-[10px]
                    font-semibold uppercase
                    tracking-[0.16em]
                    text-text-muted
                  "
                >
                  {copy.expertiseLabel}
                </p>

                <div className="flex flex-wrap gap-2">
                  {technologies.map((technology) => (
                    <span
                      key={technology}
                      className="
                        rounded-md border border-border
                        bg-background-secondary
                        px-2.5 py-1.5
                        text-[11px] font-medium
                        text-text-secondary
                      "
                    >
                      {technology}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Expertise strip */}

      <section
        aria-label={copy.expertiseLabel}
        className="
          border-y border-border
          bg-background-secondary/60
        "
      >
        <div
          className="
            site-container grid grid-cols-2
            gap-3 py-5
            lg:grid-cols-4
            lg:gap-6 lg:py-7
          "
        >
          {capabilities.map((capability) => {
            const Icon = capability.icon;

            return (
              <div
                key={capability.title}
                className="
                  flex min-w-0 items-center
                  gap-3 rounded-xl p-3
                  md:gap-4 md:p-4
                "
              >
                <div
                  className="
                    flex h-11 w-11 shrink-0
                    items-center justify-center
                    rounded-xl
                    border border-primary/15
                    bg-primary/10
                    text-primary-light
                  "
                >
                  <Icon
                    size={21}
                    strokeWidth={1.7}
                  />
                </div>

                <span
                  className="
                    text-xs font-medium
                    leading-relaxed
                    text-text-secondary
                    md:text-sm
                  "
                >
                  {capability.title}
                </span>
              </div>
            );
          })}
        </div>
      </section>

      {/* Services */}

      <Services />

      {/* Selected projects */}

      <section
        id="projects"
        className="section-spacing section-divider"
      >
        <div className="site-container">
          <div className="mb-12">
            <span className="section-label">
              {copy.projectsLabel}
            </span>

            <h2 className="section-title mt-4">
              {copy.projectsTitle}
            </h2>

            <p className="section-description mt-4">
              {copy.projectsDescription}
            </p>
          </div>

          <AnimatedProjects projects={projects} />
        </div>
      </section>

      {/* Engineering Lab */}

      <section
        id="engineering"
        className="
          section-spacing section-divider
          bg-background-secondary/40
        "
      >
        <div className="site-container">
          <div className="mb-12">
            <span className="section-label">
              {copy.engineeringLabel}
            </span>

            <h2 className="section-title mt-4">
              {copy.engineeringTitle}
            </h2>

            <p className="section-description mt-4">
              {copy.engineeringDescription}
            </p>
          </div>

          <OtherProjects />
        </div>
      </section>

      {/* Technical expertise */}

      <section
        id="skills"
        className="section-spacing section-divider"
      >
        <div className="site-container">
          <div className="mb-12">
            <span className="section-label">
              {copy.skillsLabel}
            </span>

            <h2 className="section-title mt-4">
              {copy.skillsTitle}
            </h2>

            <p className="section-description mt-4">
              {copy.skillsDescription}
            </p>
          </div>

          <AnimatedSkills />
        </div>
      </section>

      {/* About */}

      <section
        id="about"
        className="
          section-spacing section-divider
          bg-background-secondary/40
        "
      >
        <div
          className="
            site-container grid gap-10
            lg:grid-cols-[0.8fr_1.2fr]
            lg:gap-20
          "
        >
          <div>
            <span className="section-label">
              {copy.aboutLabel}
            </span>

            <h2 className="section-title mt-4">
              {copy.aboutTitle}
            </h2>
          </div>

          <div
            className="
              space-y-5 text-base
              leading-8 text-text-secondary
            "
          >
            <p>{t('about.p1')}</p>

            <p>{t('about.p2')}</p>

            <p>{t('about.p3')}</p>

            <Link
              href={`${homePath}/about`}
              className="
                mt-3 inline-flex items-center
                gap-2 text-sm font-semibold
                text-primary-light
                hover:text-foreground
              "
            >
              {copy.aboutAction}

              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* Contact CTA */}

      <section
        id="contact"
        className="section-spacing section-divider"
      >
        <div className="site-container">
          <div
            className="
              relative isolate overflow-hidden
              rounded-3xl border border-border
              bg-surface px-6 py-14
              text-center
              md:px-16 md:py-20
            "
          >
            <div
              aria-hidden="true"
              className="
                absolute -top-48 left-1/2
                -z-10 h-[400px] w-[600px]
                -translate-x-1/2 rounded-full
                bg-primary/15 blur-[120px]
              "
            />

            <h2
              className="
                mx-auto max-w-3xl
                text-3xl font-bold
                tracking-tight text-foreground
                md:text-5xl
              "
            >
              {copy.contactTitle}
            </h2>

            <p
              className="
                mx-auto mt-6 max-w-xl
                text-base leading-7
                text-text-secondary
              "
            >
              {copy.contactDescription}
            </p>

            <div className="mt-9">
              <Link
                href={`${homePath}/contact`}
                className="btn-primary"
              >
                {copy.contactAction}

                <ArrowUpRight size={18} />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
