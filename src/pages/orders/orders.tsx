import { FeedItem } from '@/components/feed-item/feed-item';
import { ScrollContainer } from '@/components/scroll/scroll-container';
import { useAppDispatch, useAppSelector } from '@/hooks/hooks';
import { wsConnecting, wsDisconnecting } from '@/services/orders/ordersSlice';
import { useEffect } from 'react';

export const Orders = (): React.JSX.Element => {
  const dispatch = useAppDispatch();
  const { orders } = useAppSelector((store) => store.orders);
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
          <FeedItem key={order._id} order={order} />
        ))}
      </ScrollContainer>
    </section>
  );
};
