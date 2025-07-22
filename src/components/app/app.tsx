import { BurgerConstructor } from '@/components/burger-constructor/burger-constructor';
import { BurgerIngredients } from '@/components/ingredients-details/ingredients-details';
import { fetchIngredients } from '@/services/ingredientsSlice';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { AppHeader } from '@components/app-header/app-header';

import type { AppDispatch, RootState } from '@/services/store';

import styles from './app.module.css';
export const App = (): React.JSX.Element => {
  const dispatch = useDispatch<AppDispatch>();
  const { ingredients, isLoading, error } = useSelector(
    (store: RootState) => store.ingredients
  );
  // const test = useSelector((store: RootState) => store.ingredients.test);
  useEffect(() => {
    void dispatch(fetchIngredients());
  }, [dispatch]);
  console.log('Ingredients from Redux:', ingredients);
  // console.log('this is test ingredients', test);

  if (error) {
    return <div>{error}</div>;
  }
  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.app}>
      <AppHeader />
      <h1 className={`${styles.title} text text_type_main-large mt-10 mb-5 pl-5`}>
        Соберите бургер
      </h1>
      <main className={`${styles.main} pl-5 pr-5`}>
        <BurgerIngredients ingredients={ingredients} />
        <BurgerConstructor ingredients={ingredients} />
      </main>
    </div>
  );
};

export default App;
