import {
  wsConnecting,
  wsDisconnecting,
  wsError,
  wsMessage,
  wsOpen,
} from './ordersSlice';

// import type { RootState } from '../store';
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
        // console.error('WebSocket error:', event);
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
// export const ordersMiddleware: Middleware = (store) => {
//   let socket: WebSocket | null = null;
//   let isConnected = false;
//   let reconnectTimer: NodeJS.Timeout | null = null;
//   const reconnectInterval = 3000;

//   const startReconnectTimer = (): void => {
//     if (reconnectTimer) {
//       clearTimeout(reconnectTimer);
//     }
//     reconnectTimer = setTimeout(() => {
//       if (!isConnected && socket === null) {
//         console.log('Attempting to reconnect WebSocket...');

//         const selectToken = (state: RootState): string | null =>
//           state.auth.user.accessToken;

//         const token = selectToken(store.getState() as RootState);
//         store.dispatch(wsConnecting(token ? { token } : undefined));
//       }
//     }, reconnectInterval);
//   };

//   const stopReconnectTimer = (): void => {
//     if (reconnectTimer) {
//       clearTimeout(reconnectTimer);
//       reconnectTimer = null;
//     }
//   };

//   return (next) => (action) => {
//     const { dispatch } = store;

//     if (wsConnecting.match(action)) {
//       if (socket && isConnected) {
//         console.log(
//           'WebSocket is already connecting or connected. Closing existing connection.'
//         );
//         socket.close(1000, 'Already connecting');
//       }

//       const token: string | undefined = action.payload?.token;
//       const url = token
//         ? `wss://norma.nomoreparties.space/orders?token=${token}`
//         : 'wss://norma.nomoreparties.space/orders/all';

//       socket = new WebSocket(url);
//       stopReconnectTimer();

//       socket.onopen = (): void => {
//         console.log('WebSocket connected');
//         isConnected = true;
//         dispatch(wsOpen());
//       };

//       socket.onerror = (event): void => {
//         console.error('WebSocket error:', event);
//         isConnected = false;
//         dispatch(wsError('WebSocket error'));
//       };

//       socket.onmessage = (event: MessageEvent<string>): void => {
//         try {
//           const data = JSON.parse(event.data) as TOrdersResponse;

//           if ('message' in data && data.message === 'Invalid or missing token') {
//             console.error(
//               'WebSocket message error: Invalid or missing token',
//               event.data
//             );
//             dispatch(wsError('WebSocket message error: Invalid or missing token'));
//             socket?.close(1008, 'Invalid token');
//             return;
//           }

//           if (data.success) {
//             dispatch(
//               wsMessage({
//                 orders: data.orders,
//                 total: data.total,
//                 totalToday: data.totalToday,
//               })
//             );
//           } else {
//             console.error('WebSocket message error: success is false', event.data);
//             dispatch(
//               wsError(
//                 `WebSocket message error: success is false: ${data.message ?? 'Unknown error'}`
//               )
//             );
//           }
//         } catch (error) {
//           console.error('WebSocket message error: Failed to parse message', error);
//           dispatch(wsError('WebSocket message error: Failed to parse message'));
//         }
//       };

//       socket.onclose = (event): void => {
//         console.log('WebSocket closed:', event.code, event.reason);
//         isConnected = false;
//         socket = null;
//         dispatch(wsDisconnecting());
//         if (event.code !== 1000 && event.code !== 1008) {
//           console.log('WebSocket closed unexpectedly. Attempting to reconnect...');
//           startReconnectTimer();
//         }
//       };
//     } else if (wsDisconnecting.match(action)) {
//       stopReconnectTimer();
//       if (socket && isConnected) {
//         console.log('Explicitly disconnecting WebSocket');
//         socket.close(1000, 'Client initiated disconnect');
//       } else if (socket && !isConnected) {
//         socket = null;
//         console.log('Clearing pending WebSocket connection');
//       } else {
//         console.log('No active WebSocket to disconnect.');
//       }
//       isConnected = false;
//     }
//     return next(action);
//   };
// };
