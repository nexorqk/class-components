export const OFFSET_API = 'offset=';
export const LIMIT_API = '&limit';

export const getCurrentPage = (
  next: string | null,
  previous: string | null,
  countOfPages: number
) => {
  if (next === null) return countOfPages;

  if (previous === null) return 1;

  const previousOffset = previous.slice(
    previous.indexOf(OFFSET_API) + OFFSET_API.length,
    previous.indexOf(LIMIT_API)
  );
  console.log(previousOffset);
  return Math.floor(Number(previousOffset) / 20) + 1;
};

export const getCurrentPagesArray = (array: number[], currentPage: number) => {
  if (currentPage > 10) {
    return [1, ...array.slice(currentPage - 4, currentPage + 4), array.length];
  } else {
    return array.slice(0, 10);
  }
};
