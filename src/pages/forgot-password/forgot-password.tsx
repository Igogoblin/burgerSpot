import { useAppDispatch, useAppSelector } from '@/hooks/hooks';
import { useForm } from '@/hooks/useForm';
import { forgotPassword } from '@/services/auth/authThunk';
import { Button, Input } from '@krgaa/react-developer-burger-ui-components';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import style from './forgot-password.module.css';

export const ForgotPassword = (): React.JSX.Element => {
  const [er, setEr] = useState<string | null>(null);
  const navigate = useNavigate();
  const { isLoading, error } = useAppSelector((store) => store.auth.forgot);
  const dispatch = useAppDispatch();

  const { values, handleChange } = useForm({ email: '' });
  console.log('Component rendered');
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();

    if (!values.email) {
      setEr('Заполните все поля');
      return;
    }
    const res = await dispatch(forgotPassword(values.email));
    if (forgotPassword.fulfilled.match(res)) {
      console.log('res.payload.email: ' + res.payload.success);
      void navigate('/reset-password');
      setEr(null);
    }
  };
  return (
    <div className={style.form}>
      <p className="text text_type_main-medium">Восстановление пароля</p>
      <form
        onSubmit={(e) => {
          void handleSubmit(e);
        }}
        className={style.container}
      >
        <Input
          type={'email'}
          placeholder={'Укажите e-mail'}
          value={values.email}
          onChange={handleChange}
        />
        <Button
          htmlType={'submit'}
          type={'primary'}
          size={'medium'}
          disabled={isLoading || !values.email}
        >
          {/* Восстановить */}
          {isLoading ? 'Загрузка...' : 'Восстановить'}
        </Button>
        {error && (
          <p className="text text_type_main-default text_color_error">{error}</p>
        )}
        {er && <p className="text text_type_main-default text_color_error">{er}</p>}
        <p className="text text_type_main-default text_color_inactive mt-20">
          Вспомнили пароль?
          <Button
            htmlType={'button'}
            type={'secondary'}
            size={'small'}
            extraClass="pl-2"
            onClick={() => {
              void navigate('/login');
            }}
          >
            Войти
          </Button>
        </p>
      </form>
    </div>
  );
};
