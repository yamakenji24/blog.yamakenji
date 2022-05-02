import { Blog } from '~/lib/blogs';
import { ClassifyLayout } from './ClassifyLayout';
import { DateLayout, LinkLayout } from '~/components/common';

type Props = {
  blogs: Blog[];
  link: string;
};

function BlogListLayout({ blogs, link }: Props) {
  return (
    <div className="md:pl-4">
      {blogs.map((blog) => (
        <div key={blog.title} className="border m-1 p-2 rounded">
          <LinkLayout to={link + blog.slug} prefetch="intent">
            <h2 className="font-bold">{blog.title}</h2>
            <DateLayout createdAt={blog.createdAt} updatedAt={blog.updatedAt} />
            <p className="text-sm">{blog.description}</p>
          </LinkLayout>
          <ClassifyLayout category={blog.category} tags={blog.tags} />
        </div>
      ))}
    </div>
  );
}

export { BlogListLayout };
