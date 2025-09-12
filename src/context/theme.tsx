import { createContext } from 'react';

type ThemeContextType = {
  themeValue: string | null;
  toggleTheme: () => void;
};

export const ThemeContext = createContext<ThemeContextType>({
  themeValue: null,
  toggleTheme: () => {},
});
