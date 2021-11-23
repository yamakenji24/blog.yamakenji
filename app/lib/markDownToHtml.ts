export async function markDownToHtml(content: string): Promise<string> {
  const { remark } = await import('remark');
  const html = await import('remark-html');
  const gfm = await import('remark-gfm');

  const result = await remark().use(gfm.default).use(html.default).process(content);
  return result.toString();
}
