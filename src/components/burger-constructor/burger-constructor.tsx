import { Button } from '@krgaa/react-developer-burger-ui-components';
import { useState } from 'react';

import ModalIngredients from '../burger-ingredients/burger-ingredients';
import BurgerPrice from '../burger-price/burger-price';
import ConstructorItem from '../constructor-item/constructor-item';
import ModalOverlay from '../modal-overlay/modal-overlay';
import Modal from '../modal/modal';
import ModalOrder from '../modal/modal-order';

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

  const bun = ingredients.find((item) => item.type === 'bun');

  return (
    <section className={styles.burger_constructor}>
      <div className={`${styles.constructor_container}`}>
        {bun && (
          <ConstructorItem
            key={bun._id}
            ingredient={bun}
            onClick={handleOpen}
            type={'secondary'}
            className={`${styles.constructorItemTop}`}
          />
        )}
        <div className={styles.constructor}>
          {ingredients
            .filter((item) => item.type !== 'bun')
            .map((item) => (
              <ConstructorItem key={item._id} ingredient={item} onClick={handleOpen} />
            ))}
        </div>

        {bun && (
          <ConstructorItem
            key={`${bun._id}2`}
            ingredient={bun}
            onClick={handleOpen}
            type={'secondary'}
            className={`${styles.constructorItemBottom}`}
          />
        )}
      </div>
      <div className={styles.total}>
        <BurgerPrice price={ingredients.reduce((acc, item) => acc + item.price, 0)} />
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
