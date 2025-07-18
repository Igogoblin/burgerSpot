import BurgerPrice from '@/components/burger-price/burger-price';

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
  return (
    <div className={style.block} onClick={() => onClick(ingredient)}>
      <img src={ingredient.image} alt="Ingredient" />
      <BurgerPrice price={ingredient.price} />
      <div className={style.text}>{ingredient.name}</div>
    </div>
  );
};

export default IngredientsItem;
