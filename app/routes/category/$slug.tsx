import { useLoaderData, json } from 'remix';
import type { MetaFunction, LoaderFunction } from 'remix';
import { usePageDescription, usePageTitle } from '~/hooks';
import { getPostsByCategory, getAllTags, getAllCategories, PostData } from '~/lib/posts';
import { BreadCrumb, SideBar } from '~/components/common';
import { BlogListLayout } from '~/components/blog/BlogListLayout';

type LoaderData = {
  posts: PostData[];
  tags: string[];
  categories: string[];
  category: string;
};

// Todo rootでまとめれないか、やってみる
export const loader: LoaderFunction = async (content: any) => {
  const category = content.params.slug;
  const [posts, tags, categories] = await Promise.all([
    getPostsByCategory(category),
    getAllTags(),
    getAllCategories(),
  ]);

  const data: LoaderData = { posts, tags, categories, category };
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
  const { posts, tags, categories, category } = useLoaderData<LoaderData>();

  return (
    <div className="flex-col">
      <BreadCrumb to={'/category/' + category} name={category} />
      <div className="md:flex">
        <BlogListLayout posts={posts} />
        <SideBar categories={categories} tags={tags} />
      </div>
    </div>
  );
}
