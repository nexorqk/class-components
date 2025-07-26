import { useState, type FormEvent } from 'react';

import { Button } from './ui/button';
import { searchLSService } from '../utils/local-storage';
import { getNormalizedString } from '../utils/normalize';

type Props = {
  setPokemon: (value: string) => Promise<void>;
};

const WARNING_TEXT = "Please enter the Pokémon's exact name.";
const searchId = 'search-value';

export const Search = ({ setPokemon }: Props) => {
  const [searchValue, setSearchValue] = useState(searchLSService.get());

  const handleFormSubmit = async (event: FormEvent): Promise<void> => {
    event.preventDefault();

    const normalizedValue = getNormalizedString(searchValue);

    setSearchValue(normalizedValue);

    await setPokemon(normalizedValue);

    searchLSService.set(normalizedValue);
  };

  return (
    <header className="mx-auto px-2 py-4 max-w-4xl space-y-1">
      <form className="flex gap-4 items-end" onSubmit={handleFormSubmit}>
        <div className="flex flex-col gap-3">
          <label htmlFor={searchId} className="text-xl font-bold">
            Search pokemon by name:
          </label>
          <input
            className="border-2 border-gray-400 rounded-md"
            id={searchId}
            value={searchValue}
            onChange={(event) => setSearchValue(event.target.value)}
          />
        </div>
        <Button>Search</Button>
      </form>
      <p className="text-sm text-amber-600 max-w-[240px]">{WARNING_TEXT}</p>
    </header>
  );
};
