export const throttle = <Fn extends (...args: never[]) => void>(
  func: Fn,
  limit: number,
  options: { leading?: boolean; trailing?: boolean } = {}
): ((...rest: Parameters<Fn>) => void) => {
  let lastFunc: number;
  let lastRan: number;
  const { leading = true, trailing = true } = options;

  const fnCall = (...rest: never[]) => {
    if (Date.now() - lastRan >= limit) {
      func(...rest);
      lastRan = Date.now();
    }
  };

  return function (...rest) {
    if (!lastRan) {
      if (leading) {
        func(...rest);
      }
      lastRan = Date.now();
    } else {
      if (trailing) {
        clearTimeout(lastFunc);
        lastFunc = +setTimeout(function () {
          fnCall(...rest);
        }, limit - (Date.now() - lastRan));
      } else {
        fnCall(...rest);
      }
    }
  };
};

export default throttle;
