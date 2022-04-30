/* eslint-disable @typescript-eslint/no-var-requires */
import path from 'path';
const sitemapGenerator = require('sitemap-generator');
const filePath = path.resolve(__dirname, '../../public');

const generator = sitemapGenerator('https://blog.yamakenji.com', {
  stripQuerystring: false,
  filepath: `${filePath}/sitemap.xml`,
});

generator.on('error', (error: any) => {
  console.log(error);
  process.exit(1);
});

generator.start();
