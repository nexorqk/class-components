'use client';

import { cn } from '../utils/cn';
import { useEffect, useState } from 'react';
import { getThemeIsDarkFromLS, setThemeStorage } from '../utils/theme-storage';

export const ThemeChanger = () => {
  const [isThemeDark, setIsThemeDark] = useState(false);

  const handleSetTheme = (isDark: boolean) => {
    setIsThemeDark(isDark);

    setThemeStorage(isDark);
  };

  useEffect(() => {
    if (getThemeIsDarkFromLS()) {
      setIsThemeDark(true);
      setThemeStorage(true);
    }
  }, []);

  return (
    <div
      className={cn(
        'absolute right-2 top-2 flex gap-2 text-xl',
        isThemeDark ? 'text-white' : 'text-slate-900/70'
      )}
    >
      <button
        className={cn('cursor-pointer', !isThemeDark && 'text-purple-900')}
        onClick={() => handleSetTheme(false)}
      >
        Light
      </button>
      <button
        className={cn('cursor-pointer', isThemeDark && 'text-purple-400')}
        onClick={() => handleSetTheme(true)}
      >
        Dark
      </button>
    </div>
  );
};
