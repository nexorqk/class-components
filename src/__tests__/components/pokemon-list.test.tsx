import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router';

import { App } from '../../app';
import { PokemonList as PokemonListComponent } from '../../components/pokemon-list';
import type { Pokemon, PokemonList } from '../../types/pokemon';
import { pokemon, pokemonList } from '../mocks/data';

let pokemonData: PokemonList | Pokemon | null = pokemon;

describe('PokemonList', () => {
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

  const renderRouter = () =>
    render(
      <MemoryRouter>
        <Routes>
          <Route path="/" element={<App />} />
          <Route
            path="pokemon/list/:page/:pokemonName?"
            element={<PokemonListComponent />}
          />
        </Routes>
      </MemoryRouter>
    );

  it('Renders correct number of items when data is provided', () => {
    pokemonData = pokemonList;

    renderRouter();

    expect(screen.getAllByRole('listitem')).toHaveLength(
      pokemonList.results.length
    );
  });

  it('Displays "no results" message when data array is empty', () => {
    pokemonData = { ...pokemonList, results: [] };

    renderRouter();

    expect(screen.getByRole('heading')).toHaveTextContent('No Results');
  });

  // TODO
  // it('Shows loading state while fetching data', () => {
  //   renderRouter();

  //   expect(screen.getByRole('alert')).toBeInTheDocument();
  // });

  it('Correctly displays item names', () => {
    pokemonData = pokemonList;

    renderRouter();

    const list = screen.getAllByRole('listitem');

    list.forEach((item, index) => {
      const currentPokemon = pokemonList.results[index];
      if (currentPokemon && currentPokemon.name)
        expect(item).toHaveTextContent(currentPokemon.name);
    });
  });

  it('If only one pokemon renders pokemonCard not list', () => {
    pokemonData = pokemon;

    renderRouter();

    expect(screen.queryByRole('listitem')).not.toBeInTheDocument();
  });

  // it('Pokemon click set url param with pokemonName', () => {
  //   pokemonData = pokemonList;

  //   renderRouter();

  //   const listOfItems = screen.getAllByRole('listitem');

  //   fireEvent.click(listOfItems[2]);

  //   const { result } = renderHook(() => useParams());

  //   expect(result.current).toBe(pokemonData.results[2].name);
  // });

  describe('Error Handling', () => {
    it('Displays error message when API call fails', () => {});
    it('Shows appropriate error for different HTTP status codes (4xx, 5xx)');
  });
});
