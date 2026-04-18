'use client';

import { useState, useRef, useEffect } from 'react';
import { FileText, X, Download } from 'lucide-react';

const documents = [
  {
    label: 'Resume',
    description: 'Backend Engineer — Go · TypeScript',
    file: '/resume/Eddy_CV_Real-1.pdf',
    type: 'resume',
  },
  {
    label: 'Scholar Certificate',
    description: 'Academic scholarship certificate',
    file: '/resume/33333.pdf',
    type: 'certificate',
  },
  {
    label: 'Certificate of Completion',
    description: 'Course completion certificate',
    file: '/resume/44444.pdf',
    type: 'certificate',
  },
  {
    label: 'IBM Back-end JavaScript Developer',
    description: 'Coursera · IBM',
    file: '/resume/Coursera DR0AMNIBD9VR.pdf',
    type: 'certificate',
  },
];

export default function DocumentPicker({ label }: { label: string }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen((v) => !v)}
        className="rounded border border-neutral-700 px-3 py-1.5 font-mono text-xs text-neutral-300 transition-colors hover:border-cyan-500 hover:text-cyan-400"
      >
        {label}
      </button>

      {open && (
        <div className="absolute top-10 right-0 z-50 w-72 overflow-hidden rounded-xl border border-neutral-800 bg-neutral-950 shadow-2xl">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-neutral-800 px-4 py-3">
            <span className="font-mono text-xs font-semibold tracking-widest text-neutral-500 uppercase">
              Documents
            </span>
            <button
              onClick={() => setOpen(false)}
              className="text-neutral-600 transition-colors hover:text-neutral-400"
            >
              <X size={14} />
            </button>
          </div>

          {/* Document list */}
          <div className="flex flex-col py-2">
            {documents.map((doc) => (
              <a
                key={doc.file}
                href={doc.file}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setOpen(false)}
                className="group flex items-center gap-3 px-4 py-3 transition-colors hover:bg-neutral-900"
              >
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-neutral-800 bg-neutral-900 group-hover:border-cyan-500/30">
                  <FileText size={14} className="text-cyan-400" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-white">
                    {doc.label}
                  </p>
                  <p className="truncate text-xs text-neutral-600">
                    {doc.description}
                  </p>
                </div>
                <Download
                  size={13}
                  className="shrink-0 text-neutral-700 transition-colors group-hover:text-cyan-400"
                />
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
