import * as React from 'react';
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useCatch,
  useLocation,
  useLoaderData,
  json,
} from 'remix';
import type { LinksFunction, LoaderFunction } from 'remix';
import { usePageTitle } from './hooks';
import { Header, Footer, SideBar } from './components/common';
import { getAllTags, getAllCategories } from './lib/blogs';
import { i18n } from './i18n.server';
import { useChangeLanguage } from 'remix-i18next';
import { useTranslation } from 'react-i18next';

import styles from './styles/app.css';

type LoaderData = {
  tags: string[];
  categories: string[];
  locale: string;
};

export const links: LinksFunction = () => {
  return [{ rel: 'stylesheet', href: styles }];
};

export const loader: LoaderFunction = async ({ request }) => {
  const locale = await i18n.getLocale(request);
  const [tags, categories] = await Promise.all([getAllTags(locale), getAllCategories()]);
  const data: LoaderData = { tags, categories, locale };

  return json(data, {
    headers: {
      'Cache-Control': `public, max-age=${60 * 10} s-maxage=${60 * 60}`,
    },
  });
};

export default function App() {
  const { tags, categories, locale } = useLoaderData<LoaderData>();

  return (
    <Document locale={locale}>
      <Layout tags={tags} categories={categories}>
        <Outlet />
      </Layout>
    </Document>
  );
}

function Document({
  children,
  title,
  locale,
}: {
  children: React.ReactNode;
  title?: string;
  locale: string;
}) {
  const pageTitle = usePageTitle(title);
  const { i18n } = useTranslation();
  useChangeLanguage(locale);

  return (
    <html lang={locale} dir={i18n.dir()}>
      <head>
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-92H3NH80F7" />
        <script
          dangerouslySetInnerHTML={{
            __html: ` window.dataLayer = window.dataLayer || [];
                    function gtag(){dataLayer.push(arguments);}
                    gtag('js', new Date());

                    gtag('config', 'G-92H3NH80F7');`,
          }}
        />

        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <meta property="og:type" content="article" />
        <meta name="og:site_name" content={pageTitle} />
        <meta name="og:url" content="https://blog.yamakenji.com/" />

        <meta name="twitter:title" content={pageTitle} />
        <meta name="twitter:card" content="summary_large_image" />
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <RouteChangeAnnouncement />
        <ScrollRestoration />
        <Scripts />
        {process.env.NODE_ENV === 'development' && <LiveReload />}
      </body>
    </html>
  );
}
type Props = {
  children: React.PropsWithChildren<Record<any, any>>;
} & Omit<LoaderData, 'locale'>;

function Layout({ tags, categories, children }: Props) {
  return (
    <div>
      <Header />
      <div className="min-h-screen m-4 flex flex-col md:flex-row">
        <div className="w-full md:w-5/6">{children}</div>
        <SideBar tags={tags} categories={categories} />
      </div>
      <Footer />
    </div>
  );
}

export function CatchBoundary() {
  const caught = useCatch();

  let message;
  switch (caught.status) {
    case 401:
      message = <p>Oops! Looks like you tried to visit a page that you do not have access to.</p>;
      break;
    case 404:
      message = <p>Oops! Looks like you tried to visit a page that does not exist.</p>;
      break;

    default:
      throw new Error(caught.data || caught.statusText);
  }

  return (
    <Document title={`${caught.status} ${caught.statusText}`} locale="en">
      <Layout tags={[]} categories={[]}>
        <h1>
          {caught.status}: {caught.statusText}
        </h1>
        {message}
      </Layout>
    </Document>
  );
}

export function ErrorBoundary({ error }: { error: Error }) {
  console.error(error);
  return (
    <Document title="Error!" locale="en">
      <Layout tags={[]} categories={[]}>
        <div>
          <h1>There was an error</h1>
          <p>{error.message}</p>
          <hr />
          <p>Hey, developer, you should replace this with what you want your users to see.</p>
        </div>
      </Layout>
    </Document>
  );
}

/**
 * Provides an alert for screen reader users when the route changes.
 */
const RouteChangeAnnouncement = React.memo(() => {
  const [hydrated, setHydrated] = React.useState(false);
  const [innerHtml, setInnerHtml] = React.useState('');
  const location = useLocation();

  React.useEffect(() => {
    setHydrated(true);
  }, []);

  const firstRenderRef = React.useRef(true);
  React.useEffect(() => {
    // Skip the first render because we don't want an announcement on the
    // initial page load.
    if (firstRenderRef.current) {
      firstRenderRef.current = false;
      return;
    }

    const pageTitle = location.pathname === '/' ? 'Home page' : document.title;
    setInnerHtml(`Navigated to ${pageTitle}`);
  }, [location.pathname]);

  // Render nothing on the server. The live region provides no value unless
  // scripts are loaded and the browser takes over normal routing.
  if (!hydrated) {
    return null;
  }

  return (
    <div
      aria-live="assertive"
      aria-atomic
      id="route-change-region"
      style={{
        border: '0',
        clipPath: 'inset(100%)',
        clip: 'rect(0 0 0 0)',
        height: '1px',
        margin: '-1px',
        overflow: 'hidden',
        padding: '0',
        position: 'absolute',
        width: '1px',
        whiteSpace: 'nowrap',
        wordWrap: 'normal',
      }}
    >
      {innerHtml}
    </div>
  );
});
