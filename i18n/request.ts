import { getRequestConfig } from 'next-intl/server';
import { routing } from './routing';

import en from '../messages/messages/en.json';
import fr from '../messages/messages/fr.json';
import ko from '../messages/messages/ko.json';

const messages = { en, fr, ko } as Record<string, unknown>;

export default getRequestConfig(async ({ requestLocale }) => {
  const locale = (await requestLocale) ?? routing.defaultLocale;

  return {
    locale,
    messages: messages[locale] as Record<string, unknown>,
  };
});
