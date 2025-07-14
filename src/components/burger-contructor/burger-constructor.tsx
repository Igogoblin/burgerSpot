import ConstructorItem from '../order-details/order-details';

import type { TIngredient } from '@utils/types';

import styles from './burger-constructor.module.css';

type TBurgerConstructorProps = {
  ingredients: TIngredient[];
};

export const BurgerConstructor = ({
  ingredients,
}: TBurgerConstructorProps): React.JSX.Element => {
  console.log(ingredients);

  return (
    <section className={styles.burger_constructor}>
      {ingredients.map((item) => (
        <ConstructorItem key={item._id} ingredient={item} />
      ))}
    </section>
  );
};
