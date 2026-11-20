import { configureStore } from '@reduxjs/toolkit';
import foodReducer from './foodSlice';
import { log } from '../services/logger';
import type { Middleware } from '@reduxjs/toolkit';

// Middleware opcional: informa de errores rechazados por Redux.
const loggingMiddleware: Middleware = () => next => action => {
  const result = next(action);
  if (typeof action === 'object' && action !== null && 'type' in action &&
    typeof action.type === 'string' && action.type.endsWith('/rejected')) {
    log('error', `Acción Redux fallida: ${action.type}`, action);
  }
  return result;
};

export const store = configureStore({
  reducer: { food: foodReducer },
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(loggingMiddleware)
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
