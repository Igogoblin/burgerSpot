import { useAppDispatch } from '@/hooks/hooks';
import { useForm } from '@/hooks/useForm';
import {
  Button,
  EmailInput,
  Input,
  PasswordInput,
} from '@krgaa/react-developer-burger-ui-components';
import { useState } from 'react';
import { useNavigate } from 'react-router';

import { register } from '../../services/auth/authThunk';

export const Register = (): React.JSX.Element => {
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { values, handleChange } = useForm({
    name: '',
    email: '',
    password: '',
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    setError(null);
    if (!values.name || !values.email || !values.password) {
      setError('Заполните все поля');
      return;
    }
    const resultAction = await dispatch(
      register({ name: values.name, email: values.email, password: values.password })
    );
    if (register.rejected.match(resultAction)) {
      setError('Ошибка при регистрации');
    }
    if (register.fulfilled.match(resultAction)) {
      void navigate('/login');
    }
  };

  return (
    <div
      style={{
        margin: 'auto auto',
        display: 'flex',
        flexDirection: 'column',
        gap: '24px',
        alignItems: 'center',
      }}
    >
      <p className="text text_type_main-medium">Регистрация</p>
      <form
        onSubmit={(e) => {
          void handleSubmit(e);
        }}
        style={{ display: 'contents' }}
      >
        <Input
          type={'text'}
          placeholder={'Имя'}
          value={values.name}
          onChange={handleChange}
          name={'name'}
        />
        <EmailInput
          name={'email'}
          placeholder={'E-mail'}
          value={values.email}
          onChange={handleChange}
        />
        <PasswordInput
          name={'password'}
          placeholder={'Пароль'}
          value={values.password}
          onChange={handleChange}
        />
        {error && (
          <p className="text text_type_main-default text_color_error mt-2">{error}</p>
        )}
        <Button htmlType={'submit'} type="primary">
          Зарегистрироваться
        </Button>
      </form>
      <p className="text text_type_main-default text_color_inactive mt-20">
        Уже зарегистрированы?
        <Button
          type="secondary"
          htmlType={'submit'}
          extraClass="pl-2"
          onClick={() => void navigate('/login')}
        >
          Войти
        </Button>
      </p>
    </div>
  );
};
