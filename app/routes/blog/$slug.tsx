import { useLoaderData, json } from 'remix';
import type { MetaFunction, LoaderFunction } from 'remix';
import { readPostFile, getAllTags, getAllCategories, PostData } from '~/lib/posts';
import { usePageDescription } from '~/hooks/usePageDesciption';
import { usePageTitle } from '~/hooks/usePageTitle';
import { BreadCrumb, DateLayout, SideBar, Tag } from '~/components/common';

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
      'Cache-Control': 'private, max-age=3600',
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
  const data = useLoaderData<LoaderData>();
  return (
    <div className="flex-col">
      <BreadCrumb post={data.post} />
      <div className="md:flex">
        <div className="w-full md:w-5/6">
          <h1 className="text-2xl font-bold">{data.post.metaData.title}</h1>
          <DateLayout date={data.post.metaData.createdAt} />
          <div className="flex">
            <p className="text-xs inline-flex items-center font-bold leading-sm p-1 m-1 border border-blue-500 text-blue-600 rounded-md">
              {data.post.metaData.category}
            </p>
            {data.tags.map((tag) => (
              <Tag key={tag} name={tag} />
            ))}
          </div>
          <div dangerouslySetInnerHTML={{ __html: data.post.content }} />
        </div>

        <SideBar tags={data.tags} categories={data.categories} />
      </div>
    </div>
  );
}
