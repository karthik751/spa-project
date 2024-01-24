// types.ts
import { Action, ThunkAction } from '@reduxjs/toolkit';
import { RootState } from './store';

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown, // extra argument, in your case it might be omitted
  Action<string>
>;