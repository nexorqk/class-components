import { createContext } from 'react';
import { getThemeStorage } from '../utils/theme-storage';

export const ThemeContext = createContext(getThemeStorage());
