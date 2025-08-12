import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { PokemonList, Pokemon } from '../types/pokemon';
import { getOffsetByPage } from '../utils/page-counter';

export const API_URL = 'https://pokeapi.co/api/v2';

export const pokemonApi = createApi({
  reducerPath: 'pokemonApi',
  tagTypes: ['Pokemon'],
  baseQuery: fetchBaseQuery({ baseUrl: API_URL }),
  endpoints: (build) => ({
    getPokemonByName: build.query<Pokemon, string>({
      query: (name) => `/pokemon/${name}`,
    }),
    getPokemonByPage: build.query<PokemonList, string>({
      query: (page) =>
        `/pokemon${page !== '1' ? `?offset=${getOffsetByPage(Number(page))}&limit=20` : ''}`,
    }),
  }),
});

export const {
  useGetPokemonByNameQuery,
  useLazyGetPokemonByNameQuery,
  useGetPokemonByPageQuery,
} = pokemonApi;
