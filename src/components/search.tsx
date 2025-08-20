'use client';

import { useEffect, useState, type FormEvent } from 'react';
import { useParams, usePathname, useRouter } from 'next/navigation';

import { cn } from '../utils/cn';
import { getNormalizedString } from '../utils/normalize';
import { Button } from './ui/button';
import { useThemeContext } from '../components/theme-provider';

const WARNING_TEXT = "Please enter the Pokémon's exact name.";
export const searchId = 'search-value';

export const Search = () => {
  const [searchValue, setSearchValue] = useState('');
  const isThemeDark = useThemeContext();

  const router = useRouter();
  const params = useParams();
  const pathname = usePathname();

  const handleFormSubmit = async (event: FormEvent): Promise<void> => {
    event.preventDefault();

    if (typeof searchValue === 'string') {
      const normalizedValue = getNormalizedString(searchValue);
      setSearchValue(normalizedValue);

      if (normalizedValue === '') {
        router.push(`/pokemon/list/${params.page || '1'}`);
      } else {
        router.push(normalizedValue);
      }
    }
  };

  useEffect(() => {
    if (
      params.name !== searchValue &&
      !pathname.includes('list') &&
      typeof params.name === 'string'
    ) {
      setSearchValue(params.name || '');
    }
  }, []);

  return (
    <>
      <form className="flex gap-4 items-end" onSubmit={handleFormSubmit}>
        <div className="flex flex-col gap-3">
          <label
            htmlFor={searchId}
            className={cn(
              'text-xl font-bold',
              isThemeDark ? 'text-white' : 'text-slate-900'
            )}
          >
            Search pokemon by name:
          </label>
          <input
            className={cn(
              'border-2 border-gray-400 rounded-md',
              isThemeDark ? 'text-white' : 'text-slate-900'
            )}
            type="text"
            id={searchId}
            value={searchValue}
            onChange={(event) => setSearchValue(event.target.value)}
          />
        </div>
        <Button>Search</Button>
      </form>
      <p className="text-sm text-amber-600 max-w-[240px]">{WARNING_TEXT}</p>
    </>
  );
};
