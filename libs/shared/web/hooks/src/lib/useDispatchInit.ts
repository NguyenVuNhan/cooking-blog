import { useDispatch } from 'react-redux';
import { useEffect } from 'react';

export const useDispatchInit = <Fn extends (...args: unknown[]) => void>(
  fn: Fn,
  ...args: Parameters<Fn>
): void => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fn(...args));
  }, [fn, ...args]);
};
