import { useState } from 'react';

import { getThemeStorage, setThemeStorage } from '../utils/theme-storage';
import { themeVariants } from '../utils/constants';
import { ThemeContext } from '../context/theme';

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [theme, setTheme] = useState(getThemeStorage());

  const getPrevTheme = (prevTheme: string | null) =>
    prevTheme === themeVariants.DARK ? themeVariants.LIGHT : themeVariants.DARK;

  const toggleTheme = () => {
    setThemeStorage(getPrevTheme(theme));
    setTheme((prev) => getPrevTheme(prev));
    console.log(theme);
  };

  return (
    <ThemeContext.Provider value={{ themeValue: theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
