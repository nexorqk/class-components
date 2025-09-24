export const getOffsetByPage = (page: number) => page * 20 - 20;

export const getCurrentPagesArray = (array: number[], currentPage: number) => {
  if (currentPage > 7 && currentPage < array.length - 5) {
    return [1, ...array.slice(currentPage - 4, currentPage + 4), array.length];
  }

  if (currentPage > array.length - 5) {
    return [1, ...array.slice(array.length - 9)];
  }

  return array.slice(0, 10);
};
