import { render, screen } from '@testing-library/react';
import { Footer } from '.';

describe('render Footer', () => {
  it('should render Footer', () => {
    const year = new Date().getFullYear();
    render(<Footer />);
    expect(screen.getByText(`© ${year} yamakenji24, All rights reserved.`)).toBeInTheDocument();
  });
});
