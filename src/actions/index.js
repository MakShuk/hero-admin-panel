export const fetchHeroes = (request) => (dispatch) => {
      dispatch(heroesFetching());
      request('http://localhost:3001/heroes')
        .then((data) => dispatch(heroesFetched(data)))
        .catch(() => dispatch(heroesFetchingError()));
}

export const heroesFetching = () => {
  return {
    type: 'HEROES_FETCHING',
  };
};

export const heroesFetched = (heroes) => {
  return {
    type: 'HEROES_FETCHED',
    payload: heroes,
  };
};

export const heroesFetchingError = () => {
  return {
    type: 'HEROES_FETCHING_ERROR',
  };
};

export const heroeDelete = (id) => {
  return {
    type: 'HEROE_DELETE',
    payload: id,
  };
};

export const newHeroe = (heroe) => {
  return {
    type: 'NEW_HEROE',
    payload: heroe,
  };
};

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
