import type { Pokemon, PokemonList } from '../types/pokemon';
import { fetchResponse } from './api';

export const API_URL = 'https://pokeapi.co/api/v2';

const createUrlSearchParam = (offset?: number, limit?: number) => {
  const param = new URLSearchParams();
  if (offset) param.set('offset', offset.toString());
  param.set('limit', limit?.toString() || '20');

  return param.toString();
};

export const getPokemon = async (
  value: string,
  offset?: number,
  limit?: number
): Promise<Pokemon | PokemonList> => {
  const request = new Request(
    `${API_URL}/pokemon/${value ? value : ''}${offset ? `?${createUrlSearchParam(offset, limit)}` : ''}`
  );

  return await fetchResponse(request);
};
