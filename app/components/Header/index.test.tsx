import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import '@testing-library/jest-dom';
import { Header } from '.';

// WIP: Router周辺のテストがよくわからない
describe('render Header', () => {
  it('should render en pages after cling English Link', async () => {
    render(<Header />, { wrapper: MemoryRouter });
    const elm = screen.getByText('English');
    expect(elm.innerHTML).toMatch('English');
  });
});
