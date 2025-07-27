import { useEffect, useState } from 'react';

import { Search, searchId } from './components/search';
import { getPokemon } from './service/pokemon';
import type { Pokemon, PokemonList } from './types/pokemon';
import { MainView } from './view/main-view';
import { useSearchLocalStorage } from './hooks/search-local-storage';

export const App = () => {
  const [search, setSearch] = useSearchLocalStorage();
  const [pokemonItems, setPokemonItems] = useState<
    Pokemon | PokemonList | null
  >(null);
  const [pokemonIsLoadingData, setPokemonIsLoadingData] = useState(true);

  const setPokemon = async (searchValue: string): Promise<void> => {
    setPokemonIsLoadingData(true);

    const data: PokemonList | Pokemon = await getPokemon(searchValue);

    setPokemonItems(data);
    setSearch(searchValue);
    setPokemonIsLoadingData(false);
  };

  useEffect(() => {
    setPokemon(window.localStorage.getItem(searchId) || '');
  }, []);

  return (
    <>
      <Search initSearchValue={search} setPokemon={setPokemon} />
      <MainView
        pokemonData={pokemonItems}
        pokemonIsLoadingData={pokemonIsLoadingData}
      />
      <div className="flex justify-end p-6 max-w-3xl mx-auto"></div>
    </>
  );
};
