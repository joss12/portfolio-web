'use client';

import Link from 'next/link';

import {
  usePathname,
  useRouter,
} from 'next/navigation';

import {
  useEffect,
  useRef,
  useState,
} from 'react';

import { useLocale } from 'next-intl';

import {
  ArrowUpRight,
  ChevronDown,
  Check,
  Github,
  Linkedin,
  Globe2,
  Menu,
  X,
} from 'lucide-react';

import DocumentPicker from '@/components/ui/DocumentPicker';
import ThemeToggle from '@/components/ui/ThemeToggle';

const locales = [
  {
    code: 'en',
    label: 'EN',
    name: 'English',
  },
  {
    code: 'ko',
    label: 'KO',
    name: '한국어',
  },
  {
    code: 'fr',
    label: 'FR',
    name: 'Français',
  },
] as const;

type SupportedLocale =
  (typeof locales)[number]['code'];

type NavigationId =
  | 'home'
  | 'services'
  | 'projects'
  | 'engineering'
  | 'about'
  | 'contact';

const translations = {
  en: {
    home: 'Home',
    services: 'Services',
    projects: 'Projects',
    engineering: 'Lab',
    about: 'About',
    contact: 'Contact',
    resume: 'Résumé',
    startProject: "Let's Talk",
    role: 'Software Developer',
    openMenu: 'Open menu',
    closeMenu: 'Close menu',
    navigation: 'Main navigation',
    language: 'Select language',
    availability: 'Available for new opportunities',
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
    availability: '새로운 프로젝트 및 채용 기회 환영',
  },

  fr: {
    home: 'Accueil',
    services: 'Services',
    projects: 'Projets',
    engineering: 'Laboratoire',
    about: 'À propos',
    contact: 'Contact',
    resume: 'CV',
    startProject: 'Discutons',
    role: 'Développeur logiciel',
    openMenu: 'Ouvrir le menu',
    closeMenu: 'Fermer le menu',
    navigation: 'Navigation principale',
    language: 'Choisir la langue',
    availability: 'Disponible pour de nouvelles opportunités',
  },
} as const;

const sectionIds = [
  'services',
  'projects',
  'engineering',
  'skills',
  'about',
  'contact',
] as const;

function getSupportedLocale(
  locale: string,
): SupportedLocale {
  if (locale === 'ko' || locale === 'fr') {
    return locale;
  }

  return 'en';
}

