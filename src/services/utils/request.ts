import { API_URL } from '../constants/constants';
import { checkResponse } from './checkResponse';

export function request<T>(endpoint: string, options?: RequestInit): Promise<T> {
  return fetch(`${API_URL}${endpoint}`, options)
    .then(checkResponse)
    .then((res) => (res as { data: T }).data);
}
