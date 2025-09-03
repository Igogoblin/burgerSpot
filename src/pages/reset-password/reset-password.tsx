import { useAppDispatch, useAppSelector } from '@/hooks/hooks';
import { useForm } from '@/hooks/useForm';
import { forgotPassword, resetPassword } from '@/services/auth/authThunk';
import {
  Button,
  EmailInput,
  Input,
  PasswordInput,
} from '@krgaa/react-developer-burger-ui-components';
import { useState } from 'react';
import { useNavigate } from 'react-router';

export const ResetPassword = (): React.JSX.Element => {
  const [isEmailSubmitted, setIsEmailSubmitted] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { values, handleChange } = useForm({
    email: '',
    password: '',
    token: '',
  });
  const { isLoading: forgotLoading, error: forgotError } = useAppSelector(
    (store) => store.auth.forgot
  );
  const { isLoading: resetLoading, error: resetError } = useAppSelector(
    (store) => store.auth.reset
  );

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    setFormError(null);

    // Логика для первого шага: отправка почты для получения токена
    if (!isEmailSubmitted) {
      if (!values.email) {
        setFormError('Пожалуйста, укажите e-mail');
        return;
      }
      const res = await dispatch(forgotPassword(values.email));
      if (forgotPassword.fulfilled.match(res)) {
        setIsEmailSubmitted(true);
      } else if (forgotPassword.rejected.match(res)) {
        setFormError(res.payload! || 'Ошибка при запросе на сброс пароля');
      }
    }
    // Логика для второго шага: отправка нового пароля и токена
    else {
      if (!values.password || !values.token) {
        setFormError('Пожалуйста, заполните все поля');
        return;
      }
      const res = await dispatch(
        resetPassword({ password: values.password, token: values.token })
      );
      if (resetPassword.fulfilled.match(res)) {
        void navigate('/login');
      } else if (resetPassword.rejected.match(res)) {
        setFormError(res.payload! || 'Ошибка при сбросе пароля');
      }
    }
  };

  const getButtonText = (): string => {
    if (isEmailSubmitted) {
      return resetLoading ? 'Сохранение...' : 'Сохранить';
    }
    return forgotLoading ? 'Восстановление...' : 'Восстановить';
  };

  const currentError = formError ?? forgotError ?? resetError;

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '24px',
        maxWidth: '480px',
        alignItems: 'center',
        margin: 'auto auto',
      }}
    >
      <p className="text text_type_main-medium">Восстановление пароля</p>
      <form
        style={{ display: 'contents' }}
        onSubmit={(e) => {
          void handleSubmit(e);
        }}
      >
        {!isEmailSubmitted ? (
          // Верстка для первого шага: ввод email
          <EmailInput
            name={'email'}
            placeholder={'Укажите e-mail'}
            value={values.email}
            onChange={handleChange}
          />
        ) : (
          // Верстка для второго шага: ввод нового пароля и токена
          <>
            <PasswordInput
              name={'password'}
              placeholder={'Введите новый пароль'}
              value={values.password}
              onChange={handleChange}
            />
            <Input
              type={'text'}
              placeholder={'Введите код из письма'}
              value={values.token}
              onChange={handleChange}
              name={'token'}
            />
          </>
        )}
        <Button
          htmlType={'submit'}
          type={'primary'}
          size={'medium'}
          disabled={
            !isEmailSubmitted
              ? forgotLoading || !values.email
              : resetLoading || !values.password || !values.token
          }
        >
          {getButtonText()}
        </Button>
      </form>
      {currentError && (
        <p className="text text_type_main-default text_color_error">{currentError}</p>
      )}
      <p className="text text_type_main-default text_color_inactive mt-20">
        Вспомнили пароль?
        <Button
          htmlType={'button'}
          type={'secondary'}
          size={'small'}
          extraClass="pl-2"
          onClick={() => void navigate('/login')}
        >
          Войти
        </Button>
      </p>
    </div>
  );
};
