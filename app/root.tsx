import { type ReactNode, useState, useEffect, useRef, memo } from 'react';
import type { LinksFunction, LoaderArgs } from '@remix-run/node';
import { json } from '@remix-run/node';
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
  useLocation,
  useRouteError,
  isRouteErrorResponse,
} from '@remix-run/react';
import { usePageTitle, getLocaleFromURL, useGetLocale } from './hooks';
import { SideBar } from './components/common';
import { Footer } from './components/common/Footer';
import { Header } from './components/common/Header';
import { getAllTags, getAllCategories } from './lib/blogs';
import { i18nData } from '~/lib/i18n';
import styles from './styles/app.css';

type LoaderData = {
  tags: string[];
  categories: string[];
  _locale: 'en' | 'ja';
};

export const links: LinksFunction = () => {
  return [{ rel: 'stylesheet', href: styles }];
};

export async function loader({ request }: LoaderArgs) {
  const _locale = getLocaleFromURL(request.url);
  const tags = getAllTags(_locale);
  const categories = getAllCategories(_locale);
  const data = { tags, categories, _locale };

  return json(data, {
    headers: {
      'Cache-Control': 'public, max-age=60 s-maxage=60',
    },
  });
}

export default function App() {
  const { tags, categories } = useLoaderData<typeof loader>();
  const [newTags, setNewTags] = useState(tags);
  const [newCategories, setNewCategories] = useState(categories);
  const locale = useGetLocale();
  const link = i18nData[locale].link;

  useEffect(() => {
    setNewTags(getAllTags(locale));
    setNewCategories(getAllCategories(locale));
  }, [locale]);

  return (
    <Document locale={locale}>
      <Layout tags={newTags} categories={newCategories} link={link}>
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
  children: ReactNode;
  title?: string;
  locale: string;
}) {
  const pageTitle = usePageTitle(title);

  return (
    <html lang={locale}>
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
  children: ReactNode;
  link: string;
} & Omit<LoaderData, '_locale'>;

function Layout({ tags, categories, children, link }: Props) {
  return (
    <div>
      <Header />
      <div className="min-h-screen m-4 flex flex-col md:flex-row">
        <div className="w-full md:w-5/6">{children}</div>
        <SideBar tags={tags} categories={categories} link={link} />
      </div>
      <Footer />
    </div>
  );
}

export function ErrorBoundary() {
  const error = useRouteError();
  console.error(error);

  if (isRouteErrorResponse(error)) {
    return (
      <div>
        <h1>Oops</h1>
        <p>Status: {error.status}</p>
        <p>{error.data.message}</p>
      </div>
    );
  }

  return (
    <Document title="Error!" locale="en">
      <Layout tags={[]} categories={[]} link="">
        <div>
          <h1>There was an error</h1>
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
const RouteChangeAnnouncement = memo(() => {
  const [hydrated, setHydrated] = useState(false);
  const [innerHtml, setInnerHtml] = useState('');
  const location = useLocation();

  useEffect(() => {
    setHydrated(true);
  }, []);

  const firstRenderRef = useRef(true);
  useEffect(() => {
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
