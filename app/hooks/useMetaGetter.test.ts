import { renderHook } from '@testing-library/react-hooks';
import { DESCRIPTION, DEFAULT_PAGE_TITLE, usePageTitle, usePageDescription } from '.';

describe('usePageDescription', () => {
  const dummy_descriotpion = 'dummy description';

  test('should get default description', () => {
    const { result } = renderHook(() => usePageDescription());
    expect(result.current).toBe(DESCRIPTION);
  });

  test('should get input description', () => {
    const { result } = renderHook(() => usePageDescription(dummy_descriotpion));
    expect(result.current).toBe(dummy_descriotpion);
  });
});

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
