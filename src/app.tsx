import { useEffect, useState } from 'react';

import ErrorBoundary from './components/error-boundary';
import { Search } from './components/search';
import { getPokemon } from './service/pokemon';
import type { Pokemon, PokemonList } from './types/pokemon';
import { searchLSService } from './utils/local-storage';
import { MainView } from './view/main-view';

export const App = () => {
  const [pokemonItems, setPokemonItems] = useState<
    Pokemon | PokemonList | null
  >(null);
  const [pokemonIsLoadingData, setPokemonIsLoadingData] = useState(true);

  const setPokemon = async (searchValue: string): Promise<void> => {
    setPokemonIsLoadingData(true);

    const data: PokemonList | Pokemon = await getPokemon(searchValue);

    setPokemonItems(data);
    setPokemonIsLoadingData(false);
  };

  useEffect(() => {
    setPokemon(searchLSService.get());
  }, []);

  const searchComponent = <Search setPokemon={setPokemon} />;

  return (
    <ErrorBoundary searchComponent={searchComponent}>
      {searchComponent}
      <MainView
        pokemonData={pokemonItems}
        pokemonIsLoadingData={pokemonIsLoadingData}
      />
      <div className="flex justify-end p-6 max-w-3xl mx-auto"></div>
    </ErrorBoundary>
  );
};
