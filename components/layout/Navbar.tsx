'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useState } from 'react';
import { useLocale } from 'next-intl';

import {
  ArrowUpRight,
  Github,
  Linkedin,
  Menu,
  X,
} from 'lucide-react';

import DocumentPicker from '@/components/ui/DocumentPicker';

const locales = [
  { code: 'en', label: 'EN', name: 'English' },
  { code: 'ko', label: 'KR', name: '한국어' },
  { code: 'fr', label: 'FR', name: 'Français' },
] as const;

const translations = {
  en: {
    home: 'Home',
    services: 'Services',
    projects: 'Projects',
    engineering: 'Engineering Lab',
    about: 'About',
    contact: 'Contact',
    resume: 'Résumé',
    startProject: 'Start a Project',
    role: 'Software Developer',
    openMenu: 'Open menu',
    closeMenu: 'Close menu',
    navigation: 'Main navigation',
    language: 'Select language',
  },

  ko: {
    home: '홈',
    services: '서비스',
    projects: '프로젝트',
    engineering: '기술 연구',
    about: '소개',
    contact: '문의',
    resume: '이력서',
    startProject: '프로젝트 문의',
    role: '소프트웨어 개발자',
    openMenu: '메뉴 열기',
    closeMenu: '메뉴 닫기',
    navigation: '주 메뉴',
    language: '언어 선택',
  },

  fr: {
    home: 'Accueil',
    services: 'Services',
    projects: 'Projets',
    engineering: 'Laboratoire',
    about: 'À propos',
    contact: 'Contact',
    resume: 'CV',
    startProject: 'Démarrer un projet',
    role: 'Développeur logiciel',
    openMenu: 'Ouvrir le menu',
    closeMenu: 'Fermer le menu',
    navigation: 'Navigation principale',
    language: 'Choisir la langue',
  },
} as const;

type SupportedLocale = keyof typeof translations;

