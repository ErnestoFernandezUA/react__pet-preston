/* eslint-disable no-param-reassign */
import {
  createSlice,
  PayloadAction,
} from '@reduxjs/toolkit';
// eslint-disable-next-line import/no-cycle
import { RootState } from '../..';
import { CityData } from '../../../types/City';

interface CashItemCash { [key: string]: { city: CityData, timerId: string }}

export interface CashState {
  storage: CashItemCash,
  lastUpdateAt: string;
}

const initialState: CashState = {
  storage: {},
  lastUpdateAt: '',
};

const cashSlice = createSlice({
  name: 'cash',
  initialState,
  reducers: {
    addCashItem: (state: CashState, action: PayloadAction<CityData>) => {
      state.storage[action.payload.geoNameId] = {
        city: action.payload,
        timerId: Date.now().toString(),
      };
    },
    resetState: () => {
      return initialState;
    },
  },
});

export default cashSlice.reducer;
export const {
  addCashItem,
  resetState,
} = cashSlice.actions;

export const selectCash = (state: RootState) => state.cash.storage;
