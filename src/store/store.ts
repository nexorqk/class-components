import { configureStore } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';

import { selectedPokemonsReducer } from './slices/selected-pokemons';

export const store = configureStore({
  reducer: {
    selectedPokemons: selectedPokemonsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispath = typeof store.dispatch;

export const useAppDispatch = useDispatch.withTypes<AppDispath>();
export const useAppSelector = useSelector.withTypes<RootState>();
