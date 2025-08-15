import { render, screen } from '@testing-library/react';
import { PokemonCard } from '../../components/pokemon-card';
import { pokemon } from '../mocks/data';
import type { Pokemon } from '../../types/pokemon';

let pokemonData: Pokemon | null = pokemon;

describe('PokemonCard', () => {
  vi.mock('react-router', async () => {
    const actual = await vi.importActual('react-router');

    return {
      ...actual,

      useOutletContext: () => ({
        pokemonData: pokemonData,
      }),
    };
  });

  afterEach(() => {
    vi.resetAllMocks();
  });

  it('Displays item name and description correctly', () => {
    render(<PokemonCard />);

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
    pokemonData = null;

    render(<PokemonCard />);

    expect(screen.getByRole('heading')).toHaveTextContent('No data');
  });
});
