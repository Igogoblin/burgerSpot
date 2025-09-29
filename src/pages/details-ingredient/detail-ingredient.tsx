import { useAppDispatch, useAppSelector } from '@/hooks/hooks';
import { fetchIngredients } from '@/services/ingredientsSlice';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router';

import type { TIngredient } from '@/utils/types';

import style from '../../components/burger-ingredients/burger-ingredients.module.css';

export const DetailsIngredient = (): React.JSX.Element => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const { ingredients, isLoading } = useAppSelector((store) => store.ingredients);
  const [currentIngredient, setIngredient] = useState<TIngredient | null>(null);
  // console.log(ingredients);
  useEffect(() => {
    if (ingredients.length === 0) {
      void dispatch(fetchIngredients());
    }
  }, [dispatch, ingredients.length]);

  useEffect(() => {
    const foundIngredient = ingredients.find((item) => item._id === id);
    if (foundIngredient) {
      setIngredient(foundIngredient);
    }
  }, [ingredients, id]);

  if (isLoading) {
    return (
      <div className="text text_type_main-large mt-10">
        <p>Loading...</p>
      </div>
    );
  }
  if (!currentIngredient) {
    return (
      <div className="text text_type_main-large mt-10">
        <p>ингредиента не найдено</p>
      </div>
    );
  }
  return (
    <div className={`${style.container}`}>
      <h2 className={style.title}>Детали ингредиента</h2>
      <img
        src={currentIngredient.image_large}
        alt={currentIngredient.name}
        className={style.image}
      />
      <h3 className={style.subtitle}>{currentIngredient.name}</h3>
      <div className={style.details}>
        <div className={style.ingredients}>
          <p>Калории,ккал</p>
          {currentIngredient.calories}{' '}
        </div>
        <div className={style.ingredients}>
          <p>Белки, г</p>
          {currentIngredient.proteins}{' '}
        </div>
        <div className={style.ingredients}>
          <p>Жиры, г</p>
          {currentIngredient.fat}{' '}
        </div>
        <div className={style.ingredients}>
          <p>Углеводы, г</p>
          {currentIngredient.carbohydrates}
        </div>
      </div>
    </div>
  );
};
