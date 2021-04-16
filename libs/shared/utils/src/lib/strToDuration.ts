export const strToDuration = (rawDuration: string): number => {
  const reg = /(\d*).*\s\s*(\w\w*)$/;
  const result = reg.exec(rawDuration);

  if (result?.length !== 3) return 0;

  const value = parseInt(result[1], 10);
  let multiplier = 0;

  switch (result[2]) {
    case 'hour':
    case 'hours':
    case 'hr':
    case 'hrs':
      multiplier = 60 * 60 * 1000;
      break;
    case 'min':
    case 'mins':
    case 'minutes':
    case 'minute':
    case 'm':
      multiplier = 60 * 1000;
      break;
    case 'sec':
    case 'seconds':
    case 'second':
    case 's':
      multiplier = 1000;
      break;
  }

  return value * multiplier;
};
