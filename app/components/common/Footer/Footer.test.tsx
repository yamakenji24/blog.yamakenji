import { render, screen } from '@testing-library/react';
import { Footer } from '.';

describe('render Footer', () => {
  it('should render Footer', () => {
    const year = new Date().getFullYear();
    render(<Footer />);
    expect(screen.getByText(`© ${year} yamakenji24, All rights reserved.`)).toBeInTheDocument();
  });
});

// ┗
//  warn  The `formMethod` API is changing in v2
// ┃ You can use the `v2_normalizeFormMethod` future flag to opt-in early.
// ┃ -> https://remix.run/docs/en/v1.15.0/pages/v2#formMethod
// ┗
//  warn  The route `meta` API is changing in v2
// ┃ You can use the `v2_meta` future flag to opt-in early.
// ┃ -> https://remix.run/docs/en/v1.15.0/pages/v2#meta
// ┗
//  warn  The route `headers` API is changing in v2
// ┃ You can use the `v2_headers` future flag to opt-in early.
// ┃ -> https://remix.run/docs/en/v1.17.0/pages/v2#route-headers
// ┗
// ┗
//  warn  The route file convention is changing in v2
// ┃ You can use the `v2_routeConvention` future flag to opt-in early.
// ┃ -> https://remix.run/docs/en/v1.15.0/pages/v2#file-system-route-convention
// ┗
//  warn  The `remix dev` changing in v2
// ┃ You can use the `v2_dev` future flag to opt-in early.
// ┃ -> https://remix.run/docs/en/main/pages/v2#dev-server
