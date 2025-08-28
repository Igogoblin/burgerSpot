import {
  BurgerIcon,
  ListIcon,
  Logo,
  ProfileIcon,
} from '@krgaa/react-developer-burger-ui-components';
import { NavLink, Outlet, useLocation } from 'react-router';

import styles from './app-header.module.css';

export const AppHeader = (): React.JSX.Element => {
  const location = useLocation();
  const activeClass = 'text_color_inactive';

  return (
    <>
      <header className={styles.header}>
        <nav className={`${styles.menu} p-4`}>
          <div className={styles.menu_part_left}>
            {/* Тут должны быть ссылки, а не например кнопки или абзацы */}
            <NavLink to="/" className={`${styles.link} ${styles.link_active}`}>
              {/* <a href="/" className={`${styles.link} ${styles.link_active}`}> */}
              <BurgerIcon type="primary" />
              <p
                className={`text text_type_main-default ml-2 ${location.pathname === '/' ? '' : activeClass}`}
              >
                Конструктор
              </p>
              {/* </a> */}
            </NavLink>
            <a href="/feed" className={`${styles.link} ml-10`}>
              <ListIcon type="secondary" />
              <p
                className={`text text_type_main-default ml-2 ${location.pathname === '/feed' ? '' : activeClass}`}
              >
                Лента заказов
              </p>
            </a>
          </div>
          <div className={styles.logo}>
            <Logo />
          </div>
          <a href="/profile" className={`${styles.link} ${styles.link_position_last}`}>
            <ProfileIcon type="secondary" />
            <p
              className={`text text_type_main-default ml-2 ${location.pathname === '/profile' ? '' : activeClass}`}
            >
              Личный кабинет
            </p>
          </a>
        </nav>
      </header>
      <Outlet />
    </>
  );
};
