import type { Metadata } from 'next';

import { setRequestLocale } from 'next-intl/server';

import { getPageMetadata } from '@/lib/seo';

import ContactForm from './ContactForm';

type ContactPageProps = {
  params: Promise<{
    locale: string;
  }>;

  searchParams: Promise<{
    service?: string | string[];
  }>;
};

export async function generateMetadata({
  params,
}: ContactPageProps): Promise<Metadata> {
  const { locale } = await params;

  return getPageMetadata(
    locale,
    'contact',
  );
}

export default async function ContactPage({
  params,
  searchParams,
}: ContactPageProps) {
  const { locale } = await params;

  setRequestLocale(locale);

  const query = await searchParams;

  const initialService =
    typeof query.service === 'string'
      ? query.service
      : '';

  return (
    <ContactForm
      key={initialService}
      initialService={initialService}
    />
  );
}
