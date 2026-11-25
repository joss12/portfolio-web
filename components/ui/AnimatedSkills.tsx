'use client';

import Link from 'next/link';
import { useLocale } from 'next-intl';
import type { CSSProperties } from 'react';

import {
  Network,
  Cpu,
  Layers3,
  Binary,
  ArrowUpRight,
} from 'lucide-react';

import TechnologySphere from './TechnologySphere';

const disciplines = [
  {
    id: 'network',
    icon: Network,
    color: '#38BDF8',
    lightColor: '#036B91',
    topics: [
      'TCP/IP',
      'UDP',
      'DNS',
      'Sockets',
    ],
  },
  {
    id: 'concurrency',
    icon: Cpu,
    color: '#A78BFA',
    lightColor: '#6941B5',
    topics: [
      'Goroutines',
      'Threads',
      'Synchronization',
      'Parallelism',
    ],
  },
  {
    id: 'distributed',
    icon: Layers3,
    color: '#34D399',
    lightColor: '#17634E',
    topics: [
      'Replication',
      'Consistency',
      'Coordination',
      'Fault tolerance',
    ],
  },
  {
    id: 'lowLevel',
    icon: Binary,
    color: '#FBBF24',
    lightColor: '#85530B',
    topics: [
      'Memory',
      'Pointers',
      'Operating systems',
      'Computer architecture',
    ],
  },
] as const;

const content = {
  en: {
    occasionalDescription:
      'C/C++ — occasional experimentation and low-level programming, approximately 3–5 times per year.',

    engineeringLabel: 'Long-term engineering goals',

    engineeringTitle: 'Software Engineering',

    engineeringDescription:
      'Beyond application development, my ambition is to develop deep expertise in computer systems and the engineering principles behind reliable, efficient software.',

    network: {
      title: 'Network Programming',
      description:
        'Understanding network protocols, socket programming and communication between software systems.',
    },

    concurrency: {
      title: 'Concurrency',
      description:
        'Designing efficient concurrent and parallel software through synchronization and resource management.',
    },

    distributed: {
      title: 'Distributed Systems',
      description:
        'Exploring replication, consistency, coordination and fault-tolerant system architectures.',
    },

    lowLevel: {
      title: 'Low-Level Programming',
      description:
        'Understanding memory, operating systems and the relationship between software and hardware.',
    },

    labAction: 'Explore my Lab',
  },

  ko: {
    occasionalDescription:
      'C/C++ — 실험 및 저수준 프로그래밍을 위해 연간 약 3~5회 사용합니다.',

    engineeringLabel: '장기적인 기술 목표',

    engineeringTitle: '소프트웨어 엔지니어링',

    engineeringDescription:
      '애플리케이션 개발을 넘어 컴퓨터 시스템과 안정적이고 효율적인 소프트웨어를 위한 엔지니어링 원리에 대한 전문성을 갖추는 것이 목표입니다.',

    network: {
      title: '네트워크 프로그래밍',
      description:
        '네트워크 프로토콜, 소켓 프로그래밍 및 시스템 간 통신 원리를 학습합니다.',
    },

    concurrency: {
      title: '동시성',
      description:
        '동기화와 자원 관리를 통해 효율적인 동시 및 병렬 소프트웨어 설계 역량을 키웁니다.',
    },

    distributed: {
      title: '분산 시스템',
      description:
        '복제, 일관성, 조정 및 장애 허용 시스템 아키텍처를 연구합니다.',
    },

    lowLevel: {
      title: '저수준 프로그래밍',
      description:
        '메모리, 운영체제 및 소프트웨어와 하드웨어의 상호작용을 이해합니다.',
    },

    labAction: 'Lab 둘러보기',
  },

  fr: {
    occasionalDescription:
      'C/C++ — expérimentation et programmation bas niveau, environ 3 à 5 fois par an.',

    engineeringLabel: 'Objectifs techniques à long terme',

    engineeringTitle: 'Ingénierie logicielle',

    engineeringDescription:
      'Au-delà du développement applicatif, mon ambition est de développer une expertise approfondie en systèmes informatiques et en ingénierie de logiciels fiables et efficaces.',

    network: {
      title: 'Programmation réseau',
      description:
        'Comprendre les protocoles réseau, la programmation socket et les communications entre systèmes.',
    },

    concurrency: {
      title: 'Concurrence',
      description:
        'Concevoir des logiciels concurrents et parallèles efficaces grâce à la synchronisation et à la gestion des ressources.',
    },

    distributed: {
      title: 'Systèmes distribués',
      description:
        'Explorer la réplication, la cohérence, la coordination et les architectures tolérantes aux pannes.',
    },

    lowLevel: {
      title: 'Programmation bas niveau',
      description:
        'Comprendre la mémoire, les systèmes d’exploitation et les interactions entre logiciels et matériel.',
    },

    labAction: 'Explorer mon Lab',
  },
} as const;

