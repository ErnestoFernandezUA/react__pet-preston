import {
  configureStore,
  ThunkAction,
  Action,
  combineReducers,
} from '@reduxjs/toolkit';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

// eslint-disable-next-line import/no-cycle
import controlsSlice from './features/controls/controlsSlice';
// eslint-disable-next-line import/no-cycle
import cashSlice from './features/cash/cashSlice';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: [
    'cash', 'controls',
  ],
  blacklist: ['user'],
};

const rootReducer = combineReducers({
  controls: controlsSlice,
  cash: cashSlice,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    thunk: true,
    serializableCheck: {
      ignoredActions: [
        FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER,
        // 'posts',
      ],
    },
  }),
});

export const persistor = persistStore(store);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export type AppThunk<ReturnType = void> = ThunkAction<
ReturnType,
RootState,
unknown,
Action<string>
>;
