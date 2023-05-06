import { renderHook } from '@testing-library/react';
import { RecoilRoot } from 'recoil';
import { getLocaleFromURL, useLocale } from '.';
import { i18nData } from '../lib/i18n';

describe('getLocaleFromURL', () => {
  const dummy_url = 'https://example.com';

  test('should get ja locale from url', () => {
    expect(getLocaleFromURL(dummy_url)).toBe('ja');
    expect(getLocaleFromURL(`${dummy_url}/tag/sample`)).toBe('ja');
    expect(getLocaleFromURL(`${dummy_url}/category/sample`)).toBe('ja');
    expect(getLocaleFromURL(`${dummy_url}/blog/sample`)).toBe('ja');
  });

  test('shold get en locale from url', () => {
    expect(getLocaleFromURL(`${dummy_url}/en/`)).toBe('en');
    expect(getLocaleFromURL(`${dummy_url}/en/tag/sample`)).toBe('en');
    expect(getLocaleFromURL(`${dummy_url}/en/category/sample`)).toBe('en');
    expect(getLocaleFromURL(`${dummy_url}/en/blog/sample`)).toBe('en');
  });
});

describe('useLocale', () => {
  test('should get ja data from i18nData', () => {
    const { result } = renderHook(() => useLocale('ja'), {
      wrapper: RecoilRoot,
    });
    expect(result.current.linkTitle).toBe(i18nData.ja.linkTitle);
    expect(result.current.link).toBe(i18nData.ja.link);
  });

  test('should get en data from i18nData', () => {
    const { result } = renderHook(() => useLocale('en'), {
      wrapper: RecoilRoot,
    });
    expect(result.current.linkTitle).toBe(i18nData.en.linkTitle);
    expect(result.current.link).toBe(i18nData.en.link);
  });
});
