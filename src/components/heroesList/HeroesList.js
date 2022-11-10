import { useHttp } from '../../hooks/http.hook';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  heroesFetching,
  heroesFetched,
  heroesFetchingError,
  heroeDelete,
} from '../../actions';
import HeroesListItem from '../heroesListItem/HeroesListItem';
import Spinner from '../spinner/Spinner';



const HeroesList = () => {
  const { heroes, heroesLoadingStatus, enabledFilter} = useSelector((state) => state);
  const dispatch = useDispatch();
  const { request } = useHttp();

  useEffect(() => {
    dispatch(heroesFetching());
    request('http://localhost:3001/heroes')
      .then((data) => dispatch(heroesFetched(data)))
      .catch(() => dispatch(heroesFetchingError()));

    // eslint-disable-next-line
  }, []);

  const onDeleteItem = (id) => {
      request(`http://localhost:3001/heroes/${id}`, 'DELETE')
      .then(dispatch(heroeDelete(heroes, id)))
      .catch(() => dispatch(heroesFetchingError()));
  };

  if (heroesLoadingStatus === 'loading') {
    return <Spinner />;
  } else if (heroesLoadingStatus === 'error') {
    return <h5 className="text-center mt-5">Ошибка загрузки</h5>;
  }

  const renderHeroesList = (arr) => {
    if (arr.length === 0) {
      return <h5 className="text-center mt-5">Героев пока нет</h5>;
    }

    return arr.map(({ id, ...props }) => {
      return (
        <HeroesListItem
          key={id}
          id={id}
          onDeleteItem={onDeleteItem}
          {...props}
        />
      );
    });
  };
  const filterElement = (data, filter) => {
    if (filter ==='all') return data;
     return data.filter((item) => item.element === filter);
  };
  const elements = renderHeroesList(filterElement(heroes, enabledFilter));
  return <ul>{elements}</ul>;
};

export default HeroesList;
