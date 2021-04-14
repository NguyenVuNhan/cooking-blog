export const mapStringMatch = <T>(
  value: string,
  query: string,
  fn: (element: string, match: boolean, i?: number) => T
): (string | T)[] => {
  const result = value.split(query);

  const ret: T[] = result.reduce(
    (prev, curr, i) => [
      ...prev,
      fn(curr, false, i * 2),
      fn(query, true, i * 2 + 1),
    ],
    [] as T[]
  );

  ret.pop();

  return ret;
};
