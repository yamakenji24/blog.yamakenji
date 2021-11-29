import * as React from 'react';
import { LinkLayout } from './LinkLayout';

type Props = {
  name?: string;
  to?: string;
};

function BreadCrumb({ name, to }: Props) {
  return (
    <nav className="bg-grey-light rounded w-full my-4">
      <ol className="list-reset flex text-grey-dark">
        <li className="hover:bg-green-50 hover:border-gray-300">
          <LinkLayout to="/" prefetch="intent">
            <p>記事一覧</p>
          </LinkLayout>
        </li>

        {to && name && (
          <>
            <li>
              <span className="mx-2">＞</span>
            </li>
            <li className="hover:bg-green-50 hover:border-gray-300">
              <LinkLayout to={to} prefetch="intent">
                <p>{name}</p>
              </LinkLayout>
            </li>
          </>
        )}
      </ol>
    </nav>
  );
}

export { BreadCrumb };
