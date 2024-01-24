// actions.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CarFormData } from './store';
import { Draft } from 'immer';

interface AppState {
  formData: Draft<CarFormData>[];
}

const initialState: AppState = {
  formData: [],
};

const formSlice = createSlice({
  name: 'form',
  initialState,
  reducers: {
    saveFormData: (state, action: PayloadAction<Draft<CarFormData>>) => {
      state.formData.push(action.payload);
    },
  },
});

export const { saveFormData } = formSlice.actions;
export default formSlice.reducer;
