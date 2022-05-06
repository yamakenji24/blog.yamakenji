import { useLoaderData, json } from 'remix';
import type { MetaFunction, LoaderFunction } from 'remix';
import {
  usePageDescription,
  usePageTitle,
  useOGImageUrl,
  getLocaleFromURL,
  useLocale,
} from '~/hooks';
import { getENBlogsByCategory, Blog } from '~/lib/blogs';
import { BreadCrumb } from '~/components/common';
import { BlogListLayout } from '~/components/blog/BlogListLayout';

type LoaderData = {
  enblogs: Blog[];
  category: string;
  locale: 'en' | 'ja';
};

export const loader: LoaderFunction = async ({ params, request }) => {
  const category = params.slug ?? '';
  const enblogs = await getENBlogsByCategory(category);
  const locale = getLocaleFromURL(request.url);

  const data: LoaderData = { enblogs, category, locale };

  return json(data, {
    headers: {
      'Cache-Control': 'public, max-age=60 s-maxage=60',
    },
  });
};

export const meta: MetaFunction = () => {
  const description = usePageDescription();
  const title = usePageTitle();
  const ogImage = useOGImageUrl();

  return {
    title: title,
    description: description,
    'og:description': description,
    'og:title': title,
    'og:image': ogImage,
    'twitter:image': ogImage,
  };
};

export default function ENCategoryBlog() {
  const { enblogs, category, locale } = useLoaderData<LoaderData>();
  const { linkTitle } = useLocale(locale);

  return (
    <div className="flex-col">
      <BreadCrumb to={'category/' + category} name={category} linkTitle={linkTitle} locale="/en/" />
      <BlogListLayout blogs={enblogs} link="/en/blog/" />
    </div>
  );
}
