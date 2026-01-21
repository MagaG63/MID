// features/EditProfileModal/EditProfileModal.tsx
import React, { useState, useEffect } from 'react';
import { useAppDispatch } from '@/shared/lib/hooks';
import { updateUserThunk } from '@/entities/user/model/user.thunk';
import { updateTrainerProfileThunk } from '@/entities/trainer/model/trainer.thunk';
import { FileUploader } from '@/entities/fileUploader/FileUploader';
import './EditProfileModal.css';

type ProfileType = 'user' | 'trainer';

interface EditProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  profileType: ProfileType;
  currentData: any;
}

export default function EditProfileModal({
  isOpen,
  onClose,
  profileType,
  currentData,
}: EditProfileModalProps): React.JSX.Element | null {
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    description: '',
    profileImageFile: null as File | null,
    qualificationImageFiles: [] as File[],
  });

  // Инициализация формы текущими данными
  useEffect(() => {
    if (currentData) {
      setFormData({
        name: currentData.name || '',
        email: currentData.email || '',
        description: currentData.description || '',
        profileImageFile: null,
        qualificationImageFiles: [],
      });
    }
  }, [currentData]);

  // Закрытие модалки при клике вне её
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

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
    setSuccess(false);

    try {
      if (profileType === 'trainer') {
        // Обновление профиля тренера
        const formDataToSend = new FormData();
        formDataToSend.append('name', formData.name.trim());
        formDataToSend.append('email', formData.email.trim());
        formDataToSend.append('description', formData.description || '');

        if (formData.profileImageFile) {
          formDataToSend.append('profileImage', formData.profileImageFile);
        }

        if (formData.qualificationImageFiles.length > 0) {
          formData.qualificationImageFiles.forEach((file) => {
            formDataToSend.append('qualificationImages', file);
          });
        }

        await dispatch(updateTrainerProfileThunk(formDataToSend) as any).unwrap();
      } else {
        // Обновление профиля пользователя
        await dispatch(
          updateUserThunk({
            name: formData.name,
            email: formData.email,
          }) as any,
        ).unwrap();
      }

      setSuccess(true);
      setTimeout(() => {
        onClose();
        window.location.reload(); // Перезагружаем страницу для обновления данных
      }, 1500);
    } catch (err: any) {
      console.error('Ошибка обновления профиля:', err);
      setError(err.message || 'Ошибка обновления профиля');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2 className="modal-title">
            Редактировать профиль {profileType === 'trainer' ? 'тренера' : 'пользователя'}
          </h2>
          <button className="modal-close" onClick={onClose} aria-label="Закрыть">
            ×
          </button>
        </div>

        {success && (
          <div className="success-message">
            <p>✅ Профиль успешно обновлен!</p>
          </div>
        )}

        {error && (
          <div className="error-message">
            <p>{error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="modal-form">
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

          {profileType === 'trainer' && (
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
                label="Обновить фото профиля"
                onFileChange={(file) => handleFileChange('profileImageFile', file)}
                currentFile={formData.profileImageFile}
                accept="image/*"
              />

              <FileUploader
                label="Добавить сертификаты (до 5 файлов)"
                onFileChange={(file) => handleFileChange('qualificationImageFiles', file)}
                currentFiles={formData.qualificationImageFiles}
                multiple={true}
                accept="image/*,.pdf"
              />
            </>
          )}

          <div className="modal-actions">
            <button type="button" className="btn btn-secondary" onClick={onClose}>
              Отмена
            </button>
            <button type="submit" disabled={loading} className="btn btn-primary">
              {loading ? 'Сохранение...' : 'Сохранить'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
