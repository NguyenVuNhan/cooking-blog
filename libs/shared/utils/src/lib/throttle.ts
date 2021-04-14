export const throttle = <Fn extends (...args: never[]) => void>(
  func: Fn,
  limit: number
): ((...rest: Parameters<Fn>) => void) => {
  let lastFunc: NodeJS.Timeout;
  let lastRan: number;
  return function (...rest) {
    if (!lastRan) {
      func(...rest);
      lastRan = Date.now();
    } else {
      clearTimeout(lastFunc);
      lastFunc = setTimeout(function () {
        if (Date.now() - lastRan >= limit) {
          func(...rest);
          lastRan = Date.now();
        }
      }, limit - (Date.now() - lastRan));
    }
  };
};
