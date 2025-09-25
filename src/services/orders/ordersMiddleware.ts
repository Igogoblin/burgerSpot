import { wsConnecting, wsDisconnecting, wsError, wsMessage } from './ordersSlice';

import type { TOrdersResponse } from '../types/types';
import type { Middleware } from 'redux';

export const ordersMiddleware: Middleware = (store) => {
  let socket: WebSocket | null = null;

  return (next) => (action) => {
    if (wsConnecting.match(action)) {
      socket = new WebSocket('wss://norma.nomoreparties.space/orders/all');

      socket.onopen = (): void => {
        console.log('WebSocket connected');
      };

      socket.onerror = (event): void => {
        console.error('WebSocket error:', event);
        store.dispatch(wsError('WebSocket error'));
      };
      socket.onmessage = (event: MessageEvent<string>): void => {
        const data = JSON.parse(event.data) as TOrdersResponse;
        if (data.success) {
          store.dispatch(
            wsMessage({
              orders: data.orders,
              total: data.total,
              totalToday: data.totalToday,
            })
          );
        } else {
          console.error('WebSocket message error: success is false', typeof event.data);
        }
      };
      socket.onclose = (): void => {
        socket = null;
        store.dispatch(wsDisconnecting());
      };
    }
    return next(action);
  };
};
