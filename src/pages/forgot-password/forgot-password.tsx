import { Button } from '@krgaa/react-developer-burger-ui-components';

export const ForgotPassword = (): React.JSX.Element => {
  return (
    <div>
      <p className="text text_type_main-medium">Восстановление пароля</p>
      <Button htmlType={'button'} type={'primary'} size={'medium'}>
        Восстановить
      </Button>
      <p className="text text_type_main-default text_color_inactive mt-20">
        Вспомнили пароль?
        <Button htmlType={'button'} type={'secondary'} size={'small'}>
          Войти
        </Button>
      </p>
    </div>
  );
};
