import type { LoaderFunction } from '@remix-run/node';
import { json } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import { getBlogsByTag, Blog } from '~/lib/blogs';
import {
  usePageDescription,
  usePageTitle,
  useOGImageUrl,
  getLocaleFromURL,
  useLocale,
} from '~/hooks';
import { BreadCrumb } from '~/components/common';
import { BlogListLayout } from '~/components/blog/BlogListLayout';

type LoaderData = {
  blogs: Blog[];
  tag: string;
  locale: 'en' | 'ja';
};

export const loader: LoaderFunction = async ({ params, request }) => {
  const tag = params.slug ?? '';
  const blogs = getBlogsByTag(tag);
  const locale = getLocaleFromURL(request.url);

  const data: LoaderData = { blogs, tag, locale };

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
    { name: 'description', content: description },
    { property: 'og:description', content: description },
    { property: 'og:image', content: ogImage },
    { property: 'twitter:image', content: ogImage },
  ];
}

export default function TagPost() {
  const { blogs, tag, locale } = useLoaderData<LoaderData>();
  const { linkTitle } = useLocale(locale);

  return (
    <div className="flex-col">
      <BreadCrumb to={'tag/' + tag} name={tag} linkTitle={linkTitle} locale="/" />
      <BlogListLayout blogs={blogs} link="/blog/" />
    </div>
  );
}
