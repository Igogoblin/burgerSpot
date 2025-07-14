import { CurrencyIcon } from '@krgaa/react-developer-burger-ui-components';

import style from './burger-price.module.css';
type TPrice = {
  price: number;
  isCenter?: boolean;
};

const BurgerPrice = ({ price, isCenter = true }: TPrice): React.JSX.Element => {
  return (
    <div className={`${style.priceBlock} ${!isCenter ? style.priceEnd : ''}`}>
      <span className={style.priceText}>{price}</span>
      <CurrencyIcon type="primary" />
    </div>
  );
};
export default BurgerPrice;
