import { useState } from 'react';

import { ThemeContext } from '../context/theme';
import { getThemeStorage, setThemeStorage } from '../utils/theme-storage';

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [theme, setTheme] = useState(getThemeStorage());

  const toggleTheme = (value: string) => {
    setThemeStorage(value);
    setTheme(value);
  };

  return (
    <ThemeContext.Provider value={{ themeValue: theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
