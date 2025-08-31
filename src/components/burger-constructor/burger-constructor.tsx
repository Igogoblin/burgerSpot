import {
  setListIngredient,
  setBun,
  replaceListIngredient,
  orderClear,
  setIngredientDetails,
} from '@/services/ingredientsSlice';
import { clearOrder, createOrder } from '@/services/orderSlice';
import { Button } from '@krgaa/react-developer-burger-ui-components';
import { nanoid } from 'nanoid';
import { useState } from 'react';
import { useDrop } from 'react-dnd';
import { useLocation, useNavigate } from 'react-router';

import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import ModalIngredients from '../burger-ingredients/burger-ingredients';
import BurgerPrice from '../burger-price/burger-price';
import ConstructorItem from '../constructor-item/constructor-item';
import ModalOverlay from '../modal-overlay/modal-overlay';
import Modal from '../modal/modal';
import ModalOrder from '../modal/modal-order';

import type { TIngredient } from '@utils/types';

import styles from './burger-constructor.module.css';

export const BurgerConstructor = (): React.JSX.Element => {
  const dispatch = useAppDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState<TIngredient | null>(null);
  const [isOrder, setIsOrdered] = useState(false);
  const { listIngredients, bun, ingredients, ingredient } = useAppSelector(
    (store) => store.ingredients
  );
  const user = useAppSelector((store) => store.auth.user);
  const orderNumber = useAppSelector((store) => store.order.number);
  const navigate = useNavigate();
  const location = useLocation();
  const [{ isDragging }, dropRef] = useDrop<
    TIngredient,
    unknown,
    { isDragging: boolean }
  >({
    accept: 'ingredient',
    drop(ingredient) {
      dispatch(setListIngredient([{ ...ingredient, uniqueId: nanoid() }]));
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

  function getIngredientObjects(
    selected: { name: string }[],
    allIngredients: TIngredient[]
  ): TIngredient[] {
    return selected
      .map((sel) => allIngredients.find((item) => item.name === sel.name) ?? null)
      .filter((item): item is TIngredient => item !== null);
  }
  const handleOpenOrder = async (): Promise<void> => {
    console.log('user is logged in:', user);
    if (!user.data) {
      void navigate('/login', { state: { from: location } });
      return;
    }

    if (!bun) {
      alert('Пожалуйста, выберите булку для вашего заказа!');
      return;
    }
    setIsOrdered(true);

    const selectedIngredients = getIngredientObjects(listIngredients, ingredients);

    const fullOrder = [bun, ...selectedIngredients, bun];
    const ingredientIds = (fullOrder as TIngredient[])
      .map((item) => item._id)
      .filter((id): id is string => typeof id === 'string');
    if (!ingredientIds.length) return;
    try {
      const result = await dispatch(createOrder(ingredientIds)).unwrap();
      console.log(`Заказ успешно создан! Номер заказа: ${result}`);
    } catch (error) {
      console.error('Ошибка при создании заказа:', error);
      alert('Не удалось создать заказ. Пожалуйста, попробуйте ещё раз.');
    }
  };
  const handleCloseOrder = (): void => {
    setIsOrdered(false);
    dispatch(orderClear());
    dispatch(clearOrder());
    dispatch(setIngredientDetails(ingredient));
    if (ingredient) {
      void navigate(`/ingredients/${ingredient._id}`, {
        state: { background: location },
      });
    }
  };

  const moveCard = (dragIndex: number, hoverIndex: number): void => {
    const dragCard = listIngredients.slice(1)[dragIndex];
    const bun = listIngredients.find((item) => item.type === 'bun');
    const newList = [...listIngredients.slice(1)];
    newList.splice(dragIndex, 1);
    newList.splice(hoverIndex, 0, dragCard);
    dispatch(replaceListIngredient(bun ? [bun, ...newList] : [...newList]));
  };

  const totalPrice =
    (listIngredients.find((item) => item.type === 'bun')?.price ?? 0) +
    listIngredients.reduce((acc, item) => acc + item.price, 0);

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
          <div className={`${styles.constructorItemTop}`}>Выберите булки</div>
        )}

        <div
          className={`${styles.constructor} ${!listIngredients.find((item) => item.type !== 'bun') ? styles.constructor_without_items : ''}`}
        >
          {listIngredients.find((item) => item.type !== 'bun') ? (
            listIngredients
              .filter((item) => item.type !== 'bun')
              .map((item, index) => (
                <ConstructorItem
                  key={item.uniqueId}
                  ingredient={item}
                  onClick={handleOpen}
                  moveCard={moveCard}
                  index={index}
                />
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
            moveCard={moveCard}
          />
        ) : (
          <div className={`${styles.constructorItemBottom}`}>Выберите булки</div>
        )}
      </div>
      <div className={styles.total}>
        <BurgerPrice price={totalPrice} />
        <Button
          htmlType="button"
          type="primary"
          size="medium"
          onClick={() => {
            void handleOpenOrder();
          }}
        >
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
            <ModalOrder numberOrder={orderNumber?.toString() ?? null} />
          </Modal>
          <ModalOverlay onClose={handleCloseOrder} />
        </>
      )}
    </section>
  );
};
