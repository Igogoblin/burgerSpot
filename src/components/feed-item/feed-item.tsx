import BurgerPrice from '../burger-price/burger-price';

import style from './feed-item.module.css';

export const FeedItem = (): React.JSX.Element => {
  return (
    <div className={style.feed_item}>
      <div className={style.feed_header}>
        <p className="text text_type_digits-default">#034535</p>
        <p className="text text_type_main-default text_color_inactive">
          сегодня в 10:00
        </p>
      </div>
      <p className="text text_type_main-medium">Death Star Starship Main бургер</p>
      <div className={style.feed_footer}>
        0000000
        <BurgerPrice price={123} isCenter={false} />
      </div>
    </div>
  );
};
