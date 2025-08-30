import { useAppSelector } from '@/hooks/hooks';
import { Navigate, useLocation } from 'react-router-dom';

import type { ReactElement } from 'react';

// Защищенный маршрут для неавторизованных пользователей
export const ProtectedRouteElement = ({
  element,
}: {
  element: ReactElement;
}): ReactElement => {
  const { user } = useAppSelector((store) => store.auth);
  const { isAuthChecked, isLoading } = useAppSelector((store) => store.auth.user);
  const location = useLocation();

  // Если проверка авторизации ещё идет, не делаем ничего
  if (isLoading || !isAuthChecked) {
    return <p>Loading... </p>; // Или любой другой компонент-заглушка, например, лоадер
  }

  // Если пользователь не авторизован и пытается попасть на защищённый маршрут
  if (!user.data) {
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
  const { user } = useAppSelector((store) => store.auth);
  const location = useLocation();
  const from = (location.state as { from: string })?.from || '/';

  // Если пользователь авторизован, перенаправляем его на главную или предыдущую страницу
  if (user?.data) {
    const target = from && from !== location.pathname ? from : '/';
    return <Navigate to={target} replace />;
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
  const email = useAppSelector((store) => store.auth.forgot?.email ?? null);
  const location = useLocation();

  // Если не было запроса на восстановление пароля (нет email в сторе),
  // перенаправляем на страницу forgot-password
  if (!email) {
    return <Navigate to="/forgot-password" state={{ from: location }} />;
  }

  // Если запрос был, отображаем страницу сброса пароля
  return element;
};
