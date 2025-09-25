import { FeedItem } from '@/components/feed-item/feed-item';
import { ScrollContainer } from '@/components/scroll/scroll-container';
import { Stats } from '@/components/stats/stats';
import { useAppDispatch, useAppSelector } from '@/hooks/hooks';
import { wsConnecting, wsDisconnecting } from '@/services/orders/ordersSlice';
import { useEffect } from 'react';
import { Link, useLocation } from 'react-router';

import style from './feed.module.css';
export const Feed = (): React.JSX.Element => {
  const dispatch = useAppDispatch();
  const { orders, total, totalToday, completedOrders, pendingOrders } = useAppSelector(
    (store) => store.orders
  );
  const location = useLocation();
  useEffect(() => {
    dispatch(wsConnecting());
    return (): void => {
      dispatch(wsDisconnecting());
    };
  }, [dispatch]);

  return (
    <section className={style.feed}>
      <p className="text text_type_main-large mb-5">Лента заказов</p>
      <div className={`${style.feed_container}`}>
        <ScrollContainer>
          {orders.map((order) => (
            <Link
              key={order._id}
              to={`/feed/${order.number}`}
              state={{ background: location }}
              className={`${style.link}`}
            >
              <FeedItem key={order._id} order={order} />
            </Link>
          ))}
        </ScrollContainer>
        <Stats
          total={total}
          totalToday={totalToday}
          pendingOrders={pendingOrders}
          completedOrders={completedOrders}
        />
      </div>
    </section>
  );
};
