import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { getTranslations } from 'next-intl/server';

import {
  ArrowUpRight,
  ArrowRight,
  ArrowLeft,
  Github,
  MapPin,
  Globe2,
  Server,
  Database,
  Layers3,
  ShieldCheck,
  Code2,
  Workflow,
  Gauge,
  BriefcaseBusiness,
  GraduationCap,
  Terminal,
} from 'lucide-react';

import AnimatedSkills from '@/components/ui/AnimatedSkills';
import DocumentPicker from '@/components/ui/DocumentPicker';

const content = {
  en: {
    back: 'Back to home',
    eyebrow: 'About me',
    name: 'Eddy Mouity',
    role: 'Independent Software Developer',
    headline: 'Engineering software.',
    headlineAccent: 'Creating business value.',

    introduction:
      'I design and develop reliable software solutions that help businesses simplify operations, improve digital experiences and turn ideas into functional products.',

    availability: 'Available for new opportunities',
    location: 'Based in South Korea',
    languages: 'English · Korean · French',
    contact: 'Discuss your project',
    projects: 'Explore my work',

    biographyLabel: 'My background',
    biographyTitle: 'A developer with an engineering mindset.',

    valueLabel: 'Business value',
    valueTitle: 'What I bring to your business',

    valueDescription:
      'I approach software development as a combination of technical engineering, problem-solving and understanding business requirements.',

    values: [
      {
        title: 'Reliable backend systems',
        description:
          'Structured backend applications, secure APIs and maintainable business logic designed around real requirements.',
      },
      {
        title: 'Complete web applications',
        description:
          'Responsive interfaces connected to reliable backend services, from initial development to deployment.',
      },
      {
        title: 'Data-driven applications',
        description:
          'Well-designed databases and efficient data management for business applications and internal platforms.',
      },
      {
        title: 'Long-term maintainability',
        description:
          'Clear architecture, readable code and technical decisions that make applications easier to maintain and extend.',
      },
    ],

    principlesLabel: 'Engineering philosophy',
    principlesTitle: 'How I approach software development',

    principlesDescription:
      'Good software should solve the right problem without introducing unnecessary complexity.',

    principles: [
      {
        number: '01',
        title: 'Understand before building',
        description:
          'Identify the business problem, understand the requirements and establish a clear development direction before writing code.',
      },
      {
        number: '02',
        title: 'Keep architecture practical',
        description:
          'Choose technologies and architectural patterns according to the needs of the project rather than following trends.',
      },
      {
        number: '03',
        title: 'Build with reliability in mind',
        description:
          'Consider security, validation, error handling and maintainability throughout the development process.',
      },
      {
        number: '04',
        title: 'Improve continuously',
        description:
          'Evaluate technical decisions, learn from implementation challenges and improve the software through iteration.',
      },
    ],

    timelineLabel: 'Technical journey',
    timelineTitle: 'Continuous learning through building',

    timelineDescription:
      'My technical journey combines practical application development with an interest in understanding how software systems work internally.',

    timeline: [
      {
        period: '2025 — Present',
        title: 'API Design & Systems Engineering',
        description:
          'Building software projects from scratch, including DNS resolvers, distributed caches, language interpreters, API engines and URL shorteners.',
        tags: [
          'Go',
          'API Design',
          'Distributed Systems',
          'Networking',
        ],
      },
      {
        period: '2024',
        title: 'Go & Systems Programming',
        description:
          'Exploring Go internals, memory management, escape analysis, concurrency patterns, interfaces and benchmarking.',
        tags: [
          'Go',
          'Concurrency',
          'Memory Management',
          'Performance',
        ],
      },
      {
        period: '2023',
        title: 'JavaScript, TypeScript & Backend Development',
        description:
          'Exploring Node.js internals, API design, rate limiting, WebSocket communication, CLI tooling and continuous integration.',
        tags: [
          'Node.js',
          'TypeScript',
          'Express.js',
          'GitHub Actions',
        ],
      },
      {
        period: 'Earlier',
        title: 'Technical Foundations',
        description:
          'Developing foundations in programming, Docker, relational and non-relational databases, HTTP and performance profiling.',
        tags: [
          'Programming',
          'Docker',
          'SQL',
          'HTTP',
        ],
      },
    ],

    skillsLabel: 'Technical expertise',
    skillsTitle: 'Technologies I work with',

    skillsDescription:
      'A practical technology stack for developing web applications, backend services and software systems.',

    ctaLabel: 'Work with me',
    ctaTitle: 'Have something you want to build?',

    ctaDescription:
      'Whether you need a custom application, backend system, technical collaboration or a software developer for your team, I would be happy to discuss your requirements.',

    clientTitle: 'For businesses and startups',

    clientDescription:
      'Discuss your project requirements, technical challenges and development goals.',

    clientAction: 'Start a project',

    recruiterTitle: 'For recruiters and engineering teams',

    recruiterDescription:
      'Explore my technical background, résumé and potential professional opportunities.',

    recruiterAction: 'Discuss an opportunity',
    github: 'View GitHub profile',
  },

  ko: {
    back: '홈으로 돌아가기',
    eyebrow: '개발자 소개',
    name: 'Eddy Mouity',
    role: '독립 소프트웨어 개발자',
    headline: '소프트웨어를 설계하고',
    headlineAccent: '비즈니스 가치를 만듭니다.',

    introduction:
      '기업의 업무 효율성을 높이고 디지털 경험을 개선하며 아이디어를 실제 제품으로 구현할 수 있도록 안정적인 소프트웨어 솔루션을 설계하고 개발합니다.',

    availability: '새로운 프로젝트 및 채용 기회 환영',
    location: '대한민국 거주',
    languages: '영어 · 한국어 · 프랑스어',
    contact: '프로젝트 상담하기',
    projects: '프로젝트 보기',

    biographyLabel: '개발자 소개',
    biographyTitle: '엔지니어링 사고방식을 가진 개발자',

    valueLabel: '비즈니스 가치',
    valueTitle: '비즈니스에 제공하는 가치',

    valueDescription:
      '기술적인 엔지니어링 역량과 문제 해결 능력, 비즈니스 요구사항에 대한 이해를 바탕으로 소프트웨어를 개발합니다.',

    values: [
      {
        title: '안정적인 백엔드 시스템',
        description:
          '실제 요구사항을 기반으로 구조화된 백엔드 애플리케이션, 안전한 API 및 유지보수하기 쉬운 비즈니스 로직을 개발합니다.',
      },
      {
        title: '완성도 높은 웹 애플리케이션',
        description:
          '반응형 사용자 인터페이스와 안정적인 백엔드 서비스를 연결하여 개발부터 배포까지 지원합니다.',
      },
      {
        title: '데이터 기반 애플리케이션',
        description:
          '비즈니스 애플리케이션과 내부 관리 플랫폼을 위한 효율적인 데이터 관리 및 데이터베이스 설계를 제공합니다.',
      },
      {
        title: '장기적인 유지보수성',
        description:
          '명확한 아키텍처와 읽기 쉬운 코드를 통해 유지보수 및 기능 확장이 용이한 애플리케이션을 개발합니다.',
      },
    ],

    principlesLabel: '개발 철학',
    principlesTitle: '소프트웨어 개발 접근 방식',

    principlesDescription:
      '좋은 소프트웨어는 불필요한 복잡성을 줄이고 실제 문제를 효과적으로 해결해야 합니다.',

    principles: [
      {
        number: '01',
        title: '개발 전 충분한 이해',
        description:
          '코드를 작성하기 전에 비즈니스 문제와 요구사항을 파악하고 명확한 개발 방향을 설정합니다.',
      },
      {
        number: '02',
        title: '실용적인 아키텍처',
        description:
          '기술 트렌드보다 프로젝트의 실제 요구사항에 적합한 기술과 아키텍처를 선택합니다.',
      },
      {
        number: '03',
        title: '안정성을 고려한 개발',
        description:
          '개발 과정 전반에서 보안, 데이터 검증, 오류 처리 및 유지보수성을 고려합니다.',
      },
      {
        number: '04',
        title: '지속적인 개선',
        description:
          '기술적 결정을 검토하고 개발 과정에서 발생하는 문제를 통해 학습하며 소프트웨어를 개선합니다.',
      },
    ],

    timelineLabel: '기술 성장 과정',
    timelineTitle: '프로젝트를 통한 지속적인 성장',

    timelineDescription:
      '실제 애플리케이션 개발과 소프트웨어 시스템의 내부 동작 원리에 대한 학습을 함께 진행해 왔습니다.',

    timeline: [
      {
        period: '2025 — 현재',
        title: 'API 설계 및 시스템 엔지니어링',
        description:
          'DNS 리졸버, 분산 캐시, 프로그래밍 언어 인터프리터, API 엔진 및 URL 단축 서비스 등을 직접 개발했습니다.',
        tags: [
          'Go',
          'API Design',
          'Distributed Systems',
          'Networking',
        ],
      },
      {
        period: '2024',
        title: 'Go 및 시스템 프로그래밍',
        description:
          'Go 내부 구조, 메모리 관리, 이스케이프 분석, 동시성 패턴, 인터페이스 및 벤치마킹을 학습했습니다.',
        tags: [
          'Go',
          'Concurrency',
          'Memory Management',
          'Performance',
        ],
      },
      {
        period: '2023',
        title: 'JavaScript, TypeScript 및 백엔드 개발',
        description:
          'Node.js 내부 구조, API 설계, 요청 제한, WebSocket 통신, CLI 도구 및 지속적 통합을 학습했습니다.',
        tags: [
          'Node.js',
          'TypeScript',
          'Express.js',
          'GitHub Actions',
        ],
      },
      {
        period: '이전',
        title: '기술 기초 역량',
        description:
          '프로그래밍, Docker, 관계형 및 비관계형 데이터베이스, HTTP와 성능 분석에 대한 기초 역량을 쌓았습니다.',
        tags: [
          'Programming',
          'Docker',
          'SQL',
          'HTTP',
        ],
      },
    ],

    skillsLabel: '기술 역량',
    skillsTitle: '사용하는 기술 스택',

    skillsDescription:
      '웹 애플리케이션, 백엔드 서비스 및 소프트웨어 시스템 개발에 활용하는 실용적인 기술 스택입니다.',

    ctaLabel: '협업 및 프로젝트',
    ctaTitle: '만들고 싶은 프로젝트가 있으신가요?',

    ctaDescription:
      '맞춤형 애플리케이션, 백엔드 시스템, 기술 협업 또는 개발자 채용에 대해 언제든지 문의해 주세요.',

    clientTitle: '기업 및 스타트업',

    clientDescription:
      '프로젝트 요구사항, 기술적 문제 및 개발 목표에 대해 함께 논의합니다.',

    clientAction: '프로젝트 문의하기',

    recruiterTitle: '채용 담당자 및 개발팀',

    recruiterDescription:
      '기술 역량, 이력서 및 새로운 채용 기회에 대해 확인하고 논의할 수 있습니다.',

    recruiterAction: '채용 및 협업 제안',
    github: 'GitHub 프로필 보기',
  },

  fr: {
    back: 'Retour à l’accueil',
    eyebrow: 'À propos',
    name: 'Eddy Mouity',
    role: 'Développeur logiciel indépendant',
    headline: 'Concevoir des logiciels.',
    headlineAccent: 'Créer de la valeur.',

    introduction:
      'Je conçois et développe des solutions logicielles fiables pour aider les entreprises à simplifier leurs opérations, améliorer leurs expériences numériques et transformer leurs idées en produits fonctionnels.',

    availability: 'Disponible pour de nouvelles opportunités',
    location: 'Basé en Corée du Sud',
    languages: 'Anglais · Coréen · Français',
    contact: 'Discuter de votre projet',
    projects: 'Découvrir mes projets',

    biographyLabel: 'Mon parcours',
    biographyTitle:
      'Un développeur avec une approche d’ingénierie.',

    valueLabel: 'Valeur ajoutée',
    valueTitle: 'Ce que j’apporte à votre entreprise',

    valueDescription:
      'Mon approche du développement logiciel associe ingénierie technique, résolution de problèmes et compréhension des besoins métiers.',

    values: [
      {
        title: 'Systèmes backend fiables',
        description:
          'Des applications backend structurées, des API sécurisées et une logique métier maintenable adaptée aux besoins réels.',
      },
      {
        title: 'Applications web complètes',
        description:
          'Des interfaces responsives connectées à des services backend fiables, du développement initial au déploiement.',
      },
      {
        title: 'Applications orientées données',
        description:
          'Une conception efficace des bases de données et une gestion structurée des informations pour les applications métiers.',
      },
      {
        title: 'Maintenabilité à long terme',
        description:
          'Une architecture claire, un code lisible et des décisions techniques facilitant la maintenance et l’évolution des applications.',
      },
    ],

    principlesLabel: 'Philosophie de développement',
    principlesTitle: 'Mon approche du développement logiciel',

    principlesDescription:
      'Un bon logiciel doit résoudre le bon problème sans introduire de complexité inutile.',

    principles: [
      {
        number: '01',
        title: 'Comprendre avant de développer',
        description:
          'Identifier le problème métier, comprendre les besoins et définir une direction claire avant d’écrire du code.',
      },
      {
        number: '02',
        title: 'Privilégier une architecture pratique',
        description:
          'Choisir les technologies et les architectures en fonction des besoins du projet plutôt que des tendances.',
      },
      {
        number: '03',
        title: 'Développer avec fiabilité',
        description:
          'Prendre en compte la sécurité, la validation, la gestion des erreurs et la maintenabilité tout au long du développement.',
      },
      {
        number: '04',
        title: 'S’améliorer continuellement',
        description:
          'Évaluer les décisions techniques, apprendre des difficultés rencontrées et améliorer progressivement les logiciels.',
      },
    ],

    timelineLabel: 'Parcours technique',
    timelineTitle: 'Apprendre continuellement en construisant',

    timelineDescription:
      'Mon parcours associe le développement d’applications concrètes à une volonté de comprendre le fonctionnement interne des systèmes logiciels.',

    timeline: [
      {
        period: '2025 — Aujourd’hui',
        title: 'Conception d’API et ingénierie système',
        description:
          'Développement de projets logiciels, notamment des résolveurs DNS, caches distribués, interpréteurs de langages, moteurs API et raccourcisseurs d’URL.',
        tags: [
          'Go',
          'API Design',
          'Distributed Systems',
          'Networking',
        ],
      },
      {
        period: '2024',
        title: 'Go et programmation système',
        description:
          'Exploration du fonctionnement interne de Go, de la gestion mémoire, de l’analyse d’échappement, de la concurrence et des benchmarks.',
        tags: [
          'Go',
          'Concurrency',
          'Memory Management',
          'Performance',
        ],
      },
      {
        period: '2023',
        title: 'JavaScript, TypeScript et développement backend',
        description:
          'Exploration de Node.js, de la conception d’API, de la limitation de requêtes, des WebSockets, des outils CLI et de l’intégration continue.',
        tags: [
          'Node.js',
          'TypeScript',
          'Express.js',
          'GitHub Actions',
        ],
      },
      {
        period: 'Auparavant',
        title: 'Fondamentaux techniques',
        description:
          'Acquisition des fondamentaux en programmation, Docker, bases de données relationnelles et non relationnelles, HTTP et analyse des performances.',
        tags: [
          'Programming',
          'Docker',
          'SQL',
          'HTTP',
        ],
      },
    ],

    skillsLabel: 'Expertise technique',
    skillsTitle: 'Les technologies que j’utilise',

    skillsDescription:
      'Un ensemble de technologies adaptées au développement d’applications web, de services backend et de systèmes logiciels.',

    ctaLabel: 'Travaillons ensemble',
    ctaTitle: 'Vous avez un projet à réaliser ?',

    ctaDescription:
      'Que vous recherchiez une application sur mesure, un système backend, une collaboration technique ou un développeur pour votre équipe, je serais ravi d’échanger avec vous.',

    clientTitle: 'Pour les entreprises et startups',

    clientDescription:
      'Discutons de vos besoins, de vos défis techniques et de vos objectifs de développement.',

    clientAction: 'Démarrer un projet',

    recruiterTitle: 'Pour les recruteurs et équipes techniques',

    recruiterDescription:
      'Découvrez mon parcours technique, mon CV et les possibilités de collaboration professionnelle.',

    recruiterAction: 'Discuter d’une opportunité',
    github: 'Voir mon profil GitHub',
  },
} as const;

