import { useEffect } from 'react';

import { cn } from '../utils/cn';
import { setThemeStorage } from '../utils/theme-storage';

export const ThemeChanger = ({
  isThemeDark,
  setIsThemeDark,
}: {
  isThemeDark: boolean;
  setIsThemeDark: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  useEffect(() => {
    if (isThemeDark) {
      window.document.body.classList.add('bg-slate-900');
    } else {
      window.document.body.classList.remove('bg-slate-900');
    }
  }, [isThemeDark]);

  const handleSetTheme = (isDark: boolean) => {
    setIsThemeDark(isDark);

    setThemeStorage(isDark);
  };
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
