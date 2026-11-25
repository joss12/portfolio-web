import type { Metadata } from 'next';

import { setRequestLocale } from 'next-intl/server';

import { getPageMetadata } from '@/lib/seo';

import AboutPage from './AboutPage';

type AboutPageProps = {
  params: Promise<{
    locale: string;
  }>;
};

export async function generateMetadata({
  params,
}: AboutPageProps): Promise<Metadata> {
  const { locale } = await params;

  return getPageMetadata(
    locale,
    'about',
  );
}

export default async function Page({
  params,
}: AboutPageProps) {
  const { locale } = await params;

  setRequestLocale(locale);

  return <AboutPage params={params} />;
}
