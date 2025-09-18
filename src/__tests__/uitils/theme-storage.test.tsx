import { themeVariants } from '../../utils/constants';
import { getThemeStorage, setThemeStorage } from '../../utils/theme-storage';

const getItemSpy = vi.spyOn(Storage.prototype, 'getItem');
const setItemSpy = vi.spyOn(Storage.prototype, 'setItem');

afterEach(() => {
  getItemSpy.mockClear();
  setItemSpy.mockClear();

  localStorage.clear();
});

describe('Theme Storage', () => {
  it('set item to local storage', () => {
    setThemeStorage(themeVariants.DARK);

    expect(setItemSpy).toHaveBeenCalledWith('theme-value', themeVariants.DARK);
  });

  it('light theme when no value in storage', () => {
    expect(getThemeStorage()).toBe(themeVariants.LIGHT);
  });
});
