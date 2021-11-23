import { DEFAULT_PAGE_TITLE, usePageTitle } from '../../hooks/usePageTitle';
import { renderHook } from '@testing-library/react-hooks';

describe('usePageTitle', () => {
  const dummy_page_title = 'dummy_page_title';

  test('should get default page title', () => {
    const { result } = renderHook(() => usePageTitle());
    expect(result.current).toBe(DEFAULT_PAGE_TITLE);
  });

  test('should mix input page title', () => {
    const { result } = renderHook(() => usePageTitle(dummy_page_title));
    expect(result.current).toBe(`${dummy_page_title} | ${DEFAULT_PAGE_TITLE}`);
  });
});
