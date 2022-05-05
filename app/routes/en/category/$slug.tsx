import { useLoaderData, json } from 'remix';
import type { MetaFunction, LoaderFunction } from 'remix';
import { usePageDescription, usePageTitle, useOGImageUrl } from '~/hooks';
import { getENBlogsByCategory, Blog } from '~/lib/blogs';
import { BreadCrumb } from '~/components/common';
import { BlogListLayout } from '~/components/blog/BlogListLayout';
import { i18n } from '~/i18n.server';

type LoaderData = {
  enblogs: Blog[];
  category: string;
  linkTitle: string;
};

export const loader: LoaderFunction = async (content: any) => {
  const category = content.params.slug;
  const enblogs = await getENBlogsByCategory(category);
  const t = await i18n.getFixedT('en', 'index');
  const linkTitle = t('linkTitle');
  const data: LoaderData = { enblogs, category, linkTitle };

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

export default function ENCategoryBlog() {
  const { enblogs, category, linkTitle } = useLoaderData<LoaderData>();

  return (
    <div className="flex-col">
      <BreadCrumb to={'category/' + category} name={category} linkTitle={linkTitle} locale="/en/" />
      <BlogListLayout blogs={enblogs} link="/en/blog/" />
    </div>
  );
}
