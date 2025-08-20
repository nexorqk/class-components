export const getThemeIsDarkFromLS = () => {
  let theme = false;

  try {
    const value = localStorage.getItem('theme-value');

    if (typeof value === 'string') {
      theme = value === 'dark';
    }
  } catch (error) {
    console.error(error);
  }

  return theme;
};

export const setThemeStorage = (isDark: boolean) =>
  localStorage.setItem('theme-value', isDark ? 'dark' : 'light');
