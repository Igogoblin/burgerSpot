import { BurgerIngredients } from '@/components/ingredients-details/ingredients-details';
import { useEffect, useState } from 'react';

import { AppHeader } from '@components/app-header/app-header';
import { BurgerConstructor } from '@components/burger-contructor/burger-constructor';

import type { TIngredient } from '@/utils/types';

import styles from './app.module.css';

export const App = (): React.JSX.Element => {
  const [ingredients, setIngredients] = useState<TIngredient[]>([]);
  useEffect((): void => {
    const fetchIngredients = async (): Promise<void> => {
      try {
        const ingredient = await fetch(
          'https://norma.nomoreparties.space/api/ingredients'
        );
        const result = (await ingredient.json()) as { data: TIngredient[] };
        console.log(result.data);
        setIngredients(result.data);
      } catch (error) {
        console.error('Failed to fetch ingredients:', error);
      }
    };
    void fetchIngredients();
  }, []);

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
