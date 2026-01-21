import React, { useState } from 'react';
import { useAppDispatch } from '@/shared/lib/hooks';
import { useNavigate, Link } from 'react-router';
import { loginTrainerThunk } from '@/entities/trainer/model/trainer.thunk';
import { loginUserThunk } from '@/entities/user/model/user.thunk';
import './LoginPage.css';

export default function LoginForm(): React.JSX.Element {
  const [role, setRole] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
  };

  // LoginPage.tsx - отправляйте роль на сервер
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      if (role) {
        // role = true (тренер)
        await dispatch(
          loginTrainerThunk({
            email: formData.email,
            password: formData.password,
            role: 'trainer', // Явно указываем роль
          }),
        ).unwrap();
      } else {
        // role = false (пользователь)
        await dispatch(
          loginUserThunk({
            email: formData.email,
            password: formData.password,
            role: 'user', // Явно указываем роль
          }),
        ).unwrap();
      }

      navigate('/');
    } catch (err: any) {
      console.error('Ошибка входа:', err);
      setError(err.message || 'Ошибка входа');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-form-container">
      <div className="login-card">
        <h2 className="login-title">Вход {role ? 'тренера' : 'пользователя'}</h2>

        <div className="role-switcher">
          <button
            type="button"
            onClick={() => setRole(false)}
            className={`role-button ${!role ? 'active' : ''}`}
          >
            Пользователь
          </button>
          <button
            type="button"
            onClick={() => setRole(true)}
            className={`role-button trainer ${role ? 'active' : ''}`}
          >
            Тренер
          </button>
        </div>

        {error && (
          <div className="error-message">
            {typeof error === 'string' ? error : 'Произошла ошибка'}
          </div>
        )}

        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="example@mail.ru"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Пароль</label>
            <input
              id="password"
              name="password"
              type="password"
              placeholder="******"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`login-button ${role ? 'trainer' : ''}`}
          >
            {loading ? 'Вход...' : 'Войти'}
          </button>
        </form>

        <div className="auth-footer">
          <p>
            Нет аккаунта?
            <Link to="/register" className="auth-link">
              Зарегистрироваться
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
