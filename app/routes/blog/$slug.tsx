import { useLoaderData, json } from 'remix';
import type { LoaderFunction } from 'remix';
import { readPostFile, PostData } from '~/lib/posts';

export const loader: LoaderFunction = async (content: any) => {
  const post = await readPostFile(content.params.slug);

  return json(post);
};

export default function BlogPost() {
  const post = useLoaderData<PostData>();
  return (
    <div>
      <h1>{post.metaData.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: post.content }} />
    </div>
  );
}
