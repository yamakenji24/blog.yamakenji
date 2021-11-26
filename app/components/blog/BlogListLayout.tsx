import * as React from 'react';
import { Link } from 'remix';
import { PostData } from '~/lib/posts';
import { DateLayout, Tag } from '~/components/common';

type Props = {
  posts: PostData[];
};

function BlogListLayout({ posts }: Props) {
  return (
    <div className="w-full md:w-5/6">
      {posts.map((post) => (
        <div key={post.metaData.title} className="border m-1 p-2 rounded">
          <Link to={'/blog/' + post.slug}>
            <h2 className="font-bold">{post.metaData.title}</h2>

            <DateLayout date={post.metaData.createdAt} />

            <p className="text-sm">{post.metaData.description}</p>
          </Link>
          <div className="flex">
            <p className="text-xs inline-flex items-center font-bold leading-sm p-1 m-1 border border-blue-500 text-blue-600 rounded-md">
              {post.metaData.category}
            </p>
            {post.metaData.tags.map((tag) => (
              <Tag key={tag} name={tag} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export { BlogListLayout };
