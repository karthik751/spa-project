import { configureStore, createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppThunk } from './type';
import formReducer, { saveFormData } from './actions';


export interface Brand {
  name: string;
  logo: string;
}

export interface CarFormData {
  brand: string;
  model: string;
  color: string;
  owners: number;
  year: number;
  transmission: string;
  insurance: number;
  fitments: string;
  kms: number;
  photo: string;
  fuel: string;
  body: string;
  location: string;
  price: number;
}

// interface AppState {
//   formData: CarFormData[];
// }

// export const selectFormData = (state: AppState) => state.formData;

export const reduxStore = configureStore({
  reducer: {
    form: formReducer,
  },
});

// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof reduxStore.dispatch

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof reduxStore.getState>

