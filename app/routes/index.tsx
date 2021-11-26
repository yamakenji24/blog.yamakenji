import * as React from 'react';
import type { MetaFunction, LoaderFunction } from 'remix';
import { useLoaderData, json } from 'remix';
import { usePageDescription, usePageTitle } from '~/hooks';
import { getAllPosts, getAllTags, getAllCategories, PostData } from '~/lib/posts';
import { BreadCrumb, SideBar } from '~/components/common';
import { BlogListLayout } from '~/components/blog/BlogListLayout';

type LoaderData = {
  posts: PostData[];
  tags: string[];
  categories: string[];
};

export const loader: LoaderFunction = async () => {
  const [posts, tags, categories] = await Promise.all([
    getAllPosts(),
    getAllTags(),
    getAllCategories(),
  ]);

  const data: LoaderData = { posts, tags, categories };
  return json(data, {
    headers: {
      'Cache-Control': 'private, max-age=3600',
    },
  });
};

// https://remix.run/api/conventions#meta
export const meta: MetaFunction = () => {
  const description = usePageDescription();
  const title = usePageTitle();
  return {
    title: title,
    description: description,
    'og:description': description,
  };
};

// https://remix.run/guides/routing#index-routes
export default function Index() {
  const data = useLoaderData<LoaderData>();

  if (!data.posts.length) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex-col">
      <BreadCrumb />
      <div className="md:flex">
        <BlogListLayout posts={data.posts} />
        <SideBar categories={data.categories} tags={data.tags} />
      </div>
    </div>
  );
}
