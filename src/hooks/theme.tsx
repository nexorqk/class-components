import { useContext } from 'react';

import { ThemeContext } from '../context/theme';

export const useTheme = () => {
  const context = useContext(ThemeContext);

  if (context.themeValue === null) {
    throw new Error('useTheme should be in theme context provider scope');
  }

  return context;
};
