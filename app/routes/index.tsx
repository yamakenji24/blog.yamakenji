import * as React from 'react';
import type { MetaFunction, LoaderFunction } from 'remix';
import { useLoaderData, json } from 'remix';
import { usePageDescription, usePageTitle, useOGImageUrl } from '~/hooks';
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
      'Cache-Control': 'public, max-age=60 s-maxage=60',
    },
  });
};

// https://remix.run/api/conventions#meta
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
