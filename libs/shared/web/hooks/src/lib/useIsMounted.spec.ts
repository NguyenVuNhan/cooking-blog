import { renderHook } from '@testing-library/react-hooks';

import useIsMounted from './useIsMounted';

describe('useIsMounted', () => {
  it('should return true if component is mounted', () => {
    const { result } = renderHook(() => useIsMounted());
    expect(result.current()).toBe(true);
    result;
  });

  it('should return false if component is unmounted', () => {
    const { result, unmount } = renderHook(() => useIsMounted());
    unmount();
    expect(result.current()).toBe(false);
  });

  it('should be defined', () => {
    expect(useIsMounted).toBeDefined();
  });
});
