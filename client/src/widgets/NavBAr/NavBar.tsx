// widgets/NavBar/NavBar.tsx
import { Link, useLocation } from 'react-router';
import { useAppDispatch } from '@/shared/lib/hooks';
import { logout as logoutUser } from '@/entities/user/model/user.slice';
import { logout as logoutTrainer } from '@/entities/trainer/model/trainer.slice';
import { useAuth } from '@/shared/lib/useAuth';
import axiosInstance, { setAccessToken } from '@/shared/api/axiosInstance';
import './NavBar.css';

export default function NavBar(): React.JSX.Element {
  const dispatch = useAppDispatch();
  const { isLoggedIn, role } = useAuth();
  const location = useLocation();

  const handleLogout = async () => {
    try {
      // Отправляем запрос на сервер для удаления refresh token
      await axiosInstance.delete('/api/auth/logout');

      // Очищаем access token на клиенте
      setAccessToken('');

      // Очищаем состояние в Redux
      if (role === 'user') {
        dispatch(logoutUser());
      } else if (role === 'trainer') {
        dispatch(logoutTrainer());
      }

      // Перенаправляем на главную страницу
      window.location.href = '/';
    } catch (error) {
      console.error('Logout error:', error);
      // Даже если запрос не удался, очищаем локальное состояние
      setAccessToken('');
      if (role === 'user') {
        dispatch(logoutUser());
      } else if (role === 'trainer') {
        dispatch(logoutTrainer());
      }
      window.location.href = '/';
    }
  };

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="navbar-container">
      <div className="navbar">
        <Link to="/" className="navbar-brand">
          Fitness App
        </Link>

        <div className="navbar-nav">
          <Link to="/" className={`nav-link ${isActive('/') ? 'active' : ''}`}>
            Главная
          </Link>

          <Link to="/forum" className={`nav-link ${isActive('/forum') ? 'active' : ''}`}>
            Форум
          </Link>

          {isLoggedIn && (
            <>
              {role === 'user' && (
                <>
                  <Link to="/trainers" className={`nav-link ${isActive('/trainers') ? 'active' : ''}`}>
                    Тренеры
                  </Link>
                  <Link to="/analiz" className={`nav-link ${isActive('/analiz') ? 'active' : ''}`}>
                    Анализ питания
                  </Link>
                  <Link to="/profile" className={`nav-link ${isActive('/profile') ? 'active' : ''}`}>
                    Профиль
                  </Link>
                </>
              )}

              {role === 'trainer' && (
                <>
                  <Link to="/profile" className={`nav-link ${isActive('/profile') ? 'active' : ''}`}>
                    Профиль
                  </Link>
                </>
              )}
            </>
          )}
        </div>

        <div className="navbar-auth">
          {isLoggedIn ? (
            <button onClick={handleLogout} className="auth-btn logout-btn">
              Выйти
            </button>
          ) : (
            <>
              <Link to="/login" className="auth-btn login-btn">
                Вход
              </Link>
              <Link to="/register" className="auth-btn register-btn">
                Регистрация
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
