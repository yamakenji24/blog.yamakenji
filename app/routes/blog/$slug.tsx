import { useLoaderData, json } from 'remix';
import type { MetaFunction, LoaderFunction } from 'remix';
import { readPostFile, getAllTags, getAllCategories, PostData } from '~/lib/posts';
import { usePageDescription, usePageTitle } from '~/hooks';
import { BreadCrumb, DateLayout, SideBar, Tag, LinkLayout } from '~/components/common';

type LoaderData = {
  post: PostData;
  tags: string[];
  categories: string[];
};

export const loader: LoaderFunction = async (content: any) => {
  const [post, tags, categories] = await Promise.all([
    readPostFile(content.params.slug),
    getAllTags(),
    getAllCategories(),
  ]);

  const data: LoaderData = { post, tags, categories };

  return json(data, {
    headers: {
      'Cache-Control': 's-maxage=1, stale-while-revalidate',
    },
  });
};

export const meta: MetaFunction = ({ data }) => {
  const description = usePageDescription(data.post.metaData.description);
  const title = usePageTitle(data.post.metaData.title);
  return {
    title: title,
    description: description,
    'og:description': description,
  };
};

export default function BlogPost() {
  const { post, tags, categories } = useLoaderData<LoaderData>();
  const category = post.metaData.category;

  return (
    <div className="flex-col">
      <BreadCrumb to={'/category/' + category} name={category} />
      <div className="md:flex">
        <div className="w-full md:w-5/6">
          <h1 className="text-2xl font-bold">{post.metaData.title}</h1>
          <DateLayout date={post.metaData.createdAt} />
          <div className="flex">
            <LinkLayout to={'/category/' + category} prefetch="render">
              <p className="text-xs inline-flex items-center font-bold leading-sm p-1 m-1 border border-blue-500 text-blue-600 rounded-md">
                {category}
              </p>
            </LinkLayout>

            {tags.map((tag) => (
              <LinkLayout key={tag} to={'/tag/' + tag} prefetch="render">
                <Tag name={tag} />
              </LinkLayout>
            ))}
          </div>
          <div dangerouslySetInnerHTML={{ __html: post.content }} />
        </div>

        <SideBar tags={tags} categories={categories} />
      </div>
    </div>
  );
}
