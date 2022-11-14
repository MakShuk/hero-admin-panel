const initialState = {
  heroes: [],
  heroesLoadingStatus: 'idle',
  filters: [],
  filtersLoadingStatus: 'idle',
  enabledFilter: 'all'
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'HEROES_FETCHING':
      return {
        ...state,
        heroesLoadingStatus: 'loading',
      };
    case 'HEROES_FETCHED':
      return {
        ...state,
        heroes: action.payload,
        heroesLoadingStatus: 'idle',
      };
    case 'HEROES_FETCHING_ERROR':
      return {
        ...state,
        heroesLoadingStatus: 'error',
      };
    case 'HEROE_DELETE':
      const newHeroeList = state.heroes.filter(item => item.id !== action.payload);
      return {
        ...state,
        heroes: newHeroeList,
        heroesLoadingStatus: 'idle',
      };
    case 'NEW_HEROE':
      let newCreatedHeroList = [...state.heroes, action.payload];
      return {
        ...state,
        heroes: newCreatedHeroList,
        heroesLoadingStatus: 'idle',
      };
    case 'FILTERS_FETCHING':
      return {
        ...state,
        filtersLoadingStatus: 'loading',
      };
    case 'FILTERS_FETCHED':
      return {
        ...state,
        filters: action.payload,
        filtersLoadingStatus: 'idle',
      };
    case 'FILTERS_FETCHING_ERROR':
      return {
        ...state,
        filtersLoadingStatus: 'error',
      };
    case 'FILTRATE_HEROE':
      return {
        ...state,
        enabledFilter: action.payload,
      };

    default:
      return state;
  }
};

export default reducer;
