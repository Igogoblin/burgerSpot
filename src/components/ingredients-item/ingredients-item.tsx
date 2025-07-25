import BurgerPrice from '@/components/burger-price/burger-price';
import { useDrag } from 'react-dnd';

import type { TIngredient } from '@utils/types';

import style from './ingredients-item.module.css';

export type TIngredientsItemProps = {
  ingredient: TIngredient;
  type?: string;
  className?: string;
  onClick: (ingredient: TIngredient) => void;
};

const IngredientsItem = ({
  ingredient,
  onClick,
}: TIngredientsItemProps): React.JSX.Element => {
  const [, dragRef] = useDrag<TIngredient, unknown>({
    type: 'ingredient',
    item: ingredient,
    // collect: (monitor) => ({
    //   isDragging: monitor.isDragging(),
    // }),
  });
  return (
    <div
      className={style.block}
      onClick={() => onClick(ingredient)}
      draggable={true}
      ref={dragRef as unknown as React.Ref<HTMLDivElement>}
    >
      <img src={ingredient.image} alt="Ingredient" />
      <BurgerPrice price={ingredient.price} />
      <div className={style.text}>{ingredient.name}</div>
    </div>
  );
};

export default IngredientsItem;
