import * as React from 'react';
import type { MetaFunction, LoaderFunction } from 'remix';
import { useLoaderData, json } from 'remix';
import { usePageDescription } from '../hooks/usePageDesciption';
import { getAllPosts, PostData } from '~/lib/posts';
import { BreadCrumb } from '~/components/common';

export const loader: LoaderFunction = async () => {
  const posts = await getAllPosts();
  return json(posts);
};

// https://remix.run/api/conventions#meta
export const meta: MetaFunction = () => {
  const description = usePageDescription();
  return {
    title: 'TopPage of yamakenji Blog Site',
    description: description,
    'og:description': description,
  };
};

// https://remix.run/guides/routing#index-routes
export default function Index() {
  const data = useLoaderData<Array<PostData>>();

  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <BreadCrumb />
      {data.map((post) => (
        <div key={post.metaData.title}>
          <h2>{post.metaData.title}</h2>
        </div>
      ))}
    </div>
  );
}
