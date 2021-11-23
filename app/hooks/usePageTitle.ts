import { useMemo } from 'react';

export const DEFAULT_PAGE_TITLE = 'yamakenji blog';
export const usePageTitle = (title?: string) => {
  return useMemo(() => (title ? `${title} | ${DEFAULT_PAGE_TITLE}` : DEFAULT_PAGE_TITLE), [title]);
};
