import { BurgerConstructor } from '@/components/burger-constructor/burger-constructor';
import { IngredientsDetails } from '@/components/ingredients-details/ingredients-details';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import styles from '../../components/app/app.module.css';

export const Home = (): React.JSX.Element => {
  return (
    <>
      <h1 className={`${styles.title} text text_type_main-large mt-10 mb-5 pl-5`}>
        Соберите бургер
      </h1>
      <main className={`${styles.main} pl-5 pr-5`}>
        <DndProvider backend={HTML5Backend}>
          <IngredientsDetails />
          <BurgerConstructor />
        </DndProvider>
      </main>
    </>
  );
};
