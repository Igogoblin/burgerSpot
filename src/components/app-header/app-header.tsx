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
              <BurgerIcon type="primary" />
              <p
                className={`text text_type_main-default ml-2 ${location.pathname === '/' ? '' : activeClass}`}
              >
                Конструктор
              </p>
              {/* </a> */}
            </NavLink>
            <NavLink to="/feed" className={`${styles.link} ml-10`}>
              <ListIcon type="secondary" />
              <p
                className={`text text_type_main-default ml-2 ${location.pathname === '/feed' ? '' : activeClass}`}
              >
                Лента заказов
              </p>
            </NavLink>
          </div>
          <div className={styles.logo}>
            <NavLink to="/">
              <Logo />
            </NavLink>
          </div>
          <NavLink
            to="/profile"
            className={`${styles.link} ${styles.link_position_last}`}
          >
            <ProfileIcon type="secondary" />
            <p
              className={`text text_type_main-default ml-2 ${location.pathname === '/profile' ? '' : activeClass}`}
              data-cy="login-button"
            >
              Личный кабинет
            </p>
          </NavLink>
        </nav>
      </header>
      <Outlet />
    </>
  );
};
