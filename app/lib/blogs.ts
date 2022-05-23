// ja
import * as firstPost from '../routes/blog/first-post.mdx';
import * as reverseProxy from '../routes/blog/reverse-proxy.mdx';
import * as whatsScrum from '../routes/blog/whats-scrum.mdx';
// en
import * as sample from '../routes/en/blog/sample.mdx';
const blogs = [firstPost, reverseProxy, whatsScrum];
const enblogs = [sample];

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
  const _blogs = blogs.map(postFromModule);
  return _blogs.sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1));
}

export function getAllENBlogs(): Blog[] {
  const _enblogs = enblogs.map(postFromModule);
  return _enblogs.sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1));
}

export function getAllTags(locale?: string): string[] {
  const blogs = locale === 'en' ? getAllENBlogs() : getAllBlogs();
  const tags = blogs.map((blog) => blog.tags).flat();
  return Array.from(new Set(tags));
}

export function getAllCategories(locale?: string): string[] {
  const blogs = locale === 'en' ? getAllENBlogs() : getAllBlogs();
  const categories = blogs.map((blog) => blog.category);
  return Array.from(new Set(categories));
}

export function getBlogsByCategory(category: string): Blog[] {
  return getAllBlogs().filter((blog) => blog.category === category);
}

export function getBlogsByTag(tag: string): Blog[] {
  return getAllBlogs().filter((blog) => blog.tags.includes(tag));
}

export function getENBlogsByCategory(category: string): Blog[] {
  return getAllENBlogs().filter((blog) => blog.category === category);
}

export function getENBlogsByTag(tag: string): Blog[] {
  return getAllENBlogs().filter((blog) => blog.tags.includes(tag));
}
