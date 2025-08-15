import {
  Button,
  EmailInput,
  Input,
  PasswordInput,
} from '@krgaa/react-developer-burger-ui-components';
import { useState } from 'react';

export const Register = (): React.JSX.Element => {
  const [valueName, setValueName] = useState('');
  const [valueEmail, setValueEmail] = useState('');
  const [valuePassword, setValuePassword] = useState('');
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
      <Input
        type={'text'}
        placeholder={'Имя'}
        value={valueName}
        onChange={(e) => setValueName(e.target.value)}
      />
      <EmailInput
        name={'email'}
        placeholder={'E-mail'}
        value={valueEmail}
        onChange={(e) => setValueEmail(e.target.value)}
      />
      <PasswordInput
        name={'password'}
        placeholder={'Пароль'}
        value={valuePassword}
        onChange={(e) => setValuePassword(e.target.value)}
      />
      <Button htmlType={'submit'} type="primary">
        Зарегистрироваться
      </Button>
      <p className="text text_type_main-default text_color_inactive mt-20">
        Уже зарегистрированы?
        <Button type="secondary" htmlType={'submit'} extraClass="pl-2">
          Войти
        </Button>
      </p>
    </div>
  );
};
