import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { markDownToHtml } from './markDownToHtml';

type MetaData = {
  title: string;
  description: string;
  category: string;
  tags: string[];
  createdAt: string;
  updatedAt: string;
};

export type PostData = {
  slug: string;
  content: string;
  metaData: MetaData;
};

const postsDirPath = path.join(process.cwd(), 'data', 'posts');

async function getPostFiles(): Promise<string[]> {
  return await fs.readdirSync(postsDirPath);
}

function assertMetaData(metaData: any): asserts metaData is MetaData {
  const missingProperties: Array<keyof MetaData> = [];
  if (!('title' in metaData)) {
    missingProperties.push('title');
  }
  if (!('createdAt' in metaData)) {
    missingProperties.push('createdAt');
  }
  if (!('updatedAt' in metaData)) {
    missingProperties.push('updatedAt');
  }
  if (!('category' in metaData)) {
    missingProperties.push('category');
  }
  if (!('tags' in metaData)) {
    missingProperties.push('tags');
  }
  if (!('description' in metaData)) {
    missingProperties.push('description');
  }
  if (missingProperties.length > 0) {
    throw new Error(`Missing meta data: ${missingProperties.join(', ')}`);
  }
}

export async function readPostFile(post: string): Promise<PostData> {
  const slug = post.replace(/\.md$/, '');
  const fullPath = path.join(postsDirPath, `${slug}.md`);
  const fileContents = await fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(fileContents);

  if (!data.updatedAt) data.updatedAt = data.createdAt;
  data.tags = !data.tags ? [] : Array.from(new Set(data.tags));

  assertMetaData(data);

  return {
    slug: slug,
    content: await markDownToHtml(content),
    metaData: data,
  };
}

export async function getAllPosts(): Promise<PostData[]> {
  const postFiles = await getPostFiles();
  const __posts = await Promise.all(postFiles.map(readPostFile));
  const posts = __posts.sort((a, b) => (a.metaData.createdAt < b.metaData.createdAt ? 1 : -1));

  return posts;
}
