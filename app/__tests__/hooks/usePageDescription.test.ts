import { DESCRIPTION, usePageDescription } from '../../hooks/usePageDesciption';
import { renderHook } from '@testing-library/react-hooks';

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
