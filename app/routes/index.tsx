import * as React from 'react';
import type { MetaFunction, LoaderFunction } from 'remix';
import { useLoaderData, json } from 'remix';
import { usePageDescription, usePageTitle } from '~/hooks';
import { getAllPosts, PostData } from '~/lib/posts';
import { BreadCrumb } from '~/components/common';
import { BlogListLayout } from '~/components/blog/BlogListLayout';

type LoaderData = {
  posts: PostData[];
};

export const loader: LoaderFunction = async () => {
  const posts = await getAllPosts();
  const data: LoaderData = { posts };

  return json(data, {
    headers: {
      'Cache-Control': 's-maxage=1, stale-while-revalidate',
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
  const { posts } = useLoaderData<LoaderData>();

  return (
    <div className="flex-col">
      <BreadCrumb />
      <BlogListLayout posts={posts} />
    </div>
  );
}
