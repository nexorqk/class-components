'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { getThemeIsDarkFromLS } from '../utils/theme-storage';

const ThemeContext = createContext(false);

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    if (getThemeIsDarkFromLS()) {
      setIsDark(true);
    }
  }, []);

  return <ThemeContext value={isDark}>{children}</ThemeContext>;
};

export const useThemeContext = () => useContext(ThemeContext);
