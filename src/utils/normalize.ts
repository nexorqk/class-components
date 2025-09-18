export const getNormalizedString = (value: string): string =>
  value
    .split(' ')
    .filter((item) => item !== '')
    .join(' ');
