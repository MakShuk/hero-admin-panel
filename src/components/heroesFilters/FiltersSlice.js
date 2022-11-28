import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  filters: [],
  filtersLoadingStatus: 'idle',
  enabledFilter: 'all',
};

const filterSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    filtersFetching: (state) => {
      state.filtersLoadingStatus = 'loading';
    },
    filtersFetched: (state, action) => {
      state.filtersLoadingStatus = 'idle';
      state.filters = action.payload;
    },
    filtersFetchingError: (state) => {
      state.filtersLoadingStatus = 'error';
    },
    enabledFilter: (state, action) => {
      state.enabledFilter = action.payload;
    },
    filtrateHeroe: (state, action) => {
      state.enabledFilter = action.payload;
    },
  },
});

const { actions, reducer } = filterSlice;
export default reducer;

export const { filtersFetching, filtersFetched, filtersFetchingError, enabledFilter, filtrateHeroe } = actions;
