import { useEffect, useState } from 'react';

export const useIsMounted = (): boolean => {
  const [isMounted, setIsMounted] = useState(true);

  useEffect(() => {
    return () => {
      setIsMounted(false);
    };
  }, []);

  return isMounted;
};
