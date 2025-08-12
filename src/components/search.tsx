import { useContext, useEffect, type FormEvent } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router';

import { ThemeContext } from '../context/theme';
import { useSearchLocalStorage } from '../hooks/search-local-storage';
import { cn } from '../utils/cn';
import { getNormalizedString } from '../utils/normalize';
import { Button } from './ui/button';

const WARNING_TEXT = "Please enter the Pokémon's exact name.";
export const searchId = 'search-value';

export const Search = () => {
  const [searchValue, setSearchValue] = useSearchLocalStorage();
  const isThemeDark = useContext(ThemeContext);
  const navigate = useNavigate();
  const params = useParams();
  const location = useLocation();

  const handleFormSubmit = async (event: FormEvent): Promise<void> => {
    event.preventDefault();

    if (typeof searchValue === 'string') {
      const normalizedValue = getNormalizedString(searchValue);
      setSearchValue(normalizedValue);

      if (normalizedValue === '') {
        navigate(`/pokemon/list/${params.page || '1'}`);
      } else {
        navigate(normalizedValue);
      }
    }
  };

  useEffect(() => {
    if (
      params.pokemonName !== searchValue &&
      !location.pathname.includes('list')
    ) {
      setSearchValue(params.pokemonName || '');
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
