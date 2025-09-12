import { NavLink } from 'react-router';

import { useTheme } from '../hooks/theme';
import { cn } from '../utils/cn';
import { themeVariants } from '../utils/constants';

export const Navigation = () => {
  const { themeValue } = useTheme();

  return (
    <div className="space-x-3 pb-5">
      <NavLink
        to="/pokemon/list/1"
        className={({ isActive, isPending }) =>
          cn(
            themeValue === themeVariants.DARK ? 'text-white' : 'text-slate-900',
            isPending && 'text-amber-200',
            isActive && 'text-blue-400',
            'text-xl hover:text-blue-700'
          )
        }
      >
        Main
      </NavLink>
      <NavLink
        to="/about"
        className={({ isActive, isPending }) =>
          cn(
            themeValue === themeVariants.DARK ? 'text-white' : 'text-slate-900',
            isPending && 'text-amber-200',
            isActive && 'text-blue-400',
            'text-xl hover:text-blue-700'
          )
        }
      >
        About
      </NavLink>
    </div>
  );
};
