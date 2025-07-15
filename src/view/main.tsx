import { Component, type ReactNode } from 'react';

import Loader from '../components/loader';
import type { Pokemon, PokemonList } from '../types/pokemon';
import PokemonCard from '../components/pokemon-card';

type Props = {
  pokemonData: PokemonList | Pokemon | null;
};

export default class Main extends Component<Props> {
  render(): ReactNode {
    return (
      <main className="p-6">
        <Loader />
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
