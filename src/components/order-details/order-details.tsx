import BurgerPrice from '@/components/burger-price/burger-price';
import { DeleteIcon, DragIcon } from '@krgaa/react-developer-burger-ui-components';

// import type { TIngredient } from '@utils/types';
import type { TIngredientsItemProps } from '../ingredients-item/ingredients-item';

import style from './order-details.module.css';

const ConstructorItem = ({
  ingredient,
  onClick,
}: TIngredientsItemProps): React.JSX.Element => {
  return (
    <div className={style.block} onClick={() => onClick(ingredient)}>
      <DragIcon type="primary" className={style.constructorPanel} />
      <div className={style.constructorDescription}>
        <div className={style.constructorVisual}>
          <img src={ingredient.image_mobile} alt="Ingredient" className={style.image} />
          <div className={style.text}>{ingredient.name}</div>
        </div>
        <div className={style.constructorPrice}>
          <BurgerPrice price={ingredient.price} isCenter={false} />
          <DeleteIcon type="primary" className={style.constructorDelete} />
        </div>
      </div>
    </div>
  );
};

export default ConstructorItem;
