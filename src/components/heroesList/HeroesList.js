import { useHttp } from '../../hooks/http.hook';
import { useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

import { heroesFetching, heroesFetched, heroesFetchingError, heroeDelete } from '../../actions';
import HeroesListItem from '../heroesListItem/HeroesListItem';
import Spinner from '../spinner/Spinner';

import './heroesList.scss';

// добавить юз колбек
// переделываем action на редьюсер

const HeroesList = () => {
  const { heroes, heroesLoadingStatus, enabledFilter } = useSelector((state) => state);
  const dispatch = useDispatch();
  const { request } = useHttp();

  useEffect(() => {
    dispatch(heroesFetching());
    request('http://localhost:3001/heroes')
      .then((data) => dispatch(heroesFetched(data)))
      .catch(() => dispatch(heroesFetchingError()));

    // eslint-disable-next-line
  }, []);

  const onDeleteItem = useCallback(
    (id) => {
      // Удаление персонажа по его id
      request(`http://localhost:3001/heroes/${id}`, 'DELETE')
        .then(dispatch(heroeDelete(id)))
        .catch(() => dispatch(heroesFetchingError()));
      // eslint-disable-next-line
    },
    [request]
  );

  if (heroesLoadingStatus === 'loading') {
    return <Spinner />;
  } else if (heroesLoadingStatus === 'error') {
    return <h5 className="text-center mt-5">Ошибка загрузки</h5>;
  }

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
        <CSSTransition key={id} timeout={500} classNames="hero">
          <HeroesListItem
            key={id}
            id={id}
            onDeleteItem={() => {
              onDeleteItem(id);
            }}
            {...props}
          />
        </CSSTransition>
      );
    });
  };
  const filterElement = (data, filter) => {
    if (filter === 'all') return data;
    return data.filter((item) => item.element === filter);
  };
  const elements = renderHeroesList(filterElement(heroes, enabledFilter));
  return <TransitionGroup component="ul">{elements}</TransitionGroup>;
};

export default HeroesList;
