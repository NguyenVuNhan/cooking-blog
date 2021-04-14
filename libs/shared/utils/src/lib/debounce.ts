export const debounce = <Fn extends (...args: never[]) => void>(
  func: Fn,
  delay: number
): ((...rest: Parameters<Fn>) => void) => {
  let inDebounce: NodeJS.Timeout;
  return function (...rest) {
    clearTimeout(inDebounce);
    inDebounce = setTimeout(() => func(...rest), delay);
  };
};
