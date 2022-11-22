import { createAction } from "@reduxjs/toolkit";


export const fetchHeroes = (request) => (dispatch) => {
      dispatch(heroesFetching());
      request('http://localhost:3001/heroes')
        .then((data) => dispatch(heroesFetched(data)))
        .catch(() => dispatch(heroesFetchingError()));
}

export const fetchFilters = (request) => (dispatch) => {
    dispatch(filtersFetching());
    request('http://localhost:3001/filters')
      .then((data) => {
        dispatch(filtersFetched(data));
      })
      .catch(() => dispatch(filtersFetchingError()));
}

export const heroesFetching = createAction('HEROES_FETCHING');

export const heroesFetched = createAction('HEROES_FETCHED');

export const heroesFetchingError = createAction('HEROES_FETCHING_ERROR');

export const heroeDelete = createAction('HEROE_DELETE');

export const newHeroe = createAction('NEW_HEROE');


export const filtersFetching = () => {
  return {
    type: 'FILTERS_FETCHING',
  };
};

export const filtersFetched = (filters) => {
  return {
    type: 'FILTERS_FETCHED',
    payload: filters,
  };
};

export const filtersFetchingError = () => {
  return {
    type: 'FILTERS_FETCHING_ERROR',
  };
};

export const filtrateHeroe = (filter)  => {
  return {
      type: 'FILTRATE_HEROE',
      payload: filter,
    }
};



// export const filtrateHeroe = (filter) => (dispatch) => {
//   setTimeout(() => {
//     dispatch({
//       type: 'FILTRATE_HEROE',
//       payload: filter,
//     });
//   }, 1000);
// };
