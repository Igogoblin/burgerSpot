import { Button, Input } from '@krgaa/react-developer-burger-ui-components';
import { useState } from 'react';

export const ResetPassword = (): React.JSX.Element => {
  const [valueEmail, setValueEmail] = useState('');
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
      <Input
        type={'email'}
        placeholder={'Укажите e-mail'}
        onChange={(e) => setValueEmail(e.target.value)}
        value={valueEmail}
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
