import { createReducer } from '@reduxjs/toolkit';
import { heroesFetching, heroesFetched, heroeDelete, heroesFetchingError, newHeroe } from '../actions';

const initialState = {
  heroes: [],
  heroesLoadingStatus: 'idle',
};


const heroes = createReducer(
  initialState,
  {
    [heroesFetching]: (state) => {
      state.heroesLoadingStatus = 'loading';
    },
    [heroesFetched]: (state, action) => {
      state.heroesLoadingStatus = 'idle';
      state.heroes = action.payload;
    },
    [heroesFetchingError]: (state) => {
      state.heroesLoadingStatus = 'error';
    },
    [newHeroe]: (state, action) => {
      state.heroes.push(action.payload);
    },
    [heroeDelete]: (state, action) => {
      state.heroes = state.heroes.filter((item) => item.id !== action.payload);
    },
  },
  [],
  (state) => state
);

export default heroes;
