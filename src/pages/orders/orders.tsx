import { FeedItem } from '@/components/feed-item/feed-item';
import { ScrollContainer } from '@/components/scroll/scroll-container';
import { useAppDispatch, useAppSelector } from '@/hooks/hooks';
import { wsConnecting, wsDisconnecting } from '@/services/orders/ordersSlice';
import { useEffect } from 'react';
import { Link, useLocation } from 'react-router';

export const Orders = (): React.JSX.Element => {
  const dispatch = useAppDispatch();
  const { orders } = useAppSelector((store) => store.orders);
  const token = useAppSelector((store) => store.auth.user?.accessToken);
  const location = useLocation();
  useEffect(() => {
    if (token) {
      const clearToken = token.replace('Bearer ', '');
      dispatch(wsConnecting({ token: clearToken }));
    }
    return (): void => {
      dispatch(wsDisconnecting());
    };
  }, [dispatch, token]);
  return (
    <section>
      {orders.length === 0 && (
        <p className="text text_type_main-default text_color_yellow mb-5">
          Извините, с websocket-сервером проблема. Показываем все заказы, а не личные.
          Как только восстановится соединение — появятся ваши заказы. Извините за
          временные неудобства!
        </p>
      )}
      <ScrollContainer>
        {orders.map((order) => (
          <Link
            key={order._id}
            state={{ background: location }}
            to={`/profile/orders/${order.number}`}
          >
            <FeedItem order={order} />
          </Link>
        ))}
      </ScrollContainer>
    </section>
  );
};
