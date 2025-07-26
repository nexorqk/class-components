import { render, screen } from '@testing-library/react';
import PokemonCard from '../../components/pokemon-card';
import { pokemon } from '../mocks/data';

describe('PokemonCard', () => {
  it('Displays item name and description correctly', () => {
    render(<PokemonCard data={pokemon} />);

    expect(screen.getByText(/name:/i)).toHaveTextContent(pokemon.name);
    expect(screen.getByText(/weight:/i)).toHaveTextContent(
      pokemon.weight.toString()
    );

    pokemon.abilities.forEach((item) =>
      expect(screen.getByText(item.ability.name)).toHaveTextContent(
        item.ability.name
      )
    );
  });

  it('Handles missing props gracefully', () => {
    render(<PokemonCard data={null} />);

    expect(screen.getByRole('heading')).toHaveTextContent('No data');
  });
});
