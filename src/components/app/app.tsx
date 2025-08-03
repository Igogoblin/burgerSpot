import { BurgerConstructor } from '@/components/burger-constructor/burger-constructor';
import { BurgerIngredients } from '@/components/ingredients-details/ingredients-details';
import { useAppDispatch, useAppSelector } from '@/hooks/hooks';
import { fetchIngredients } from '@/services/ingredientsSlice';
import { useEffect } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import { AppHeader } from '@components/app-header/app-header';

import styles from './app.module.css';
export const App = (): React.JSX.Element => {
  const dispatch = useAppDispatch();
  const { isLoading, error } = useAppSelector((store) => store.ingredients);
  useEffect(() => {
    void dispatch(fetchIngredients());
  }, [dispatch]);

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
        <DndProvider backend={HTML5Backend}>
          <BurgerIngredients />
          <BurgerConstructor />
        </DndProvider>
      </main>
    </div>
  );
};

export default App;
