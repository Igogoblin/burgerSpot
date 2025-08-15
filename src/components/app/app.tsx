// import { BurgerConstructor } from '@/components/burger-constructor/burger-constructor';
// import { BurgerIngredients } from '@/components/ingredients-details/ingredients-details';
import { useAppDispatch, useAppSelector } from '@/hooks/hooks';
import { ForgotPassword } from '@/pages/forgot-password/forgot-password';
import { Home } from '@/pages/home/home';
import { Login } from '@/pages/login/login';
import { NotFound } from '@/pages/not-found/not-found';
import { Register } from '@/pages/registration/register';
import { fetchIngredients } from '@/services/ingredientsSlice';
import { useEffect } from 'react';
// import { DndProvider } from 'react-dnd';
// import { HTML5Backend } from 'react-dnd-html5-backend';
import { Route, Routes } from 'react-router';

import { AppHeader } from '@components/app-header/app-header';

import styles from './app.module.css';
export const App = (): React.JSX.Element => {
  const dispatch = useAppDispatch();
  const { isLoading, error } = useAppSelector((store) => store.ingredients);
  useEffect(() => {
    void dispatch(fetchIngredients());
  }, [dispatch]);

  if (error) {
    return <div>{error}</div>;
  }
  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.app}>
      <Routes>
        <Route path="/" element={<AppHeader />}>
          <Route index element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </div>
  );
};

export default App;
