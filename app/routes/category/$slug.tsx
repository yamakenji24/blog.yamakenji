import { useLoaderData, json } from 'remix';
import type { MetaFunction, LoaderFunction } from 'remix';
import { usePageDescription, usePageTitle } from '~/hooks';
import { getPostsByCategory, PostData } from '~/lib/posts';
import { BreadCrumb } from '~/components/common';
import { BlogListLayout } from '~/components/blog/BlogListLayout';

type LoaderData = {
  posts: PostData[];
  category: string;
};

export const loader: LoaderFunction = async (content: any) => {
  const category = content.params.slug;
  const posts = await getPostsByCategory(category);
  const data: LoaderData = { posts, category };

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

export default function Category() {
  const { posts, category } = useLoaderData<LoaderData>();

  return (
    <div className="flex-col">
      <BreadCrumb to={'/category/' + category} name={category} />
      <BlogListLayout posts={posts} />
    </div>
  );
}
