// shared/api/axiosInstance.ts - ИСПРАВЛЕННАЯ ВЕРСИЯ
import axios, { type AxiosError, type InternalAxiosRequestConfig } from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:3000', // ✅ Явно укажите базовый URL
  withCredentials: true,
  timeout: 30000, // Увеличьте таймаут для файлов
});

let accessToken = '';

// Функция для сохранения токена
export function setAccessToken(token: string): void {
  accessToken = token;
}

// Интерцептор запросов
axiosInstance.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  // Для FormData не устанавливаем Content-Type - браузер сам сделает
  if (config.data instanceof FormData) {
    delete config.headers['Content-Type'];
  } else if (!config.headers['Content-Type']) {
    config.headers['Content-Type'] = 'application/json';
  }

  // Добавляем токен если есть
  if (accessToken && config.headers) {
    config.headers.Authorization = `Bearer ${accessToken}`;
    console.log('🔑 Token added to request:', config.url);
  } else {
    console.warn('⚠️ No token for request:', config.url);
  }

  return config;
});

// Интерцептор ответов (можно временно убрать для теста)
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    console.error('Axios error:', {
      status: error.response?.status,
      data: error.response?.data,
      config: error.config?.url,
    });
    return Promise.reject(error);
  },
);

export default axiosInstance;
