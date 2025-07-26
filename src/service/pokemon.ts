import type { Pokemon, PokemonList } from '../types/pokemon';
import { fetchResponse } from './api';

export const API_URL = 'https://pokeapi.co/api/v2';

export const getPokemon = async (
  value: string
): Promise<Pokemon | PokemonList> => {
  const request = new Request(`${API_URL}/pokemon/${value ? value : ''}`);

  return await fetchResponse(request);
};
