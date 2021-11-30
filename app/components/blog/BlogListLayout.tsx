import * as React from 'react';
import { PostData } from '~/lib/posts';
import { ClassifyLayout } from './ClassifyLayout';
import { DateLayout, LinkLayout } from '~/components/common';

type Props = {
  posts: PostData[];
};

function BlogListLayout({ posts }: Props) {
  return (
    <div>
      {posts.map((post) => (
        <div key={post.metaData.title} className="border m-1 p-2 rounded">
          <LinkLayout to={'/blog/' + post.slug} prefetch="intent">
            <h2 className="font-bold">{post.metaData.title}</h2>
            <DateLayout date={post.metaData.createdAt} />
            <p className="text-sm">{post.metaData.description}</p>
          </LinkLayout>
          <ClassifyLayout category={post.metaData.category} tags={post.metaData.tags} />
        </div>
      ))}
    </div>
  );
}

export { BlogListLayout };
