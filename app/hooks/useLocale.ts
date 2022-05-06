import { atom, selector, useRecoilCallback, useRecoilValue } from 'recoil';
import { useEffect } from 'react';
import i18nData from '~/lib/i18n.json';

export type Locale = 'en' | 'ja';

export const localeState = atom<Locale>({
  key: 'localeState',
  default: 'ja',
});

const localeSelector = selector<Locale>({
  key: 'localeSelector',
  get: ({ get }) => get(localeState),
});

export const useGetLocale = () => useRecoilValue(localeSelector);

export const useCreateDispatcher = () => {
  const updateLocale = useRecoilCallback(({ set }) => (locale: Locale) => {
    set(localeState, locale);
  });

  return {
    updateLocale,
  };
};

export const getLocaleFromURL = (url: string) => {
  const _url = new URL(url);
  return _url.pathname.split('/')[1] === 'en' ? 'en' : 'ja';
};

export const useLocale = (locale: 'en' | 'ja') => {
  const dispatcher = useCreateDispatcher();
  const linkTitle = i18nData[locale].linkTitle;
  const link = i18nData[locale].link;

  useEffect(() => dispatcher.updateLocale(locale), [dispatcher, locale]);

  return { linkTitle, link };
};
