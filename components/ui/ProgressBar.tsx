'use client';

import { useEffect, useRef } from 'react';

export default function ProgressBar() {
  const progressRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = progressRef.current;

    if (!element) return;

    let frame: number | null = null;

    function updateProgress() {
      frame = null;

      const scrollTop = window.scrollY;

      const documentHeight =
        document.documentElement.scrollHeight -
        window.innerHeight;

      const progress =
        documentHeight > 0
          ? scrollTop / documentHeight
          : 0;

      const normalizedProgress = Math.min(
        1,
        Math.max(0, progress),
      );

      if (element) {
        element.style.transform =
          `scaleX(${normalizedProgress})`;
      }
    }

    function scheduleUpdate() {
      if (frame !== null) return;

      frame = window.requestAnimationFrame(
        updateProgress,
      );
    }

    scheduleUpdate();

    window.addEventListener(
      'scroll',
      scheduleUpdate,
      { passive: true },
    );

    window.addEventListener(
      'resize',
      scheduleUpdate,
    );

    const resizeObserver =
      typeof ResizeObserver !== 'undefined'
        ? new ResizeObserver(scheduleUpdate)
        : null;

    resizeObserver?.observe(document.body);

    return () => {
      window.removeEventListener(
        'scroll',
        scheduleUpdate,
      );

      window.removeEventListener(
        'resize',
        scheduleUpdate,
      );

      resizeObserver?.disconnect();

      if (frame !== null) {
        window.cancelAnimationFrame(frame);
      }
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      className="
        pointer-events-none
        fixed
        inset-x-0
        top-14
        z-40
        h-0.5
        overflow-hidden
        bg-neutral-800
      "
    >
      <div
        ref={progressRef}
        className="
          h-full
          w-full
          origin-left
          bg-gradient-to-r
          from-cyan-500
          to-blue-500
        "
        style={{
          transform: 'scaleX(0)',
        }}
      />
    </div>
  );
}
