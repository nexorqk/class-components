import { Component, type ReactNode } from 'react';
import type { Pokemon } from '../types/pokemon';

type Props = {
  data: Pokemon | null;
};

export default class PokemonCard extends Component<Props> {
  render(): ReactNode {
    if (this.props.data === null) return;

    const { name, weight } = this.props.data;

    return (
      <div className="p-4 border">
        <h2>Name: {name}</h2>
        <p>Weight: {weight}</p>
      </div>
    );
  }
}
