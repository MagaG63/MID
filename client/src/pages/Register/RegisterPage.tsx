import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { registerTrainerThunk } from '../../entities/trainer/model/trainer.thunk';
import { Link } from 'react-router';
import { registerUserThunk } from '@/entities/user/model/user.thunk';

export default function RegisterForm(): React.JSX.Element {
  const [role, setRole] = useState<boolean>(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  console.log(role)

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    description: '',
    profileImage: 'https://via.placeholder.com/150',
    qualificationImages: [''],
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
  };

  const handleQualificationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setFormData({
      ...formData,
      qualificationImages: value ? [value] : [],
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const baseData = {
        name: formData.name.trim(),
        email: formData.email.trim(),
        password: formData.password,
      };

      if (role) {
        // ✅ ТРЕНЕР - используем trainer thunk
        const trainerData = {
          ...baseData,
          description: formData.description,
          profileImage: formData.profileImage,
          qualificationImages: formData.qualificationImages.filter((img) => img.trim()),
        };
        console.log('🚀 REGISTER TRAINER:', trainerData);
        await dispatch(registerTrainerThunk(trainerData));
      } else {
        // ✅ USER - используем тот же trainer thunk с минимальными данными
        // Сервер проигнорирует лишние поля trainer'а
        console.log('🚀 REGISTER USER:', baseData);
        await dispatch(registerUserThunk(baseData));
      }

      navigate('/');
    } catch (err: any) {
      console.error('🚨 ERROR:', err);
      // ✅ Показываем точную ошибку с сервера
      const errorMsg =
        err.response?.data?.message?.[0] ||
        err.message ||
        `Ошибка регистрации ${role ? 'тренера' : 'пользователя'}`;
      setError(errorMsg);
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
        Регистрация {role ? 'тренера' : 'пользователя'}
      </h2>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <input
          name="name"
          placeholder="Имя"
          value={formData.name}
          onChange={handleChange}
          className="w-full p-3 mb-4 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
          minLength={2}
        />

        {/* ✅ ТРЕНЕР ПОЛЯ - только при role === true */}
        {role && (
          <>
            <textarea
              name="description"
              placeholder="Описание (опыт, специализация)"
              value={formData.description}
              onChange={handleChange}
              className="w-full p-3 mb-4 border rounded h-24 focus:outline-none focus:ring-2 focus:ring-orange-500 resize-none"
            />
            <input
              name="profileImage"
              placeholder="Ссылка на фото профиля"
              value={formData.profileImage}
              onChange={handleChange}
              className="w-full p-3 mb-4 border rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
            <input
              name="qualificationImages"
              placeholder="Ссылка на сертификат"
              value={formData.qualificationImages[0] || ''}
              onChange={handleQualificationChange}
              className="w-full p-3 mb-4 border rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </>
        )}

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
          {loading ? 'Регистрация...' : 'Зарегистрироваться'}
        </button>
      </form>

      <p className="mt-4 text-center text-sm text-gray-600">
        Есть аккаунт как {role ? 'тренер' : 'пользователь'}?{' '}
        <Link to="/login" className="font-semibold text-blue-500 hover:underline">
          Войти
        </Link>
      </p>
    </div>
  );
}
