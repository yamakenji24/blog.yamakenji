import { renderToString } from 'react-dom/server';
import { RemixServer } from 'remix';
import type { EntryContext } from 'remix';
import { RecoilRoot } from 'recoil';

export default async function handleRequest(
  request: Request,
  responseStatusCode: number,
  responseHeaders: Headers,
  remixContext: EntryContext,
) {
  const markup = renderToString(
    <RecoilRoot>
      <RemixServer context={remixContext} url={request.url} />
    </RecoilRoot>,
  );

  responseHeaders.set('Content-Type', 'text/html');

  return new Response('<!DOCTYPE html>' + markup, {
    status: responseStatusCode,
    headers: responseHeaders,
  });
}
