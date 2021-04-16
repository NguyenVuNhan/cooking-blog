import { useEffect, useRef } from 'react';

type CbType = () => void;

export const useInterval = (callback: CbType, tick: number): void => {
  const callbackRef = useRef<CbType>();

  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  useEffect(() => {
    if (tick <= 0) return;
    const id = setInterval(
      () => callbackRef.current && callbackRef.current(),
      tick
    );
    return () => clearInterval(id);
  }, [tick]);
};

export default useInterval;
