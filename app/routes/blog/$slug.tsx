import { useLoaderData, json } from 'remix';
import type { LoaderFunction } from 'remix';
import { readPostFile, PostData } from '~/lib/posts';
import { BreadCrumb } from '~/components/common';

export const loader: LoaderFunction = async (content: any) => {
  const post = await readPostFile(content.params.slug);

  return json(post);
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
