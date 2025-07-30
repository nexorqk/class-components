import {
  getCurrentPagesArray,
  getOffsetByPage,
} from '../../utils/page-counter';

describe('PageCounter', () => {
  it('Returns same array if current page less than 7', () => {
    const finalArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

    expect(getCurrentPagesArray(finalArray, 7)).toEqual(finalArray);
  });

  it('Returns array with first and last element always 1 and total pages if current page more than 7', () => {
    const array = Array.from({ length: 33 }, (_, index) => index + 1);

    const currentPage = 20;

    const finalArray = [
      1,
      currentPage - 3,
      currentPage - 2,
      currentPage - 1,
      currentPage,
      currentPage + 1,
      currentPage + 2,
      currentPage + 3,
      currentPage + 4,
      33,
    ];

    expect(getCurrentPagesArray(array, currentPage)).toEqual(finalArray);
  });

  it('Returns current page by offset', () => {
    expect(getOffsetByPage(1)).toBe(0);
    expect(getOffsetByPage(4)).toBe(60);
  });
});
