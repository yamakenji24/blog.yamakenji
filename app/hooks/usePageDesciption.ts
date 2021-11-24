import { useMemo } from 'react';

export const DESCRIPTION = 'blog for yamakenji';
export const usePageDescription = (description?: string) => {
  return useMemo(() => description ?? DESCRIPTION, [description]);
};
