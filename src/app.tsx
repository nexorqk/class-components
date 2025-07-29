import { useCallback, useEffect, useState } from 'react';

import { Outlet, useNavigate } from 'react-router';
import { Navigation } from './components/navigation';
import { Search } from './components/search';
import { useSearchLocalStorage } from './hooks/search-local-storage';
import { getPokemon } from './service/pokemon';
import type { Pokemon, PokemonList } from './types/pokemon';
import type { MainData } from './view/main-view';

export const App = () => {
  const [search, setSearch] = useSearchLocalStorage();
  const [pokemonItems, setPokemonItems] = useState<
    Pokemon | PokemonList | null
  >(null);
  const [pokemonIsLoadingData, setPokemonIsLoadingData] = useState(true);

  const navigate = useNavigate();

  const setPokemon = useCallback(
    async (searchValue: string, offset?: number): Promise<void> => {
      setPokemonIsLoadingData(true);

      const data: PokemonList | Pokemon = await getPokemon(searchValue, offset);

      setPokemonItems(data);
      setSearch(searchValue);
      setPokemonIsLoadingData(false);
    },
    [setSearch]
  );

  useEffect(() => {
    const page = '1';
    setPokemon(search);

    if (search !== '') navigate(`pokemon/${search}`);
    else {
      navigate(`pokemon/list/${page}/bulbasaur`);
    }
  }, [search, setPokemon, navigate]);

  return (
    <>
      <header className="mx-auto px-2 py-4 max-w-4xl space-y-1">
        <Navigation />
        <Search initSearchValue={search} setPokemon={setPokemon} />
      </header>
      <Outlet
        context={
          {
            setPokemon,
            pokemonData: pokemonItems,
            pokemonIsLoadingData,
          } satisfies MainData
        }
      />
    </>
  );
};
