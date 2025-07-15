import { Tab } from '@krgaa/react-developer-burger-ui-components';
import { useState } from 'react';

import ModalIngredients from '../burger-ingredients/burger-ingredients';
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
  const [ingredientOpen, setIngredientOpen] = useState(['bun']);
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
  const setIngredient = (value: string): void => {
    setIngredientOpen([value]);
  };
  const showTitle = (): string => {
    switch (ingredientOpen[0]) {
      case 'bun':
        return 'Булки';
      case 'main':
        return 'Начинки';
      case 'sauce':
        return 'Соусы';
      default:
        return '';
    }
  };
  return (
    <section className={styles.burger_ingredients}>
      <nav>
        <ul className={styles.menu}>
          <Tab
            value="bun"
            active={ingredientOpen[0] === 'bun'}
            onClick={() => {
              setIngredient('bun');
            }}
          >
            Булки
          </Tab>
          <Tab
            value="main"
            active={ingredientOpen[0] === 'main'}
            onClick={() => {
              setIngredient('main');
            }}
          >
            Начинки
          </Tab>
          <Tab
            value="sauce"
            active={ingredientOpen[0] === 'sauce'}
            onClick={() => {
              setIngredient('sauce');
            }}
          >
            Соусы
          </Tab>
        </ul>
      </nav>
      <div className={styles.ingredientsList}>
        <h2 className={styles.title}>{showTitle()}</h2>
        {ingredients
          .filter((item) => item.type === ingredientOpen[0])
          .map((item) => (
            <IngredientsItem key={item._id} ingredient={item} onClick={handleOpen} />
          ))}
      </div>
      {isOpen && selected && (
        <>
          <Modal onClose={handleClose}>
            <ModalIngredients ingredient={selected} />
          </Modal>
          <ModalOverlay onClose={handleClose} />
        </>
      )}
    </section>
  );
};
