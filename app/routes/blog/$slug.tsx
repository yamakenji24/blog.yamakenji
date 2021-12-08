import { useLoaderData, json } from 'remix';
import type { MetaFunction, LoaderFunction } from 'remix';
import { readPostFile, PostData } from '~/lib/posts';
import { usePageDescription, usePageTitle, useOGImageUrl } from '~/hooks';
import { BreadCrumb, DateLayout } from '~/components/common';
import { ClassifyLayout } from '~/components/blog/ClassifyLayout';

type LoaderData = {
  post: PostData;
};

export const loader: LoaderFunction = async (content: any) => {
  const post = await readPostFile(content.params.slug);
  const data: LoaderData = { post };

  return json(data, {
    headers: {
      'Cache-Control': 'public, max-age=60 s-maxage=60',
    },
  });
};

export const meta: MetaFunction = ({ data }) => {
  const description = usePageDescription(data.post.metaData.description);
  const title = usePageTitle(data.post.metaData.title);
  const ogImage = useOGImageUrl(data.post.metaData.title);

  return {
    title: title,
    description: description,
    'og:description': description,
    'og:image': ogImage,
    'twitter:image': ogImage,
  };
};

export default function BlogPost() {
  const { post } = useLoaderData<LoaderData>();
  const category = post.metaData.category;

  return (
    <div className="flex-col">
      <BreadCrumb to={'/category/' + category} name={category} />
      <div className="md:flex">
        <div className="w-full md:pl-4">
          <h1 className="text-2xl font-bold">{post.metaData.title}</h1>
          <DateLayout date={post.metaData.createdAt} />
          <ClassifyLayout category={category} tags={post.metaData.tags} />
          <div className="prose prose-blue" dangerouslySetInnerHTML={{ __html: post.content }} />
        </div>
      </div>
    </div>
  );
}
