import { Button, Input } from '@krgaa/react-developer-burger-ui-components';

export const ResetPassword = (): React.JSX.Element => {
  return (
    <div>
      <p className="text text_type_main-medium">Восстановление пароля</p>
      <Input
        type={'email'}
        placeholder={'Введите новый пароль'}
        onChange={() => {
          console.log('input new password');
        }}
        value={''}
      />
      <p className="text text_type_main-default text_color_inactive mt-20">
        Вспомнили пароль?
        <Button htmlType={'button'} type={'secondary'} size={'small'}>
          Войти
        </Button>
      </p>
    </div>
  );
};
