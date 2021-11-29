import { useLoaderData, json } from 'remix';
import type { MetaFunction, LoaderFunction } from 'remix';
import { getPostsByTag, getAllTags, getAllCategories, PostData } from '~/lib/posts';
import { usePageDescription, usePageTitle } from '~/hooks';
import { BreadCrumb, SideBar } from '~/components/common';
import { BlogListLayout } from '~/components/blog/BlogListLayout';

type LoaderData = {
  posts: PostData[];
  tags: string[];
  categories: string[];
  tag: string;
};

export const loader: LoaderFunction = async (content: any) => {
  const tag = content.params.slug;
  const [posts, tags, categories] = await Promise.all([
    getPostsByTag(tag),
    getAllTags(),
    getAllCategories(),
  ]);
  const data: LoaderData = { posts, tags, categories, tag };
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
  const { posts, tags, categories, tag } = useLoaderData<LoaderData>();

  return (
    <div className="flex-col">
      <BreadCrumb to={'/tag/' + tag} name={tag} />
      <div className="md:flex">
        <BlogListLayout posts={posts} />
        <SideBar tags={tags} categories={categories} />
      </div>
    </div>
  );
}
