import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { useHttp } from '../../hooks/http.hook';

const initialState = {
  heroes: [],
  heroesLoadingStatus: 'idle',
};
export const fetchHeroes = createAsyncThunk('heroes/fetchHeroes', () => {
  const { request } = useHttp();
  return request('http://localhost:3001/heroes');
});

const heroesSlice = createSlice({
  name: 'heroes',
  initialState,
  reducers: {

    newHeroe: (state, action) => {
      state.heroes.push(action.payload);
    },
    heroeDelete: (state, action) => {
      state.heroes = state.heroes.filter((item) => item.id !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchHeroes.pending, (state) => {
        state.heroesLoadingStatus = 'loading';
      })
      .addCase(fetchHeroes.fulfilled, (state, actions) => {
        state.heroesLoadingStatus = 'idle';
        state.heroes = actions.payload;
      })
      .addCase(fetchHeroes.rejected, (state) => {
        state.heroesLoadingStatus = 'error';
      })
      .addDefaultCase(() => {});
  },
});

const { actions, reducer } = heroesSlice;

export default reducer;
export const { newHeroe, heroeDelete } = actions;
