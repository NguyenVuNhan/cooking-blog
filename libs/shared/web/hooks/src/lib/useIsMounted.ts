import { useEffect, useRef } from 'react';

export const useIsMounted = (): boolean => {
  const isMounted = useRef(true);

  useEffect(() => {
    return () => {
      isMounted.current = false;
    };
  }, []);

  return isMounted.current;
};
