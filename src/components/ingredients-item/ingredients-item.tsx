import BurgerPrice from '@/components/burger-price/burger-price';
import { useAppSelector } from '@/hooks/hooks';
import { nanoid } from 'nanoid';
import { useMemo } from 'react';
import { useDrag } from 'react-dnd';

import type { TIngredient } from '@utils/types';

import style from './ingredients-item.module.css';

export type TIngredientsItemProps = {
  ingredient: TIngredient;
  type?: string;
  className?: string;
  index?: number;
  onClick: (ingredient: TIngredient) => void;
  moveCard?: (dragIndex: number, hoverIndex: number) => void;
  uniqueId?: string;
};

const IngredientsItem = ({
  ingredient,
  onClick,
}: TIngredientsItemProps): React.JSX.Element => {
  const listIngredients = useAppSelector((store) => store.ingredients.listIngredients);
  const [, dragRef] = useDrag<TIngredient, unknown>({
    type: 'ingredient',
    item: { ...ingredient, uniqueId: nanoid() },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const count = useMemo(() => {
    return listIngredients.reduce((acc, item) => {
      if (item.name !== ingredient.name) return acc;
      return acc + (item.type === 'bun' ? 2 : 1);
    }, 0);
  }, [listIngredients, ingredient.name]);
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
      {count > 0 && <div className={`${style.block_items}`}>{count}</div>}
    </div>
  );
};

export default IngredientsItem;
