import { Component, type ReactNode } from 'react';
import type { Pokemon } from '../types/pokemon';

type Props = {
  data: Pokemon | null | undefined;
};

export default class PokemonCard extends Component<Props> {
  render(): ReactNode {
    if (this.props.data === null || this.props.data === undefined)
      return <h2>No data</h2>;

    const { name, weight, abilities } = this.props.data;

    return (
      <div className="p-4 border space-y-4">
        <h2>Name: {name}</h2>
        <p>Weight: {weight}</p>
        <div>
          <h3>Abilities:</h3>
          <ul>
            {abilities.map((item) => (
              <li key={item.ability.name}>{item.ability.name}</li>
            ))}
          </ul>
        </div>
      </div>
    );
  }
}
