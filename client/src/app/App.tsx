import { Routes, Route } from 'react-router';
import { lazy, Suspense } from 'react';
import Layout from './Layout';
import FitnessPage from '@/pages/FitnessIfno/FitnessPage';

// Lazy loading страниц
const MainPage = lazy(() => import('../pages/Main/MainPage'));
const LoginPage = lazy(() => import('../pages/Login/LoginPage'));
const RegisterPage = lazy(() => import('../pages/Register/RegisterPage'));
const TopicPage = lazy(() => import('@/pages/Forum/MainForumPage/TopicsPage'));
const AnalizPage = lazy(() => import('@/pages/Analiz/ui/AnalizPage'));

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
  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<MainPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/forum" element={<TopicPage />} />
          <Route path="/analiz" element={<AnalizPage />} />
          <Route path="/fitness/:id" element={<FitnessPage />} />
        </Route>
      </Routes>
    </Suspense>
  );
}

export default App;
