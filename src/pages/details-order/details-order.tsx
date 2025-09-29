import BurgerPrice from '@/components/burger-price/burger-price';
import { IngredientMini } from '@/components/ingredient-mini/ingredient-mini';
import { ScrollContainer } from '@/components/scroll/scroll-container';
import { useAppDispatch, useAppSelector } from '@/hooks/hooks';
import { fetchOrderByNumber } from '@/services/detailsOrder/detailsOrderThunk';
import { wsConnecting, wsDisconnecting } from '@/services/orders/ordersSlice';
import { useEffect } from 'react';
import { useParams } from 'react-router';

import type { TIngredient } from '@/utils/types';

import style from './details-order.module.css';

export const DetailsOrders = (): React.JSX.Element | null => {
  const { number } = useParams<{ number: string }>();
  const orders = useAppSelector((store) => store.orders.orders);
  const { ingredients } = useAppSelector((store) => store.ingredients);
  const dispatch = useAppDispatch();
  const { detailsOrder, isLoading, error } = useAppSelector(
    (store) => store.detailsOrder
  );

  useEffect(() => {
    if (!orders.length) {
      dispatch(wsConnecting());
    }
    return (): void => {
      dispatch(wsDisconnecting());
    };
  }, [dispatch, orders.length]);

  useEffect(() => {
    if (number && !orders.find((o) => String(o.number) === number)) {
      void dispatch(fetchOrderByNumber(number));
    }
  }, [dispatch, number, orders]);

  const order = orders.find((item) => String(item.number) === number) ?? detailsOrder;
  if (!order) return <div>Загрузка... Ордера</div>;

  if (isLoading) return <div>Загрузка...</div>;
  if (error) return <div>{error}</div>;

  const orderIngredients: TIngredient[] = order.ingredients
    .map((id) => ingredients.find((i) => i._id === id))
    .filter((i): i is TIngredient => Boolean(i));

  const ingredientCount = order.ingredients.reduce<Record<string, number>>((acc, id) => {
    acc[id] = (acc[id] || 0) + 1;
    return acc;
  }, {});

  const bun = orderIngredients.find((item) => item.type === 'bun');
  const otherIngredients = orderIngredients.filter((i) => i.type !== 'bun');

  return (
    <section className={style.module}>
      <div>
        <p className="text text_type_digits-default mb-5 mr-auto ml-auto">
          #{order.number}
        </p>
        <p className="text text_type_main-medium">{order.name}</p>
        <p className="text text_type_main-default mt-3  completed-order">
          {order.status === 'done' && 'Выполнен'}
          {order.status === 'created' && 'Создан'}
          {order.status === 'pending' && 'Готовится'}
        </p>
        <p className="text text_type_main-medium mt-15 mb-6">Состав:</p>

        <ScrollContainer className={style.scroll}>
          {bun && (
            <div key={bun._id} className={style.title}>
              <div className={style.description}>
                <IngredientMini ingredient={bun} orderIngredients={orderIngredients} />
                <span className="text text_type_main-default">{bun.name}</span>
              </div>
              <div className={style.price}>
                <span>2x</span>
                <BurgerPrice price={bun.price} />
              </div>
            </div>
          )}
          {otherIngredients.map((item) => {
            const count = ingredientCount[item._id];
            return (
              <div key={item._id} className={style.title}>
                <div className={style.description}>
                  <IngredientMini
                    ingredient={item}
                    orderIngredients={orderIngredients}
                  />
                  <span className="text text_type_main-default">{item.name}</span>
                </div>
                <div className={style.price}>
                  <span>{count}x</span>
                  <BurgerPrice price={item.price} />
                </div>
              </div>
            );
          })}
        </ScrollContainer>

        <div className={`${style.footer} mt-10`}>
          <p className="text text_type_main-default text_color_inactive">
            {new Date(order.createdAt).toLocaleString('ru-RU', {
              day: '2-digit',
              month: '2-digit',
              year: '2-digit',
              hour: '2-digit',
              minute: '2-digit',
            })}
          </p>
          <BurgerPrice
            price={
              (bun ? bun.price * 2 : 0) +
              otherIngredients.reduce(
                (sum, item) => sum + item.price * ingredientCount[item._id],
                0
              )
            }
          />
        </div>
      </div>
    </section>
  );
};
