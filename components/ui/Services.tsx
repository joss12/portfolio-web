'use client';

import Link from 'next/link';
import { useLocale } from 'next-intl';

import {
  ArrowUpRight,
  Globe2,
  Server,
  ShoppingCart,
  Building2,
  Rocket,
  Settings2,
  Check,
} from 'lucide-react';

const icons = [
  Globe2,
  Server,
  ShoppingCart,
  Building2,
  Rocket,
  Settings2,
];

const content = {
  en: {
    label: 'What I do',
    title: 'Software development services',
    description:
      'From initial ideas to functional applications, I help turn business requirements into reliable, maintainable software.',

    action: 'Discuss your project',
    serviceAction: 'Get in touch',

    services: [
      {
        title: 'Web Application Development',
        description:
          'Modern, responsive web applications designed around your business requirements and the needs of your users.',
        features: [
          'Custom web applications',
          'Admin dashboards',
          'Responsive interfaces',
          'Full-stack development',
        ],
      },
      {
        title: 'Backend & API Development',
        description:
          'Reliable backend systems with secure authentication, structured business logic and scalable architecture.',
        features: [
          'REST API development',
          'Authentication and authorization',
          'Database design',
          'Microservice architecture',
        ],
      },
      {
        title: 'E-Commerce Development',
        description:
          'Online shopping platforms that help businesses manage products, customers, inventory and orders.',
        features: [
          'Product catalogs',
          'Shopping cart and checkout',
          'Inventory management',
          'Order management systems',
        ],
      },
      {
        title: 'Business Software',
        description:
          'Custom software that simplifies daily operations, reduces repetitive tasks and improves business workflows.',
        features: [
          'Internal management tools',
          'Business process automation',
          'Reporting dashboards',
          'Workflow management',
        ],
      },
      {
        title: 'MVP Development',
        description:
          'Transform your idea into a functional product that you can demonstrate, test and improve with real users.',
        features: [
          'Product prototyping',
          'Core feature development',
          'Technical architecture',
          'Deployment and delivery',
        ],
      },
      {
        title: 'Maintenance & Integration',
        description:
          'Improve existing applications, resolve technical issues and connect your software with external services.',
        features: [
          'Bug fixes and improvements',
          'Third-party API integration',
          'Performance optimization',
          'Software maintenance',
        ],
      },
    ],

    footerTitle: 'Every project starts with a conversation.',
    footerDescription:
      'Tell me what you want to build, and we can discuss the best approach for your project.',
  },

  ko: {
    label: '제공 서비스',
    title: '소프트웨어 개발 서비스',
    description:
      '아이디어부터 실제 애플리케이션까지, 비즈니스 요구사항을 안정적이고 유지보수하기 쉬운 소프트웨어로 구현합니다.',

    action: '프로젝트 상담하기',
    serviceAction: '문의하기',

    services: [
      {
        title: '웹 애플리케이션 개발',
        description:
          '비즈니스 요구사항과 사용자 니즈에 맞춘 현대적이고 반응형인 웹 애플리케이션을 개발합니다.',
        features: [
          '맞춤형 웹 애플리케이션',
          '관리자 대시보드',
          '반응형 사용자 인터페이스',
          '풀스택 개발',
        ],
      },
      {
        title: '백엔드 및 API 개발',
        description:
          '안전한 인증, 체계적인 비즈니스 로직 및 확장 가능한 아키텍처를 갖춘 백엔드 시스템을 개발합니다.',
        features: [
          'REST API 개발',
          '인증 및 권한 관리',
          '데이터베이스 설계',
          '마이크로서비스 아키텍처',
        ],
      },
      {
        title: '이커머스 개발',
        description:
          '상품, 고객, 재고 및 주문을 효율적으로 관리할 수 있는 온라인 쇼핑 플랫폼을 개발합니다.',
        features: [
          '상품 카탈로그',
          '장바구니 및 결제 과정',
          '재고 관리',
          '주문 관리 시스템',
        ],
      },
      {
        title: '비즈니스 소프트웨어',
        description:
          '일상적인 업무를 간소화하고 반복 작업을 줄이며 업무 효율성을 높이는 맞춤형 소프트웨어를 개발합니다.',
        features: [
          '내부 관리 도구',
          '업무 프로세스 자동화',
          '보고서 대시보드',
          '업무 흐름 관리',
        ],
      },
      {
        title: 'MVP 개발',
        description:
          '아이디어를 실제 사용자가 테스트하고 개선할 수 있는 기능 중심의 제품으로 구현합니다.',
        features: [
          '제품 프로토타입',
          '핵심 기능 개발',
          '기술 아키텍처 설계',
          '배포 및 납품',
        ],
      },
      {
        title: '유지보수 및 시스템 연동',
        description:
          '기존 애플리케이션을 개선하고 기술적 문제를 해결하며 외부 서비스와의 연동을 지원합니다.',
        features: [
          '버그 수정 및 기능 개선',
          '외부 API 연동',
          '성능 최적화',
          '소프트웨어 유지보수',
        ],
      },
    ],

    footerTitle: '모든 프로젝트는 대화에서 시작됩니다.',
    footerDescription:
      '만들고 싶은 프로젝트를 알려주시면 적합한 개발 방향을 함께 논의하겠습니다.',
  },

  fr: {
    label: 'Mes services',
    title: 'Services de développement logiciel',
    description:
      'De l’idée initiale à l’application fonctionnelle, je transforme vos besoins en solutions logicielles fiables et maintenables.',

    action: 'Discuter de votre projet',
    serviceAction: 'Me contacter',

    services: [
      {
        title: 'Développement web',
        description:
          'Des applications web modernes et responsives adaptées aux besoins de votre entreprise et de vos utilisateurs.',
        features: [
          'Applications web sur mesure',
          'Tableaux de bord administratifs',
          'Interfaces responsives',
          'Développement full-stack',
        ],
      },
      {
        title: 'Développement Backend et API',
        description:
          'Des systèmes backend fiables avec une authentification sécurisée et une architecture évolutive.',
        features: [
          'Développement d’API REST',
          'Authentification et autorisation',
          'Conception de bases de données',
          'Architecture microservices',
        ],
      },
      {
        title: 'Développement E-Commerce',
        description:
          'Des plateformes de vente en ligne permettant de gérer les produits, les clients, les stocks et les commandes.',
        features: [
          'Catalogues de produits',
          'Panier et processus de commande',
          'Gestion des stocks',
          'Gestion des commandes',
        ],
      },
      {
        title: 'Logiciels de gestion',
        description:
          'Des logiciels personnalisés pour simplifier les opérations quotidiennes et améliorer les processus internes.',
        features: [
          'Outils de gestion interne',
          'Automatisation des processus',
          'Tableaux de bord et rapports',
          'Gestion des workflows',
        ],
      },
      {
        title: 'Développement MVP',
        description:
          'Transformez votre idée en un produit fonctionnel que vous pouvez présenter, tester et améliorer.',
        features: [
          'Prototypage de produits',
          'Développement des fonctionnalités',
          'Architecture technique',
          'Déploiement et livraison',
        ],
      },
      {
        title: 'Maintenance et intégration',
        description:
          'Amélioration des applications existantes, résolution des problèmes techniques et intégration de services externes.',
        features: [
          'Correction de bugs',
          'Intégration d’API tierces',
          'Optimisation des performances',
          'Maintenance logicielle',
        ],
      },
    ],

    footerTitle: 'Chaque projet commence par une conversation.',
    footerDescription:
      'Présentez-moi votre idée et discutons ensemble de la meilleure approche pour votre projet.',
  },
} as const;

