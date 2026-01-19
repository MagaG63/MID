import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router';
import { loginTrainerThunk } from '../../entities/trainer/model/trainer.thunk';

export default function LoginForm(): React.JSX.Element {
  const [role, setRole] = useState<boolean>(false); // true = trainer, false = user
  const dispatch = useDispatch();
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // ✅ Отправляем role в thunk
      await dispatch(loginTrainerThunk({ 
        ...formData, 
        role: role ? 'trainer' : 'user' 
      }));
      navigate('/');
    } catch (err: any) {
      setError(err.message || `Ошибка входа ${role ? 'тренера' : 'пользователя'}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-8 border rounded-lg shadow-lg">
      {/* ✅ Переключатель роли */}
      <div className="flex mb-6 bg-gray-100 rounded-lg p-1">
        <button
          onClick={() => setRole(false)}
          className={`flex-1 py-3 px-4 rounded-lg font-semibold transition-all ${
            !role
              ? 'bg-green-500 text-white shadow-md'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          Пользователь
        </button>
        <button
          onClick={() => setRole(true)}
          className={`flex-1 py-3 px-4 rounded-lg font-semibold transition-all ${
            role
              ? 'bg-orange-500 text-white shadow-md'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          Тренер
        </button>
      </div>

      {/* ✅ Заголовок с тернарником */}
      <h2 className="text-2xl font-bold mb-6 text-center">
        Вход {role ? 'тренера' : 'пользователя'}
      </h2>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <input
          name="email"
          type="email"
          placeholder="test@example.com"
          value={formData.email}
          onChange={handleChange}
          className="w-full p-3 mb-4 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />

        <input
          name="password"
          type="password"
          placeholder="123456"
          value={formData.password}
          onChange={handleChange}
          className="w-full p-3 mb-6 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
          minLength={6}
        />

        <button
          type="submit"
          disabled={loading}
          className={`w-full p-3 rounded font-bold text-white disabled:opacity-50 transition-all ${
            role ? 'bg-orange-500 hover:bg-orange-600' : 'bg-green-500 hover:bg-green-600'
          }`}
        >
          {loading ? 'Вход...' : 'Войти'}
        </button>
      </form>

      <p className="mt-4 text-center text-sm text-gray-600">
        Нет аккаунта как {role ? 'тренер' : 'пользователь'}?{' '}
        <Link 
          to="/register" 
          className="font-semibold text-blue-500 hover:underline"
        >
          Регистрация
        </Link>
      </p>
    </div>
  );
}
