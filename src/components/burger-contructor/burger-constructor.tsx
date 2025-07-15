import { useState } from 'react';

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

  const handleClose = (): void => {
    setIsOpen(false);
    setSelected(null);
  };
  const handleOpen = (ingredient: TIngredient): void => {
    setIsOpen(true);
    setSelected(ingredient);
  };

  console.log(ingredients);

  return (
    <section className={styles.burger_constructor}>
      {ingredients.map((item) => (
        <ConstructorItem key={item._id} ingredient={item} onClick={handleOpen} />
      ))}
      {isOpen && selected && (
        <>
          <Modal onClose={handleClose}>
            <ModalOrder ingredient={selected} />
          </Modal>
          <ModalOverlay onClose={handleClose} />
        </>
      )}
    </section>
  );
};
