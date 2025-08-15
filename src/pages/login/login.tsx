import { Button, Input } from '@krgaa/react-developer-burger-ui-components';

export const Login = (): React.JSX.Element => {
  return (
    <div className="flex flex-col">
      <p className="text text_type_main-large">Вход</p>
      <Input
        type={'email'}
        placeholder={'E-mail'}
        value={''}
        onChange={() => {
          console.log('email');
        }}
      />
      <Input
        type={'password'}
        placeholder={'Пароль'}
        value={''}
        onChange={() => {
          console.log('password');
        }}
      />
      <Button htmlType={'button'} type={'primary'} size={'large'}>
        Войти
      </Button>
      <p className="text text_type_main-default text_color_inactive mt-20">
        Вы — новый пользователь?
        <Button htmlType={'button'} type={'secondary'} size={'small'}>
          Зарегистрироваться
        </Button>
      </p>
      <p className="text text_type_main-default text_color_inactive mt-4">
        Забыли пароль?
        <Button htmlType={'button'} type={'secondary'} size={'small'}>
          Восстановить пароль
        </Button>
      </p>
    </div>
  );
};
