export const OFFSET_API = 'offset=';
export const LIMIT_API = '&limit';

export const getOffsetByPage = (page: number) => page * 20 - 20;

export const getCurrentPagesArray = (array: number[], currentPage: number) => {
  if (currentPage > 10) {
    return [1, ...array.slice(currentPage - 4, currentPage + 4), array.length];
  } else {
    return array.slice(0, 10);
  }
};
