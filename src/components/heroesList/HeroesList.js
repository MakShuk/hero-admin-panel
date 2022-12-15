import { useCallback, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

import HeroesListItem from '../heroesListItem/HeroesListItem';
import Spinner from '../spinner/Spinner';

import { useGetHeroisQuery, useDeleteHerowMutation } from '../../api/apiSlise';
import './heroesList.scss';

const HeroesList = () => {
  const { data: herois = [], isLoading, isError } = useGetHeroisQuery();
  const activeFilter = useSelector((state) => state.filters.enabledFilter);

  const filterElement = useMemo(() => {
    const filtredHeroes = herois.slice();
    if (activeFilter === 'all') {
      return filtredHeroes;
    } else {
      return filtredHeroes.filter((item) => item.element === activeFilter);
    }
  }, [activeFilter, herois]);

  const [deleteHerow] = useDeleteHerowMutation();

  const onDeleteItem = useCallback(
    (id) => {
      deleteHerow(id);
    }, // eslint-disable-next-line
    []
  );
  if (isLoading) {
    return <Spinner />;
  } else if (isError) {
    return <h5 className="text-center mt-5">Ошибка загрузки</h5>;
  }

  const renderHeroesList = (arr) => {
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

  const elements = renderHeroesList(filterElement);
  if (elements.length === 0) {
    return <h5 className="text-center mt-5">Героев пока нет</h5>;
  }
  return <TransitionGroup component="ul">{elements}</TransitionGroup>;
};

export default HeroesList;
