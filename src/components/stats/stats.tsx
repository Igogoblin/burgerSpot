import style from './stats.module.css';

export const Stats = (): React.JSX.Element => {
  return (
    <div className={`${style.stats}`}>
      <div className={style.stats_header}>
        <div className={style.header_item}>
          <p className="text text_type_main-medium">Готовы:</p>
          <p className="text text_type_digits-default">123</p>
        </div>
        <div className={style.header_item}>
          <p className="text text_type_main-medium">В работе:</p>
          <p className="text text_type_digits-default">1234567890</p>
        </div>
      </div>
      <div>
        <p className="text text_type_main-medium">Выполнено за все время:</p>
        <p className="text text_type_digits-large">12345</p>
      </div>
      <div>
        <p className="text text_type_main-medium">Выполнено за сегодня:</p>
        <p className="text text_type_digits-medium">45678</p>
      </div>
    </div>
  );
};