export default function AnimatedSkills() {
  const locale = useLocale();

  const language =
    locale === 'ko' || locale === 'fr'
      ? locale
      : 'en';

  const copy = content[language];

  return (
    <div className="space-y-12">
      <style>{`
        .engineering-discipline {
          --discipline-color: var(--discipline-dark);
        }

        :root[data-theme='light'] .engineering-discipline {
          --discipline-color: var(--discipline-light);
        }

        .engineering-discipline-accent {
          background: linear-gradient(
            90deg,
            transparent,
            color-mix(
              in srgb,
              var(--discipline-color) 50%,
              transparent
            ),
            transparent
          );
        }

        .engineering-discipline-icon {
          color: var(--discipline-color);

          background-color: color-mix(
            in srgb,
            var(--discipline-color) 7%,
            transparent
          );
        }

        :root[data-theme='light']
        .engineering-discipline-icon {
          background-color: color-mix(
            in srgb,
            var(--discipline-color) 9%,
            transparent
          );
        }
      `}</style>

      {/* Interactive technology visualization */}

      <div>
        <TechnologySphere />

        <p
          className="
            flex items-start justify-center
            gap-2.5 text-xs leading-6
            text-text-muted
          "
        >
          <span
            aria-hidden="true"
            className="
              mt-2 h-1.5 w-1.5 shrink-0
              rounded-full bg-warning
            "
          />

          {copy.occasionalDescription}
        </p>
      </div>

      {/* Software engineering ambitions */}

      <section className="border-t border-border pt-12">
        <div
          className="
            mb-8 flex flex-col items-start
            justify-between gap-6
            lg:flex-row lg:items-end
          "
        >
          <div>
            <span className="section-label">
              {copy.engineeringLabel}
            </span>

            <h3
              className="
                mt-4 text-3xl font-semibold
                tracking-tight text-foreground
                sm:text-4xl
              "
            >
              {copy.engineeringTitle}
            </h3>

            <p
              className="
                mt-4 max-w-3xl text-sm
                leading-7 text-text-secondary
                sm:text-base
              "
            >
              {copy.engineeringDescription}
            </p>
          </div>

          <Link
            href={`/${locale}#engineering`}
            className="btn-secondary shrink-0"
          >
            {copy.labAction}

            <ArrowUpRight size={16} />
          </Link>
        </div>

        <div
          className="
            grid gap-4
            sm:grid-cols-2
            xl:grid-cols-4
          "
        >
          {disciplines.map((discipline, index) => {
            const Icon = discipline.icon;

            const details = copy[discipline.id];

            return (
              <article
                key={discipline.id}
                className="
                  engineering-discipline
                  relative flex flex-col
                  overflow-hidden rounded-xl
                  border border-border
                  bg-surface p-5
                  shadow-sm shadow-black/5
                  transition-colors duration-300
                  hover:border-border-hover
                  hover:bg-surface-hover
                  dark:bg-surface/60
                  dark:hover:bg-surface/60
                "
                style={
                  {
                    '--discipline-dark':
                      discipline.color,

                    '--discipline-light':
                      discipline.lightColor,
                  } as CSSProperties
                }
              >
                <div
                  aria-hidden="true"
                  className="
                    engineering-discipline-accent
                    absolute inset-x-0 top-0 h-px
                  "
                />

                <div
                  className="
                    mb-5 flex items-center
                    justify-between
                  "
                >
                  <div
                    className="
                      engineering-discipline-icon
                      flex h-10 w-10
                      items-center justify-center
                      rounded-lg
                    "
                  >
                    <Icon
                      size={22}
                      strokeWidth={1.7}
                    />
                  </div>

                  <span
                    aria-hidden="true"
                    className="
                      font-mono text-[10px]
                      text-text-muted
                    "
                  >
                    0{index + 1}
                  </span>
                </div>

                <h4
                  className="
                    text-base font-semibold
                    tracking-tight text-foreground
                  "
                >
                  {details.title}
                </h4>

                <p
                  className="
                    mb-5 mt-3 flex-1 text-xs
                    leading-6 text-text-secondary
                  "
                >
                  {details.description}
                </p>

                <div
                  className="
                    flex flex-wrap gap-1.5
                    border-t border-border pt-4
                  "
                >
                  {discipline.topics.map((topic) => (
                    <span
                      key={topic}
                      className="
                        rounded-md
                        bg-background-secondary
                        px-2 py-1 font-mono
                        text-[10px] text-text-secondary
                        dark:text-text-muted
                      "
                    >
                      {topic}
                    </span>
                  ))}
                </div>
              </article>
            );
          })}
        </div>
      </section>
    </div>
  );
}
