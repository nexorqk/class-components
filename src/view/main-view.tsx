import { Outlet, useOutletContext } from 'react-router';

import { Loader } from '../components/ui/loader';
import type { Pokemon, PokemonList } from '../types/pokemon';

export type MainData = {
  setPokemon: (searchValue: string, offset?: number) => Promise<void>;
  pokemonData: PokemonList | Pokemon | null | undefined;
  pokemonIsLoadingData?: boolean;
};

export const MainView = () => {
  const { pokemonData, setPokemon, pokemonIsLoadingData } =
    useOutletContext<MainData>();

  return (
    <main className="py-6 px-2 max-w-4xl mx-auto">
      {!pokemonData && !pokemonIsLoadingData && (
        <h1 className="text-3xl">No Results</h1>
      )}

      <Loader isLoading={pokemonIsLoadingData} />

      {!pokemonIsLoadingData && (
        <Outlet context={{ pokemonData, setPokemon } satisfies MainData} />
      )}
    </main>
  );
};
