import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import { MainView } from '../../view/main-view';
import { pokemon } from '../mocks/data';

describe('MainView', () => {
  vi.mock('react-router', async () => {
    const actual = await vi.importActual('react-router');

    return {
      ...actual,

      useOutletContext: () => ({
        pokemonData: pokemon,
      }),
    };
  });

  afterEach(() => {
    vi.resetAllMocks();
  });

  const renderRouter = () =>
    render(
      <MemoryRouter>
        <MainView />
      </MemoryRouter>
    );

  it('Shows loading state while fetching data', () => {
    renderRouter();

    expect(screen.getByRole('alert')).toBeInTheDocument();
  });
});
