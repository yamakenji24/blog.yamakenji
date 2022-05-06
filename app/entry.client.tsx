import { RemixBrowser } from '@remix-run/react';
import { hydrate } from 'react-dom';
import { RecoilRoot } from 'recoil';

hydrate(
  <RecoilRoot>
    <RemixBrowser />
  </RecoilRoot>,
  document,
);
