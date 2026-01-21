// shared/lib/ProtectedRoute.tsx
import React from 'react';
import { Navigate, Outlet } from 'react-router';
import { useAuth } from './useAuth';

type Props = {
  allowedRoles?: ('user' | 'trainer')[];
  redirectTo?: string;
  children?: React.ReactNode;
};

export default function ProtectedRoute({
  allowedRoles,
  redirectTo = '/login',
  children,
}: Props): React.JSX.Element {
  const { isLoggedIn, role, isLoading } = useAuth();

  // Пока проверяем авторизацию, показываем загрузку
  if (isLoading) {
    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '100vh',
        }}
      >
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Проверка авторизации...</span>
        </div>
      </div>
    );
  }

  // 1. Если не залогинен — редирект на вход
  if (!isLoggedIn) {
    return <Navigate to={redirectTo} replace />;
  }

  // 2. Если роль указана, но у юзера она другая — редирект (например, на главную)
  if (allowedRoles && role && !allowedRoles.includes(role)) {
    return <Navigate to="/" replace />;
  }

  return <>{children || <Outlet />}</>;
}
