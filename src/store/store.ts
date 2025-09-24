import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';

import { selectedPokemonsReducer } from './slices/selected-pokemons';
import { pokemonApi } from '../service/pokemon';

export const rootReducer = combineReducers({
  selectedPokemons: selectedPokemonsReducer,
  [pokemonApi.reducerPath]: pokemonApi.reducer,
});

export function setupStore(preloadedState?: Partial<RootState>) {
  return configureStore({
    reducer: rootReducer,
    preloadedState,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(pokemonApi.middleware),
  });
}

export const store = setupStore();

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispath = typeof store.dispatch;

export const useAppDispatch = useDispatch.withTypes<AppDispath>();
export const useAppSelector = useSelector.withTypes<RootState>();
