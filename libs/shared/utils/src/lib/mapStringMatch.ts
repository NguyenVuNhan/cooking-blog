export const mapStringMatch = <T>(
  value: string,
  query: string | RegExp,
  fn: (element: string, match: boolean, i?: number) => T
): (string | T)[] => {
  let result = [];
  if (query instanceof RegExp) {
    result = value.split(query);
  } else {
    result = value
      .split(query)
      .reduce(
        (result, value, index) =>
          index !== 0 ? result.concat([query, value]) : result.concat(value),
        []
      );
  }

  const ret: (string | T)[] = [...result];

  for (let i = 1; i < result.length; i += 2) {
    ret[i - 1] = fn(result[i - 1], false, i - 1);
    ret[i] = fn(result[i], true, i);
  }

  return ret;
};
