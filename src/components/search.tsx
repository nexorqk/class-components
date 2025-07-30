import { useState, type FormEvent } from 'react';

import { useLocation } from 'react-router';
import { getNormalizedString } from '../utils/normalize';
import { Button } from './ui/button';

type Props = {
  initSearchValue: string;
  setPokemon: (value: string) => Promise<void>;
};

const WARNING_TEXT = "Please enter the Pokémon's exact name.";
export const searchId = 'search-value';

export const Search = ({ initSearchValue, setPokemon }: Props) => {
  const [searchValue, setSearchValue] = useState(initSearchValue);
  const location = useLocation();

  const handleFormSubmit = async (event: FormEvent): Promise<void> => {
    event.preventDefault();

    const normalizedValue = getNormalizedString(searchValue);

    setSearchValue(normalizedValue);

    await setPokemon(normalizedValue);
  };

  const isDisabled = location.pathname === '/about';

  return (
    <>
      <form className="flex gap-4 items-end" onSubmit={handleFormSubmit}>
        <div className="flex flex-col gap-3">
          <label htmlFor={searchId} className="text-xl font-bold">
            Search pokemon by name:
          </label>
          <input
            disabled={isDisabled}
            className="border-2 border-gray-400 rounded-md"
            id={searchId}
            value={searchValue}
            onChange={(event) => setSearchValue(event.target.value)}
          />
        </div>
        <Button disabled={isDisabled}>Search</Button>
      </form>
      <p className="text-sm text-amber-600 max-w-[240px]">{WARNING_TEXT}</p>
    </>
  );
};
