import type { MetaFunction, LoaderFunction } from '@remix-run/node';
import { json } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';

import {
  usePageDescription,
  usePageTitle,
  useOGImageUrl,
  getLocaleFromURL,
  useLocale,
} from '~/hooks';
import { getAllBlogs, Blog } from '~/lib/blogs';
import { BreadCrumb } from '~/components/common';
import { BlogListLayout } from '~/components/blog/BlogListLayout';

type LoaderData = {
  blogs: Blog[];
  locale: 'en' | 'ja';
};

export const loader: LoaderFunction = async ({ request }) => {
  const locale = getLocaleFromURL(request.url);
  const blogs = getAllBlogs();
  const data: LoaderData = { blogs, locale };

  return json(data, {
    headers: {
      'Cache-Control': 'public, max-age=60 s-maxage=60',
    },
  });
};

// https://remix.run/api/conventions#meta
export const meta: MetaFunction = () => {
  const description = usePageDescription();
  const title = usePageTitle();
  const ogImage = useOGImageUrl();

  return {
    title: title,
    description: description,
    'og:description': description,
    'og:title': title,
    'og:image': ogImage,
    'twitter:image': ogImage,
  };
};

// https://remix.run/guides/routing#index-routes
export default function Index() {
  const { blogs, locale } = useLoaderData<LoaderData>();
  const { linkTitle } = useLocale(locale);

  return (
    <div className="flex-col">
      <BreadCrumb linkTitle={linkTitle} locale="/" />
      <BlogListLayout blogs={blogs} link="/blog/" />
    </div>
  );
}
