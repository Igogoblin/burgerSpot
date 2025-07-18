import BurgerPrice from '@/components/burger-price/burger-price';
import {
  DeleteIcon,
  DragIcon,
  LockIcon,
} from '@krgaa/react-developer-burger-ui-components';

import type { TIngredientsItemProps } from '../ingredients-item/ingredients-item';

import style from './constructor-item.module.css';

const ConstructorItem = ({
  ingredient,
  type = 'primary',
  className,
  onClick,
}: TIngredientsItemProps): React.JSX.Element => {
  return (
    <div className={style.block} onClick={() => onClick(ingredient)}>
      <DragIcon
        type="primary"
        className={`${style.constructorPanel} ${type === 'secondary' && style.constructorPanelLock}`}
      />
      <div className={`${style.constructorDescription} ${className}`}>
        <div className={style.constructorVisual}>
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
            <DeleteIcon type="primary" className={`${style.constructorDelete}`} />
          )}
        </div>
      </div>
    </div>
  );
};

export default ConstructorItem;
