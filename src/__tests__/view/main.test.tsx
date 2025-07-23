import { render, screen } from '@testing-library/react';

import Main from '../../view/main';
import type { PokemonList } from '../../types/pokemon';

describe('Main', () => {
  const pokemonData: PokemonList = {
    count: 1302,
    next: 'https://pokeapi.co/api/v2/pokemon?offset=20&limit=20',
    previous: null,
    results: [
      {
        name: 'bulbasaur',
        url: 'https://pokeapi.co/api/v2/pokemon/1/',
      },
      {
        name: 'ivysaur',
        url: 'https://pokeapi.co/api/v2/pokemon/2/',
      },
      {
        name: 'venusaur',
        url: 'https://pokeapi.co/api/v2/pokemon/3/',
      },
      {
        name: 'charmander',
        url: 'https://pokeapi.co/api/v2/pokemon/4/',
      },
      {
        name: 'charmeleon',
        url: 'https://pokeapi.co/api/v2/pokemon/5/',
      },
      {
        name: 'charizard',
        url: 'https://pokeapi.co/api/v2/pokemon/6/',
      },
      {
        name: 'squirtle',
        url: 'https://pokeapi.co/api/v2/pokemon/7/',
      },
      {
        name: 'wartortle',
        url: 'https://pokeapi.co/api/v2/pokemon/8/',
      },
      {
        name: 'blastoise',
        url: 'https://pokeapi.co/api/v2/pokemon/9/',
      },
      {
        name: 'caterpie',
        url: 'https://pokeapi.co/api/v2/pokemon/10/',
      },
      {
        name: 'metapod',
        url: 'https://pokeapi.co/api/v2/pokemon/11/',
      },
      {
        name: 'butterfree',
        url: 'https://pokeapi.co/api/v2/pokemon/12/',
      },
      {
        name: 'weedle',
        url: 'https://pokeapi.co/api/v2/pokemon/13/',
      },
      {
        name: 'kakuna',
        url: 'https://pokeapi.co/api/v2/pokemon/14/',
      },
      {
        name: 'beedrill',
        url: 'https://pokeapi.co/api/v2/pokemon/15/',
      },
      {
        name: 'pidgey',
        url: 'https://pokeapi.co/api/v2/pokemon/16/',
      },
      {
        name: 'pidgeotto',
        url: 'https://pokeapi.co/api/v2/pokemon/17/',
      },
      {
        name: 'pidgeot',
        url: 'https://pokeapi.co/api/v2/pokemon/18/',
      },
      {
        name: 'rattata',
        url: 'https://pokeapi.co/api/v2/pokemon/19/',
      },
      {
        name: 'raticate',
        url: 'https://pokeapi.co/api/v2/pokemon/20/',
      },
    ],
  };

  describe('Rendering', () => {
    it('Renders correct number of items when data is provided', () => {
      render(<Main pokemonIsLoadingData={false} pokemonData={pokemonData} />);

      expect(screen.getAllByRole('listitem')).toHaveLength(
        pokemonData.results.length
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
      render(<Main pokemonIsLoadingData={true} pokemonData={pokemonData} />);

      expect(screen.getByRole('alert')).toBeInTheDocument();
    });
  });

  describe('Data Display', () => {
    it('Correctly displays item names', () => {
      render(<Main pokemonData={pokemonData} pokemonIsLoadingData={false} />);

      const list = screen.getAllByRole('listitem');

      list.forEach((item, index) => {
        const currentPokemon = pokemonData.results[index];
        if (currentPokemon && currentPokemon.name)
          expect(item).toHaveTextContent(currentPokemon.name);
      });
    });

    it('Handles missing or undefined data gracefully', () => {
      const pokemonWithMissingValues: PokemonList = {
        count: pokemonData.count,
        next: pokemonData.next,
        previous: pokemonData.previous,
        results: [
          ...pokemonData.results,
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
