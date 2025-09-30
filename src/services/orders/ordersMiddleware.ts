import {
  wsConnecting,
  wsDisconnecting,
  wsError,
  wsMessage,
  wsOpen,
} from './ordersSlice';

import type { TOrdersResponse } from '../types/types';
import type { Middleware } from 'redux';

export const ordersMiddleware: Middleware = (store) => {
  let socket: WebSocket | null = null;
  return (next) => (action) => {
    if (wsConnecting.match(action)) {
      const token: string | undefined = action.payload?.token;
      const url = token
        ? `wss://norma.nomoreparties.space/orders?token=${token}`
        : 'wss://norma.nomoreparties.space/orders/all';

      socket = new WebSocket(url);

      socket.onopen = (): void => {
        console.log('WebSocket connected');
        store.dispatch(wsOpen());
      };

      socket.onerror = (event): void => {
        console.log('WebSocket error:', event);
        store.dispatch(wsError('WebSocket error'));
      };
      socket.onmessage = (event: MessageEvent<string>): void => {
        try {
          const data = JSON.parse(event.data) as TOrdersResponse;

          if ('message' in data && data.message === 'Invalid or missing token') {
            console.error(
              'WebSocket message error: Invalid or missing token',
              event.data
            );
            store.dispatch(wsError('WebSocket message error: Invalid or missing token'));
            socket?.close();
            return;
          }
          const parsed = data;
          if (parsed.success) {
            store.dispatch(
              wsMessage({
                orders: parsed.orders,
                total: parsed.total,
                totalToday: parsed.totalToday,
              })
            );
          } else {
            console.error(
              'WebSocket message error: success is false',
              typeof event.data
            );
          }
        } catch (error) {
          console.error('WebSocket message error: Failed to parse message', error);
          store.dispatch(wsError('WebSocket message error: Failed to parse message'));
        }
      };
      socket.onclose = (): void => {
        socket = null;
        store.dispatch(wsDisconnecting());
      };
    }
    if (wsDisconnecting.match(action)) {
      if (socket) {
        socket.close();
        socket = null;
        console.log('WebSocket disconnected');
      }
    }
    return next(action);
  };
};
