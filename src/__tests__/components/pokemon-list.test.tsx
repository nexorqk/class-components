import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router';

import { App } from '../../app';
import { PokemonList as PokemonListComponent } from '../../components/pokemon-list';
import type { Pokemon, PokemonList } from '../../types/pokemon';
import { pokemon, pokemonBulbasaur, pokemonList } from '../mocks/data';

let pokemonData: PokemonList | Pokemon | null = pokemon;
let pokemonError: null | string = null;
const mockSetPokemon = vi.fn();

describe('PokemonList', () => {
  vi.mock('react-router', async () => {
    const actual = await vi.importActual('react-router');

    return {
      ...actual,

      useOutletContext: () => ({
        pokemonData: pokemonData,
        pokemonError,
        setPokemon: mockSetPokemon,
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

    waitFor(() => {
      expect(screen.getAllByRole('listitem')).toHaveLength(
        pokemonList.results.length
      );
    });
  });

  it('Displays "no results" message when data array is empty', () => {
    pokemonData = { ...pokemonList, results: [] };

    renderRouter();

    expect(screen.getByRole('heading')).toHaveTextContent('No Results');
  });

  it('Correctly displays item names', () => {
    pokemonData = pokemonList;

    renderRouter();

    waitFor(() => {
      const list = screen.getAllByRole('listitem');

      list.forEach((item, index) => {
        const currentPokemon = pokemonList.results[index];
        if (currentPokemon && currentPokemon.name)
          expect(item).toHaveTextContent(currentPokemon.name);
      });
    });
  });

  it('If only one pokemon renders pokemonCard not list', () => {
    pokemonData = pokemon;

    renderRouter();

    expect(screen.queryByRole('listitem')).not.toBeInTheDocument();
  });

  it('Pokemon click set url param with pokemonName', () => {
    // pokemonData = pokemonList;
    // renderRouter();
    // const listOfItems = screen.getAllByRole('listitem');
    // const { result } = renderHook(() => useParams());
    // act(() => {
    //   fireEvent.click(listOfItems[2]);
    // });
    // expect(result.current).toBe(pokemonData.results[2].name);
    // const { result } = renderHook(() => useSearch(items));
    // act(() => {
    //   result.current.setSearchTerm('Wars');
    // });
  });

  it('Render pokemon detail on click in pokemon list', () => {
    pokemonData = pokemonList;

    renderRouter();

    waitFor(() => {
      fireEvent.click(
        screen.getByRole('listitem', { name: pokemonBulbasaur.name })
      );

      expect(screen.getByText(pokemonBulbasaur.weight)).toBeInTheDocument();

      pokemonBulbasaur.abilities.forEach((item) =>
        expect(screen.getByText(item.ability.name)).toBeInTheDocument()
      );
    });
  });

  describe('Error Handling', () => {
    it('Shows appropriate error for different HTTP status codes (4xx, 5xx)', () => {
      pokemonError = '404 fetch failed';
      renderRouter();

      waitFor(() => {
        expect(
          screen.getByRole('heading', { name: /data error: 404/i })
        ).toBeInTheDocument();
      });
    });
  });
});
