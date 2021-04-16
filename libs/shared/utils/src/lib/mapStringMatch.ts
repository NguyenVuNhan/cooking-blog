export const mapStringMatch = <T>(
  value: string,
  query: string | RegExp,
  fn: (element: string, match: boolean, i?: number) => T
): (string | T)[] => {
  const result = value.split(query);

  const ret: (string | T)[] = [...result];

  for (let i = 1, length = result.length; i < length; i += 2) {
    ret[i - 1] = fn(result[i - 1], false, i - 1);
    ret[i] = fn(result[i], true, i);
  }

  return ret;
};
