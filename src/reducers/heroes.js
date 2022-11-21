const initialState = {
  heroes: [],
  heroesLoadingStatus: 'idle',
};

const heroes = (state = initialState, action) => {
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
      const updateHeroeList = state.heroes.filter((item) => item.id !== action.payload);
      return {
        ...state,
        heroes: updateHeroeList,
        heroesLoadingStatus: 'idle',
      };
    case 'NEW_HEROE':
      let newCreatedHeroList = [...state.heroes, action.payload];
      return {
        ...state,
        heroes: newCreatedHeroList,
        heroesLoadingStatus: 'idle',
      };

    default:
      return state;
  }
};

export default heroes;
