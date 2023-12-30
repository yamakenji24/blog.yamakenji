import { RemixBrowser } from '@remix-run/react';
import { RecoilRoot } from 'recoil';
import { startTransition, StrictMode } from 'react';
import { hydrateRoot } from 'react-dom/client';

startTransition(() => {
  hydrateRoot(
    document,
    <StrictMode>
      <RecoilRoot>
        <RemixBrowser />
      </RecoilRoot>
    </StrictMode>,
  );
});
