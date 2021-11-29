import * as React from 'react';
import { Link } from 'remix';

type Props = {
  children?: React.ReactNode;
  to: string;
  prefetch: 'none' | 'intent' | 'render';
};

function LinkLayout({ children, to, prefetch }: Props) {
  return (
    <Link to={to} prefetch={prefetch}>
      {children}
    </Link>
  );
}

export { LinkLayout };
