import styles from 'highlight.js/styles/github-dark-dimmed.css';
import { LinksFunction, Outlet } from 'remix';

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
