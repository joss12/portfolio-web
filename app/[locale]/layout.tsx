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
  title: {
    default: 'Eddy Mouity — Backend Engineer',
    template: '%s · Eddy Mouity',
  },
  description: 'Backend engineering case studies by Eddy Mouity.',
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
