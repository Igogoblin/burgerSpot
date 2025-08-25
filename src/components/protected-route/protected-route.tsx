import { useAppSelector } from '@/hooks/hooks';
import { Navigate, useLocation } from 'react-router-dom';

import type { ReactElement } from 'react';

// Защищенный маршрут для неавторизованных пользователей
export const ProtectedRouteElement = ({
  element,
}: {
  element: ReactElement;
}): ReactElement => {
  const { isAuthChecked, data } = useAppSelector((store) => store.auth.user);
  const location = useLocation();

  // Пока не проверили статус авторизации, не делаем ничего
  if (!isAuthChecked) {
    return <></>; // Или любой другой компонент-заглушка, например, лоадер
  }

  // Если пользователь не авторизован и пытается попасть на защищённый маршрут
  if (!data) {
    // Перенаправляем на страницу входа и сохраняем исходный маршрут в состоянии
    return <Navigate to="/login" state={{ from: location }} />;
  }

  // Если пользователь авторизован, отображаем запрошенный компонент
  return element;
};

// Защищенный маршрут для авторизованных пользователей (редирект на главную)
export const UnprotectedRouteElement = ({
  element,
}: {
  element: ReactElement;
}): ReactElement => {
  const { data } = useAppSelector((store) => store.auth.user);
  const location = useLocation();
  const from = (location.state as { from: string })?.from || '/';

  // Если пользователь авторизован, перенаправляем его на главную или предыдущую страницу
  if (data) {
    return <Navigate to={from} />;
  }

  // Если пользователь не авторизован, отображаем запрошенный компонент
  return element;
};

// Защищенный маршрут для сброса пароля (требует предварительного запроса)
export const ResetPasswordProtectedRoute = ({
  element,
}: {
  element: ReactElement;
}): ReactElement => {
  const { email } = useAppSelector((store) => store.auth.forgot);
  const location = useLocation();

  // Если не было запроса на восстановление пароля (нет email в сторе),
  // перенаправляем на страницу forgot-password
  if (!email) {
    return <Navigate to="/forgot-password" state={{ from: location }} />;
  }

  // Если запрос был, отображаем страницу сброса пароля
  return element;
};
