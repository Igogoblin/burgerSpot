import { useAppSelector } from '@/hooks/hooks';
import { Navigate, useLocation } from 'react-router-dom';
import { ClipLoader } from 'react-spinners';

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
    return (
      <ClipLoader
        color="#4c4cff"
        size={150}
        aria-label="Загрузка Spinner"
        cssOverride={{ margin: 'auto auto' }}
      />
    );
  }

  // Если пользователь не авторизован и пытается попасть на защищённый маршрут
  if (!user.data) {
    // Перенаправляем на страницу входа и сохраняем исходный маршрут в состоянии
    return <Navigate to="/login" state={{ from: location }} replace />;
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
  const { isAuthChecked, isLoading } = useAppSelector((store) => store.auth.user);
  const from = (location.state as { from: string })?.from || '/';

  // Пока идёт проверка авторизации — показываем спиннер
  if (isLoading || !isAuthChecked) {
    return (
      <ClipLoader
        color="#4c4cff"
        size={100}
        aria-label="Загрузка Spinner"
        cssOverride={{ margin: 'auto auto' }}
      />
    );
  }
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
  // const location = useLocation();

  // Если не было запроса на восстановление пароля (нет email в store),
  // перенаправляем на страницу forgot-password
  if (!email) {
    return <Navigate to="/forgot-password" replace />;
  }

  // Если запрос был, отображаем страницу сброса пароля
  return element;
};
