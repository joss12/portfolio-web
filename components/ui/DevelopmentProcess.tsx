'use client';

import Link from 'next/link';
import { useLocale } from 'next-intl';

import {
  MessagesSquare,
  ClipboardList,
  Code2,
  Rocket,
  ArrowUpRight,
  ArrowRight,
} from 'lucide-react';

const icons = [
  MessagesSquare,
  ClipboardList,
  Code2,
  Rocket,
];

const content = {
  en: {
    label: 'How I work',
    title: 'From idea to implementation',
    description:
      'A structured development process designed to keep your project clear, collaborative and focused on results.',

    action: 'Discuss your project',

    steps: [
      {
        title: 'Discovery',
        description:
          'We discuss your idea, business requirements, target users and the problems your software needs to solve.',
        deliverable: 'Clear project requirements',
      },
      {
        title: 'Planning & Design',
        description:
          'I define the technical architecture, select appropriate technologies and establish the project scope and milestones.',
        deliverable: 'Technical roadmap',
      },
      {
        title: 'Development & Testing',
        description:
          'I build your application incrementally, validate its functionality and share progress throughout development.',
        deliverable: 'Tested, functional software',
      },
      {
        title: 'Deployment & Delivery',
        description:
          'Your application is prepared for deployment, accompanied by technical documentation and an agreed handover.',
        deliverable: 'Deployed application',
      },
    ],

    deliverableLabel: 'Outcome',

    footerTitle: 'Clear communication. Reliable development.',
    footerDescription:
      'You stay informed throughout the project, from the first conversation to the final delivery.',
  },

  ko: {
    label: '개발 프로세스',
    title: '아이디어부터 실제 구현까지',
    description:
      '명확한 소통과 협업을 바탕으로 프로젝트의 목표를 달성하기 위한 체계적인 개발 프로세스입니다.',

    action: '프로젝트 상담하기',

    steps: [
      {
        title: '요구사항 분석',
        description:
          '프로젝트 아이디어, 비즈니스 요구사항, 대상 사용자 및 해결해야 할 문제를 함께 논의합니다.',
        deliverable: '명확한 프로젝트 요구사항',
      },
      {
        title: '기획 및 설계',
        description:
          '기술 아키텍처를 설계하고 적합한 기술을 선정하며 프로젝트 범위와 주요 일정을 정의합니다.',
        deliverable: '기술 개발 로드맵',
      },
      {
        title: '개발 및 테스트',
        description:
          '애플리케이션을 단계적으로 개발하고 기능을 검증하며 개발 진행 상황을 공유합니다.',
        deliverable: '검증된 소프트웨어',
      },
      {
        title: '배포 및 납품',
        description:
          '애플리케이션을 배포할 수 있도록 준비하고 기술 문서와 합의된 인수인계 자료를 제공합니다.',
        deliverable: '배포된 애플리케이션',
      },
    ],

    deliverableLabel: '결과물',

    footerTitle: '명확한 소통과 신뢰할 수 있는 개발',
    footerDescription:
      '첫 상담부터 최종 납품까지 프로젝트의 진행 상황을 공유합니다.',
  },

  fr: {
    label: 'Ma méthode de travail',
    title: 'De l’idée à la réalisation',
    description:
      'Un processus de développement structuré, collaboratif et orienté vers les résultats.',

    action: 'Discuter de votre projet',

    steps: [
      {
        title: 'Analyse des besoins',
        description:
          'Nous échangeons sur votre idée, vos besoins métier, vos utilisateurs et les problèmes à résoudre.',
        deliverable: 'Besoins clairement définis',
      },
      {
        title: 'Planification et conception',
        description:
          'Je définis l’architecture technique, sélectionne les technologies adaptées et établis les étapes du projet.',
        deliverable: 'Feuille de route technique',
      },
      {
        title: 'Développement et tests',
        description:
          'Je développe votre application progressivement, valide ses fonctionnalités et partage régulièrement les avancées.',
        deliverable: 'Logiciel fonctionnel et testé',
      },
      {
        title: 'Déploiement et livraison',
        description:
          'Votre application est préparée pour le déploiement, accompagnée de sa documentation technique et des éléments convenus pour la livraison.',
        deliverable: 'Application déployée',
      },
    ],

    deliverableLabel: 'Résultat',

    footerTitle: 'Communication claire. Développement fiable.',
    footerDescription:
      'Vous restez informé tout au long du projet, du premier échange à la livraison finale.',
  },
} as const;

type SupportedLocale = keyof typeof content;

export default function DevelopmentProcess() {
  const locale = useLocale();

  const copy =
    content[locale as SupportedLocale] ?? content.en;

  return (
    <section
      id="process"
      className="
        section-spacing section-divider
        bg-background-secondary/40
      "
    >
      <div className="site-container">
        {/* Section heading */}

        <div className="mb-12">
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

        {/* Development steps */}

        <div
          className="
            grid grid-cols-1 gap-5
            md:grid-cols-2
            xl:grid-cols-4
          "
        >
          {copy.steps.map((step, index) => {
            const Icon = icons[index] ?? Code2;

            return (
              <article
                key={step.title}
                className="
                  group relative flex h-full
                  flex-col rounded-2xl
                  border border-border
                  bg-surface p-6
                  transition-colors duration-300
                  hover:border-primary/40
                  hover:bg-surface-hover
                "
              >
                {/* Step number and icon */}

                <div className="mb-7 flex items-center justify-between">
                  <div
                    className="
                      flex h-14 w-14
                      items-center justify-center
                      rounded-xl border
                      border-primary/20
                      bg-primary/10
                      text-primary-light
                    "
                  >
                    <Icon
                      size={25}
                      strokeWidth={1.7}
                    />
                  </div>

                  <span
                    className="
                      font-mono text-sm
                      font-medium text-text-muted
                    "
                  >
                    {String(index + 1).padStart(2, '0')}
                  </span>
                </div>

                {/* Step information */}

                <h3
                  className="
                    mb-3 text-lg font-semibold
                    tracking-tight text-foreground
                  "
                >
                  {step.title}
                </h3>

                <p
                  className="
                    mb-7 flex-1 text-sm
                    leading-7 text-text-secondary
                  "
                >
                  {step.description}
                </p>

                {/* Deliverable */}

                <div className="border-t border-border pt-5">
                  <p
                    className="
                      mb-2 text-[10px]
                      font-semibold uppercase
                      tracking-widest text-text-muted
                    "
                  >
                    {copy.deliverableLabel}
                  </p>

                  <div
                    className="
                      flex items-center gap-2
                      text-xs font-medium
                      text-primary-light
                    "
                  >
                    <ArrowRight
                      size={14}
                      className="shrink-0"
                    />

                    {step.deliverable}
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        {/* Process footer */}

        <div
          className="
            mt-10 flex flex-col
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
                text-lg font-semibold
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
            href={`/${locale}/contact`}
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
