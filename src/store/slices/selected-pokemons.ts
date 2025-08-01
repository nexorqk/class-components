import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { Pokemon } from '../../types/pokemon';

export interface SelectedPokemonsState {
  pokemons: Pokemon[];
  checkedList: {
    name: string;
    isChecked: boolean;
  }[];
}

const initialState: SelectedPokemonsState = {
  pokemons: [],
  checkedList: [],
};

export const selectedPokemonsSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    toggleSelect: (
      state,
      action: PayloadAction<{ id: string; isChecked: boolean }>
    ) => {
      console.log(state);
      const currentIndex = state.checkedList.findIndex(
        (item) => item.name === action.payload.id
      );

      if (currentIndex === -1) {
        return {
          ...state,
          checkedList: [
            ...state.checkedList,
            {
              name: action.payload.id,
              isChecked: action.payload.isChecked,
            },
          ],
        };
      } else {
        return {
          ...state,
          checkedList: state.checkedList.map((item, index) => {
            if (index !== currentIndex) return item;

            return {
              name: item.name,
              isChecked: action.payload.isChecked,
            };
          }),
        };
      }
    },
  },
});

export const { toggleSelect } = selectedPokemonsSlice.actions;

export const selectedPokemonsReducer = selectedPokemonsSlice.reducer;
