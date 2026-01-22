// widgets/NavBar/NavBar.tsx
import { Link, useLocation } from 'react-router';
import { useAppDispatch } from '@/shared/lib/hooks';
import { logout as logoutUser } from '@/entities/user/model/user.slice';
import { logout as logoutTrainer } from '@/entities/trainer/model/trainer.slice';
import { useAuth } from '@/shared/lib/useAuth';
import axiosInstance, { setAccessToken } from '@/shared/api/axiosInstance';
import { useState } from 'react';
import './NavBar.css';

export default function NavBar(): React.JSX.Element {
  const dispatch = useAppDispatch();
  const { isLoggedIn, role } = useAuth();
  const location = useLocation();
  const [isExpanded, setIsExpanded] = useState(false);

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
    <div
      className={`sidebar ${isExpanded ? 'expanded' : ''}`}
      onMouseEnter={() => setIsExpanded(true)}
      onMouseLeave={() => setIsExpanded(false)}
    >
      <div className="sidebar-content">
        {/* Logo */}
        <Link to="/" className="sidebar-logo">
          <div className="logo-icon">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
            </svg>
          </div>
          <span className="logo-text">Fitness App</span>
        </Link>

        {/* Navigation */}
        <nav className="sidebar-nav">
          <Link to="/" className={`nav-link ${isActive('/') ? 'active' : ''}`}>
            <div className="nav-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
              </svg>
            </div>
            <span className="nav-label">Главная</span>
          </Link>

          <Link to="/forum" className={`nav-link ${isActive('/forum') ? 'active' : ''}`}>
            <div className="nav-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20 2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h4l4 4 4-4h4c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z" />
              </svg>
            </div>
            <span className="nav-label">Форум</span>
          </Link>

          <Link to="/laboratory" className={`nav-link ${isActive('/laboratory') ? 'active' : ''}`}>
            <div className="nav-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <path d="M7 2v2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2h-1V2h-2v2H9V2H7zm0 6h10v10H7V8z" />
              </svg>
            </div>
            <span className="nav-label">Лаборатории</span>
          </Link>

          {isLoggedIn && (
            <>
              {role === 'user' && (
                <>
                  <Link
                    to="/trainers"
                    className={`nav-link ${isActive('/trainers') ? 'active' : ''}`}
                  >
                    <div className="nav-icon">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M16 4c0-1.11.89-2 2-2s2 .89 2 2-.89 2-2 2-2-.89-2-2zm4 18v-6h2.5l-2.54-7.63A1.5 1.5 0 0 0 18.54 8H17c-.8 0-1.54.37-2.01.99l-2.98 3.67a.5.5 0 0 0 .39.84H14v8h6z" />
                      </svg>
                    </div>
                    <span className="nav-label">Тренеры</span>
                  </Link>
                  <Link to="/analiz" className={`nav-link ${isActive('/analiz') ? 'active' : ''}`}>
                    <div className="nav-icon">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4zm2.5 2.25l1.25-1.25-2.75-2.75-.75.75L19.5 17.25z" />
                      </svg>
                    </div>
                    <span className="nav-label">Анализ питания</span>
                  </Link>
                  <Link
                    to="/profile"
                    className={`nav-link ${isActive('/profile') ? 'active' : ''}`}
                  >
                    <div className="nav-icon">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                      </svg>
                    </div>
                    <span className="nav-label">Профиль</span>
                  </Link>
                </>
              )}

              {role === 'trainer' && (
                <Link to="/profile" className={`nav-link ${isActive('/profile') ? 'active' : ''}`}>
                  <div className="nav-icon">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                    </svg>
                  </div>
                  <span className="nav-label">Профиль</span>
                </Link>
              )}
            </>
          )}
        </nav>

        {/* Auth Buttons */}
        <div className="sidebar-auth">
          {isLoggedIn ? (
            <button onClick={handleLogout} className="auth-btn">
              <div className="auth-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17 7l-1.41 1.41L18.17 11H8v2h10.17l-2.58 2.58L17 17l5-5zM4 5h8V3H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h8v-2H4V5z" />
                </svg>
              </div>
              <span className="auth-label">Выйти</span>
            </button>
          ) : (
            <>
              <Link to="/login" className="auth-btn">
                <div className="auth-icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M11 7L9.6 8.4l2.6 2.6H2v2h10.2l-2.6 2.6L11 17l5-5-5-5zm9 12h-8v2h8c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2h-8v2h8v12z" />
                  </svg>
                </div>
                <span className="auth-label">Вход</span>
              </Link>
              <Link to="/register" className="auth-btn">
                <div className="auth-icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M15 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm-9-2V7H4v3H1v2h3v3h2v-3h3v-2H6zm9 4c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                  </svg>
                </div>
                <span className="auth-label">Регистрация</span>
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
