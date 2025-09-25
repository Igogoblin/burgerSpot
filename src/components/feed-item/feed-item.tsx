import { useAppSelector } from '@/hooks/hooks';
import { useLocation } from 'react-router';

import BurgerPrice from '../burger-price/burger-price';
import { IngredientMini } from '../ingredient-mini/ingredient-mini';

import type { TOrder } from '@/services/types/types';
import type { TIngredient } from '@/utils/types';

import style from './feed-item.module.css';

export type TFeedItemProps = {
  order: TOrder;
};
export const FeedItem = ({ order }: TFeedItemProps): React.JSX.Element => {
  const { name, number, createdAt } = order;
  const { ingredients } = useAppSelector((store) => store.ingredients);
  const location = useLocation();
  const orderIngredients = ingredients.filter((item) =>
    order.ingredients.find((id) => id === item._id)
  );
  const getOrderPrice = (order: TOrder, ingredients: TIngredient[]): number => {
    return order.ingredients.reduce((sum, id) => {
      const item = ingredients.find((i) => i._id === id);
      return item ? sum + item.price : sum;
    }, 0);
  };
  return (
    <div className={style.feed_item}>
      <div className={style.feed_header}>
        <p className="text text_type_digits-default">#{number}</p>
        <p className="text text_type_main-default text_color_inactive">
          {new Date(createdAt).toLocaleString('ru-RU', {
            day: '2-digit',
            month: '2-digit',
            year: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
          })}
        </p>
      </div>
      <p className="text text_type_main-medium">{name}</p>
      {location.pathname === '/orders' && order.status === 'done' ? (
        <p className="text text_type_main-small" style={{ color: '#00CCCC' }}>
          Выполнен
        </p>
      ) : (
        <p className="text text_type_main-small">Готовится</p>
      )}
      <div className={style.feed_footer}>
        <div className={`${style.image_container}`}>
          {orderIngredients.slice(0, 6).map((item, index) => (
            <IngredientMini
              key={item._id}
              ingredient={item}
              orderIngredients={orderIngredients}
              index={index}
            />
          ))}
        </div>

        <BurgerPrice price={getOrderPrice(order, ingredients)} isCenter={false} />
      </div>
    </div>
  );
};
