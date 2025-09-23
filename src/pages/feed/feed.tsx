import { FeedItem } from '@/components/feed-item/feed-item';
import { ScrollContainer } from '@/components/scroll/scroll-container';
import { Stats } from '@/components/stats/stats';

import style from './feed.module.css';
export const Feed = (): React.JSX.Element => {
  return (
    <section className={style.feed}>
      <p className="text text_type_main-large">Лента заказов</p>
      <div className={`${style.feed_container}`}>
        <ScrollContainer>
          <FeedItem />
          <FeedItem />
        </ScrollContainer>
        <Stats />
      </div>
    </section>
  );
};
