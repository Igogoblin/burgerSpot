import { Tab } from '@krgaa/react-developer-burger-ui-components';
import { useState } from 'react';

import ModalDetails from '../burger-ingredients/burger-ingredients';
import IngredientsItem from '../ingredients-item/ingredients-item';
import ModalOverlay from '../modal-overlay/modal-overlay';
import Modal from '../modal/modal';

import type { TIngredient } from '@utils/types';

import styles from './ingredients-details.module.css';

type TBurgerIngredientsProps = {
  ingredients: TIngredient[];
};

export const BurgerIngredients = ({
  ingredients,
}: TBurgerIngredientsProps): React.JSX.Element => {
  // console.log(ingredients);

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

  return (
    <section className={styles.burger_ingredients}>
      <nav>
        <ul className={styles.menu}>
          <Tab
            value="bun"
            active={true}
            onClick={() => {
              /* TODO */
            }}
          >
            Булки
          </Tab>
          <Tab
            value="main"
            active={false}
            onClick={() => {
              /* TODO */
            }}
          >
            Начинки
          </Tab>
          <Tab
            value="sauce"
            active={false}
            onClick={() => {
              /* TODO */
            }}
          >
            Соусы
          </Tab>
        </ul>
      </nav>
      <div className={styles.ingredientsList}>
        {ingredients.map((item) => (
          <IngredientsItem key={item._id} ingredient={item} onClick={handleOpen} />
        ))}
      </div>
      {isOpen && selected && (
        <>
          <Modal onClose={handleClose}>
            <ModalDetails ingredient={selected} />
          </Modal>
          <ModalOverlay onClose={handleClose} />
        </>
      )}
    </section>
  );
};
