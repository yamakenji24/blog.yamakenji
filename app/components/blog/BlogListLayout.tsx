import * as React from 'react';
import { PostData } from '~/lib/posts';
import { DateLayout, Tag, LinkLayout } from '~/components/common';

type Props = {
  posts: PostData[];
};

function BlogListLayout({ posts }: Props) {
  return (
    <div className="w-full md:w-5/6">
      {posts.map((post) => (
        <div key={post.metaData.title} className="border m-1 p-2 rounded">
          <LinkLayout to={'/blog/' + post.slug} prefetch="intent">
            <h2 className="font-bold">{post.metaData.title}</h2>
            <DateLayout date={post.metaData.createdAt} />
            <p className="text-sm">{post.metaData.description}</p>
          </LinkLayout>
          <div className="flex">
            <LinkLayout to={'/category/' + post.metaData.category} prefetch="intent">
              <p className="text-xs inline-flex items-center font-bold leading-sm p-1 m-1 border border-blue-500 text-blue-600 rounded-md hover:bg-blue-100">
                {post.metaData.category}
              </p>
            </LinkLayout>

            {post.metaData.tags.map((tag) => (
              <LinkLayout key={tag} to={'/tag/' + tag} prefetch="intent">
                <Tag name={tag} />
              </LinkLayout>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export { BlogListLayout };
