import { useLoaderData, json } from 'remix';
import type { MetaFunction, LoaderFunction } from 'remix';
import { getBlogsByTag, Blog } from '~/lib/blogs';
import { usePageDescription, usePageTitle, useOGImageUrl } from '~/hooks';
import { BreadCrumb } from '~/components/common';
import { BlogListLayout } from '~/components/blog/BlogListLayout';

type LoaderData = {
  blogs: Blog[];
  tag: string;
};

export const loader: LoaderFunction = async (content: any) => {
  const tag = content.params.slug;
  const blogs = await getBlogsByTag(tag);
  const data: LoaderData = { blogs, tag };

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
    'og:image': ogImage,
    'twitter:image': ogImage,
  };
};

export default function TagPost() {
  const { blogs, tag } = useLoaderData<LoaderData>();

  return (
    <div className="flex-col">
      <BreadCrumb to={'/tag/' + tag} name={tag} />
      <BlogListLayout blogs={blogs} />
    </div>
  );
}
