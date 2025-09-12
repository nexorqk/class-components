import { useTheme } from '../hooks/theme';
import { cn } from '../utils/cn';
import { themeVariants } from '../utils/constants';

export const ThemeToggler = () => {
  const { themeValue, toggleTheme } = useTheme();

  return (
    <div
      className={cn(
        'absolute right-2 top-2 flex gap-2 text-xl',
        themeValue === themeVariants.LIGHT ? 'text-white' : 'text-slate-900/70'
      )}
    >
      <button
        className={cn(
          'cursor-pointer',
          themeValue === themeVariants.DARK && 'text-purple-900'
        )}
        onClick={() => toggleTheme()}
      >
        Light
      </button>
      <button
        className={cn(
          'cursor-pointer',
          themeVariants.DARK && 'text-purple-400'
        )}
        onClick={() => toggleTheme()}
      >
        Dark
      </button>
    </div>
  );
};
