import type { TOrder } from '@/services/types/types';

import style from './stats.module.css';

export const Stats = ({
  total,
  totalToday,
  pendingOrders,
  completedOrders,
}: {
  total: number;
  totalToday: number;
  pendingOrders: TOrder[] | null;
  completedOrders: TOrder[] | null;
}): React.JSX.Element => {
  return (
    <div className={`${style.stats}`}>
      <div className={style.stats_header}>
        <div className={style.header_item}>
          <p className="text text_type_main-medium">Готовы:</p>
          {completedOrders && completedOrders.length > 0 ? (
            <div>
              {completedOrders.slice(0, 10).map((order) => (
                <p
                  key={order._id}
                  className={`text text_type_digits-default ${style.completed}`}
                >
                  {order.number}
                </p>
              ))}
            </div>
          ) : (
            <p className="text text_type_digits-default">0</p>
          )}
        </div>
        <div className={style.header_item}>
          <p className="text text_type_main-medium">В работе:</p>
          {pendingOrders && pendingOrders.length > 0 ? (
            <div>
              {pendingOrders.slice(0, 10).map((order) => (
                <p key={order._id} className="text text_type_digits-default">
                  {order.number}
                </p>
              ))}
            </div>
          ) : (
            <p className="text text_type_digits-default">0</p>
          )}
        </div>
      </div>
      <div>
        <p className="text text_type_main-medium">Выполнено за все время:</p>
        <p className="text text_type_digits-large">{total}</p>
      </div>
      <div>
        <p className="text text_type_main-medium">Выполнено за сегодня:</p>
        <p className="text text_type_digits-medium">{totalToday}</p>
      </div>
    </div>
  );
};