export default function Navbar() {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();

  const [menuOpen, setMenuOpen] = useState(false);

  const t =
    translations[locale as SupportedLocale] ??
    translations.en;

  const homePath = `/${locale}`;
  const contactPath = `${homePath}/contact`;

  const navigation = [
    {
      label: t.home,
      href: homePath,
    },
    {
      label: t.services,
      href: `${homePath}/#services`,
    },
    {
      label: t.projects,
      href: `${homePath}/#projects`,
    },
    {
      label: t.engineering,
      href: `${homePath}/#engineering`,
    },
    {
      label: t.about,
      href: `${homePath}/about`,
    },
    {
      label: t.contact,
      href: contactPath,
    },
  ];

  function isActive(href: string) {
    if (href.includes('#')) {
      return false;
    }

    const currentPath =
      pathname.replace(/\/$/, '') || '/';

    if (href === homePath) {
      return currentPath === homePath;
    }

    return (
      currentPath === href ||
      currentPath.startsWith(`${href}/`)
    );
  }

  function switchLocale(newLocale: string) {
    if (newLocale === locale) {
      setMenuOpen(false);
      return;
    }

    const segments = pathname.split('/');

    segments[1] = newLocale;

    const nextPath = segments.join('/');

    const query = window.location.search;
    const hash = window.location.hash;

    setMenuOpen(false);

    router.push(`${nextPath}${query}${hash}`);
  }

  function closeMenu() {
    setMenuOpen(false);
  }

  function renderLanguageSelector() {
    return (
      <div
        aria-label={t.language}
        className="
          inline-flex items-center gap-0.5
          rounded-lg border border-border
          bg-surface p-1
        "
      >
        {locales.map((language) => (
          <button
            key={language.code}
            type="button"
            title={language.name}
            aria-label={language.name}
            aria-pressed={locale === language.code}
            onClick={() => switchLocale(language.code)}
            className={`
              rounded-md px-2 py-1.5
              text-[11px] font-semibold
              transition-colors
              ${
                locale === language.code
                  ? 'bg-primary/15 text-primary-light'
                  : 'text-text-muted hover:bg-surface-hover hover:text-foreground'
              }
            `}
          >
            {language.label}
          </button>
        ))}
      </div>
    );
  }

  function renderSocialLinks() {
    return (
      <div className="flex items-center gap-3">
        <a
          href="https://github.com/joss12"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="GitHub"
          className="
            text-text-muted
            transition-colors
            hover:text-foreground
          "
        >
          <Github size={18} strokeWidth={1.7} />
        </a>

        <a
          href="https://www.linkedin.com/in/eddymouity"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="LinkedIn"
          className="
            text-text-muted
            transition-colors
            hover:text-foreground
          "
        >
          <Linkedin size={18} strokeWidth={1.7} />
        </a>
      </div>
    );
  }

  return (
    <header
      className="
        fixed inset-x-0 top-0 z-50
        h-14 border-b border-border
        bg-background/90 backdrop-blur-xl
      "
    >
      <div
        className="
          site-container
          flex h-full items-center justify-between
          gap-5
        "
      >
        {/* Brand */}

        <Link
          href={homePath}
          onClick={closeMenu}
          className="
            group flex shrink-0
            items-center gap-3
          "
        >
          <div
            className="
              flex h-9 w-9 items-center
              justify-center rounded-lg
              border border-primary/25
              bg-primary/10
              text-sm font-bold
              tracking-tight text-primary-light
              transition-colors
              group-hover:bg-primary/20
            "
          >
            EM
          </div>

          <div className="flex flex-col">
            <span
              className="
                text-sm font-semibold
                leading-tight tracking-tight
                text-foreground
              "
            >
              Eddy Mouity
            </span>

            <span
              className="
                mt-0.5 text-[10px]
                leading-tight text-text-muted
              "
            >
              {t.role}
            </span>
          </div>
        </Link>

        {/* Desktop navigation */}

        <nav
          aria-label={t.navigation}
          className="
            hidden items-center gap-4
            xl:flex
          "
        >
          {navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              aria-current={
                isActive(item.href) ? 'page' : undefined
              }
              className={`
                whitespace-nowrap
                text-[13px] font-medium
                transition-colors
                ${
                  isActive(item.href)
                    ? 'text-primary-light'
                    : 'text-text-secondary hover:text-foreground'
                }
              `}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Desktop actions */}

        <div
          className="
            hidden shrink-0 items-center
            gap-3 xl:flex
          "
        >
          <DocumentPicker label={t.resume} />

          {renderLanguageSelector()}

          <Link
            href={contactPath}
            className="
              inline-flex h-9 items-center
              justify-center gap-2
              whitespace-nowrap rounded-lg
              bg-primary px-3.5
              text-xs font-semibold text-white
              transition-all
              hover:bg-primary-hover
              hover:shadow-lg
              hover:shadow-primary/15
            "
          >
            {t.startProject}

            <ArrowUpRight
              size={15}
              strokeWidth={2}
            />
          </Link>
        </div>

        {/* Mobile menu button */}

        <button
          type="button"
          aria-label={
            menuOpen ? t.closeMenu : t.openMenu
          }
          aria-expanded={menuOpen}
          aria-controls="mobile-navigation"
          onClick={() => setMenuOpen((value) => !value)}
          className="
            flex h-9 w-9 items-center
            justify-center rounded-lg
            border border-border
            text-text-secondary
            transition-colors
            hover:bg-surface-hover
            hover:text-foreground
            xl:hidden
          "
        >
          {menuOpen ? (
            <X size={20} />
          ) : (
            <Menu size={20} />
          )}
        </button>
      </div>

      {/* Mobile navigation */}

      {menuOpen && (
        <div
          id="mobile-navigation"
          className="
            max-h-[calc(100dvh-56px)]
            overflow-y-auto
            border-b border-border
            bg-background
            shadow-2xl
            xl:hidden
          "
        >
          <div
            className="
              site-container
              flex flex-col gap-6 py-6
            "
          >
            <nav
              aria-label={t.navigation}
              className="flex flex-col gap-1"
            >
              {navigation.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={closeMenu}
                  aria-current={
                    isActive(item.href)
                      ? 'page'
                      : undefined
                  }
                  className={`
                    flex items-center
                    justify-between
                    rounded-lg px-4 py-3
                    text-sm font-medium
                    transition-colors
                    ${
                      isActive(item.href)
                        ? 'bg-primary/10 text-primary-light'
                        : 'text-text-secondary hover:bg-surface hover:text-foreground'
                    }
                  `}
                >
                  {item.label}

                  <ArrowUpRight
                    size={15}
                    className="opacity-40"
                  />
                </Link>
              ))}
            </nav>

            <div className="border-t border-border" />

            <div className="flex items-center justify-between gap-4">
              <DocumentPicker label={t.resume} />

              {renderLanguageSelector()}
            </div>

            <div className="border-t border-border" />

            <Link
              href={contactPath}
              onClick={closeMenu}
              className="
                btn-primary
                w-full
              "
            >
              {t.startProject}

              <ArrowUpRight size={17} />
            </Link>

            <div className="flex justify-center py-2">
              {renderSocialLinks()}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
