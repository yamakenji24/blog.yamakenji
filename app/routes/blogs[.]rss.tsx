import type { LoaderFunction } from 'remix';
import { getAllBlogs } from '~/lib/blogs';

export const loader: LoaderFunction = async ({ request }) => {
  const blogs = getAllBlogs();

  const host = request.headers.get('X-Forwarded-Host') ?? request.headers.get('Host');
  if (!host) throw new Error('Could not determine domain URL');

  const protocol = host.includes('localhost') ? 'http' : 'https';
  const domain = `${protocol}://${host}`;

  const rssString = `
    <rss xmlns:blogChannel="${domain}" version="2.0">
      <channel>
        <title>yamakenji blog</title>
        <link>${domain}</link>
        <description>yamakenji blog</description>
        <language>ja</language>
        <generator>yamakenji</generator>
        <ttl>40</ttl>
        ${blogs
          .map((blog) =>
            `
          <item>
            <title>${blog.title}</title>
            <link>${domain}/${blog.slug}</link>
            <description>${blog.description}</description>
            <pubDate>${blog.createdAt}</pubDate>
            <guid>${domain}/${blog.slug}</guid>
            <content>${blog.description}</content>
          </item>
        `.trim(),
          )
          .join('\n')}
      </channel>
    </rss>
  `.trim();

  return new Response(rssString, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': `public, max-age=${60 * 10}, s-maxage=${60 * 60 * 24}`,
      'Content-Length': String(Buffer.byteLength(rssString)),
    },
  });
};
