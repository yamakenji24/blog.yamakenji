import styles from 'highlight.js/styles/github-dark-dimmed.css';
import type { LinksFunction } from '@remix-run/node';
import { Outlet } from '@remix-run/react';

export const links: LinksFunction = () => {
  return [
    {
      rel: 'stylesheet',
      href: styles,
    },
  ];
};

export default function Blogs() {
  return <Outlet />;
}
