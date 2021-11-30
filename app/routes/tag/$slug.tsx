import { useLoaderData, json } from 'remix';
import type { MetaFunction, LoaderFunction } from 'remix';
import { getPostsByTag, PostData } from '~/lib/posts';
import { usePageDescription, usePageTitle } from '~/hooks';
import { BreadCrumb } from '~/components/common';
import { BlogListLayout } from '~/components/blog/BlogListLayout';

type LoaderData = {
  posts: PostData[];
  tag: string;
};

export const loader: LoaderFunction = async (content: any) => {
  const tag = content.params.slug;
  const posts = await getPostsByTag(tag);
  const data: LoaderData = { posts, tag };

  return json(data, {
    headers: {
      'Cache-Control': 's-maxage=1, stale-while-revalidate',
    },
  });
};

export const meta: MetaFunction = () => {
  const description = usePageDescription();
  const title = usePageTitle();
  return {
    title: title,
    description: description,
    'og:description': description,
  };
};

export default function TagPost() {
  const { posts, tag } = useLoaderData<LoaderData>();

  return (
    <div className="flex-col">
      <BreadCrumb to={'/tag/' + tag} name={tag} />
      <BlogListLayout posts={posts} />
    </div>
  );
}
