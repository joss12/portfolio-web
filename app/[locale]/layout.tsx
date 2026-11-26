import type { Metadata } from 'next';

import { Geist, Geist_Mono } from 'next/font/google';

import { NextIntlClientProvider } from 'next-intl';

import {
  getMessages,
  setRequestLocale,
} from 'next-intl/server';

import { notFound } from 'next/navigation';

import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ScrollToTop from '@/components/ui/ScrollToTop';
import AnimatedBackground from '@/components/ui/AnimatedBackground';
import BootWrapper from '@/components/ui/BootWrapper';

import {
  SITE_URL,
  SITE_NAME,
  LOCALES,
  type SiteLocale,
  getSeoContent,
  getPageMetadata,
  getStructuredData,
} from '@/lib/seo';

import '../globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
  display: 'swap',
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
  display: 'swap',
});

const themeScript = `
  (function () {
    try {
      var storedTheme = localStorage.getItem('portfolio-theme');

      document.documentElement.dataset.theme =
        storedTheme === 'light' ? 'light' : 'dark';
    } catch (error) {
      document.documentElement.dataset.theme = 'dark';
    }
  })();
`;

interface LocaleLayoutProps {
  children: React.ReactNode;

  params: Promise<{
    locale: string;
  }>;
}

function isSupportedLocale(
  locale: string,
): locale is SiteLocale {
  return LOCALES.includes(locale as SiteLocale);
}

export function generateStaticParams() {
  return LOCALES.map((locale) => ({
    locale,
  }));
}

export async function generateMetadata({
  params,
}: Pick<LocaleLayoutProps, 'params'>): Promise<Metadata> {
  const { locale } = await params;

  if (!isSupportedLocale(locale)) {
    notFound();
  }

  const copy = getSeoContent(locale);

  const pageMetadata = getPageMetadata(
    locale,
    'home',
  );

  return {
    metadataBase: new URL(SITE_URL),

    title: {
      default: copy.home.title,
      template: `%s · ${SITE_NAME}`,
    },

    description: copy.home.description,

    applicationName: SITE_NAME,

    keywords: pageMetadata.keywords,

    authors: [
      {
        name: SITE_NAME,
        url: SITE_URL,
      },
    ],

    creator: SITE_NAME,

    publisher: SITE_NAME,

    openGraph: pageMetadata.openGraph,

    twitter: pageMetadata.twitter,

    robots: pageMetadata.robots,

    category: 'Software Development',
  };
}

export default async function LocaleLayout({
  children,
  params,
}: LocaleLayoutProps) {
  const { locale } = await params;

  if (!isSupportedLocale(locale)) {
    notFound();
  }

  setRequestLocale(locale);

  const messages = await getMessages({
    locale,
  });

  const structuredData =
    getStructuredData(locale);

  return (
    <html
      lang={locale}
      data-theme="dark"
      suppressHydrationWarning
    >
      <head>
        <script
          id="portfolio-theme-init"
          dangerouslySetInnerHTML={{
            __html: themeScript,
          }}
        />
      </head>

      <body
        className={`
          ${geistSans.variable}
          ${geistMono.variable}
          relative
          isolate
          min-h-screen
          bg-background
          font-sans
          text-foreground
          antialiased
        `}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(
              structuredData,
            ).replace(/</g, '\\u003c'),
          }}
        />

        {/* Global animated background */}
        <AnimatedBackground />

        <NextIntlClientProvider
          locale={locale}
          messages={messages}
        >
          <BootWrapper>
            <div className="relative z-0 flex min-h-screen flex-col">
              <Navbar />

              <div className="flex flex-1 flex-col pt-14">
                <div className="flex-1">
                  {children}
                </div>

                <Footer />
              </div>
            </div>

            <ScrollToTop />
          </BootWrapper>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
