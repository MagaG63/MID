// RegisterPage.tsx - ИСПРАВЛЕННАЯ РАБОЧАЯ ВЕРСИЯ
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { registerTrainerThunk } from '@/entities/trainer/model/trainer.thunk';
import { registerUserThunk } from '@/entities/user/model/user.thunk';
import { Link } from 'react-router';
import { FileUploader } from '../../entities/fileUploader/FileUploader';
import './RegisterPage.css';

export default function RegisterPage(): React.JSX.Element {
  const [role, setRole] = useState<boolean>(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    description: '',
    profileImageFile: null as File | null,
    qualificationImageFiles: [] as File[],
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setError('');
  };

  const handleFileChange = (fieldName: string, file: File | File[] | null) => {
    if (fieldName === 'profileImageFile') {
      setFormData((prev) => ({ ...prev, profileImageFile: file as File | null }));
    } else if (fieldName === 'qualificationImageFiles') {
      setFormData((prev) => ({
        ...prev,
        qualificationImageFiles: Array.isArray(file) ? file : file ? [file] : [],
      }));
    }
  };

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setLoading(true);
  setError('');

  try {
    if (role) {
      // Регистрация тренера
      const formDataToSend = new FormData();
      formDataToSend.append('name', formData.name.trim());
      formDataToSend.append('email', formData.email.trim());
      formDataToSend.append('password', formData.password);
      formDataToSend.append('description', formData.description || '');

      if (formData.profileImageFile) {
        formDataToSend.append('profileImage', formData.profileImageFile);
      }

      if (formData.qualificationImageFiles.length > 0) {
        formData.qualificationImageFiles.forEach((file) => {
          formDataToSend.append('qualificationImages', file);
        });
      }

      await dispatch(registerTrainerThunk(formDataToSend) as any).unwrap();
      navigate('/');
    } else {
      // Регистрация пользователя
      await dispatch(
        registerUserThunk({
          name: formData.name,
          email: formData.email,
          password: formData.password,
        }) as any,
      ).unwrap();
      navigate('/');
    }
  } catch (err: any) {
    console.error('Ошибка регистрации:', err);
    setError(err.message || 'Ошибка регистрации');
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="register-form-container">
      <div className="register-card">
        <h2 className="register-title">Регистрация {role ? 'тренера' : 'пользователя'}</h2>

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
            <p>{error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="register-form">
          <div className="form-group">
            <label htmlFor="name">Имя *</label>
            <input
              id="name"
              name="name"
              type="text"
              placeholder="Введите ваше имя"
              value={formData.name}
              onChange={handleChange}
              required
              minLength={2}
              maxLength={50}
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email *</label>
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
            <label htmlFor="password">Пароль *</label>
            <input
              id="password"
              name="password"
              type="password"
              placeholder="Минимум 6 символов"
              value={formData.password}
              onChange={handleChange}
              required
              minLength={6}
            />
          </div>

          {role && (
            <>
              <div className="form-group">
                <label htmlFor="description">Описание</label>
                <textarea
                  id="description"
                  name="description"
                  placeholder="Расскажите о своем опыте, специализации..."
                  value={formData.description}
                  onChange={handleChange}
                  className="trainer-field"
                  rows={4}
                  maxLength={500}
                />
              </div>

              <FileUploader
                label="Фото профиля"
                onFileChange={(file) => handleFileChange('profileImageFile', file)}
                currentFile={formData.profileImageFile}
                accept="image/*"
              />

              <FileUploader
                label="Сертификаты (до 5 файлов)"
                onFileChange={(file) => handleFileChange('qualificationImageFiles', file)}
                currentFiles={formData.qualificationImageFiles}
                multiple={true}
                accept="image/*,.pdf"
              />
            </>
          )}

          <button
            type="submit"
            disabled={loading}
            className={`register-button ${role ? 'trainer' : ''}`}
          >
            {loading ? 'Регистрация...' : 'Зарегистрироваться'}
          </button>
        </form>

        <div className="register-footer">
          <p>
            Уже есть аккаунт?
            <Link to="/login" className="register-link">
              Войти
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
