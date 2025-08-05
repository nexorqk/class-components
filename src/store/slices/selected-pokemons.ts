import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

import type { Pokemon } from '../../types/pokemon';

export interface SelectedPokemonsState {
  checkedList: {
    name: string;
    isChecked: boolean;
    data: Pokemon;
  }[];
}

const initialState: SelectedPokemonsState = {
  checkedList: [],
};

export const selectedPokemonsSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    toggleSelect: (
      state,
      action: PayloadAction<{ id: string; isChecked: boolean; data: Pokemon }>
    ) => {
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
              data: action.payload.data,
            },
          ],
        };
      }

      return {
        ...state,
        checkedList: [
          ...state.checkedList.slice(0, currentIndex),
          ...state.checkedList.slice(currentIndex + 1),
        ],
      };
    },
  },
});

export const { toggleSelect } = selectedPokemonsSlice.actions;

export const selectedPokemonsReducer = selectedPokemonsSlice.reducer;
