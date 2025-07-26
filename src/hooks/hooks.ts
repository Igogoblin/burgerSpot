import { useDispatch, useSelector } from 'react-redux';

import type { RootState, AppDispatch } from '../services/store';

export const useAppDispatch = (): AppDispatch => {
  const dispatch = useDispatch<AppDispatch>();
  return dispatch;
};
export const useAppSelector = <TSelected>(
  selector: (state: RootState) => TSelected
): TSelected => {
  return useSelector(selector);
};
