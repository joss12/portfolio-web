'use client';

import { useEffect, useState } from 'react';

const bootLines = [
  { text: '> initializing portfolio...', delay: 0, duration: 150 },
  { text: '> loading projects..............', delay: 200, duration: 200 },
  { text: '> loading case studies..........', delay: 450, duration: 150 },
  { text: '> connecting to Seoul, KR........', delay: 650, duration: 200 },
  { text: '> ready.', delay: 900, duration: 100 },
];
const doneLabels: Record<number, string> = {
  1: ' done',
  2: ' done',
  3: ' done',
};

export default function BootScreen({ onComplete }: { onComplete: () => void }) {
  const [visibleLines, setVisibleLines] = useState<number[]>([]);
  const [doneLines, setDoneLines] = useState<number[]>([]);
  const [fading, setFading] = useState(false);

  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = [];

    bootLines.forEach((line, i) => {
      timers.push(
        setTimeout(() => {
          setVisibleLines((v) => [...v, i]);
        }, line.delay)
      );

      if (doneLabels[i]) {
        timers.push(
          setTimeout(() => {
            setDoneLines((v) => [...v, i]);
          }, line.delay + line.duration)
        );
      }
    });

    timers.push(setTimeout(() => setFading(true), 1100));

    timers.push(setTimeout(() => onComplete(), 1600));

    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-neutral-950"
      style={{
        opacity: fading ? 0 : 1,
        transition: 'opacity 0.8s ease',
      }}
    >
      <div className="w-full max-w-lg px-8">
        <div className="mb-6 flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-full bg-red-500/70" />
          <span className="h-2.5 w-2.5 rounded-full bg-yellow-500/70" />
          <span className="h-2.5 w-2.5 rounded-full bg-green-500/70" />
          <span className="ml-3 font-mono text-xs text-neutral-600">
            Eddy Mouity
          </span>
        </div>

        <div className="flex flex-col gap-3">
          {bootLines.map((line, i) => (
            <div
              key={i}
              className="font-mono text-sm"
              style={{
                opacity: visibleLines.includes(i) ? 1 : 0,
                transform: visibleLines.includes(i)
                  ? 'translateY(0)'
                  : 'translateY(6px)',
                transition: 'opacity 0.3s ease, transform 0.3s ease',
              }}
            >
              {i === bootLines.length - 1 ? (
                <span className="font-semibold text-cyan-400">{line.text}</span>
              ) : (
                <span className="text-neutral-400">
                  {line.text}
                  {doneLabels[i] && (
                    <span
                      className="text-emerald-400"
                      style={{
                        opacity: doneLines.includes(i) ? 1 : 0,
                        transition: 'opacity 0.3s ease',
                      }}
                    >
                      {doneLabels[i]}
                    </span>
                  )}
                </span>
              )}
            </div>
          ))}
        </div>

        {!fading && (
          <div className="mt-4 animate-pulse font-mono text-sm text-cyan-400">
            ▋
          </div>
        )}
      </div>
    </div>
  );
}
