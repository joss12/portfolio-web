'use client';

import { useEffect, useState } from 'react';

import { useLocale } from 'next-intl';

import { ArrowUp } from 'lucide-react';

const labels = {
  en: 'Back to top',
  ko: '맨 위로 이동',
  fr: 'Retour en haut',
} as const;

export default function ScrollToTop() {
  const locale = useLocale();

  const language =
    locale === 'ko' || locale === 'fr'
      ? locale
      : 'en';

  const label = labels[language];

  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let frame: number | null = null;

    let previousVisibility = false;

    function update() {
      frame = null;

      const nextVisibility =
        window.scrollY > 400;

      if (nextVisibility !== previousVisibility) {
        previousVisibility = nextVisibility;

        setVisible(nextVisibility);
      }
    }

    function handleScroll() {
      if (frame !== null) return;

      frame = window.requestAnimationFrame(update);
    }

    handleScroll();

    window.addEventListener(
      'scroll',
      handleScroll,
      { passive: true },
    );

    return () => {
      window.removeEventListener(
        'scroll',
        handleScroll,
      );

      if (frame !== null) {
        window.cancelAnimationFrame(frame);
      }
    };
  }, []);

  function scrollToTop() {
    const reducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches;

    window.scrollTo({
      top: 0,

      behavior: reducedMotion
        ? 'instant'
        : 'smooth',
    });
  }

  if (!visible) {
    return null;
  }

  return (
    <button
      type="button"
      onClick={scrollToTop}
      aria-label={label}
      title={label}
      className="
        fixed
        right-4
        bottom-4
        z-50
        flex
        h-11
        w-11
        items-center
        justify-center
        rounded-full
        border
        border-neutral-700
        bg-neutral-900
        text-neutral-300
        shadow-lg
        transition-colors
        hover:border-indigo-500
        hover:text-indigo-400
        focus-visible:outline-2
        focus-visible:outline-offset-4
        focus-visible:outline-indigo-400
        sm:right-8
        sm:bottom-8
        motion-reduce:transition-none
      "
    >
      <ArrowUp
        size={18}
        aria-hidden="true"
      />
    </button>
  );
}
