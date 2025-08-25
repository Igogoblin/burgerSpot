import { useAppDispatch, useAppSelector } from '@/hooks/hooks';
import { forgotPassword } from '@/services/auth/authThunk';
import { Button, Input } from '@krgaa/react-developer-burger-ui-components';
import { useState } from 'react';
import { useNavigate } from 'react-router';

export const ForgotPassword = (): React.JSX.Element => {
  const [valueEmail, setValueEmail] = useState('');
  const navigate = useNavigate();
  //  const orderNumber = useAppSelector((store) => store.order.number);
  const { isLoading, error } = useAppSelector((store) => store.auth.forgot);
  const dispatch = useAppDispatch();

  const handleSubmit = async (): Promise<void> => {
    // Диспетчируем thunk
    const res = await dispatch(forgotPassword(valueEmail));

    // Проверяем, что thunk был успешно выполнен
    if (forgotPassword.fulfilled.match(res)) {
      void navigate('/reset-password');
    }
  };
  return (
    <div
      style={{
        margin: 'auto auto',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '24px',
      }}
    >
      <p className="text text_type_main-medium">Восстановление пароля</p>
      <Input
        type={'email'}
        placeholder={'Укажите e-mail'}
        value={valueEmail}
        onChange={(e) => setValueEmail(e.target.value)}
      />
      <Button
        htmlType={'button'}
        type={'primary'}
        size={'medium'}
        onClick={() => {
          void handleSubmit();
        }}
        disabled={isLoading || !valueEmail}
      >
        {/* Восстановить */}
        {isLoading ? 'Загрузка...' : 'Восстановить'}
      </Button>
      {error && <p className="text text_type_main-default text_color_error">{error}</p>}
      <p className="text text_type_main-default text_color_inactive mt-20">
        Вспомнили пароль?
        <Button htmlType={'button'} type={'secondary'} size={'small'} extraClass="pl-2">
          Войти
        </Button>
      </p>
    </div>
  );
};
