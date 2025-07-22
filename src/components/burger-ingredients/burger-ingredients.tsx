import type { TIngredient } from '@/utils/types';

import style from './burger-ingredients.module.css';

const ModalIngredients = ({
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
        <div className={style.ingredients}>
          <p>Калории,ккал</p>
          {ingredient.calories}{' '}
        </div>
        <div className={style.ingredients}>
          <p>Белки, г</p>
          {ingredient.proteins}{' '}
        </div>
        <div className={style.ingredients}>
          <p>Жиры, г</p>
          {ingredient.fat}{' '}
        </div>
        <div className={style.ingredients}>
          <p>Углеводы, г</p>
          {ingredient.carbohydrates}
        </div>
      </div>
    </div>
  );
};

export default ModalIngredients;
