import { Component, type ReactNode } from 'react';
import Loader from '../components/loader';
import type { PokemonList } from '../types/pokemon';

type Props = {
  pokemonData: PokemonList;
};

export default class Main extends Component<Props> {
  render(): ReactNode {
    return (
      <main className="p-6">
        <Loader />
        {this.props.pokemonData.results !== undefined && (
          <ul className="text-2xl">
            Pokemon list:
            {this.props.pokemonData.results.map((item) => (
              <li key={item.name}>
                <h3 className="text-xl">- {item.name}</h3>
              </li>
            ))}
          </ul>
        )}
      </main>
    );
  }
}
