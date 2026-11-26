import type { ReactNode } from 'react';

interface BootWrapperProps {
  children: ReactNode;
}

export default function BootWrapper({
  children,
}: BootWrapperProps) {
  return (
    <>
      <style>{`
        .portfolio-boot-overlay {
          position: fixed;
          inset: 0;
          z-index: 9999;

          display: flex;
          align-items: center;
          justify-content: center;

          background: var(--background);
          pointer-events: none;

          animation:
            portfolio-boot-exit
            350ms
            cubic-bezier(0.22, 1, 0.36, 1)
            500ms
            both;
        }

        .portfolio-boot-content {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 24px;

          animation:
            portfolio-boot-enter
            350ms
            cubic-bezier(0.22, 1, 0.36, 1)
            both;
        }

        .portfolio-boot-monogram {
          display: flex;
          align-items: center;
          justify-content: center;

          width: 76px;
          height: 76px;

          border: 1px solid var(--border);
          border-radius: 22px;

          background: var(--surface);
          color: var(--foreground);

          box-shadow:
            0 12px 40px
            rgba(0, 0, 0, 0.08);
        }

        .portfolio-boot-track {
          position: relative;

          width: 100px;
          height: 2px;

          overflow: hidden;
          border-radius: 999px;

          background: var(--border);
        }

        .portfolio-boot-progress {
          position: absolute;
          inset: 0;

          border-radius: inherit;

          background: linear-gradient(
            90deg,
            var(--primary),
            var(--accent)
          );

          transform-origin: left;

          animation:
            portfolio-boot-progress
            500ms
            cubic-bezier(0.22, 1, 0.36, 1)
            both;
        }

        .portfolio-boot-page {
          display: contents;
        }

        @keyframes portfolio-boot-enter {
          from {
            opacity: 0;
            transform: translateY(10px) scale(0.94);
          }

          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        @keyframes portfolio-boot-progress {
          from {
            transform: scaleX(0);
          }

          to {
            transform: scaleX(1);
          }
        }

        @keyframes portfolio-boot-exit {
          from {
            opacity: 1;
            visibility: visible;
            transform: translateY(0);
          }

          to {
            opacity: 0;
            visibility: hidden;
            transform: translateY(-12px);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .portfolio-boot-overlay {
            display: none;
          }

          .portfolio-boot-content,
          .portfolio-boot-progress {
            animation: none;
          }
        }
      `}</style>

      <div
        className="portfolio-boot-overlay"
        aria-hidden="true"
      >
        <div className="portfolio-boot-content">

          {/* EM monogram */}

          <div className="portfolio-boot-monogram">
            <svg
              width="46"
              height="46"
              viewBox="0 0 64 64"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M8 17H27M8 17V47M8 32H23M8 47H27"
                stroke="currentColor"
                strokeWidth="4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />

              <path
                d="M35 47V17L45 32L55 17V47"
                stroke="currentColor"
                strokeWidth="4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>

          {/* Animated progress line */}

          <div className="portfolio-boot-track">
            <div className="portfolio-boot-progress" />
          </div>

        </div>
      </div>

      <div className="portfolio-boot-page">
        {children}
      </div>
    </>
  );
}
