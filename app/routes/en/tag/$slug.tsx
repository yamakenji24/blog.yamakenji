import type { LoaderFunction } from '@remix-run/node';
import { json } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import { getENBlogsByTag, Blog } from '~/lib/blogs';
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
  enblogs: Blog[];
  tag: string;
  locale: 'en' | 'ja';
};

export const loader: LoaderFunction = async ({ request, params }) => {
  const tag = params.slug ?? '';
  const enblogs = getENBlogsByTag(tag);
  const locale = getLocaleFromURL(request.url);
  const data: LoaderData = { enblogs, tag, locale };

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

export default function ENTagBlog() {
  const { enblogs, tag, locale } = useLoaderData<LoaderData>();
  const { linkTitle } = useLocale(locale);

  return (
    <div className="flex-col">
      <BreadCrumb to={'tag/' + tag} name={tag} linkTitle={linkTitle} locale="/en/" />
      <BlogListLayout blogs={enblogs} link="/en/blog/" />
    </div>
  );
}
