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
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://www.eddymouity.dev'),
  title: {
    default: 'Eddy Mouity — Backend Engineer',
    template: '%s · Eddy Mouity',
  },
  description:
    'Backend engineer based in Seoul, building production-ready systems with Go, TypeScript, Node.js, PostgreSQL, Redis, and distributed systems.',
  keywords: [
    'Eddy Mouity',
    'Backend Engineer',
    'Go Developer',
    'TypeScript Developer',
    'Node.js Developer',
    'Software Engineer Seoul',
    'Distributed Systems',
    'API Development',
  ],
  authors: [{ name: 'Eddy Mouity' }],
  creator: 'Eddy Mouity',
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    url: 'https://www.eddymouity.dev',
    title: 'Eddy Mouity — Backend Engineer',
    description:
      'Backend engineer building production-ready systems with Go, TypeScript, Node.js, PostgreSQL, Redis, and distributed systems.',
    siteName: 'Eddy Mouity',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary',
    title: 'Eddy Mouity — Backend Engineer',
    description:
      'Backend engineer building production-ready systems with Go, TypeScript, Node.js, PostgreSQL, Redis, and distributed systems.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body
        className={`${geistSans.variable} ${geistMono.variable} text-white antialiased`}
      >
        <NextIntlClientProvider messages={messages}>
          <Navbar />
          <div className="pt-14">
            {children}
            <Footer />
          </div>
          <ScrollToTop />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
