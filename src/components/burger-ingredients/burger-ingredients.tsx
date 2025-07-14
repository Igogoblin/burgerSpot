import type { TIngredient } from '@/utils/types';

import style from './burger-ingredients.module.css';

const BurgerIngredients = ({
  ingredient,
}: {
  ingredient: TIngredient;
}): React.JSX.Element => {
  return (
    <div className={style.block}>
      <h2 className={style.title}>Детали ингредиента</h2>
      <img src={ingredient.image_large} alt={ingredient.name} className={style.image} />
      <h3 className={style.subtitle}>{ingredient.name}</h3>
      <div className={style.details}>
        <span className={style.ingredients}>Калории,ккал{ingredient.calories} </span>
        <span className={style.ingredients}>Белки, г{ingredient.proteins} </span>
        <span className={style.ingredients}>Жиры, г{ingredient.fat} </span>
        <span className={style.ingredients}>Углеводы, г{ingredient.carbohydrates}</span>
      </div>
    </div>
  );
};

export default BurgerIngredients;
