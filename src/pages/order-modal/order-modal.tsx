import BurgerPrice from '@/components/burger-price/burger-price';
import { IngredientMini } from '@/components/ingredient-mini/ingredient-mini';
import { ScrollContainer } from '@/components/scroll/scroll-container';
import { useAppSelector } from '@/hooks/hooks';

import type { TFeedItemProps } from '@/components/feed-item/feed-item';
import type { TIngredient } from '@/utils/types';

import style from './order-modal.module.css';

export const OrderModal = ({ order }: TFeedItemProps): React.JSX.Element => {
  const { ingredients } = useAppSelector((store) => store.ingredients);

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
      <p className="text text_type_digits-default mb-5 mr-auto ml-auto">
        #{order.number}
      </p>
      <p className="text text_type_main-medium">{order.name}</p>
      <p className="text text_type_main-default mt-3 completed-order">
        {order.status === 'done' && 'Выполнен'}
      </p>
      <p className="text text_type_main-medium mt-15 mb-6">Состав:</p>
      <ScrollContainer className={`${style.scroll}`}>
        {bun && (
          <div key={bun._id} className={`${style.title}`}>
            <div className={`${style.description}`}>
              <IngredientMini ingredient={bun} orderIngredients={orderIngredients} />
              <span className="text text_type_main-default">{bun.name}</span>
            </div>
            <div className={`${style.price}`}>
              <span>2x</span>
              <BurgerPrice price={bun.price} />
            </div>
          </div>
        )}
        {otherIngredients.map((item) => {
          const count = ingredientCount[item._id];
          return (
            <div key={item._id} className={`${style.title}`}>
              <div className={`${style.description}`}>
                <IngredientMini ingredient={item} orderIngredients={orderIngredients} />
                <span className="text text_type_main-default">{item.name}</span>
              </div>
              <div className={`${style.price}`}>
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
          // price={orderIngredients.reduce((sum, item) => sum + item.price, 0)}
          price={
            (bun ? bun.price * 2 : 0) +
            otherIngredients.reduce(
              (sum, item) => sum + item.price * ingredientCount[item._id],
              0
            )
          }
        />
      </div>
    </section>
  );
};
