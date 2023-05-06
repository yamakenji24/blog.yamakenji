import type { LoaderFunction } from '@remix-run/node';
import { json } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import {
  usePageDescription,
  usePageTitle,
  useOGImageUrl,
  getLocaleFromURL,
  useLocale,
} from '~/hooks';
import { getAllENBlogs, Blog } from '~/lib/blogs';
import { BreadCrumb } from '~/components/common';
import { BlogListLayout } from '~/components/blog/BlogListLayout';

type LoaderData = {
  enblogs: Blog[];
  locale: 'en' | 'ja';
};

export const loader: LoaderFunction = async ({ request }) => {
  const locale = getLocaleFromURL(request.url);
  const enblogs = getAllENBlogs();
  const data: LoaderData = { enblogs, locale };

  return json(data, {
    headers: {
      'Cache-Control': 'public, max-age=60 s-maxage=60',
    },
  });
};

export function meta() {
  const description = usePageDescription();
  const title = usePageTitle();
  const ogImage = useOGImageUrl();

  return [
    { title: title },
    { description: description },
    { property: 'og:description', content: description },
    { property: 'og:title', content: title },
    { property: 'og:image', content: ogImage },
    { property: 'twitter:image', content: ogImage },
  ];
}

export default function Index() {
  const { enblogs, locale } = useLoaderData<LoaderData>();
  const { linkTitle } = useLocale(locale);

  return (
    <div className="flex-col">
      <BreadCrumb linkTitle={linkTitle} locale="/en/" />
      <BlogListLayout blogs={enblogs} link="/en/blog/" />
    </div>
  );
}
