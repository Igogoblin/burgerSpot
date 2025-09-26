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
      if (!item) return sum;
      if (item.type === 'bun') {
        return sum + item.price * 2;
      }

      return sum + item.price;
    }, 0);
  };

  const getStatus = (status: string): string => {
    switch (status) {
      case 'created':
        return 'Создан';
      case 'pending':
        return 'Готовится';
      case 'done':
        return 'Выполнен';
      default:
        return '';
    }
  };

  const formatOrderDate = (createdAt: string): string => {
    const created = new Date(createdAt);
    const now = new Date();

    const diffMs = now.getTime() - created.getTime();
    const diffHours = diffMs / (1000 * 60 * 60);

    const hours = created.getHours().toString().padStart(2, '0');
    const minutes = created.getMinutes().toString().padStart(2, '0');

    if (diffHours < 24 && now.getDate() === created.getDate()) {
      return `Сегодня, ${hours}:${minutes}`;
    }

    const day = created.getDate().toString().padStart(2, '0');
    const month = (created.getMonth() + 1).toString().padStart(2, '0');
    const year = created.getFullYear();

    return `${day}.${month}.${year}, ${hours}:${minutes}`;
  };

  return (
    <div className={style.feed_item}>
      <div className={style.feed_header}>
        <p className="text text_type_digits-default">#{number}</p>
        <p className="text text_type_main-default text_color_inactive">
          {formatOrderDate(createdAt)}
        </p>
      </div>
      <p className="text text_type_main-medium">{name}</p>
      {location.pathname === '/profile/orders' && order.status === 'done' ? (
        <p className="text text_type_main-small completed-order">
          {getStatus(order.status)}
        </p>
      ) : null}
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
