import { fetchResponse } from './api';

const API_URL = 'https://pokeapi.co/api/v2';

export const getPokemon = async (value: string): Promise<unknown> => {
  const request = new Request(`${API_URL}/pokemon/${value ? value : ''}`);

  return await fetchResponse(request);
};
