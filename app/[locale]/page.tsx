import type { Metadata } from 'next';

import { setRequestLocale } from 'next-intl/server';

import { getPageMetadata } from '@/lib/seo';

import HomePage from './HomePage';

type HomePageProps = {
  params: Promise<{
    locale: string;
  }>;
};

export async function generateMetadata({
  params,
}: HomePageProps): Promise<Metadata> {
  const { locale } = await params;

  return getPageMetadata(
    locale,
    'home',
  );
}

export default async function Page({
  params,
}: HomePageProps) {
  const { locale } = await params;

  setRequestLocale(locale);

  return <HomePage />;
}
