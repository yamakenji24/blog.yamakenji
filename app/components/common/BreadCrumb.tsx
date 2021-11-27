import * as React from 'react';
import { Link } from 'remix';

type Props = {
  name?: string;
  to?: string;
};

function BreadCrumb({ name, to }: Props) {
  return (
    <nav className="bg-grey-light rounded w-full my-4">
      <ol className="list-reset flex text-grey-dark">
        <li className="hover:bg-green-50 hover:border-gray-300">
          <Link to="/" prefetch="intent">
            記事一覧
          </Link>
        </li>

        {to && name && (
          <>
            <li>
              <span className="mx-2">＞</span>
            </li>
            <li className="hover:bg-green-50 hover:border-gray-300">
              <Link to={to} prefetch="intent">
                {name}
              </Link>
            </li>
          </>
        )}
      </ol>
    </nav>
  );
}

export { BreadCrumb };
