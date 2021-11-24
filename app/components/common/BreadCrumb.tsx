import * as React from 'react';
import { Link } from 'remix';
import { PostData } from '~/lib/posts';

type Props = {
  post?: PostData;
};

function BreadCrumb({ post }: Props) {
  return (
    <nav className="bg-grey-light rounded w-full my-4">
      <ol className="list-reset flex text-grey-dark">
        <li className="hover:bg-green-50 hover:border-gray-300">
          <Link to="/" prefetch="intent">
            記事一覧
          </Link>
        </li>

        {post && (
          <>
            <li>
              <span className="mx-2">＞</span>
            </li>
            <li className="hover:bg-green-50 hover:border-gray-300">
              <Link to={'/category/' + post.slug} prefetch="intent">
                {post.metaData.category}
              </Link>
            </li>
          </>
        )}
      </ol>
    </nav>
  );
}

export { BreadCrumb };