type SupportedLocale = keyof typeof content;

type AboutPageProps = {
  params: Promise<{
    locale: string;
  }>;
};

const valueIcons = [
  Server,
  Globe2,
  Database,
  Layers3,
];

const principleIcons = [
  Workflow,
  Code2,
  ShieldCheck,
  Gauge,
];

const timelineIcons = [
  Server,
  Terminal,
  Code2,
  GraduationCap,
];

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

function getLocale(locale: string): SupportedLocale {
  if (locale === 'ko' || locale === 'fr') {
    return locale;
  }

  return 'en';
}

export async function generateMetadata({
  params,
}: AboutPageProps): Promise<Metadata> {
  const { locale } = await params;
  const copy = content[getLocale(locale)];
  const title = `${copy.name} | ${copy.role}`;

  return {
    title,
    description: copy.introduction,

    openGraph: {
      title,
      description: copy.introduction,
      type: 'profile',
    },
  };
}

export default async function AboutPage({
  params,
}: AboutPageProps) {
  const { locale } = await params;

  const language = getLocale(locale);
  const copy = content[language];

  const t = await getTranslations('about');

  const homePath = `/${locale}`;
  const contactPath = `${homePath}/contact`;

  return (
    <main className="overflow-hidden">

      {/* ========================================
          PROFESSIONAL HERO
      ======================================== */}

      <section className="relative isolate">

        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-48 -top-48 -z-10 h-[700px] w-[700px] rounded-full bg-primary/10 blur-[160px]"
        />

        <div className="site-container py-16 md:py-24">

          <Link
            href={homePath}
            className="mb-12 inline-flex items-center gap-2 text-sm text-text-muted transition-colors hover:text-foreground"
          >
            <ArrowLeft size={16} />
            {copy.back}
          </Link>

          <div className="grid items-center gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:gap-20">

            {/* Introduction */}

            <div>

              <span className="section-label">
                {copy.eyebrow}
              </span>

              <div className="mt-6 inline-flex items-center gap-2.5 rounded-full border border-emerald-500/20 bg-emerald-500/5 px-4 py-2 text-xs font-medium text-emerald-400">
                <span className="status-dot" />
                {copy.availability}
              </div>

              <h1 className="mt-7 text-4xl font-bold leading-tight tracking-[-0.04em] text-foreground md:text-5xl lg:text-6xl">

                {copy.headline}

                <span className="mt-2 block bg-gradient-to-r from-blue-400 via-sky-400 to-cyan-300 bg-clip-text text-transparent">
                  {copy.headlineAccent}
                </span>

              </h1>

              <p className="mt-7 max-w-xl text-base leading-8 text-text-secondary md:text-lg">
                {copy.introduction}
              </p>

              <div className="mt-9 flex flex-wrap gap-3">

                <Link
                  href={contactPath}
                  className="btn-primary"
                >
                  {copy.contact}
                  <ArrowUpRight size={17} />
                </Link>

                <Link
                  href={`${homePath}#projects`}
                  className="btn-secondary"
                >
                  {copy.projects}
                  <ArrowRight size={17} />
                </Link>

              </div>

              <div className="mt-9 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-text-muted">

                <span className="inline-flex items-center gap-2">
                  <MapPin
                    size={17}
                    className="text-primary-light"
                  />
                  {copy.location}
                </span>

                <span className="inline-flex items-center gap-2">
                  <Globe2
                    size={17}
                    className="text-primary-light"
                  />
                  {copy.languages}
                </span>

              </div>

            </div>

            {/* Professional profile card */}

            <div className="relative mx-auto w-full max-w-md lg:mx-0 lg:ml-auto">

              <div
                aria-hidden="true"
                className="absolute -inset-5 rounded-[40px] bg-primary/5 blur-3xl"
              />

              <article className="relative overflow-hidden rounded-3xl border border-border bg-surface p-5 shadow-2xl shadow-black/20">

                {/* Profile photograph */}

                <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-background-secondary">

                  <Image
                    src="/photo/photo_final.jpeg"
                    alt={copy.name}
                    fill
                    priority
                    quality={75}
                    sizes="(max-width: 768px) 90vw, (max-width: 1024px) 448px, 420px"
                    className="object-cover object-top"
                  />

                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"
                  />

                </div>

                <div className="px-2 pb-2 pt-6">

                  <div className="flex items-start justify-between gap-4">

                    <div>

                      <h2 className="text-2xl font-semibold tracking-tight text-foreground">
                        {copy.name}
                      </h2>

                      <p className="mt-2 text-sm text-text-secondary">
                        {copy.role}
                      </p>

                    </div>

                    <a
                      href="https://github.com/joss12"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={copy.github}
                      className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-border bg-background-secondary text-text-secondary transition-colors hover:border-primary/40 hover:text-foreground"
                    >
                      <Github size={21} />
                    </a>

                  </div>

                  <div className="mt-6 flex flex-wrap gap-2 border-t border-border pt-5">

                    {technologies.map((technology) => (
                      <span
                        key={technology}
                        className="rounded-lg border border-border bg-background-secondary px-3 py-1.5 text-xs font-medium text-text-secondary"
                      >
                        {technology}
                      </span>
                    ))}

                  </div>

                </div>

              </article>

            </div>

          </div>

        </div>

      </section>

      {/* ========================================
          PROFESSIONAL BIOGRAPHY
      ======================================== */}

      <section className="section-spacing section-divider bg-background-secondary/40">

        <div className="site-container">

          <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">

            <div>

              <span className="section-label">
                {copy.biographyLabel}
              </span>

              <h2 className="section-title mt-4">
                {copy.biographyTitle}
              </h2>

            </div>

            <div className="space-y-5 text-base leading-8 text-text-secondary">

              <p>{t('p1')}</p>
              <p>{t('p2')}</p>
              <p>{t('p3')}</p>

            </div>

          </div>

        </div>

      </section>

      {/* ========================================
          BUSINESS VALUE
      ======================================== */}

      <section className="section-spacing section-divider">

        <div className="site-container">

          <div className="mb-12">

            <span className="section-label">
              {copy.valueLabel}
            </span>

            <h2 className="section-title mt-4">
              {copy.valueTitle}
            </h2>

            <p className="section-description mt-4">
              {copy.valueDescription}
            </p>

          </div>

          <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">

            {copy.values.map((value, index) => {
              const Icon = valueIcons[index] ?? Server;

              return (
                <article
                  key={value.title}
                  className="group rounded-2xl border border-border bg-surface p-7 transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:bg-surface-hover"
                >

                  <div className="mb-6 flex h-13 w-13 items-center justify-center rounded-xl border border-primary/20 bg-primary/10 text-primary-light">

                    <Icon
                      size={25}
                      strokeWidth={1.7}
                    />

                  </div>

                  <h3 className="text-lg font-semibold tracking-tight text-foreground">
                    {value.title}
                  </h3>

                  <p className="mt-3 text-sm leading-7 text-text-secondary">
                    {value.description}
                  </p>

                </article>
              );
            })}

          </div>

        </div>

      </section>

      {/* ========================================
          ENGINEERING PHILOSOPHY
      ======================================== */}

      <section className="section-spacing section-divider bg-background-secondary/40">

        <div className="site-container">

          <div className="grid items-start gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">

            <div>

              <span className="section-label">
                {copy.principlesLabel}
              </span>

              <h2 className="section-title mt-4">
                {copy.principlesTitle}
              </h2>

              <p className="section-description mt-4">
                {copy.principlesDescription}
              </p>

              <Link
                href={`${homePath}#projects`}
                className="btn-secondary mt-8"
              >
                {copy.projects}
                <ArrowUpRight size={17} />
              </Link>

            </div>

            <div className="space-y-4">

              {copy.principles.map((principle, index) => {
                const Icon = principleIcons[index] ?? Code2;

                return (
                  <article
                    key={principle.number}
                    className="group flex items-start gap-5 rounded-2xl border border-border bg-surface p-6 transition-colors hover:border-primary/30"
                  >

                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-primary/20 bg-primary/10 text-primary-light">

                      <Icon
                        size={23}
                        strokeWidth={1.7}
                      />

                    </div>

                    <div className="min-w-0 flex-1">

                      <div className="flex items-start justify-between gap-3">

                        <h3 className="font-semibold text-foreground">
                          {principle.title}
                        </h3>

                        <span className="font-mono text-xs text-text-muted">
                          {principle.number}
                        </span>

                      </div>

                      <p className="mt-2 text-sm leading-7 text-text-secondary">
                        {principle.description}
                      </p>

                    </div>

                  </article>
                );
              })}

            </div>

          </div>

        </div>

      </section>

      {/* ========================================
          TECHNICAL JOURNEY
      ======================================== */}

      <section className="section-spacing section-divider">

        <div className="site-container">

          <div className="mb-12">

            <span className="section-label">
              {copy.timelineLabel}
            </span>

            <h2 className="section-title mt-4">
              {copy.timelineTitle}
            </h2>

            <p className="section-description mt-4">
              {copy.timelineDescription}
            </p>

          </div>

          <div className="relative max-w-4xl">

            <div
              aria-hidden="true"
              className="absolute bottom-6 left-6 top-6 w-px bg-border"
            />

            <div className="space-y-6">

              {copy.timeline.map((item, index) => {
                const Icon = timelineIcons[index] ?? Terminal;

                return (
                  <article
                    key={item.period}
                    className="relative flex items-start gap-4 md:gap-7"
                  >

                    <div className="relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-primary/30 bg-background-secondary text-primary-light">

                      <Icon
                        size={22}
                        strokeWidth={1.7}
                      />

                    </div>

                    <div className="min-w-0 flex-1 rounded-2xl border border-border bg-surface p-6 md:p-7">

                      <span className="font-mono text-xs font-medium text-primary-light">
                        {item.period}
                      </span>

                      <h3 className="mt-3 text-xl font-semibold tracking-tight text-foreground">
                        {item.title}
                      </h3>

                      <p className="mt-3 text-sm leading-7 text-text-secondary">
                        {item.description}
                      </p>

                      <div className="mt-5 flex flex-wrap gap-2">

                        {item.tags.map((tag) => (
                          <span
                            key={tag}
                            className="rounded-lg border border-border bg-background-secondary px-3 py-1.5 text-xs text-text-muted"
                          >
                            {tag}
                          </span>
                        ))}

                      </div>

                    </div>

                  </article>
                );
              })}

            </div>

          </div>

        </div>

      </section>

      {/* ========================================
          TECHNICAL SKILLS
      ======================================== */}

      <section
        id="skills"
        className="section-spacing section-divider bg-background-secondary/40"
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

      {/* ========================================
          COMMERCIAL CALL TO ACTION
      ======================================== */}

      <section className="section-spacing section-divider bg-background-secondary/40">

        <div className="site-container">

          <div className="relative isolate overflow-hidden rounded-3xl border border-border bg-surface p-7 md:p-12 lg:p-16">

            <div
              aria-hidden="true"
              className="pointer-events-none absolute -right-32 -top-32 -z-10 h-96 w-96 rounded-full bg-primary/10 blur-[100px]"
            />

            <div className="max-w-3xl">

              <span className="section-label">
                {copy.ctaLabel}
              </span>

              <h2 className="mt-5 text-3xl font-bold tracking-tight text-foreground md:text-4xl">
                {copy.ctaTitle}
              </h2>

              <p className="mt-5 text-base leading-8 text-text-secondary">
                {copy.ctaDescription}
              </p>

            </div>

            <div className="mt-10 grid gap-5 md:grid-cols-2">

              {/* Client inquiry */}

              <article className="flex flex-col rounded-2xl border border-border bg-background-secondary/60 p-6 md:p-7">

                <BriefcaseBusiness
                  size={27}
                  strokeWidth={1.7}
                  className="text-primary-light"
                />

                <h3 className="mt-5 text-lg font-semibold text-foreground">
                  {copy.clientTitle}
                </h3>

                <p className="mb-6 mt-3 flex-1 text-sm leading-7 text-text-secondary">
                  {copy.clientDescription}
                </p>

                <Link
                  href={contactPath}
                  className="btn-primary w-fit"
                >
                  {copy.clientAction}
                  <ArrowUpRight size={17} />
                </Link>

              </article>

              {/* Employment inquiry */}

              <article className="flex flex-col rounded-2xl border border-border bg-background-secondary/60 p-6 md:p-7">

                <Code2
                  size={27}
                  strokeWidth={1.7}
                  className="text-primary-light"
                />

                <h3 className="mt-5 text-lg font-semibold text-foreground">
                  {copy.recruiterTitle}
                </h3>

                <p className="mb-6 mt-3 flex-1 text-sm leading-7 text-text-secondary">
                  {copy.recruiterDescription}
                </p>

                <Link
                  href={{
                    pathname: contactPath,
                    query: {
                      service: 'employment',
                    },
                  }}
                  className="btn-secondary w-fit"
                >
                  {copy.recruiterAction}
                  <ArrowUpRight size={17} />
                </Link>

              </article>

            </div>

            {/* Resume and GitHub */}

            <div className="mt-8 flex flex-wrap items-center gap-4 border-t border-border pt-7">

              <DocumentPicker
                label={t('cta_resume')}
              />

              <a
                href="https://github.com/joss12"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm font-medium text-text-secondary transition-colors hover:text-foreground"
              >
                <Github size={19} />
                {copy.github}
                <ArrowUpRight size={15} />
              </a>

            </div>

          </div>

        </div>

      </section>

    </main>
  );
}
