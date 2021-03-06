import { LinkLayout } from '../LinkLayout';

type Props = {
  name?: string;
  to?: string;
  linkTitle: string;
  locale: string;
};

function BreadCrumb({ name, to, linkTitle, locale }: Props) {
  return (
    <nav className="bg-grey-light rounded w-full my-4 md:pl-4">
      <ol className="list-reset flex text-grey-dark">
        <li className="hover:bg-green-50 hover:border-gray-300">
          <LinkLayout to={locale} prefetch="intent">
            <p>{linkTitle}</p>
          </LinkLayout>
        </li>

        {to && name && (
          <>
            <li>
              <span className="mx-2">＞</span>
            </li>
            <li className="hover:bg-green-50 hover:border-gray-300">
              <LinkLayout to={locale + to} prefetch="intent">
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
