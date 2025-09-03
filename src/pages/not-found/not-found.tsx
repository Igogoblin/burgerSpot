import style from './not-found.module.css';

export const NotFound = (): React.JSX.Element => {
  return (
    <div className={style.container}>
      <p className="text text_type_digits-large">404</p>
      <p className="text text_type_main-large">NotFound</p>
      <p className="text text_type_main-default">Страница не найдена</p>
    </div>
  );
};
