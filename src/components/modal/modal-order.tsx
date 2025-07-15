import { CheckMarkIcon } from '@krgaa/react-developer-burger-ui-components';

import orderConfirm from '../../images/orderConfirm.svg';

import type { TIngredient } from '@/utils/types';

import style from './modal.module.css';

const ModalOrder = ({ ingredient }: { ingredient: TIngredient }): React.JSX.Element => {
  console.log(ingredient);
  return (
    <div className={style.modalOrder}>
      <h2 className={style.title}>034536</h2>
      <p className={style.order}>идентификатор заказа</p>

      <div className={style.image}>
        <img src={orderConfirm} alt="Order Confirm" className={style.imageConfirm} />
        <CheckMarkIcon type="primary" className={style.icon} />
      </div>

      <p className={style.orderStart}>Ваш заказ начали готовить</p>
      <p className={style.text}>Дождитесь готовности на орбитальной станции</p>
    </div>
  );
};
export default ModalOrder;
