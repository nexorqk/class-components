import { Component, type ReactNode } from 'react';

import Loader from '../components/loader';
import type { Pokemon, PokemonList } from '../types/pokemon';
import PokemonCard from '../components/pokemon-card';

type Props = {
  pokemonData: PokemonList | Pokemon | null;
  pokemonIsLoadingData: boolean;
};

export default class Main extends Component<Props> {
  render(): ReactNode {
    return (
      <main className="py-6 px-2 max-w-4xl mx-auto">
        {this.props.pokemonIsLoadingData && <Loader />}
        {this.props.pokemonData && 'results' in this.props.pokemonData ? (
          <ul className="text-2xl">
            Pokemon list:
            {this.props.pokemonData.results.map((item) => (
              <li key={item.name}>
                <h3 className="text-xl">- {item.name}</h3>
              </li>
            ))}
          </ul>
        ) : (
          <PokemonCard data={this.props.pokemonData} />
        )}
      </main>
    );
  }
}
