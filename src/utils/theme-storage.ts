export const getThemeStorage = () => {
  let theme = false;

  try {
    const value = window.localStorage.getItem('theme-value');

    theme = value === 'dark';
  } catch (error) {
    console.error(error);
  }

  return theme;
};

export const setThemeStorage = (isDark: boolean) =>
  window.localStorage.setItem('theme-value', isDark ? 'dark' : 'light');
