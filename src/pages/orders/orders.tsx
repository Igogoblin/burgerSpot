import { FeedItem } from '@/components/feed-item/feed-item';
import { ScrollContainer } from '@/components/scroll/scroll-container';
import { useAppDispatch, useAppSelector } from '@/hooks/hooks';
import { wsConnecting, wsDisconnecting } from '@/services/orders/ordersSlice';
import { useEffect } from 'react';
import { Link, useLocation } from 'react-router';

export const Orders = (): React.JSX.Element => {
  const dispatch = useAppDispatch();
  const { orders } = useAppSelector((store) => store.orders);
  const location = useLocation();
  useEffect(() => {
    dispatch(wsConnecting());
    return (): void => {
      dispatch(wsDisconnecting());
    };
  }, [dispatch]);
  return (
    <section>
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
