import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import Search from '../../components/search';
import { getPokemon } from '../../service/pokemon';
import { searchLSService } from '../../utils/local-storage';
import { getNormalizedString } from '../../utils/normalize';

beforeEach(() => {
  localStorage.clear();
});

describe('Search', () => {
  const setPokemon = async (searchValue: string) => {
    await getPokemon(searchValue);
  };
  const user = userEvent.setup();

  describe('Rendering', () => {
    it('Renders search input and search button', () => {
      render(<Search setPokemon={setPokemon} />);

      expect(screen.getByRole('textbox')).toBeInTheDocument();

      expect(screen.getByRole('button')).toHaveTextContent(/search/i);
    });

    it('Displays previously saved search term from localStorage on mount', () => {
      const previousValue = 'charmeleon';
      searchLSService.set(previousValue);

      render(<Search setPokemon={setPokemon} />);

      expect(screen.getByRole('textbox')).toHaveValue(searchLSService.get());
    });

    it('Shows empty input when no saved term exists', () => {
      render(<Search setPokemon={setPokemon} />);

      expect(screen.getByRole('textbox')).toHaveValue('');
    });

    describe('User Interaction', () => {
      it('Updates input value when user types', async () => {
        const typedValue = '1241451';

        render(<Search setPokemon={setPokemon} />);

        const input = screen.getByRole('textbox');

        await user.type(input, typedValue);
        expect(input).toHaveValue(typedValue);
      });

      it('Saves search term to localStorage when search form is submitted', async () => {
        const newValue = 'kakuna';

        const handlePokemon = async (value: string) => {
          searchLSService.set(value);
        };
        render(<Search setPokemon={handlePokemon} />);

        await user.type(screen.getByRole('textbox'), newValue);
        await user.click(screen.getByRole('button'));

        expect(searchLSService.get()).toBe(newValue);
      });

      it('Trims whitespace from search input before saving', async () => {
        const typedValue = '   some query text   ';

        render(<Search setPokemon={setPokemon} />);

        const input = screen.getByRole('textbox');

        await user.type(input, typedValue);
        await user.click(screen.getByRole('button'));

        expect(input).toHaveValue(getNormalizedString(typedValue));
      });
    });

    describe('LocalStorage Integration', () => {
      it('Retrieves saved search term on component mount', () => {
        const searchValue = 'wartortle';
        searchLSService.set(searchValue);

        render(<Search setPokemon={setPokemon} />);

        expect(screen.getByRole('textbox')).toHaveValue(searchValue);
      });

      it('Overwrites existing localStorage value when new search is performed', async () => {
        const searchValue = 'wartortle';
        searchLSService.set(searchValue);

        const newSearchValue = 'bulbasaur';
        const handlePokemon = async (value: string) => {
          searchLSService.set(value);
        };

        render(<Search setPokemon={handlePokemon} />);

        const input = screen.getByRole('textbox');
        await user.clear(input);
        await user.type(input, newSearchValue);
        await user.click(screen.getByRole('button'));

        expect(input).toHaveValue(searchLSService.get());
      });
    });
  });
});
