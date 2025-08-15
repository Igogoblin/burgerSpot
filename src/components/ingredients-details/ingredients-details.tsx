import { setIngredientDetails, setType } from '@/services/ingredientsSlice';
import { Tab } from '@krgaa/react-developer-burger-ui-components';
import { useRef, useState } from 'react';

import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import ModalIngredients from '../burger-ingredients/burger-ingredients';
import IngredientsItem from '../ingredients-item/ingredients-item';
import ModalOverlay from '../modal-overlay/modal-overlay';
import Modal from '../modal/modal';

import type { TIngredient } from '@utils/types';

import styles from './ingredients-details.module.css';

export const IngredientsDetails = (): React.JSX.Element => {
  const dispatch = useAppDispatch();
  const { ingredients, type } = useAppSelector((store) => store.ingredients);
  const [ingredientOpen, setIngredientOpen] = useState<string[]>(['']);
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState<TIngredient | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const sectionRefs = useRef<Record<string, HTMLDivElement | null>>({
    bun: null,
    main: null,
    sauce: null,
  });

  const handleScroll = (): void => {
    if (!scrollRef.current) return;
    const containerTop = scrollRef.current.getBoundingClientRect().top;

    const visibleTypes = Object.entries(sectionRefs.current).map(([type, ref]) => {
      if (!ref) return { type, distance: Infinity };
      const rect = ref.getBoundingClientRect();
      const distance = Math.abs(rect.top - containerTop);
      return { type, distance };
    });
    visibleTypes.sort((a, b) => a.distance - b.distance);
    const closestType = visibleTypes[0]?.type;
    if (closestType && closestType !== ingredientOpen[0]) {
      setIngredientOpen([closestType]);
    }
  };
  const handleClose = (): void => {
    setIsOpen(false);
    setSelected(null);
  };

  const inputIngredientType = (value: string): void => {
    dispatch(setType([value]));
    setIngredientOpen([value]);
  };
  const choice = (ingredient: TIngredient): void => {
    dispatch(setIngredientDetails(ingredient));
    setSelected(ingredient);
    setIsOpen(true);
  };
  const showTitle = (str: string): string => {
    switch (str) {
      case 'bun':
        return 'Булки';
      case 'main':
        return 'Начинки';
      case 'sauce':
        return 'Соусы';
      default:
        return 'Булки';
    }
  };
  if (!Array.isArray(ingredients)) {
    return <div>Loading... </div>;
  }

  return (
    <section className={styles.burger_ingredients}>
      <nav>
        <ul className={styles.menu}>
          <Tab
            value="bun"
            active={ingredientOpen[0] === 'bun'}
            onClick={() => {
              inputIngredientType('bun');
            }}
          >
            Булки
          </Tab>
          <Tab
            value="main"
            active={ingredientOpen[0] === 'main'}
            onClick={() => {
              inputIngredientType('main');
            }}
          >
            Начинки
          </Tab>
          <Tab
            value="sauce"
            active={ingredientOpen[0] === 'sauce'}
            onClick={() => {
              inputIngredientType('sauce');
            }}
          >
            Соусы
          </Tab>
        </ul>
      </nav>
      <div className={styles.ingredientsList} ref={scrollRef} onScroll={handleScroll}>
        {type.map((type, index) => {
          return (
            <div
              className={`${styles.ingredients_type}`}
              key={index}
              ref={(el) => {
                sectionRefs.current[type] = el;
              }}
            >
              <h2 className={styles.title}>{showTitle(type)}</h2>
              {ingredients
                .filter((item) => item.type === type)
                .map((item) => {
                  return (
                    <IngredientsItem
                      key={item._id}
                      ingredient={item}
                      onClick={() => choice(item)}
                    />
                  );
                })}
            </div>
          );
        })}
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
