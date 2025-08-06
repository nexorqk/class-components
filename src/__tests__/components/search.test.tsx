import { fireEvent, render, screen } from '@testing-library/react';

import { Search, searchId } from '../../components/search';
import { getNormalizedString } from '../../utils/normalize';
import { MemoryRouter } from 'react-router';

const LS = window.localStorage;

beforeEach(() => {
  LS.clear();
});

describe('Search', () => {
  const routerRender = (
    searchValue: string = '',
    setPokemon?: (value: string) => Promise<void>
  ) => {
    render(
      <MemoryRouter>
        <Search
          initSearchValue={searchValue}
          setPokemon={setPokemon || vi.fn()}
        />
      </MemoryRouter>
    );
  };

  describe('Rendering', () => {
    it('Renders search input and search button', () => {
      routerRender();

      expect(screen.getByRole('textbox')).toBeInTheDocument();
      expect(screen.getByRole('button')).toHaveTextContent(/search/i);
    });

    it('Displays previously saved search term from localStorage on mount', () => {
      const previousValue = 'charmeleon';
      LS.setItem(searchId, previousValue);

      routerRender(LS.getItem(searchId) || '');

      expect(screen.getByRole('textbox')).toHaveValue(previousValue);
    });

    it('Shows empty input when no saved term exists', () => {
      routerRender();

      expect(screen.getByRole('textbox')).toHaveValue('');
    });
  });

  describe('User Interaction', () => {
    it('Updates input value when user types', () => {
      const typedValue = '1241451';

      routerRender();

      const input = screen.getByRole('textbox');
      fireEvent.change(input, { target: { value: typedValue } });

      expect(input).toHaveValue(typedValue);
    });

    it('Saves search term to localStorage when search form is submitted', () => {
      const newValue = 'kakuna';

      const handlePokemon = async (value: string) => {
        LS.setItem(searchId, value);
      };

      routerRender('', handlePokemon);

      fireEvent.change(screen.getByRole('textbox'), {
        target: { value: newValue },
      });
      fireEvent.click(screen.getByRole('button'));

      expect(LS.getItem(searchId)).toBe(newValue);
    });

    it('Trims whitespace from search input before saving', () => {
      const typedValue = '   some query text   ';

      routerRender();

      const input = screen.getByRole('textbox');
      fireEvent.change(input, { target: { value: typedValue } });
      fireEvent.click(screen.getByRole('button'));

      expect(input).toHaveValue(getNormalizedString(typedValue));
    });
  });

  describe('LocalStorage Integration', () => {
    it('Retrieves saved search term on component mount', () => {
      const searchValue = 'wartortle';
      LS.setItem(searchId, searchValue);

      routerRender(LS.getItem(searchId) || '');

      expect(screen.getByRole('textbox')).toHaveValue(searchValue);
    });

    it('Overwrites existing localStorage value when new search is performed', () => {
      const searchValue = 'wartortle';
      LS.setItem(searchId, searchValue);
      const newSearchValue = 'bulbasaur';
      const handlePokemon = async (value: string) => {
        LS.setItem(searchId, value);
      };

      routerRender('', handlePokemon);

      const input = screen.getByRole('textbox');
      fireEvent.change(input, { target: { value: newSearchValue } });
      fireEvent.click(screen.getByRole('button'));

      expect(input).toHaveValue(LS.getItem(searchId));
    });
  });
});
