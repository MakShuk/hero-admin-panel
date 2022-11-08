import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { v4 as uuidv4 } from 'uuid';
import { useHttp } from '../../hooks/http.hook';
import { newHeroe } from '../../actions';
import { useDispatch, useSelector } from 'react-redux';

// Задача для этого компонента:

// Усложненная задача:
// Дополнительно:
// Элементы <option></option> желательно сформировать на базе
// данных из фильтров

const HeroesAddForm = () => {
  const { heroes } = useSelector((state) => state);
  const dispatch = useDispatch();
  const { request } = useHttp();

  const createNewHeroes = (formData) => {
    let newHeroeObj = {
      id: uuidv4(),
      ...formData,
    };

    request('http://localhost:3001/heroes', 'POST', JSON.stringify(newHeroeObj))
      .then(dispatch(newHeroe(heroes, newHeroeObj)))
      .catch();
  };

  

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
            <option value="">Я владею элементом...</option>
            <option value="fire">Огонь</option>
            <option value="water">Вода</option>
            <option value="wind">Ветер</option>
            <option value="earth">Земля</option>
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
