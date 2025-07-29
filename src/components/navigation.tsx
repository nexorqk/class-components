import { NavLink } from 'react-router';

import { cn } from '../utils/cn';

export const Navigation = () => (
  <div className="space-x-3 pb-5">
    <NavLink
      to="/pokemon/list/1"
      className={({ isActive, isPending }) =>
        cn(
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
