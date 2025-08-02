import { useCallback, useEffect, useState } from 'react';
import { Outlet, useNavigate } from 'react-router';

import { Navigation } from './components/navigation';
import { Search } from './components/search';
import { useSearchLocalStorage } from './hooks/search-local-storage';
import { getPokemon } from './service/pokemon';
import type { Pokemon, PokemonList } from './types/pokemon';
import type { MainData } from './view/main-view';
import { ThemeContext } from './context/theme';
import { getThemeStorage, setThemeStorage } from './utils/theme-storage';
import { cn } from './utils/cn';

export const App = () => {
  const [search, setSearch] = useSearchLocalStorage();
  const [pokemonItems, setPokemonItems] = useState<
    Pokemon | PokemonList | null
  >(null);
  const [pokemonError, setPokemonError] = useState<string | null>(null);
  const [pokemonDataIsLoading, setpokemonDataIsLoading] = useState(true);
  const [themeIsDark, setThemeIsDark] = useState(getThemeStorage());

  const navigate = useNavigate();

  const setPokemon = useCallback(
    async (searchValue: string, offset?: number): Promise<void> => {
      setpokemonDataIsLoading(true);

      try {
        const data: PokemonList | Pokemon = await getPokemon(
          searchValue,
          offset
        );

        setPokemonItems(data);
        setSearch(searchValue);
        setPokemonError(null);
      } catch (error) {
        if (error instanceof Error) {
          setPokemonError(error.message);
        } else {
          setPokemonError(JSON.stringify(error));
        }

        console.error(error);
      }

      setpokemonDataIsLoading(false);
    },
    [setSearch, setPokemonError]
  );

  useEffect(() => {
    setPokemon(search || '');

    if (search !== '') navigate(`pokemon/${search}`);
    else {
      navigate(`pokemon/list/1`);
    }
  }, [search, setPokemon, navigate]);

  const handleSetTheme = (isDark: boolean) => {
    setThemeIsDark(isDark);

    setThemeStorage(isDark);
  };

  return (
    <ThemeContext value={themeIsDark}>
      <div
        className={cn(
          themeIsDark ? 'bg-slate-900' : 'bg-white',
          'h-dvh w-full'
        )}
      >
        <header className="relative mx-auto px-2 py-4 max-w-4xl space-y-1">
          <div
            className={cn(
              'absolute right-2 top-2 flex gap-2 text-xl',
              themeIsDark ? 'text-white' : 'text-slate-900/70'
            )}
          >
            <button
              className={cn(
                'cursor-pointer',
                !themeIsDark && 'text-purple-900'
              )}
              onClick={() => handleSetTheme(false)}
            >
              Light
            </button>
            <button
              className={cn('cursor-pointer', themeIsDark && 'text-purple-400')}
              onClick={() => handleSetTheme(true)}
            >
              Dark
            </button>
          </div>
          <Navigation />
          <Search initSearchValue={search} setPokemon={setPokemon} />
        </header>
        <Outlet
          context={
            {
              setPokemon,
              pokemonData: pokemonItems,
              pokemonDataIsLoading,
              pokemonError,
            } satisfies MainData
          }
        />
      </div>
    </ThemeContext>
  );
};
