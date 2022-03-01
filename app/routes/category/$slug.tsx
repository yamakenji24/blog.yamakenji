import { useLoaderData, json } from 'remix';
import type { MetaFunction, LoaderFunction } from 'remix';
import { usePageDescription, usePageTitle, useOGImageUrl } from '~/hooks';
import { getBlogsByCategory, Blog } from '~/lib/blogs';
import { BreadCrumb } from '~/components/common';
import { BlogListLayout } from '~/components/blog/BlogListLayout';

type LoaderData = {
  blogs: Blog[];
  category: string;
};

export const loader: LoaderFunction = async (content: any) => {
  const category = content.params.slug;
  const blogs = await getBlogsByCategory(category);
  const data: LoaderData = { blogs, category };

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

export default function Category() {
  const { blogs, category } = useLoaderData<LoaderData>();

  return (
    <div className="flex-col">
      <BreadCrumb to={'/category/' + category} name={category} />
      <BlogListLayout blogs={blogs} />
    </div>
  );
}
