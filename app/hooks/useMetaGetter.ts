export const DESCRIPTION = 'blog for yamakenji';
export const DEFAULT_PAGE_TITLE = 'yamakenji blog';
export const DEFAULT_OG_IMAGE_URL = 'https://og-image-yamakenji.vercel.app/';

export const usePageDescription = (description?: string) => {
  return description ?? DESCRIPTION;
};

export const usePageTitle = (title?: string) => {
  return title ? `${title} | ${DEFAULT_PAGE_TITLE}` : DEFAULT_PAGE_TITLE;
};

export const useOGImageUrl = (title?: string) => {
  return title
    ? `${DEFAULT_OG_IMAGE_URL}${encodeURI(title)}.png`
    : `${DEFAULT_OG_IMAGE_URL}${encodeURI(DEFAULT_PAGE_TITLE)}.png`;
};
