'use client';

import {
  useEffect,
  useId,
  useRef,
  useState,
} from 'react';

import { useLocale } from 'next-intl';

import {
  FileText,
  X,
  ArrowUpRight,
} from 'lucide-react';

const documents = [
  {
    id: 'resume',
    file: '/resume/Eddy_CV_Real-1.pdf',
  },
  {
    id: 'scholarship',
    file: '/resume/33333.pdf',
  },
  {
    id: 'completion',
    file: '/resume/44444.pdf',
  },
  {
    id: 'ibm',
    file: '/resume/Coursera DR0AMNIBD9VR.pdf',
  },
] as const;

const translations = {
  en: {
    title: 'Documents',
    close: 'Close documents',
    newTab: 'Opens in a new tab',

    documents: {
      resume: {
        label: 'Résumé',
        description:
          'Backend Developer — Go · TypeScript',
      },

      scholarship: {
        label: 'Scholar Certificate',
        description:
          'Academic scholarship certificate',
      },

      completion: {
        label: 'Certificate of Completion',
        description:
          'Course completion certificate',
      },

      ibm: {
        label: 'IBM Back-end JavaScript Developer',
        description: 'Coursera · IBM',
      },
    },
  },

  ko: {
    title: '문서',
    close: '문서 목록 닫기',
    newTab: '새 탭에서 열기',

    documents: {
      resume: {
        label: '이력서',
        description:
          '백엔드 개발자 — Go · TypeScript',
      },

      scholarship: {
        label: '장학 증명서',
        description: '학업 장학 증명서',
      },

      completion: {
        label: '수료증',
        description: '교육 과정 수료증',
      },

      ibm: {
        label: 'IBM 백엔드 JavaScript 개발자',
        description: 'Coursera · IBM',
      },
    },
  },

  fr: {
    title: 'Documents',
    close: 'Fermer les documents',
    newTab: 'Ouvre un nouvel onglet',

    documents: {
      resume: {
        label: 'Curriculum vitae',
        description:
          'Développeur backend — Go · TypeScript',
      },

      scholarship: {
        label: 'Attestation de bourse',
        description:
          'Attestation de bourse académique',
      },

      completion: {
        label: 'Certificat de réussite',
        description:
          'Certificat de fin de formation',
      },

      ibm: {
        label: 'IBM Back-end JavaScript Developer',
        description: 'Coursera · IBM',
      },
    },
  },
} as const;

type DocumentPickerProps = {
  label: string;
};

