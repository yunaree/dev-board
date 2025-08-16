import { refresh } from '@/services/auth/auth.api';
import { useAuthStore } from '@/store/auth.store';
import axios from 'axios';

export const api = axios.create({
    baseURL: 'https://dev-board.onrender.com',
    withCredentials: true,
}); 

// додаємо accessToken у всі запити
api.interceptors.request.use((config) => {
  const token = useAuthStore.getState().tokens?.access_token;

  if (token) {
    if (!config.headers) {
      config.headers = {};
    }
    (config.headers as Record<string, string>).Authorization = `Bearer ${token}`;
  }

  return config;
});


// якщо accessToken протух — пробуємо оновити
let isRefreshing = false;
let failedQueue: any[] = [];

const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach(prom => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });

  failedQueue = [];
};

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // якщо 401 і ще не пробували рефреш
    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        }).then((token) => {
          originalRequest.headers.Authorization = `Bearer ${token}`;
          return api(originalRequest);
        });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const newTokens = await refresh({
            refreshToken: useAuthStore.getState().tokens?.refresh_token!,
        });
        useAuthStore.getState().setTokens(newTokens);

        api.defaults.headers.common.Authorization = `Bearer ${newTokens.access_token}`;
        processQueue(null, newTokens.access_token);

        return api(originalRequest);
      } catch (err) {
        processQueue(err, null);
        useAuthStore.getState().logout(); 
        return Promise.reject(err);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);