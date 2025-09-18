import type { Pokemon, PokemonList } from '../types/pokemon';
import { LIMIT_API, OFFSET_API } from '../utils/page-counter';
import { fetchResponse } from './api';

export const API_URL = 'https://pokeapi.co/api/v2';

export const getPokemon = async (
  value: string,
  offset?: number,
  limit?: number
): Promise<Pokemon | PokemonList> => {
  const offsetRequest = `?${OFFSET_API}${offset}${LIMIT_API}=${limit ? limit : '20'}`;

  const request = new Request(
    `${API_URL}/pokemon/${value ? value : ''}${offset ? offsetRequest : ''}`
  );

  return await fetchResponse(request);
};
