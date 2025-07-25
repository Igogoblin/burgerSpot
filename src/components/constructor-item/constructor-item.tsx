import BurgerPrice from '@/components/burger-price/burger-price';
import { setDecrimentIngredient } from '@/services/ingredientsSlice';
import {
  DeleteIcon,
  DragIcon,
  LockIcon,
} from '@krgaa/react-developer-burger-ui-components';
import { useDispatch } from 'react-redux';

import type { TIngredientsItemProps } from '../ingredients-item/ingredients-item';

import style from './constructor-item.module.css';

const ConstructorItem = ({
  ingredient,
  type = 'primary',
  className,
  onClick,
}: TIngredientsItemProps): React.JSX.Element => {
  const dispatch = useDispatch();
  const delleteIngredient = (index: string): void => {
    dispatch(setDecrimentIngredient({ _id: index }));
  };

  return (
    <div className={style.block}>
      <DragIcon
        type="primary"
        className={`${style.constructorPanel} ${type === 'secondary' && style.constructorPanelLock}`}
      />
      <div className={`${style.constructorDescription} ${className}`}>
        <div className={style.constructorVisual} onClick={() => onClick(ingredient)}>
          <img src={ingredient.image_mobile} alt="Ingredient" className={style.image} />
          <div
            className={`${style.text}  ${className}`}
          >{`${ingredient.name} ${className?.includes('constructorItemTop') ? '(верх)' : ''} ${className?.includes('constructorItemBottom') ? '(низ)' : ''}`}</div>
        </div>
        <div className={`${style.constructorPrice}`}>
          <BurgerPrice price={ingredient.price} isCenter={false} />
          {type === 'secondary' ? (
            <LockIcon type="secondary" />
          ) : (
            <DeleteIcon
              type="primary"
              className={`${style.constructorDelete}`}
              onClick={() => delleteIngredient(ingredient._id)}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default ConstructorItem;
