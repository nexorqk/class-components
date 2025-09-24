import { fetchResponse } from '../service/api';
import { API_URL, getPokemon } from '../service/pokemon';
import { pokemon, pokemonList } from './mocks/data';

describe('API', () => {
  describe('Mocked API Calls', () => {
    it('Use MSW to mock API calls', async () => {
      const response = await fetch(`${API_URL}/pokemon`);
      await expect(response.json()).resolves.toEqual(pokemonList);

      const listResponse = await fetch(`${API_URL}/pokemon/${pokemon.name}`);
      await expect(listResponse.json()).resolves.toEqual(pokemon);
    });

    it('Test both success and error scenarios', async () => {
      const response = fetchResponse(new Request(`${API_URL}/pokemon`));
      await expect(response).resolves.toEqual(pokemonList);

      const badResponse = fetchResponse(new Request(`${API_URL}/poko`));
      await expect(badResponse).rejects.toThrowError();
    });
  });

  it('Get pokemon returns right value with empty value and pokemon name', async () => {
    const dataList = await getPokemon('');
    expect(dataList).toEqual(pokemonList);

    const dataPokemon = await getPokemon('squirtle');
    expect(dataPokemon).toEqual(pokemon);
  });
});
