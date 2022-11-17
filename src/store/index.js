import { createStore, combineReducers, compose, applyMiddleware } from 'redux';

import heroes from '../reducers/heroes';
import filters from '../reducers/filters';

const ad = () => (next) => (action) => {
  if (typeof action === 'string') {
    return next({ type: action });
  }
  return next(action);
};

const enhancer =
  (createStore) =>
  (...arg) => {
    const store = createStore(...arg);

    const oldDispatch = store.dispatch;
    store.dispatch = (action) => {
      if (typeof action === 'string') {
        return oldDispatch({ type: action });
      }
      return oldDispatch(action);
    };
    return store;
  };

const store = createStore(
  combineReducers({ heroes, filters }),
  compose(applyMiddleware(stringMiddleware), window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())
);

export default store;
