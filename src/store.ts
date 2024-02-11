import {
  AnyAction,
  ThunkDispatch,
  combineReducers,
  configureStore
} from '@reduxjs/toolkit';
import GameReducer from './slices/GameSlice';
import AuthReducer from './slices/AuthSlice';

// Load data from local storage
const loadState = () => {
  try {
    const serializedState = localStorage.getItem('reduxState');
    if (serializedState === null) {
      return {};
    }
    return JSON.parse(serializedState);
  } catch (err) {
    return {};
  }
};

// Save data to local storage
const saveState = (state: any) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('reduxState', serializedState);
  } catch {
    // handle errors, e.g., if local storage is full
  }
};

const rootReducer = combineReducers({
  game: GameReducer,
  auth: AuthReducer
});

const store = configureStore({
  reducer: rootReducer,
  preloadedState: loadState()
});

store.subscribe(() => {
  saveState(store.getState());
});
export default store;

export type RootState = ReturnType<typeof rootReducer>;
export type AppThunkDispatch = ThunkDispatch<RootState, any, AnyAction>;
