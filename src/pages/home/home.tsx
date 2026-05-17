import { BurgerConstructor } from '@/components/burger-constructor/burger-constructor';
import { IngredientsDetails } from '@/components/ingredients-details/ingredients-details';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import styles from './home.module.css';

export const Home = (): React.JSX.Element => {
  return (
    <main className={styles.main}>
      <h1 className={`text_type_main-large pl-5 ${styles.title}`}>Соберите бургер</h1>
      <div className={styles.container}>
        <DndProvider backend={HTML5Backend}>
          <IngredientsDetails />
          <BurgerConstructor />
        </DndProvider>
      </div>
    </main>
  );
};
