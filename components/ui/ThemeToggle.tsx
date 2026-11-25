'use client';

import { useSyncExternalStore } from 'react';
import { useLocale } from 'next-intl';
import { Moon, Sun } from 'lucide-react';

type Theme = 'light' | 'dark';

const STORAGE_KEY = 'portfolio-theme';
const THEME_EVENT = 'portfolio-theme-change';

const translations = {
  en: {
    light: 'Switch to light mode',
    dark: 'Switch to dark mode',
  },
  ko: {
    light: '라이트 모드로 전환',
    dark: '다크 모드로 전환',
  },
  fr: {
    light: 'Activer le thème clair',
    dark: 'Activer le thème sombre',
  },
};

function getTheme(): Theme {
  return document.documentElement.dataset.theme === 'light'
    ? 'light'
    : 'dark';
}

function getServerTheme(): Theme {
  return 'dark';
}

function subscribe(callback: () => void) {
  function handleStorage(event: StorageEvent) {
    if (event.key !== STORAGE_KEY && event.key !== null) {
      return;
    }

    document.documentElement.dataset.theme =
      event.newValue === 'light' ? 'light' : 'dark';

    callback();
  }

  window.addEventListener(THEME_EVENT, callback);
  window.addEventListener('storage', handleStorage);

  return () => {
    window.removeEventListener(THEME_EVENT, callback);
    window.removeEventListener('storage', handleStorage);
  };
}

export default function ThemeToggle() {
  const locale = useLocale();

  const theme = useSyncExternalStore(
    subscribe,
    getTheme,
    getServerTheme,
  );

  const t =
    translations[locale as keyof typeof translations] ??
    translations.en;

  const isDark = theme === 'dark';

  const label = isDark ? t.light : t.dark;

  function toggleTheme() {
    const nextTheme: Theme =
      getTheme() === 'dark' ? 'light' : 'dark';

    document.documentElement.dataset.theme = nextTheme;

    try {
      localStorage.setItem(STORAGE_KEY, nextTheme);
    } catch {
      // Theme switching still works without storage.
    }

    window.dispatchEvent(new Event(THEME_EVENT));
  }

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={label}
      title={label}
      className="
        relative inline-flex h-9 w-9 shrink-0
        items-center justify-center
        overflow-hidden rounded-lg
        border border-border
        bg-surface text-text-secondary
        transition-all duration-300
        hover:border-primary/40
        hover:bg-surface-hover
        hover:text-primary-light
        active:scale-95
      "
    >
      <Sun
        aria-hidden="true"
        size={18}
        strokeWidth={1.8}
        className="
          theme-icon-sun absolute
          transition-all duration-300
        "
      />

      <Moon
        aria-hidden="true"
        size={18}
        strokeWidth={1.8}
        className="
          theme-icon-moon absolute
          transition-all duration-300
        "
      />
    </button>
  );
}
