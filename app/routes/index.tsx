import type { MetaFunction, LoaderFunction } from 'remix';
import { useLoaderData, json } from 'remix';
import { usePageDescription, usePageTitle, useOGImageUrl } from '~/hooks';
import { getAllBlogs, Blog } from '~/lib/blogs';
import { BreadCrumb } from '~/components/common';
import { BlogListLayout } from '~/components/blog/BlogListLayout';
import { useTranslation } from 'react-i18next';
import { i18n } from '~/i18n.server';

type LoaderData = {
  blogs: Blog[];
  linkTitle: string;
};

export const handle = {
  i18n: ['index'],
};

export const loader: LoaderFunction = async () => {
  const blogs = await getAllBlogs();
  const t = await i18n.getFixedT('ja', 'index');
  const linkTitle = t('linkTitle');
  const data: LoaderData = { blogs, linkTitle };

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
  const { blogs, linkTitle } = useLoaderData<LoaderData>();

  return (
    <div className="flex-col">
      <BreadCrumb linkTitle={linkTitle} locale="/" />
      <BlogListLayout blogs={blogs} link="/blog/" />
    </div>
  );
}
