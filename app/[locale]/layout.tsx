import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';

import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ScrollToTop from '@/components/ui/ScrollToTop';

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

const siteUrl = 'https://www.eddymouity.dev';

const siteTitle =
  'Eddy Mouity — Independent Software Developer';

const siteDescription =
  'Independent software developer based in South Korea. Building custom web applications, e-commerce platforms, secure backend systems, APIs and digital solutions for businesses and startups.';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),

  title: {
    default: siteTitle,
    template: '%s · Eddy Mouity',
  },

  description: siteDescription,

  applicationName: 'Eddy Mouity',

  keywords: [
    'Eddy Mouity',
    'Independent Software Developer',
    'Freelance Software Developer',
    'Backend Developer',
    'Full Stack Developer',
    'Software Developer South Korea',
    'Software Developer Gyeonggi-do',
    'Custom Software Development',
    'Web Application Development',
    'E-Commerce Development',
    'Backend Development',
    'API Development',
    'MVP Development',
    'Business Software',
    'Go Developer',
    'Golang Developer',
    'Java Developer',
    'Spring Boot Developer',
    'Node.js Developer',
    'TypeScript Developer',
    'React Developer',
    'Next.js Developer',
    '소프트웨어 개발자',
    '백엔드 개발자',
    '웹 개발자',
    '프리랜서 개발자',
    '웹 애플리케이션 개발',
  ],

  authors: [
    {
      name: 'Eddy Mouity',
      url: siteUrl,
    },
  ],

  creator: 'Eddy Mouity',

  publisher: 'Eddy Mouity',

  openGraph: {
    type: 'website',
    url: siteUrl,
    title: siteTitle,
    description: siteDescription,
    siteName: 'Eddy Mouity',
    locale: 'en_US',
    alternateLocale: ['ko_KR', 'fr_FR'],
  },

  twitter: {
    card: 'summary',
    title: siteTitle,
    description: siteDescription,
  },

  robots: {
    index: true,
    follow: true,

    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },

  category: 'Software Development',
};

interface LocaleLayoutProps {
  children: React.ReactNode;

  params: Promise<{
    locale: string;
  }>;
}

export default async function LocaleLayout({
  children,
  params,
}: LocaleLayoutProps) {
  const { locale } = await params;

  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body
        className={`
          ${geistSans.variable}
          ${geistMono.variable}
          min-h-screen
          bg-background
          font-sans
          text-foreground
          antialiased
        `}
      >
        <NextIntlClientProvider
          locale={locale}
          messages={messages}
        >
          <div className="flex min-h-screen flex-col">
            <Navbar />

            <div className="flex flex-1 flex-col pt-14">
              <div className="flex-1">
                {children}
              </div>

              <Footer />
            </div>
          </div>

          <ScrollToTop />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
