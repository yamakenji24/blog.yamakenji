import * as React from 'react';
import type { MetaFunction, LoaderFunction } from 'remix';
import { useLoaderData, json } from 'remix';
import { usePageDescription, usePageTitle } from '~/hooks';
import { getAllPosts, PostData } from '~/lib/posts';
import { BreadCrumb, SideBar } from '~/components/common';
import { BlogListLayout } from '~/components/blog/BlogListLayout';

export const loader: LoaderFunction = async () => {
  const posts = await getAllPosts();
  return json(posts, {
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
  const posts = useLoaderData<PostData[]>();

  if (!posts.length) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex-col">
      <BreadCrumb />
      <div className="md:flex">
        <BlogListLayout posts={posts} />
        <SideBar />
      </div>
    </div>
  );
}
