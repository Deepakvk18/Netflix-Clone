import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../features/userSlice';
import { setupListeners } from '@reduxjs/toolkit/query'
import { moviesApi } from '../features/moviesApi';
import { authApi } from '../features/authApi';

export const store = configureStore({
  reducer: {
    user: userReducer,
    [moviesApi.reducerPath]: moviesApi.reducer,
    [authApi.reducerPath]: authApi.reducer
  },
  middleware: (getDefaultMiddleware)=> getDefaultMiddleware().concat(moviesApi.middleware).concat(authApi.middleware)
});

setupListeners(store.dispatch)