export default function DocumentPicker({
  label,
}: DocumentPickerProps) {
  const locale = useLocale();

  const language =
    locale === 'ko' || locale === 'fr'
      ? locale
      : 'en';

  const copy = translations[language];

  const [open, setOpen] = useState(false);

  const containerRef =
    useRef<HTMLDivElement>(null);

  const triggerRef =
    useRef<HTMLButtonElement>(null);

  const panelRef =
    useRef<HTMLDivElement>(null);

  const panelId = useId();
  const headingId = useId();

  function closePicker(restoreFocus = true) {
    setOpen(false);

    if (restoreFocus) {
      triggerRef.current?.focus();
    }
  }

  useEffect(() => {
    if (!open) return;

    panelRef.current
      ?.querySelector<HTMLElement>('a[href]')
      ?.focus();

    function handlePointerDown(
      event: PointerEvent,
    ) {
      const target = event.target;

      if (
        target instanceof Node &&
        containerRef.current &&
        !containerRef.current.contains(target)
      ) {
        setOpen(false);
      }
    }

    function handleKeyDown(
      event: KeyboardEvent,
    ) {
      if (event.key !== 'Escape') return;

      event.preventDefault();

      setOpen(false);

      triggerRef.current?.focus();
    }

    document.addEventListener(
      'pointerdown',
      handlePointerDown,
    );

    document.addEventListener(
      'keydown',
      handleKeyDown,
    );

    return () => {
      document.removeEventListener(
        'pointerdown',
        handlePointerDown,
      );

      document.removeEventListener(
        'keydown',
        handleKeyDown,
      );
    };
  }, [open]);

  return (
    <div
      ref={containerRef}
      className="relative"
      onBlur={(event) => {
        const nextTarget = event.relatedTarget;

        if (
          nextTarget instanceof Node &&
          !event.currentTarget.contains(nextTarget)
        ) {
          setOpen(false);
        }
      }}
    >
      <button
        ref={triggerRef}
        type="button"
        aria-expanded={open}
        aria-controls={open ? panelId : undefined}
        onClick={() => setOpen((value) => !value)}
        className="
          inline-flex h-9
          items-center justify-center
          gap-2 whitespace-nowrap
          rounded-lg border border-border
          bg-surface px-3
          text-xs font-medium
          text-text-secondary
          transition-colors
          hover:border-primary/40
          hover:bg-surface-hover
          hover:text-foreground
          focus-visible:outline-2
          focus-visible:outline-offset-4
          focus-visible:outline-primary
        "
      >
        <FileText
          size={14}
          strokeWidth={1.8}
          aria-hidden="true"
        />

        {label}
      </button>

      {open && (
        <div
          ref={panelRef}
          id={panelId}
          role="region"
          aria-labelledby={headingId}
          className="
            fixed inset-x-4 bottom-4
            z-[60]
            max-h-[70dvh]
            overflow-y-auto
            rounded-xl
            border border-border
            bg-surface
            shadow-2xl shadow-black/20
            sm:absolute
            sm:inset-x-auto
            sm:top-full
            sm:right-0
            sm:bottom-auto
            sm:mt-2
            sm:w-80
          "
        >
          {/* Header */}

          <div
            className="
              flex items-center
              justify-between gap-3
              border-b border-border
              px-4 py-2
            "
          >
            <h2
              id={headingId}
              className="
                font-mono
                text-xs font-semibold
                uppercase tracking-widest
                text-text-muted
              "
            >
              {copy.title}
            </h2>

            <button
              type="button"
              aria-label={copy.close}
              onClick={() => closePicker()}
              className="
                flex h-10 w-10 shrink-0
                items-center justify-center
                rounded-md
                text-text-muted
                transition-colors
                hover:bg-surface-hover
                hover:text-foreground
                focus-visible:outline-2
                focus-visible:outline-primary
              "
            >
              <X
                size={16}
                aria-hidden="true"
              />
            </button>
          </div>

          {/* Document list */}

          <ul className="flex flex-col gap-1 p-2">
            {documents.map((document) => {
              const content =
                copy.documents[document.id];

              return (
                <li key={document.id}>
                  <a
                    href={document.file}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => closePicker()}
                    className="
                      group flex items-center
                      gap-3 rounded-lg
                      px-3 py-3
                      transition-colors
                      hover:bg-surface-hover
                      focus-visible:outline-2
                      focus-visible:outline-primary
                    "
                  >
                    <div
                      className="
                        flex h-9 w-9 shrink-0
                        items-center justify-center
                        rounded-lg
                        border border-border
                        bg-primary/10
                        group-hover:border-primary/30
                      "
                    >
                      <FileText
                        size={16}
                        aria-hidden="true"
                        className="text-primary-light"
                      />
                    </div>

                    <div className="min-w-0 flex-1">
                      <p
                        className="
                          break-words
                          text-sm font-medium
                          leading-snug
                          text-foreground
                        "
                      >
                        {content.label}
                      </p>

                      <p
                        className="
                          mt-1 break-words
                          text-xs leading-relaxed
                          text-text-muted
                        "
                      >
                        {content.description}
                      </p>

                      <span className="sr-only">
                        {copy.newTab}
                      </span>
                    </div>

                    <ArrowUpRight
                      size={15}
                      aria-hidden="true"
                      className="
                        shrink-0
                        text-text-muted
                        transition-colors
                        group-hover:text-primary-light
                      "
                    />
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
}
