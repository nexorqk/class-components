import { render, screen, waitFor } from '@testing-library/react';
import { http, HttpResponse } from 'msw';
import App from '../app';
import { API_URL } from '../service/pokemon';
import { pokemonList } from './mocks/data';
import { server } from './mocks/node';

describe('App', () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  afterEach(() => {
    server.resetHandlers();
  });

  describe('Integration Tests', () => {
    it('Makes initial API call on component mount', async () => {
      server.use(
        http.get(`${API_URL}/pokemon`, () => {
          return HttpResponse.json(pokemonList);
        })
      );

      render(<App />);

      await waitFor(() => {
        const pokemonItems = screen.getAllByRole('listitem');

        pokemonItems.forEach((item, index) => {
          const currentItem = pokemonList.results[index];

          if (currentItem.name)
            expect(item).toHaveTextContent(currentItem.name);
        });
      });
    });
  });
});
