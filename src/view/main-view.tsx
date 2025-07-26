import { Loader } from '../components/ui/loader';
import type { Pokemon, PokemonList } from '../types/pokemon';
import { PokemonCard } from '../components/pokemon-card';

type Props = {
  pokemonData: PokemonList | Pokemon | null | undefined;
  pokemonIsLoadingData: boolean;
};

export const MainView = (props: Props) => {
  if (
    !props.pokemonData ||
    ('results' in props.pokemonData && props.pokemonData.results.length === 0)
  ) {
    return <h1 className="text-3xl">No Results</h1>;
  }

  return (
    <main className="py-6 px-2 max-w-4xl mx-auto">
      <Loader isLoading={props.pokemonIsLoadingData} />
      {!props.pokemonIsLoadingData &&
        props.pokemonData &&
        'results' in props.pokemonData && (
          <ul className="text-2xl">
            Pokemon list:
            {props.pokemonData.results.map((item) => (
              <li key={item.name || `no name ${crypto.randomUUID()}`}>
                <h3 className="text-xl">- {item.name || 'no name'}</h3>
              </li>
            ))}
          </ul>
        )}
      {!props.pokemonIsLoadingData && 'name' in props.pokemonData && (
        <PokemonCard data={props.pokemonData} />
      )}
    </main>
  );
};
