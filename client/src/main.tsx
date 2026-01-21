// main.tsx
import { BrowserRouter } from 'react-router';
import { createRoot } from 'react-dom/client';
import App from './app/App';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@/shared/styles/main.css';
import { Provider } from 'react-redux';
import { store } from './app/store/store';
import { checkAuthOnLoad } from '@/shared/lib/authInit';

// Создаем функцию для инициализации авторизации
const initApp = async () => {
  console.log('App initialization...');
  
  // ✅ ИСПРАВЛЕНИЕ: Вызываем проверку авторизации при загрузке
  try {
    await checkAuthOnLoad();
    console.log('✅ Auth check completed');
  } catch (error) {
    console.log('❌ Auth check failed:', error);
  }
};

// ✅ ИСПРАВЛЕНИЕ: Инициализируем приложение ДО рендера
initApp().then(() => {
  createRoot(document.getElementById('root')!).render(
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>,
  );
});
