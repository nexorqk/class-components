import { Outlet, useOutletContext } from 'react-router';

import { Loader } from '../components/ui/loader';
import type { Pokemon, PokemonList } from '../types/pokemon';

export type MainData = {
  setPokemon: (searchValue: string, offset?: number) => Promise<void>;
  pokemonData: PokemonList | Pokemon | null | undefined;
  pokemonDataIsLoading: boolean;
  pokemonError: string | null;
};

export const MainView = () => {
  const { pokemonData, setPokemon, pokemonDataIsLoading, pokemonError } =
    useOutletContext<MainData>();

  return (
    <main className="py-6 px-2 max-w-4xl mx-auto">
      <Loader isLoading={pokemonDataIsLoading} />

      {!pokemonDataIsLoading && (
        <Outlet
          context={
            {
              pokemonData,
              setPokemon,
              pokemonError,
            } satisfies Omit<MainData, 'pokemonDataIsLoading'>
          }
        />
      )}
    </main>
  );
};
