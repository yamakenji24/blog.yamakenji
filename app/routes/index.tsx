import { useEffect } from 'react';
import type { MetaFunction, LoaderFunction } from 'remix';
import { useLoaderData, json } from 'remix';
import { usePageDescription, usePageTitle, useOGImageUrl } from '~/hooks';
import { getAllBlogs, Blog } from '~/lib/blogs';
import { BreadCrumb } from '~/components/common';
import { BlogListLayout } from '~/components/blog/BlogListLayout';
import { useTranslation } from 'react-i18next';

type LoaderData = {
  blogs: Blog[];
};

export const handle = {
  i18n: ['index'],
};

export const loader: LoaderFunction = async () => {
  const blogs = await getAllBlogs();
  const data: LoaderData = { blogs };

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
  const { blogs } = useLoaderData<LoaderData>();
  const { t, i18n } = useTranslation('index');
  const locale = i18n.language;

  // Fix: want lang to be changed before rendering
  //useChangeLanguage('ja')
  useEffect(() => {
    i18n.changeLanguage('ja');
  }, [locale]);

  return (
    <div className="flex-col">
      <BreadCrumb linkTitle={t('linkTitle')} />
      <BlogListLayout blogs={blogs} link={t('link')} />
    </div>
  );
}