export default function Navbar() {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();

  const language = getSupportedLocale(locale);
  const t = translations[language];

  const [menuOpen, setMenuOpen] =
    useState(false);

  const [languageOpen, setLanguageOpen] =
    useState(false);

  const [scrolled, setScrolled] =
    useState(false);

  const [activeSection, setActiveSection] =
    useState<NavigationId>('home');

  const languageRef =
    useRef<HTMLDivElement>(null);

  const languageButtonRef =
    useRef<HTMLButtonElement>(null);

  const menuButtonRef =
    useRef<HTMLButtonElement>(null);

  const homePath = `/${locale}`;
  const contactPath = `${homePath}/contact`;

  const currentPath =
    pathname.replace(/\/$/, '') || '/';

  const isHomePage =
    currentPath === homePath;

  const currentLanguage =
    locales.find(
      (item) => item.code === language,
    ) ?? locales[0];

  const navigation: {
    id: NavigationId;
    label: string;
    href: string;
  }[] = [
    {
      id: 'home',
      label: t.home,
      href: homePath,
    },
    {
      id: 'services',
      label: t.services,
      href: `${homePath}#services`,
    },
    {
      id: 'projects',
      label: t.projects,
      href: `${homePath}#projects`,
    },
    {
      id: 'engineering',
      label: t.engineering,
      href: `${homePath}#engineering`,
    },
    {
      id: 'about',
      label: t.about,
      href: `${homePath}/about`,
    },
    {
      id: 'contact',
      label: t.contact,
      href: contactPath,
    },
  ];

  // Track scroll position and active section.

  useEffect(() => {
    let frameId = 0;

    function updateScrollState() {
      setScrolled(window.scrollY > 20);

      if (!isHomePage) return;

      const offset = 150;

      let current: NavigationId = 'home';

      for (const id of sectionIds) {
        const section =
          document.getElementById(id);

        if (!section) continue;

        const rect =
          section.getBoundingClientRect();

        if (rect.top <= offset) {
          current =
            id === 'skills'
              ? 'engineering'
              : id;
        }
      }

      setActiveSection(current);
    }

    function handleScroll() {
      cancelAnimationFrame(frameId);

      frameId = requestAnimationFrame(
        updateScrollState,
      );
    }

    updateScrollState();

    window.addEventListener(
      'scroll',
      handleScroll,
      { passive: true },
    );

    window.addEventListener(
      'resize',
      handleScroll,
    );

    window.addEventListener(
      'hashchange',
      handleScroll,
    );

    return () => {
      cancelAnimationFrame(frameId);

      window.removeEventListener(
        'scroll',
        handleScroll,
      );

      window.removeEventListener(
        'resize',
        handleScroll,
      );

      window.removeEventListener(
        'hashchange',
        handleScroll,
      );
    };
  }, [isHomePage, pathname]);

  // Close language dropdown on outside click.

  useEffect(() => {
    if (!languageOpen) return;

    function handleOutsideClick(
      event: PointerEvent,
    ) {
      if (
        languageRef.current &&
        !languageRef.current.contains(
          event.target as Node,
        )
      ) {
        setLanguageOpen(false);
      }
    }

    document.addEventListener(
      'pointerdown',
      handleOutsideClick,
    );

    return () => {
      document.removeEventListener(
        'pointerdown',
        handleOutsideClick,
      );
    };
  }, [languageOpen]);

  // Keyboard dismissal.

  useEffect(() => {
    function handleKeyDown(
      event: KeyboardEvent,
    ) {
      if (event.key !== 'Escape') return;

      if (languageOpen) {
        setLanguageOpen(false);

        languageButtonRef.current?.focus();

        return;
      }

      if (menuOpen) {
        setMenuOpen(false);

        menuButtonRef.current?.focus();
      }
    }

    document.addEventListener(
      'keydown',
      handleKeyDown,
    );

    return () => {
      document.removeEventListener(
        'keydown',
        handleKeyDown,
      );
    };
  }, [languageOpen, menuOpen]);

  // Responsive menu behavior.

  useEffect(() => {
    const mediaQuery = window.matchMedia(
      '(min-width: 1280px)',
    );

    function handleBreakpoint(
      event: MediaQueryListEvent,
    ) {
      if (event.matches) {
        setMenuOpen(false);
      } else {
        setLanguageOpen(false);
      }
    }

    mediaQuery.addEventListener(
      'change',
      handleBreakpoint,
    );

    return () => {
      mediaQuery.removeEventListener(
        'change',
        handleBreakpoint,
      );
    };
  }, []);

  function isActive(
    id: NavigationId,
  ): boolean {
    if (isHomePage) {
      return activeSection === id;
    }

    if (id === 'projects') {
      return currentPath.startsWith(
        `${homePath}/projects/`,
      );
    }

    if (id === 'about') {
      return (
        currentPath ===
        `${homePath}/about`
      );
    }

    if (id === 'contact') {
      return currentPath === contactPath;
    }

    return false;
  }

  function closeMenus() {
    setMenuOpen(false);
    setLanguageOpen(false);
  }

  function handleNavigation(
    id: NavigationId,
  ) {
    setActiveSection(id);
    closeMenus();
  }

  function switchLocale(
    newLocale: SupportedLocale,
  ) {
    closeMenus();

    if (newLocale === locale) return;

    const segments = pathname.split('/');

    segments[1] = newLocale;

    const nextPath = segments.join('/');

    const query = window.location.search;
    const hash = window.location.hash;

    router.push(
      `${nextPath}${query}${hash}`,
    );
  }

  return (
    <header
      className={`
        fixed inset-x-0 top-0 z-50
        h-14 border-b
        backdrop-blur-xl
        transition-all duration-300
        ${
          scrolled
            ? `
              border-border
              bg-background/95
              shadow-lg shadow-black/10
            `
            : `
              border-border/70
              bg-background/80
            `
        }
      `}
    >
      <div
        className="
          site-container flex h-full
          items-center justify-between
          gap-3
        "
      >
        {/* Brand */}

        <Link
          href={homePath}
          onClick={() =>
            handleNavigation('home')
          }
          className="
            group flex shrink-0
            items-center gap-3
          "
        >
          <div
            className="
              relative flex h-9 w-9
              items-center justify-center
              overflow-hidden rounded-lg
              border border-primary/30
              bg-primary/10
              text-sm font-bold
              tracking-tight
              text-primary-light
              transition-all
              group-hover:border-primary/60
              group-hover:bg-primary/20
            "
          >
            EM
          </div>

          <div className="flex flex-col">
            <span
              className="
                text-sm font-semibold
                leading-tight
                tracking-tight
                text-foreground
              "
            >
              Eddy Mouity
            </span>

            <span
              className="
                mt-0.5 text-[10px]
                leading-tight
                text-text-muted
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
            hidden h-full items-center
            gap-4 xl:flex
          "
        >
          {navigation.map((item) => {
            const active =
              isActive(item.id);

            return (
              <Link
                key={item.id}
                href={item.href}
                onClick={() =>
                  handleNavigation(item.id)
                }
                aria-current={
                  active
                    ? isHomePage &&
                      item.id !== 'home'
                      ? 'location'
                      : 'page'
                    : undefined
                }
                className={`
                  relative flex h-full
                  items-center
                  whitespace-nowrap
                  text-[13px] font-medium
                  transition-colors
                  ${
                    active
                      ? 'text-primary-light'
                      : `
                        text-text-secondary
                        hover:text-foreground
                      `
                  }
                `}
              >
                {item.label}

                <span
                  aria-hidden="true"
                  className={`
                    absolute inset-x-0
                    bottom-0 h-0.5
                    rounded-full
                    bg-primary
                    transition-all
                    duration-300
                    ${
                      active
                        ? 'scale-x-100 opacity-100'
                        : 'scale-x-0 opacity-0'
                    }
                  `}
                />
              </Link>
            );
          })}
        </nav>

        {/* Desktop actions */}

        <div
          className="
            hidden shrink-0
            items-center gap-2
            xl:flex
          "
        >
          <DocumentPicker
            label={t.resume}
          />

          {/* Language dropdown */}

          <div
            ref={languageRef}
            className="relative"
          >
            <button
              ref={languageButtonRef}
              type="button"
              aria-label={t.language}
              aria-expanded={languageOpen}
              aria-controls="desktop-language-options"
              onClick={() =>
                setLanguageOpen(
                  (value) => !value,
                )
              }
              className="
                inline-flex h-9
                items-center gap-2
                rounded-lg
                border border-border
                bg-surface px-3
                text-xs font-medium
                text-text-secondary
                transition-colors
                hover:border-primary/30
                hover:text-foreground
              "
            >
              <Globe2
                size={15}
                strokeWidth={1.8}
              />

              {currentLanguage.label}

              <ChevronDown
                size={13}
                className={`
                  transition-transform
                  duration-200
                  ${
                    languageOpen
                      ? 'rotate-180'
                      : ''
                  }
                `}
              />
            </button>

            {languageOpen && (
              <div
                id="desktop-language-options"
                role="group"
                aria-label={t.language}
                className="
                  absolute right-0
                  top-full mt-3
                  w-44 overflow-hidden
                  rounded-xl
                  border border-border
                  bg-surface p-1.5
                  shadow-2xl
                  shadow-black/30
                "
              >
                {locales.map((item) => {
                  const selected =
                    language === item.code;

                  return (
                    <button
                      key={item.code}
                      type="button"
                      aria-pressed={selected}
                      onClick={() =>
                        switchLocale(item.code)
                      }
                      className={`
                        flex w-full
                        items-center
                        justify-between
                        gap-3 rounded-lg
                        px-3 py-2.5
                        text-left text-sm
                        transition-colors
                        ${
                          selected
                            ? `
                              bg-primary/10
                              text-primary-light
                            `
                            : `
                              text-text-secondary
                              hover:bg-surface-hover
                              hover:text-foreground
                            `
                        }
                      `}
                    >
                      <span
                        className="
                          flex items-center gap-3
                        "
                      >
                        <span
                          className="
                            font-mono
                            text-[10px]
                            text-text-muted
                          "
                        >
                          {item.label}
                        </span>

                        {item.name}
                      </span>

                      {selected && (
                        <Check size={15} />
                      )}
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* Desktop theme toggle */}

          <ThemeToggle />

          {/* Primary commercial CTA */}

          <Link
            href={contactPath}
            onClick={closeMenus}
            className="
              inline-flex h-9
              items-center justify-center
              gap-2 whitespace-nowrap
              rounded-lg bg-primary
              px-4 text-xs font-semibold
              text-white
              transition-all
              hover:bg-primary-hover
              hover:shadow-lg
              hover:shadow-primary/20
            "
          >
            {t.startProject}

            <ArrowUpRight size={15} />
          </Link>
        </div>

        {/* Mobile actions */}

        <div
          className="
            flex shrink-0 items-center
            gap-2 xl:hidden
          "
        >
          <Link
            href={contactPath}
            onClick={closeMenus}
            className="
              hidden h-9
              items-center gap-2
              rounded-lg bg-primary
              px-3 text-xs font-semibold
              text-white
              hover:bg-primary-hover
              sm:inline-flex
            "
          >
            {t.startProject}

            <ArrowUpRight size={14} />
          </Link>

          {/* Mobile theme toggle */}

          <ThemeToggle />

          {/* Mobile menu button */}

          <button
            ref={menuButtonRef}
            type="button"
            aria-label={
              menuOpen
                ? t.closeMenu
                : t.openMenu
            }
            aria-expanded={menuOpen}
            aria-controls="mobile-navigation"
            onClick={() =>
              setMenuOpen(
                (value) => !value,
              )
            }
            className="
              flex h-10 w-10
              items-center justify-center
              rounded-lg
              border border-border
              bg-surface
              text-text-secondary
              transition-colors
              hover:border-primary/30
              hover:text-foreground
            "
          >
            {menuOpen ? (
              <X size={21} />
            ) : (
              <Menu size={21} />
            )}
          </button>
        </div>
      </div>

      {/* Mobile navigation */}

      {menuOpen && (
        <>
          {/* Background overlay */}

          <button
            type="button"
            tabIndex={-1}
            aria-label={t.closeMenu}
            onClick={closeMenus}
            className="
              fixed inset-x-0
              top-14 h-[calc(100dvh-56px)]
              bg-black/50
              backdrop-blur-sm
              xl:hidden
            "
          />

          <div
            id="mobile-navigation"
            className="
              relative z-10
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
                flex flex-col gap-6
                py-6
              "
            >
              {/* Availability */}

              <div
                className="
                  flex items-center gap-3
                  rounded-xl
                  border border-success/15
                  bg-success/5
                  px-4 py-3
                  text-xs text-success
                "
              >
                <span className="status-dot" />

                {t.availability}
              </div>

              {/* Mobile links */}

              <nav
                aria-label={t.navigation}
                className="flex flex-col gap-1"
              >
                {navigation.map((item) => {
                  const active =
                    isActive(item.id);

                  return (
                    <Link
                      key={item.id}
                      href={item.href}
                      onClick={() =>
                        handleNavigation(item.id)
                      }
                      aria-current={
                        active
                          ? isHomePage &&
                            item.id !== 'home'
                            ? 'location'
                            : 'page'
                          : undefined
                      }
                      className={`
                        flex items-center
                        justify-between
                        rounded-xl px-4 py-3.5
                        text-sm font-medium
                        transition-colors
                        ${
                          active
                            ? `
                              bg-primary/10
                              text-primary-light
                            `
                            : `
                              text-text-secondary
                              hover:bg-surface
                              hover:text-foreground
                            `
                        }
                      `}
                    >
                      {item.label}

                      <ArrowUpRight
                        size={16}
                        className={
                          active
                            ? 'opacity-100'
                            : 'opacity-40'
                        }
                      />
                    </Link>
                  );
                })}
              </nav>

              {/* Language selector */}

              <div
                className="
                  border-t border-border
                  pt-6
                "
              >
                <p
                  className="
                    mb-3 text-xs font-medium
                    text-text-muted
                  "
                >
                  {t.language}
                </p>

                <div className="grid grid-cols-3 gap-2">
                  {locales.map((item) => {
                    const selected =
                      language === item.code;

                    return (
                      <button
                        key={item.code}
                        type="button"
                        aria-pressed={selected}
                        onClick={() =>
                          switchLocale(item.code)
                        }
                        className={`
                          flex flex-col
                          items-center
                          justify-center
                          gap-1 rounded-xl
                          border px-2 py-3
                          transition-colors
                          ${
                            selected
                              ? `
                                border-primary/30
                                bg-primary/10
                                text-primary-light
                              `
                              : `
                                border-border
                                bg-surface
                                text-text-secondary
                                hover:border-primary/30
                              `
                          }
                        `}
                      >
                        <span
                          className="
                            text-xs font-semibold
                          "
                        >
                          {item.label}
                        </span>

                        <span className="text-[11px]">
                          {item.name}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Resume and social profiles */}

              <div
                className="
                  flex items-center
                  justify-between gap-4
                  border-t border-border
                  pt-6
                "
              >
                <DocumentPicker
                  label={t.resume}
                />

                <div className="flex items-center gap-3">
                  <a
                    href="https://github.com/joss12"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="GitHub"
                    className="
                      flex h-10 w-10
                      items-center justify-center
                      rounded-lg
                      border border-border
                      bg-surface
                      text-text-secondary
                      hover:text-foreground
                    "
                  >
                    <Github size={19} />
                  </a>

                  <a
                    href="https://www.linkedin.com/in/eddymouity"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="LinkedIn"
                    className="
                      flex h-10 w-10
                      items-center justify-center
                      rounded-lg
                      border border-border
                      bg-surface
                      text-text-secondary
                      hover:text-foreground
                    "
                  >
                    <Linkedin size={19} />
                  </a>
                </div>
              </div>

              {/* Mobile CTA */}

              <Link
                href={contactPath}
                onClick={closeMenus}
                className="btn-primary w-full"
              >
                {t.startProject}

                <ArrowUpRight size={17} />
              </Link>
            </div>
          </div>
        </>
      )}
    </header>
  );
}
