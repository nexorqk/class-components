import { render, screen } from '@testing-library/react';

import Main from '../../view/main';
import type { PokemonList } from '../../types/pokemon';
import { pokemonList } from '../mocks/data';

describe('Main', () => {
  describe('Rendering', () => {
    it('Renders correct number of items when data is provided', () => {
      render(<Main pokemonIsLoadingData={false} pokemonData={pokemonList} />);

      expect(screen.getAllByRole('listitem')).toHaveLength(
        pokemonList.results.length
      );
    });

    it('Displays "no results" message when data array is empty', () => {
      const checkHeading = () => {
        expect(screen.getByRole('heading')).toHaveTextContent('No Results');
      };
      const { rerender } = render(
        <Main
          pokemonData={{
            count: 1302,
            next: 'https://pokeapi.co/api/v2/pokemon?offset=20&limit=20',
            previous: null,
            results: [],
          }}
          pokemonIsLoadingData={false}
        />
      );
      checkHeading();

      rerender(<Main pokemonData={undefined} pokemonIsLoadingData={false} />);
      checkHeading();
    });

    it('Shows loading state while fetching data', () => {
      render(<Main pokemonIsLoadingData={true} pokemonData={pokemonList} />);

      expect(screen.getByRole('alert')).toBeInTheDocument();
    });
  });

  describe('Data Display', () => {
    it('Correctly displays item names', () => {
      render(<Main pokemonData={pokemonList} pokemonIsLoadingData={false} />);

      const list = screen.getAllByRole('listitem');

      list.forEach((item, index) => {
        const currentPokemon = pokemonList.results[index];
        if (currentPokemon && currentPokemon.name)
          expect(item).toHaveTextContent(currentPokemon.name);
      });
    });

    it('Handles missing or undefined data gracefully', () => {
      const pokemonWithMissingValues: PokemonList = {
        count: pokemonList.count,
        next: pokemonList.next,
        previous: pokemonList.previous,
        results: [
          ...pokemonList.results,
          {
            name: undefined,
            url: 'https://pokeapi.co/api/v2/pokemon/2/',
          },
          {
            name: '',
            url: 'https://pokeapi.co/api/v2/pokemon/2/',
          },
        ],
      };

      render(
        <Main
          pokemonData={pokemonWithMissingValues}
          pokemonIsLoadingData={false}
        />
      );

      const listItems = screen.getAllByRole('listitem').slice(-2);

      listItems.forEach((item) => expect(item).toHaveTextContent(/no name/i));
    });
  });

  describe('Error Handling', () => {
    it('Displays error message when API call fails', () => {});

    it('Shows appropriate error for different HTTP status codes (4xx, 5xx)');
  });
});
