'use client';

import Link from 'next/link';

import { useThemeContext } from './theme-provider';

export const Navigation = () => {
  const isThemeDark = useThemeContext();

  return (
    <div className="space-x-3 pb-5">
      <Link
        href="/pokemon/list/1"
        className={isThemeDark ? 'text-white' : 'text-slate-900'}
        // {({ isActive, isPending }) =>
        //   cn(
        //     isPending && 'text-amber-200',
        //     isActive && 'text-blue-400',
        //     'text-xl hover:text-blue-700'
        //   )
        // }
      >
        Main
      </Link>
      <Link
        href="/about"
        className={isThemeDark ? 'text-white' : 'text-slate-900'}
        // {({ isActive, isPending }) =>
        //   cn(
        //     isThemeDark ? 'text-white' : 'text-slate-900',
        //     isPending && 'text-amber-200',
        //     isActive && 'text-blue-400',
        //     'text-xl hover:text-blue-700'
        //   )
        // }
      >
        About
      </Link>
    </div>
  );
};
