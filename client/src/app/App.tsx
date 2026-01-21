// app/App.tsx
import { Routes, Route, Navigate } from 'react-router';
import { lazy, Suspense } from 'react';
import Layout from './Layout';
import ProtectedRoute from '@/shared/lib/ProtectedRoute';
import { useAuth } from '@/shared/lib/useAuth';
import FitnessPage from '@/pages/FitnessIfno/FitnessPage';

// Lazy loading страниц
const MainPage = lazy(() => import('../pages/Main/MainPage'));
const LoginPage = lazy(() => import('../pages/Login/LoginPage'));
const RegisterPage = lazy(() => import('../pages/Register/RegisterPage'));
const TopicPage = lazy(() => import('@/pages/Forum/MainForumPage/TopicsPage'));
const AnalizPage = lazy(() => import('@/pages/Analiz/ui/AnalizPage'));
const MyPage = lazy(() => import('@/pages/MyPage/MyPage'));
const TrainersListPage = lazy(() => import('@/pages/Trainers/TrainersListPage'));
const TrainerProfilePage = lazy(() => import('@/pages/Trainers/TrainerProfilePage'));

// Loading компонент
const PageLoader = () =>
  void (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
      }}
    >
      <div className="spinner-border text-primary" role="status">
        <span className="visually-hidden">Загрузка...</span>
      </div>
    </div>
  );

function App(): React.JSX.Element {
  const { isLoggedIn } = useAuth();

  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>
        <Route element={<Layout />}>
          {/* Публичные маршруты */}
          <Route path="/" element={<MainPage />} />
          <Route path="/forum" element={<TopicPage />} />

          {/* Маршруты только для НЕ авторизованных */}
          <Route
            path="/login"
            element={!isLoggedIn ? <LoginPage /> : <Navigate to="/" replace />}
          />
          <Route
            path="/register"
            element={!isLoggedIn ? <RegisterPage /> : <Navigate to="/" replace />}
          />

          {/* 🔒 ЗАЩИЩЕННЫЕ МАРШРУТЫ */}

          {/* Доступно ВСЕМ авторизованным (и юзер, и тренер) */}
          <Route element={<ProtectedRoute />}>
            <Route path="/profile" element={<MyPage />} />
          </Route>

          {/* 🥗 Доступно только пользователю */}
          <Route element={<ProtectedRoute allowedRoles={['user']} />}>
            <Route path="/analiz" element={<AnalizPage />} />
            <Route path="/trainers" element={<TrainersListPage />} />
            <Route path="/trainers/:trainerId" element={<TrainerProfilePage />} />
          </Route>

          {/* 💪 Доступно только тренеру */}
          <Route element={<ProtectedRoute allowedRoles={['trainer']} />}>
            {/* Удалена страница клиентов */}
          </Route>
        </Route>
      </Routes>
    </Suspense>
  );
}

export default App;
