import { BurgerConstructor } from '@/components/burger-constructor/burger-constructor';
import { BurgerIngredients } from '@/components/ingredients-details/ingredients-details';
import { useEffect, useState } from 'react';

import { AppHeader } from '@components/app-header/app-header';

import type { TIngredient } from '@/utils/types';

import styles from './app.module.css';

export const App = (): React.JSX.Element => {
  const [ingredients, setIngredients] = useState<TIngredient[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  useEffect((): void => {
    const fetchIngredients = async (): Promise<void> => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await fetch(
          'https://norma.nomoreparties.space/api/ingredients'
        );
        const result = (await response.json()) as { data: TIngredient[] };
        if (!response.ok) {
          const errorMessage =
            typeof result === 'object' && result !== null && 'message' in result
              ? (result as { message: string }).message
              : `Ошибка ${response.status}`;
          throw new Error(errorMessage);
        }

        if (!('data' in result) || !Array.isArray(result.data)) {
          throw new Error('Invalid data format');
        }
        setIngredients(result.data);
      } catch (error) {
        if (error instanceof Error) setError(error.message);
        console.error('Failed to fetch ingredients:', error);
      } finally {
        setIsLoading(false);
      }
    };
    void fetchIngredients();
  }, []);

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
