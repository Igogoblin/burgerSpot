// import { useAppDispatch } from '@/hooks/hooks';
// import { resetPassword } from '@/services/auth/authThunk';
// import { Button, Input } from '@krgaa/react-developer-burger-ui-components';
// import { useState } from 'react';
// import { useNavigate } from 'react-router';

// export const ResetPassword = (): React.JSX.Element => {
//   const [valueEmail, setValueEmail] = useState('');
//   const dispatch = useAppDispatch();
//   const navigate = useNavigate();

//   const handleSubmit = async (
//     e: React.FormEvent<HTMLFormElement> | undefined
//   ): Promise<void> => {
//     if (e) {
//       e.preventDefault();
//     }
//     if (!valueEmail) {
//       return;
//     }
//     const res = await dispatch(resetPassword(valueEmail));
//     if (resetPassword.fulfilled.match(res)) {
//       void navigate('/login');
//     }
//   };
//   return (
//     <div
//       style={{
//         display: 'flex',
//         flexDirection: 'column',
//         gap: '24px',
//         maxWidth: '480px',
//         alignItems: 'center',
//         margin: 'auto auto',
//       }}
//     >
//       <p className="text text_type_main-medium">Восстановление пароля</p>
//       <form
//         style={{ display: 'contents' }}
//         onSubmit={(e) => {
//           void handleSubmit(e);
//         }}
//       >
//         <Input
//           type={'email'}
//           placeholder={'Укажите e-mail'}
//           onChange={(e) => setValueEmail(e.target.value)}
//           value={valueEmail}
//         />
//         <Button htmlType={'submit'} type={'primary'} size={'medium'}>
//           Восстановить
//         </Button>
//       </form>
//       <p className="text text_type_main-default text_color_inactive mt-20">
//         Вспомнили пароль?
//         <Button htmlType={'button'} type={'secondary'} size={'small'} extraClass="pl-2">
//           Войти
//         </Button>
//       </p>
//     </div>
//   );
// };

import { useAppDispatch, useAppSelector } from '@/hooks/hooks';
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
  const [valueEmail, setValueEmail] = useState('');
  const [valuePassword, setValuePassword] = useState('');
  const [valueToken, setValueToken] = useState('');
  const [isEmailSubmitted, setIsEmailSubmitted] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
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
      if (!valueEmail) {
        setFormError('Пожалуйста, укажите e-mail');
        return;
      }
      const res = await dispatch(forgotPassword(valueEmail));
      if (forgotPassword.fulfilled.match(res)) {
        setIsEmailSubmitted(true);
      } else if (forgotPassword.rejected.match(res)) {
        setFormError(res.payload! || 'Ошибка при запросе на сброс пароля');
      }
    }
    // Логика для второго шага: отправка нового пароля и токена
    else {
      if (!valuePassword || !valueToken) {
        setFormError('Пожалуйста, заполните все поля');
        return;
      }
      const res = await dispatch(
        resetPassword({ password: valuePassword, token: valueToken })
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
            value={valueEmail}
            onChange={(e) => setValueEmail(e.target.value)}
          />
        ) : (
          // Верстка для второго шага: ввод нового пароля и токена
          <>
            <PasswordInput
              name={'password'}
              placeholder={'Введите новый пароль'}
              value={valuePassword}
              onChange={(e) => setValuePassword(e.target.value)}
            />
            <Input
              type={'text'}
              placeholder={'Введите код из письма'}
              value={valueToken}
              onChange={(e) => setValueToken(e.target.value)}
            />
          </>
        )}
        <Button
          htmlType={'submit'}
          type={'primary'}
          size={'medium'}
          disabled={
            !isEmailSubmitted
              ? forgotLoading || !valueEmail
              : resetLoading || !valuePassword || !valueToken
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
