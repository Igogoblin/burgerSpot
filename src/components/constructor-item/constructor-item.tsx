import BurgerPrice from '@/components/burger-price/burger-price';
import { useAppDispatch } from '@/hooks/hooks';
import { setDecrementIngredient } from '@/services/ingredientsSlice';
import {
  DeleteIcon,
  DragIcon,
  LockIcon,
} from '@krgaa/react-developer-burger-ui-components';
import { useRef } from 'react';
import { useDrag, useDrop } from 'react-dnd';

import type { TIngredientsItemProps } from '../ingredients-item/ingredients-item';

import style from './constructor-item.module.css';

type IDragItem = {
  uniqueId: string;
  index: number;
};

const ConstructorItem = ({
  ingredient,
  index,
  type = 'primary',
  className,
  onClick,
  moveCard,
}: TIngredientsItemProps): React.JSX.Element => {
  const dispatch = useAppDispatch();
  const ref = useRef<HTMLDivElement | null>(null);
  const removeIngredient = (uniqueId: string): void => {
    if (!uniqueId) return;
    dispatch(setDecrementIngredient({ uniqueId }));
  };

  const [, drag] = useDrag<IDragItem>({
    type: 'card',
    item: () => ({ uniqueId: ingredient.uniqueId ?? ' ', index: Number(index) }),
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });
  const [, drop] = useDrop<IDragItem>({
    accept: 'card',
    hover: (item, monitor) => {
      if (!ref.current || typeof index !== 'number' || typeof moveCard !== 'function') {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;
      if (dragIndex === hoverIndex) {
        return;
      }
      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      if (!clientOffset) {
        return;
      }
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }
      moveCard(dragIndex, hoverIndex);
      item.index = hoverIndex;
    },
  });
  drag(drop(ref));

  return (
    <div className={style.block} ref={ref as unknown as React.Ref<HTMLDivElement>}>
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
              onClick={() =>
                ingredient.uniqueId && removeIngredient(ingredient.uniqueId)
              }
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default ConstructorItem;
