import { Button, Input } from '@krgaa/react-developer-burger-ui-components';
import { useState } from 'react';

export const ForgotPassword = (): React.JSX.Element => {
  const [valueEmail, setValueEmail] = useState('');
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
      <Button htmlType={'button'} type={'primary'} size={'medium'}>
        Восстановить
      </Button>
      <p className="text text_type_main-default text_color_inactive mt-20">
        Вспомнили пароль?
        <Button htmlType={'button'} type={'secondary'} size={'small'} extraClass="pl-2">
          Войти
        </Button>
      </p>
    </div>
  );
};
