import * as firstPost from '../routes/blog/first-post.mdx';

const blogs = [firstPost];

export type Blog = {
  slug: string;
  title: string;
  description: string;
  category: string;
  tags: string[];
  createdAt: string;
  updatedAt: string;
};

function postFromModule(mod: any): Blog {
  const slug: string = mod.filename.replace(/\.mdx$/, '');
  const updatedAt: string = !mod.attributes.updatedAt
    ? mod.attributes.createdAt
    : mod.attributes.updatedAt;
  const tags: string[] = !mod.attributes.tags ? [] : Array.from(new Set(mod.attributes.tags));

  return {
    ...mod.attributes,
    slug,
    updatedAt,
    tags,
  };
}

export function getBlogBySlug(slug: string): Blog {
  const blogs = getAllBlogs();
  const blog = blogs.find((blog) => blog.slug === slug);

  if (!blog) {
    throw new Error(`Blog not found: ${slug}`);
  }

  return blog;
}

export function getAllBlogs(): Blog[] {
  return blogs.map(postFromModule);
}

export function getAllTags(): string[] {
  const blogs = getAllBlogs();
  const tags = blogs.map((blog) => blog.tags).flat();
  return Array.from(new Set(tags));
}

export function getAllCategories(): string[] {
  const blogs = getAllBlogs();
  const categories = blogs.map((blog) => blog.category);
  return Array.from(new Set(categories));
}

export function getBlogsByCategory(category: string): Blog[] {
  return getAllBlogs().filter((blog) => blog.category === category);
}

export function getBlogsByTag(tag: string): Blog[] {
  return getAllBlogs().filter((blog) => blog.tags.includes(tag));
}
