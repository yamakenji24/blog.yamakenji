export async function markDownToHtml(content: string): Promise<string> {
  const [remark, html, gfm] = await Promise.all([
    import('remark').then((mod) => mod.remark),
    import('remark-html').then((mod) => mod.default),
    import('remark-gfm').then((mod) => mod.default),
  ]);

  const result = await remark().use(html).use(gfm).process(content);
  return result.toString();
}
