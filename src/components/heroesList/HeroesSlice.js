import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  heroes: [],
  heroesLoadingStatus: 'idle',
};

const heroesSlice = createSlice({
  name: 'heroes',
  initialState,
  reducers: {
    heroesFatching: (state) => {
      state.heroesLoadingStatus = 'loading';
    },
    heroesFetched: (state, action) => {
      state.heroesLoadingStatus = 'idle';
      state.heroes = action.payload;
    },
    heroesFetchingError: (state) => {
      state.heroesLoadingStatus = 'error';
    },
    newHeroe: (state, action) => {
      state.heroes.push(action.payload);
    },
    heroeDelete: (state, action) => {
      state.heroes = state.heroes.filter((item) => item.id !== action.payload);
    },
  },
});

const { actions, reducer } = heroesSlice;
export default reducer;
export const { heroesFatching, heroesFetched, heroesFetchingError, newHeroe, heroeDelete } = actions;
  