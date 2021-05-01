import { useRef, useEffect, useCallback } from 'react';

export const useIsMounted = (): (() => boolean) => {
  const ref = useRef(false);

  useEffect(() => {
    ref.current = true;
    return () => {
      ref.current = false;
    };
  }, []);

  return useCallback(() => ref.current, [ref]);
};

export default useIsMounted;
