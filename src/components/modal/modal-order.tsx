import { CheckMarkIcon } from '@krgaa/react-developer-burger-ui-components';

import orderConfirm from '../../images/orderConfirm.svg';

import style from './modal.module.css';

type TModalOrderProps = {
  numberOrder: string | null;
};

const ModalOrder = ({ numberOrder }: TModalOrderProps): React.JSX.Element => {
  return (
    <div className={style.modalOrder} data-cy="modal">
      <h2 className={style.title} data-cy="order-id">
        {numberOrder}
      </h2>
      <p className={style.order} data-cy="order-status-text">
        идентификатор заказа
      </p>

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