type SupportedLocale = keyof typeof content;

export default function Services() {
  const locale = useLocale();

  const copy =
    content[locale as SupportedLocale] ?? content.en;

  const contactPath = `/${locale}/contact`;

  return (
    <section
      id="services"
      className="
        section-spacing section-divider
        bg-background-secondary/40
      "
    >
      <div className="site-container">
        {/* Section heading */}

        <div
          className="
            mb-12 flex flex-col
            items-start justify-between gap-6
            lg:flex-row lg:items-end
          "
        >
          <div>
            <span className="section-label">
              {copy.label}
            </span>

            <h2 className="section-title mt-4">
              {copy.title}
            </h2>

            <p className="section-description mt-4">
              {copy.description}
            </p>
          </div>

          <Link
            href={contactPath}
            className="btn-secondary shrink-0"
          >
            {copy.action}

            <ArrowUpRight size={17} />
          </Link>
        </div>

        {/* Service cards */}

        <div
          className="
            grid grid-cols-1 gap-5
            md:grid-cols-2
            xl:grid-cols-3
          "
        >
          {copy.services.map((service, index) => {
            const Icon = icons[index] ?? Globe2;

            return (
              <article
                key={service.title}
                className="
                  group relative flex h-full
                  flex-col overflow-hidden
                  rounded-2xl border border-border
                  bg-surface p-7
                  transition-all duration-300
                  hover:-translate-y-1
                  hover:border-primary/40
                  hover:bg-surface-hover
                  hover:shadow-xl
                  hover:shadow-black/20
                "
              >
                {/* Hover decoration */}

                <div
                  aria-hidden="true"
                  className="
                    pointer-events-none absolute
                    -right-20 -top-20
                    h-48 w-48 rounded-full
                    bg-primary/10 opacity-0
                    blur-3xl transition-opacity
                    duration-300
                    group-hover:opacity-100
                  "
                />

                {/* Icon and number */}

                <div
                  className="
                    relative mb-7 flex
                    items-center justify-between
                  "
                >
                  <div
                    className="
                      flex h-14 w-14 items-center
                      justify-center rounded-xl
                      border border-primary/20
                      bg-primary/10
                      text-primary-light
                      transition-colors
                      group-hover:bg-primary/15
                    "
                  >
                    <Icon
                      size={26}
                      strokeWidth={1.7}
                    />
                  </div>

                  <span
                    aria-hidden="true"
                    className="
                      font-mono text-xs
                      tracking-wider text-text-muted
                    "
                  >
                    {String(index + 1).padStart(2, '0')}
                  </span>
                </div>

                {/* Service description */}

                <h3
                  className="
                    relative text-xl font-semibold
                    tracking-tight text-foreground
                  "
                >
                  {service.title}
                </h3>

                <p
                  className="
                    relative mt-3 text-sm
                    leading-7 text-text-secondary
                  "
                >
                  {service.description}
                </p>

                {/* Features */}

                <ul
                  className="
                    relative mb-7 mt-6
                    flex-1 space-y-3
                  "
                >
                  {service.features.map((feature) => (
                    <li
                      key={feature}
                      className="
                        flex items-start gap-3
                        text-sm leading-6
                        text-text-secondary
                      "
                    >
                      <Check
                        size={16}
                        strokeWidth={2}
                        className="
                          mt-1 shrink-0
                          text-primary-light
                        "
                      />

                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* Service action */}

                <div
                  className="
                    relative mt-auto
                    border-t border-border pt-5
                  "
                >
                  <Link
                    href={contactPath}
                    className="
                      inline-flex items-center gap-2
                      text-sm font-semibold
                      text-primary-light
                      transition-colors
                      hover:text-foreground
                    "
                  >
                    {copy.serviceAction}

                    <ArrowUpRight
                      size={16}
                      className="
                        transition-transform
                        group-hover:-translate-y-0.5
                        group-hover:translate-x-0.5
                      "
                    />
                  </Link>
                </div>
              </article>
            );
          })}
        </div>

        {/* Bottom call to action */}

        <div
          className="
            mt-8 flex flex-col
            items-start justify-between gap-6
            rounded-2xl border border-border
            bg-surface p-7
            md:flex-row md:items-center
            md:p-9
          "
        >
          <div>
            <h3
              className="
                text-xl font-semibold
                tracking-tight text-foreground
              "
            >
              {copy.footerTitle}
            </h3>

            <p
              className="
                mt-2 max-w-2xl text-sm
                leading-7 text-text-secondary
              "
            >
              {copy.footerDescription}
            </p>
          </div>

          <Link
            href={contactPath}
            className="btn-primary shrink-0"
          >
            {copy.action}

            <ArrowUpRight size={17} />
          </Link>
        </div>
      </div>
    </section>
  );
}
