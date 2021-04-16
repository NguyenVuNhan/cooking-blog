import { useEffect, useState } from 'react';

export const useIsMounted = (): boolean => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    return () => {
      setIsMounted(false);
    };
  }, []);

  return isMounted;
};
