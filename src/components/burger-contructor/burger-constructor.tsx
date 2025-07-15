import { useState } from 'react';

import ModalIngredients from '../burger-ingredients/burger-ingredients';
import BurgerPrice from '../burger-price/burger-price';
import ModalOverlay from '../modal-overlay/modal-overlay';
import Modal from '../modal/modal';
import ModalOrder from '../modal/modal-order';
import ConstructorItem from '../order-details/order-details';

import type { TIngredient } from '@utils/types';

import styles from './burger-constructor.module.css';

type TBurgerConstructorProps = {
  ingredients: TIngredient[];
};

export const BurgerConstructor = ({
  ingredients,
}: TBurgerConstructorProps): React.JSX.Element => {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState<TIngredient | null>(null);
  const [isOrder, setIsOrdered] = useState(false);
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

  return (
    <section className={styles.burger_constructor}>
      <div className={styles.constructor}>
        {ingredients.map((item) => (
          <ConstructorItem key={item._id} ingredient={item} onClick={handleOpen} />
        ))}
      </div>
      <div>
        <BurgerPrice price={ingredients.reduce((acc, item) => acc + item.price, 0)} />
        <button onClick={handleOpenOrder}>Оформить заказ</button>
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
