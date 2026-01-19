import { Routes, Route } from 'react-router';
import Layout from './Layout';
import MainPage from '../pages/Main/MainPage';
import LoginPage from '../pages/Login/LoginPage';
import RegisterPage from '../pages/Register/RegisterPage';
import React from 'react';
import TopicPage from '@/pages/Forum/MainForumPage/TopicsPage';

function App(): React.JSX.Element {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<MainPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/forum" element={<TopicPage />} />
      </Route>
    </Routes>
  );
}

export default App;
