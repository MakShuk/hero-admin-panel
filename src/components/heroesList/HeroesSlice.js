import { createSlice, createAsyncThunk, createEntityAdapter, createSelector } from '@reduxjs/toolkit';
import { useHttp } from '../../hooks/http.hook';

const heroesAdapter = createEntityAdapter();

const initialState = heroesAdapter.getInitialState({
  heroesLoadingStatus: 'idle',
});

export const fetchHeroes = createAsyncThunk('heroes/fetchHeroes', () => {
  const { request } = useHttp();
  return request('http://localhost:3001/heroes');
});

const heroesSlice = createSlice({
  name: 'heroes',
  initialState,
  reducers: {
    newHeroe: (state, action) => {
      heroesAdapter.addOne(state, action.payload);
    },
    heroeDelete: (state, action) => { 
      heroesAdapter.removeOne(state, action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchHeroes.pending, (state) => {
        state.heroesLoadingStatus = 'loading';
      })
      .addCase(fetchHeroes.fulfilled, (state, actions) => {
        state.heroesLoadingStatus = 'idle';
        heroesAdapter.setAll(state, actions.payload);
      })
      .addCase(fetchHeroes.rejected, (state) => {
        state.heroesLoadingStatus = 'error';
      })
      .addDefaultCase(() => {});
  },
});

const { actions, reducer } = heroesSlice;

const { selectAll } = heroesAdapter.getSelectors((state) => state.heroes);

export const selectValue = createSelector(
  (state) => state.filters.enabledFilter,
  selectAll,
  (filter, heroes) => {
    if (filter === 'all') {
      return heroes;
    } else {
      return heroes.filter((item) => item.element === filter);
    }
  }
);



export default reducer;
export const { newHeroe, heroeDelete } = actions;
