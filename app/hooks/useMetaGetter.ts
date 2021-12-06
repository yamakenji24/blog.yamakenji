import { useMemo } from 'react';

export const DESCRIPTION = 'blog for yamakenji';
export const DEFAULT_PAGE_TITLE = 'yamakenji blog';
export const DEFAULT_OG_IMAGE_URL = 'https://og-image-yamakenji.vercel.app/';

export const usePageDescription = (description?: string) => {
  return useMemo(() => description ?? DESCRIPTION, [description]);
};

export const usePageTitle = (title?: string) => {
  return useMemo(() => (title ? `${title} | ${DEFAULT_PAGE_TITLE}` : DEFAULT_PAGE_TITLE), [title]);
};

export const useOGImageUrl = (title?: string) => {
  return useMemo(
    () =>
      title
        ? `${DEFAULT_OG_IMAGE_URL}${encodeURI(title)}.png`
        : `${DEFAULT_OG_IMAGE_URL}${encodeURI(DEFAULT_PAGE_TITLE)}.png`,
    [title],
  );
};
