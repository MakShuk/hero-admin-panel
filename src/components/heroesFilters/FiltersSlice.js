import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit';
import { useHttp } from '../../hooks/http.hook';

const filtersAdapter = createEntityAdapter();

const initialState = filtersAdapter.getInitialState({
  filtersLoadingStatus: 'idle',
  enabledFilter: 'all',
});

export const fetchFilters = createAsyncThunk('filters/fetchFilters', () => {
  const { request } = useHttp();
  return request('http://localhost:3001/filters');
});

const filterSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    filtrateHeroe: (state, action) => {
      state.enabledFilter = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFilters, (state) => {
        state.filtersLoadingStatus = 'loading';
      })
      .addCase(fetchFilters.fulfilled, (state, actions) => {
        state.filtersLoadingStatus = 'idle';
        filtersAdapter.setAll(state, actions.payload);
      })
      .addCase(fetchFilters.rejected, (state) => {
        state.filtersLoadingStatus = 'error';
      })

      .addDefaultCase(() => {});
  },
});

export const { selectAll } = filtersAdapter.getSelectors((state) => state.filters);

const { actions, reducer } = filterSlice;
export default reducer;

export const { filtrateHeroe } = actions;