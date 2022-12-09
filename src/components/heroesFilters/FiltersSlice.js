import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { useHttp } from '../../hooks/http.hook';

const initialState = {
  filters: [],
  filtersLoadingStatus: 'idle',
  enabledFilter: 'all',
};

export const fetchFilters = createAsyncThunk('filters/fetchFilters', () => {
  const { request } = useHttp();
  return request('http://localhost:3001/filters');
});

const filterSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    enabledFilter: (state, action) => {
      state.enabledFilter = action.payload;
    },
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
        state.filters = actions.payload;
      })
      .addCase(fetchFilters.rejected, (state) => {
        state.filtersLoadingStatus = 'error';
      })

      .addDefaultCase(() => {});
  },
});

const { actions, reducer } = filterSlice;
export default reducer;

export const { enabledFilter, filtrateHeroe } = actions;
