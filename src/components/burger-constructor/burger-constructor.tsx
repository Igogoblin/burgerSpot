import { setListIngredient, setBun } from '@/services/ingredientsSlice';
import { Button } from '@krgaa/react-developer-burger-ui-components';
import { useState } from 'react';
import { useDrop } from 'react-dnd';
import { useDispatch, useSelector } from 'react-redux';

import ModalIngredients from '../burger-ingredients/burger-ingredients';
import BurgerPrice from '../burger-price/burger-price';
import ConstructorItem from '../constructor-item/constructor-item';
import ModalOverlay from '../modal-overlay/modal-overlay';
import Modal from '../modal/modal';
import ModalOrder from '../modal/modal-order';

import type { RootState } from '@/services/store';
import type { TIngredient } from '@utils/types';

import styles from './burger-constructor.module.css';

// type TBurgerConstructorProps = {
//   ingredients: TIngredient[];
// };

export const BurgerConstructor = (): React.JSX.Element => {
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState<TIngredient | null>(null);
  const [isOrder, setIsOrdered] = useState(false);
  const { listIngredients, bun } = useSelector((store: RootState) => store.ingredients);
  const [{ isDragging }, dropRef] = useDrop<
    TIngredient,
    unknown,
    { isDragging: boolean }
  >({
    accept: 'ingredient',
    drop(ingredient) {
      console.log('Dropped ingredient:', ingredient);
      dispatch(setListIngredient([ingredient]));
      dispatch(setBun(false));
    },
    collect: (monitor) => ({
      isDragging: monitor.isOver(),
    }),
  });

  const handleClose = (): void => {
    setIsOpen(false);
    setSelected(null);
  };
  const handleOpen = (ingredient: TIngredient): void => {
    setIsOpen(true);
    setSelected(ingredient);
  };
  const handleOpenOrder = (): void => {
    setIsOrdered(true);
  };
  const handleCloseOrder = (): void => {
    setIsOrdered(false);
  };

  // const bun = ingredients.find((item) => item.type === 'bun');

  return (
    <section className={styles.burger_constructor}>
      <div
        className={`${styles.constructor_container} ${isDragging && styles.constructor_container_dragging}`}
        ref={dropRef as unknown as React.Ref<HTMLDivElement>}
      >
        {bun ? (
          <ConstructorItem
            key={`bun1`}
            ingredient={listIngredients.find((item) => item.type === 'bun')!}
            onClick={handleOpen}
            type={'secondary'}
            className={`${styles.constructorItemTop}`}
          />
        ) : (
          <div className={styles.constructorItemTop}>Выберите булки</div>
        )}

        <div
          className={`${styles.constructor} ${!listIngredients.find((item) => item.type !== 'bun') ? styles.constructor_without_items : ''}`}
        >
          {listIngredients.length > 0 ? (
            listIngredients
              .filter((item) => item.type !== 'bun')
              .map((item) => (
                <ConstructorItem key={item._id} ingredient={item} onClick={handleOpen} />
              ))
          ) : (
            <div className={`${styles.constructor_without_items}`}>Выберите начинку</div>
          )}
        </div>
        {bun ? (
          <ConstructorItem
            key={`bun2`}
            ingredient={listIngredients.find((item) => item.type === 'bun')!}
            onClick={handleOpen}
            type={'secondary'}
            className={`${styles.constructorItemBottom}`}
          />
        ) : (
          <div className={`${styles.constructorItemBottom}`}>Выберите булки</div>
        )}
      </div>
      <div className={styles.total}>
        <BurgerPrice
          price={listIngredients.reduce((acc, item) => acc + item.price, 0) ?? 0}
        />
        <Button htmlType="button" type="primary" size="medium" onClick={handleOpenOrder}>
          Оформить заказ
        </Button>
      </div>
      {isOpen && selected && (
        <>
          <Modal onClose={handleClose}>
            <ModalIngredients ingredient={selected} />
          </Modal>
          <ModalOverlay onClose={handleClose} />
        </>
      )}
      {isOrder && (
        <>
          <Modal onClose={handleCloseOrder}>
            <ModalOrder />
          </Modal>
          <ModalOverlay onClose={handleCloseOrder} />
        </>
      )}
    </section>
  );
};
