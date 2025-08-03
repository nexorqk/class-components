import { useContext } from 'react';

import { ThemeContext } from '../../context/theme';
import { cn } from '../../utils/cn';

export const Loader = ({ isLoading }: { isLoading?: boolean }) => {
  const themeIsDark = useContext(ThemeContext);

  if (isLoading === false) return null;

  return (
    <div role="alert" aria-label="Loading content" className="flex gap-2  p-4 ">
      <div
        className={cn(
          'h-4 w-4 bg-black animate-bounce rounded-full [animation-delay:-0.3s]',
          themeIsDark ? 'bg-white' : 'bg-slate-900'
        )}
      ></div>
      <div
        className={cn(
          'h-4 w-4 animate-bounce rounded-full [animation-delay:-0.15s]',
          themeIsDark ? 'bg-white' : 'bg-slate-900'
        )}
      ></div>
      <div
        className={cn(
          'h-4 w-4 bg-black animate-bounce rounded-full',
          themeIsDark ? 'bg-white' : 'bg-slate-900'
        )}
      ></div>
      <div className="sr-only" aria-label="Loading content">
        Loading content
      </div>
    </div>
  );
};
