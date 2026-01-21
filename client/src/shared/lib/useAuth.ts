// shared/lib/useAuth.ts
import { useAppSelector } from './hooks';
import { useEffect, useState } from 'react';
import { useAppDispatch } from './hooks';
import { loginUserThunk } from '@/entities/user/model/user.thunk';
import { loginTrainerThunk } from '@/entities/trainer/model/trainer.thunk';
import axiosInstance from '@/shared/api/axiosInstance';

type AuthState = {
  isLoggedIn: boolean;
  role: 'user' | 'trainer' | null;
  user: any | null;
  isLoading: boolean;
};

// ✅ Флаг для предотвращения дублирования запросов
let isAuthCheckInProgress = false;

export const useAuth = (): AuthState => {
  const { currentUser: user, status: userStatus } = useAppSelector((store) => store.user);
  const { authenticatedTrainer: trainer, loading: trainerLoading } = useAppSelector(
    (store) => store.trainer,
  );
  const dispatch = useAppDispatch();
  const [isCheckingAuth, setIsCheckingAuth] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      // ✅ Предотвращаем дублирование запросов
      if (isAuthCheckInProgress) {
        return;
      }

      isAuthCheckInProgress = true;
      setIsCheckingAuth(true);

      try {
        // Пытаемся обновить токен через refresh
        const response = await axiosInstance.post('/api/auth/refresh');

        if (response.data.user) {
          const userData = response.data.user;
          console.log('🔄 useAuth: Восстанавливаем сессию для', userData.role, userData);

          // В зависимости от роли диспатчим соответствующий thunk
          if (userData.role === 'user') {
            dispatch(
              loginUserThunk.fulfilled(userData, '', {
                email: userData.email,
                password: '', // Пароль не нужен при refresh
                role: 'user',
              }),
            );
          } else if (userData.role === 'trainer') {
            // ✅ ИСПРАВЛЕНИЕ: Правильные параметры для trainer thunk
            dispatch(
              loginTrainerThunk.fulfilled(userData, '', {
                email: userData.email,
                password: '', // Пароль не нужен при refresh
              }),
            );
          }
        }
      } catch (error) {
        console.log('❌ useAuth: No valid refresh token or auth failed:', error);
        // Если refresh не удался, пользователь не авторизован
      } finally {
        setIsCheckingAuth(false);
        isAuthCheckInProgress = false;
      }
    };

    // Проверяем авторизацию только если нет текущего пользователя
    if (!user && !trainer && !isAuthCheckInProgress) {
      checkAuth();
    }
  }, [dispatch, user, trainer]);

  // Определяем, идет ли загрузка
  const isLoading = userStatus === 'loading' || trainerLoading.authentication || isCheckingAuth;

  if (user) {
    return { isLoggedIn: true, role: 'user', user, isLoading };
  }

  if (trainer) {
    return { isLoggedIn: true, role: 'trainer', user: trainer, isLoading };
  }

  return { isLoggedIn: false, role: null, user: null, isLoading };
};
