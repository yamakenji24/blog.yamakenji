import path from 'path';
import fs from 'fs';
import { Feed } from 'feed';
import { getAllBlogs } from './blogs';

const DOMAIN = 'blog.yamakenji.com';

(async function () {
  const blogs = getAllBlogs();
  const feed = new Feed({
    title: 'yamakenji blog',
    description: 'yamakenji blog',
    id: 'https://' + DOMAIN,
    link: 'https://' + DOMAIN,
    favicon: 'https://' + DOMAIN + '/favicon.ico',
    language: 'ja',
    copyright: 'Some right reserved',
    feedLinks: {
      rss2: 'https://' + DOMAIN + '/rss.xml',
      atom: 'https://' + DOMAIN + '/atom.xml',
      json: 'https://' + DOMAIN + '/feed.json',
    },
    author: {
      name: 'yamakenji',
      email: 'yamakenji24@gmail.com',
    },
  });

  blogs.forEach((blog) => {
    feed.addItem({
      title: blog.title,
      id: 'https://' + DOMAIN + '/' + blog.slug,
      link: 'https://' + DOMAIN + '/' + blog.slug,
      description: blog.description,
      content: blog.description,
      date: new Date(blog.updatedAt),
    });
  });

  fs.writeFile(path.resolve(__dirname, '../public/rss.xml'), feed.rss2(), (err) => {
    if (err) {
      console.log(err);
      process.exit(1);
    }
  });

  fs.writeFile(path.resolve(__dirname, '../public/atom.xml'), feed.atom1(), (err) => {
    if (err) {
      console.log(err);
      process.exit(1);
    }
  });

  fs.writeFile(path.resolve(__dirname, '../public/feed.json'), feed.json1(), (err) => {
    if (err) {
      console.log(err);
      process.exit(1);
    }
  });
})();
