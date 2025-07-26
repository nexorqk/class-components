import { render, screen } from '@testing-library/react';

import { MainView } from '../../view/main-view';
import type { PokemonList } from '../../types/pokemon';
import { pokemon, pokemonList } from '../mocks/data';

describe('MainView', () => {
  describe('Rendering', () => {
    it('Renders correct number of items when data is provided', () => {
      render(
        <MainView pokemonIsLoadingData={false} pokemonData={pokemonList} />
      );

      expect(screen.getAllByRole('listitem')).toHaveLength(
        pokemonList.results.length
      );
    });

    it('Displays "no results" message when data array is empty', () => {
      const checkHeading = () => {
        expect(screen.getByRole('heading')).toHaveTextContent('No Results');
      };
      const { rerender } = render(
        <MainView
          pokemonData={{ ...pokemonList, results: [] }}
          pokemonIsLoadingData={false}
        />
      );
      checkHeading();

      rerender(
        <MainView pokemonData={undefined} pokemonIsLoadingData={false} />
      );
      checkHeading();
    });

    it('Shows loading state while fetching data', () => {
      render(
        <MainView pokemonIsLoadingData={true} pokemonData={pokemonList} />
      );

      expect(screen.getByRole('alert')).toBeInTheDocument();
    });
  });

  describe('Data Display', () => {
    it('Correctly displays item names', () => {
      render(
        <MainView pokemonData={pokemonList} pokemonIsLoadingData={false} />
      );

      const list = screen.getAllByRole('listitem');

      list.forEach((item, index) => {
        const currentPokemon = pokemonList.results[index];
        if (currentPokemon && currentPokemon.name)
          expect(item).toHaveTextContent(currentPokemon.name);
      });
    });

    it('Handles missing or undefined data gracefully', () => {
      const pokemonWithMissingValues: PokemonList = {
        ...pokemonList,
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
        <MainView
          pokemonData={pokemonWithMissingValues}
          pokemonIsLoadingData={false}
        />
      );

      const listItems = screen.getAllByRole('listitem').slice(-2);

      listItems.forEach((item) => expect(item).toHaveTextContent(/no name/i));
    });

    it('If only one pokemon renders pokemonCard not list', () => {
      render(<MainView pokemonData={pokemon} pokemonIsLoadingData={false} />);

      expect(screen.queryByText(/pokemon list/i)).not.toBeInTheDocument();
      expect(screen.getByText(/name:/i)).toHaveTextContent(pokemon.name);
    });
  });

  describe('Error Handling', () => {
    it('Displays error message when API call fails', () => {});

    it('Shows appropriate error for different HTTP status codes (4xx, 5xx)');
  });
});
