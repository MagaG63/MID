// shared/lib/authInit.ts
import { store } from '@/app/store/store';
import axiosInstance from '@/shared/api/axiosInstance';
import { loginUserThunk } from '@/entities/user/model/user.thunk';
import { loginTrainerThunk } from '@/entities/trainer/model/trainer.thunk';

/**
 * Функция для проверки авторизации при загрузке приложения
 * Может быть вызвана в main.tsx или в компоненте верхнего уровня
 */
export const checkAuthOnLoad = async () => {
  try {
    console.log('🔄 checkAuthOnLoad: Проверяем авторизацию...');
    
    // Пытаемся обновить токен через refresh
    const response = await axiosInstance.post('/api/auth/refresh');

    if (response.data.user) {
      const userData = response.data.user;
      console.log('✅ checkAuthOnLoad: Найден пользователь', userData.role, userData);

      // В зависимости от роли диспатчим соответствующий thunk
      if (userData.role === 'user') {
        store.dispatch(
          loginUserThunk.fulfilled(userData, '', {
            email: userData.email,
            password: '',
            role: 'user',
          }),
        );
        console.log('✅ User восстановлен в store');
      } else if (userData.role === 'trainer') {
        // ✅ ИСПРАВЛЕНИЕ: Правильные параметры для trainer thunk
        store.dispatch(
          loginTrainerThunk.fulfilled(userData, '', {
            email: userData.email,
            password: '',
          }),
        );
        console.log('✅ Trainer восстановлен в store');
      }

      return userData;
    } else {
      console.log('❌ checkAuthOnLoad: Пользователь не найден в ответе');
      return null;
    }
  } catch (error: any) {
    console.log('❌ checkAuthOnLoad: No valid refresh token or auth failed:', error.response?.status, error.message);
    return null;
  }
};

/**
 * Альтернативный подход - инициализация через хуки
 * (но эта функция работает вне контекста React)
 */
export const initAuth = () => {
  console.log('🚀 Auth initialization started...');

  // Возвращаем промис для асинхронной инициализации
  return checkAuthOnLoad();
};
