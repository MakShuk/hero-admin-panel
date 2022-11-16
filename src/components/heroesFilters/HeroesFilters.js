import { useHttp } from '../../hooks/http.hook';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { filtersFetching, filtersFetched, filtersFetchingError, filtrateHeroe } from '../../actions';

import Spinner from '../spinner/Spinner';


const HeroesFilters = () => {
  const { filters, filtersLoadingStatus} = useSelector((state) => state.filters);
  const { request } = useHttp();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(filtersFetching());
    request('http://localhost:3001/filters')
      .then((data) => {
        dispatch(filtersFetched(data));
      })
      .catch(() => dispatch(filtersFetchingError()));

    // eslint-disable-next-line
  }, []);

  if (filtersLoadingStatus === 'loading') {
    return (
      <div className="d-flex justify-content-center">
        <Spinner />
      </div>
    );
  } else if (filtersLoadingStatus === 'error') {
    return <h5 className="text-center mt-5">Ошибка загрузки</h5>;
  }


  const renderFiltersList = (arr) => {
    if (arr.length === 0) {
      return <h5 className="text-center mt-5">Фильтров нет</h5>;
    }

    return arr.map(({ en, ru, elementClassName }, index) => {
      const active = index === 0 ? 'active' : '';
      return (
        <button
          key={index}
          id={en}
          onClick={() => dispatch(filtrateHeroe(en))}
          className={`btn btn-${elementClassName} ${active}`}
        >
          {ru}
        </button>
      );
    });
  };

  const elements = renderFiltersList(filters);

  return (
    <div className="card shadow-lg mt-4">
      <div className="card-body">
        <p className="card-text">Отфильтруйте героев по элементам</p>
        <div className="btn-group">{elements}</div>
      </div>
    </div>
  );
};

export default HeroesFilters;
