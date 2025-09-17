import { useEffect } from 'react';
import { useTheme } from '../hooks/theme';
import { cn } from '../utils/cn';
import { themeVariants } from '../utils/constants';

export const ThemeToggler = () => {
  const { themeValue, toggleTheme } = useTheme();

  useEffect(() => {
    const BODY = document.body;

    if (themeValue === themeVariants.DARK) {
      BODY.classList.add('bg-neutral-900');
    } else {
      BODY.classList.remove('bg-neutral-900');
    }
  }, [themeValue]);

  return (
    <div
      className={cn(
        'absolute right-2 top-2 flex gap-2 text-xl',
        themeValue === themeVariants.LIGHT
          ? 'text-purple-900'
          : 'text-slate-900/70'
      )}
    >
      <button
        className={cn(
          'cursor-pointer',
          themeValue === themeVariants.DARK && 'text-purple-900'
        )}
        onClick={() => toggleTheme(themeVariants.LIGHT)}
      >
        Light
      </button>
      <button
        className={cn(
          'cursor-pointer',
          themeVariants.DARK && 'text-purple-400'
        )}
        onClick={() => toggleTheme(themeVariants.DARK)}
      >
        Dark
      </button>
    </div>
  );
};
