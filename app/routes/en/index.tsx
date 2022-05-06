import type { MetaFunction, LoaderFunction } from 'remix';
import { useLoaderData, json } from 'remix';
import { usePageDescription, usePageTitle, useOGImageUrl } from '~/hooks';
import { getAllENBlogs, Blog } from '~/lib/blogs';
import { BreadCrumb } from '~/components/common';
import { BlogListLayout } from '~/components/blog/BlogListLayout';
import { i18n } from '~/i18n.server';

type LoaderData = {
  enblogs: Blog[];
  linkTitle: string;
};

export const loader: LoaderFunction = async () => {
  const enblogs = await getAllENBlogs();
  const t = await i18n.getFixedT('en', 'index');

  const linkTitle = t('linkTitle');
  const data: LoaderData = { enblogs, linkTitle };

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
  const { enblogs, linkTitle } = useLoaderData<LoaderData>();

  return (
    <div className="flex-col">
      <BreadCrumb linkTitle={linkTitle} locale="/en/" />
      <BlogListLayout blogs={enblogs} link="/en/blog/" />
    </div>
  );
}