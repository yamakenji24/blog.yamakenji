import type { MetaFunction, LoaderFunction } from 'remix';
import { useLoaderData, json } from 'remix';
import { useChangeLanguage } from 'remix-i18next';
import { usePageDescription, usePageTitle, useOGImageUrl } from '~/hooks';
import { getAllENBlogs, Blog } from '~/lib/blogs';
import { BreadCrumb } from '~/components/common';
import { BlogListLayout } from '~/components/blog/BlogListLayout';
import { useTranslation } from 'react-i18next';
import { i18n } from '~/i18n.server';
import { useEffect } from 'react';

type LoaderData = {
  enblogs: Blog[];
  linkTitle: string;
  link: string;
};

export const loader: LoaderFunction = async () => {
  const enblogs = await getAllENBlogs();
  const t = await i18n.getFixedT('en', 'index');

  const linkTitle = t('linkTitle');
  const link = t('link');
  const data: LoaderData = { enblogs, linkTitle, link };

  return json(data, {
    headers: {
      'Cache-Control': 'public, max-age=60 s-maxage=60',
    },
  });
};

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

export default function Index() {
  const { enblogs, linkTitle, link } = useLoaderData<LoaderData>();
  const { i18n } = useTranslation('index');
  const locale = i18n.language;

  // Fix: want lang to be changed before rendering
  //useChangeLanguage('en')
  useEffect(() => {
    i18n.changeLanguage('en');
  }, [locale]);

  return (
    <div className="flex-col">
      <BreadCrumb linkTitle={linkTitle} />
      <BlogListLayout blogs={enblogs} link={link} />
    </div>
  );
}
