import { useContext } from 'react';
import { NavLink } from 'react-router';

import { ThemeContext } from '../context/theme';
import { cn } from '../utils/cn';

export const Navigation = () => {
  const isThemeDark = useContext(ThemeContext);

  return (
    <div className="space-x-3 pb-5">
      <NavLink
        to="/pokemon/list/1"
        className={({ isActive, isPending }) =>
          cn(
            isThemeDark ? 'text-white' : 'text-slate-900',
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
            isThemeDark ? 'text-white' : 'text-slate-900',
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
