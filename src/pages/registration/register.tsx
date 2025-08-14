import {
  Button,
  EmailInput,
  Input,
  PasswordInput,
} from '@krgaa/react-developer-burger-ui-components';

import style from './register.module.css';
// import { ChangeEvent } from 'react';

export const Register = (): React.JSX.Element => {
  return (
    <div>
      <h1 className={style.title}>Регистрация</h1>
      <Input
        type={'text'}
        placeholder={'Имя'}
        value={''}
        onChange={() => {
          console.log('change');
        }}
        // onChange={
        //   //   function (e: ChangeEvent<HTMLInputElement>): void {
        //   //   throw new Error('Function not implemented.');
        //   // }
        // }
      />
      {/* <Input type={'email'} placeholder={'E-mail'} /> */}
      <EmailInput
        name={'email'}
        placeholder={'E-mail'}
        value={''}
        onChange={() => {
          console.log('change');
        }}
        // onChange={function (e: ChangeEvent<HTMLInputElement>): void {
        //   throw new Error('Function not implemented.');
        // }}
      />
      {/* <Input type={'password'} placeholder={'Пароль'} /> */}
      <PasswordInput
        name={'password'}
        placeholder={'Пароль'}
        value={''}
        onChange={() => {
          console.log('change');
        }}
        // onChange={function (e: React.ChangeEvent<HTMLInputElement>): void {
        //   throw new Error('Function not implemented.');
        // }}
      />
      <Button htmlType={'submit'} type="primary">
        Зарегистрироваться
      </Button>
      <p className="text text_type_main-default text_color_inactive mt-20">
        Уже зарегистрированы?{' '}
        <Button type="secondary" htmlType={'submit'}>
          Войти
        </Button>
      </p>
    </div>
  );
};
