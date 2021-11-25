import * as React from 'react';
import { Link } from 'remix';
import { BiTime } from 'react-icons/bi';
import { PostData } from '~/lib/posts';
import { Tag } from '~/components/common';

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

            <div className="flex my-1">
              <BiTime />
              <p className="text-xs mx-1">{post.metaData.createdAt}</p>
            </div>

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
