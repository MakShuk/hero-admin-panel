import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { v4 as uuidv4 } from 'uuid';
import { useHttp } from '../../hooks/http.hook';
import { newHeroe } from '../../actions';
import { useDispatch, useSelector } from 'react-redux';

//добавть очистку формы


const HeroesAddForm = () => {
  const { heroes, filters, filtersLoadingStatus } = useSelector((state) => state);
  const dispatch = useDispatch();
  const { request } = useHttp();

  const createNewHeroes = (formData) => {
    let newHeroeObj = {
      id: uuidv4(),
      ...formData,
    };

    request('http://localhost:3001/heroes', 'POST', JSON.stringify(newHeroeObj))
      .then(dispatch(newHeroe(newHeroeObj)))
      .catch();
  };

  const createFilterList = (arr, loadingStatus) => {
    
    if (loadingStatus === 'loading') {
      return <option>Загрузка...</option>;
    } else if (loadingStatus === 'error') {
      return <option>Ошибка загрузки</option>;
    }
    if (arr.length === 0) {
      return <option>Фильтров нет</option>;
    }
    return arr.map(({ en, ru, elementClassName }, index) => {
      if (en ==='all') {
        ru = 'Ваберите элемент...'
        en = ''
    }
        return (
          <option key={index} value={en}>
            {ru}
          </option>
        );
    });
  };

  const element = createFilterList(filters, filtersLoadingStatus);

  return (
    <Formik
      initialValues={{
        name: '',
        description: '',
        element: '',
      }}
      validationSchema={Yup.object({
        name: Yup.string().min(4, 'Minimum 4 characters to fill').required('Поле не может быть пустым'),
        description: Yup.string().max(180, 'Maximum 180 characters to fill').required('Поле не может быть пустым'),
        element: Yup.string().required('Выберите элемент'),
      })}
      onSubmit={(values) => {
        createNewHeroes(values);
      }}
    >
      <Form className="border p-4 shadow-lg rounded">
        <div className="mb-3">
          <label htmlFor="name" className="form-label fs-4">
            Имя нового героя
          </label>
          <Field type="text" name="name" className="form-control" id="name" placeholder="Как меня зовут?" />
          <ErrorMessage component="div" className="text-center text-danger" name="name" />
        </div>

        <div className="mb-3">
          <label htmlFor="description" className="form-label fs-4">
            Описание
          </label>
          <Field
            name="description"
            className="form-control"
            id="description"
            placeholder="Что я умею?"
            as="textarea"
            style={{ height: '130px' }}
          />
          <ErrorMessage component="div" className="text-center text-danger" name="description" />
        </div>
        <div className="mb-3">
          <label htmlFor="element" className="form-label">
            Выбрать элемент героя
          </label>

          <Field className="form-select" id="element" name="element" as="select">
            {element}
          </Field>
          <ErrorMessage component="div" className="text-center text-danger" name="element" />
        </div>
        <button type="submit" className="btn btn-primary">
          Создать
        </button>
      </Form>
    </Formik>
  );
};

export default HeroesAddForm;
