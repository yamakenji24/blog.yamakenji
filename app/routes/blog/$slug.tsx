import { useLoaderData, json } from 'remix';
import type { MetaFunction, LoaderFunction } from 'remix';
import { readPostFile, PostData } from '~/lib/posts';
import { usePageDescription } from '~/hooks/usePageDesciption';
import { usePageTitle } from '~/hooks/usePageTitle';
import { BreadCrumb } from '~/components/common';

export const loader: LoaderFunction = async (content: any) => {
  const post = await readPostFile(content.params.slug);

  return json(post);
};

export const meta: MetaFunction = ({ data }) => {
  const description = usePageDescription(data.metaData.description);
  const title = usePageTitle(data.metaData.title);
  return {
    title: title,
    description: description,
    'og:description': description,
  };
};

export default function BlogPost() {
  const post = useLoaderData<PostData>();
  return (
    <div>
      <BreadCrumb post={post} />
      <h1>{post.metaData.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: post.content }} />
    </div>
  );
}
