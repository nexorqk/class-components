import { Component, type ReactNode } from 'react';

import Loader from '../components/ui/loader';
import type { Pokemon, PokemonList } from '../types/pokemon';
import PokemonCard from '../components/pokemon-card';

type Props = {
  pokemonData: PokemonList | Pokemon | null | undefined;
  pokemonIsLoadingData: boolean;
};

export default class MainView extends Component<Props> {
  render(): ReactNode {
    if (
      !this.props.pokemonData ||
      ('results' in this.props.pokemonData &&
        this.props.pokemonData.results.length === 0)
    ) {
      return <h1 className="text-3xl">No Results</h1>;
    }

    return (
      <main className="py-6 px-2 max-w-4xl mx-auto">
        <Loader isLoading={this.props.pokemonIsLoadingData} />
        {!this.props.pokemonIsLoadingData &&
          this.props.pokemonData &&
          'results' in this.props.pokemonData && (
            <ul className="text-2xl">
              Pokemon list:
              {this.props.pokemonData.results.map((item) => (
                <li key={item.name || `no name ${crypto.randomUUID()}`}>
                  <h3 className="text-xl">- {item.name || 'no name'}</h3>
                </li>
              ))}
            </ul>
          )}
        {!this.props.pokemonIsLoadingData &&
          'name' in this.props.pokemonData && (
            <PokemonCard data={this.props.pokemonData} />
          )}
      </main>
    );
  }
}
