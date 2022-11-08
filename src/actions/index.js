export const heroesFetching = () => {
    return {
        type: 'HEROES_FETCHING'
    }
}

export const heroesFetched = (heroes) => {
    return {
        type: 'HEROES_FETCHED',
        payload: heroes
    }
}

export const heroesFetchingError = () => {
    return {
        type: 'HEROES_FETCHING_ERROR'
    }
}

export const heroeDelete = (heroes, id) => {
  return {
    type: 'HEROE_DELETE',
    payload: heroes.filter((item) => item.id !== id),
  };
};

export const newHeroe = (heroes, heroe) => {
  return {
    type: 'NEW_HEROE',
    payload: [...heroes, heroe],
  };
};

export const FiltersFetching = () => {
  return {
    type: 'FILTERS_FETCHING',
  };
};

export const FiltersFetched = (filters) => {
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