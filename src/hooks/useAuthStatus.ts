import { useAppSelector } from './hooks';

type TUserData = unknown;

export type TAuthStatusReturn = {
  user: TUserData;
  isAuthChecked: boolean;
  isLoading: boolean;
};

export const useAuthStatus = (): TAuthStatusReturn => {
  const authStore = useAppSelector((store) => store.auth);

  const user = authStore.user?.data ?? null;
  const isAuthChecked = authStore.user?.isAuthChecked ?? false;
  const isLoading = authStore.user?.isLoading ?? false;

  return { user, isAuthChecked, isLoading };
};
