import type { MetaFunction, LoaderFunction } from 'remix';
import { useLoaderData, json } from 'remix';
import { useChangeLanguage } from 'remix-i18next';
import { usePageDescription, usePageTitle, useOGImageUrl } from '~/hooks';
import { getAllENBlogs, Blog } from '~/lib/blogs';
import { BreadCrumb } from '~/components/common';
import { BlogListLayout } from '~/components/blog/BlogListLayout';
import { useTranslation } from 'react-i18next';

type LoaderData = {
  enblogs: Blog[];
};

export const loader: LoaderFunction = async () => {
  const enblogs = await getAllENBlogs();
  const data: LoaderData = { enblogs };

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
  useChangeLanguage('en');
  const { enblogs } = useLoaderData<LoaderData>();
  const { t, ready } = useTranslation();
  if (!ready) return null;

  return (
    <div className="flex-col">
      <BreadCrumb linkTitle={t('linkTitle')} />
      <BlogListLayout blogs={enblogs} link={t('link')} />
    </div>
  );
}
