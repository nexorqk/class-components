import { themeVariants } from './constants';

export const getThemeStorage = () => {
  let theme = null;

  try {
    const value = window.localStorage.getItem('theme-value');

    theme =
      JSON.stringify(value) === themeVariants.DARK
        ? themeVariants.DARK
        : themeVariants.LIGHT;
  } catch (error) {
    console.error(error);
  }

  return theme;
};

export const setThemeStorage = (themeValue: string | null) =>
  window.localStorage.setItem(
    'theme-value',
    themeValue === themeVariants.DARK ? themeVariants.DARK : themeVariants.LIGHT
  );
