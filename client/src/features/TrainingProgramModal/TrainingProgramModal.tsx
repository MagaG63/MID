// features/TrainingProgramModal/TrainingProgramModal.tsx
import React, { useState, useEffect } from 'react';
import './TrainingProgramModal.css';

interface TrainingProgramModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: TrainingProgramFormData) => Promise<void>;
  initialData?: TrainingProgramFormData | null;
  mode: 'create' | 'edit';
}

export interface TrainingProgramFormData {
  id?: number;
  name: string;
  price: string;
  contact: string;
}

export default function TrainingProgramModal({
  isOpen,
  onClose,
  onSubmit,
  initialData,
  mode,
}: TrainingProgramModalProps): React.JSX.Element | null {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const [formData, setFormData] = useState<TrainingProgramFormData>({
    name: '',
    price: '',
    contact: '',
  });

  // Инициализация формы
  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    } else {
      setFormData({
        name: '',
        price: '',
        contact: '',
      });
    }
  }, [initialData, isOpen]);

  // Закрытие по Escape
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await onSubmit(formData);
      onClose();
    } catch (err: any) {
      console.error('Ошибка сохранения программы:', err);
      setError(err.message || 'Ошибка сохранения программы');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content training-program-modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2 className="modal-title">
            {mode === 'create' ? 'Создать программу тренировок' : 'Редактировать программу'}
          </h2>
          <button className="modal-close" onClick={onClose} aria-label="Закрыть">
            ×
          </button>
        </div>

        {error && (
          <div className="error-message">
            <p>{error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="modal-form">
          <div className="form-group">
            <label htmlFor="name">Название программы *</label>
            <input
              id="name"
              name="name"
              type="text"
              placeholder="Например: Программа для начинающих"
              value={formData.name}
              onChange={handleChange}
              required
              minLength={3}
              maxLength={100}
            />
            <span className="form-hint">От 3 до 100 символов</span>
          </div>

          <div className="form-group">
            <label htmlFor="price">Цена *</label>
            <input
              id="price"
              name="price"
              type="text"
              placeholder="Например: 5000 руб/месяц"
              value={formData.price}
              onChange={handleChange}
              required
            />
            <span className="form-hint">Укажите стоимость и период</span>
          </div>

          <div className="form-group">
            <label htmlFor="contact">Контакт для связи (Telegram) *</label>
            <input
              id="contact"
              name="contact"
              type="text"
              placeholder="@username или https://t.me/username"
              value={formData.contact}
              onChange={handleChange}
              required
              minLength={5}
            />
            <span className="form-hint">Telegram username или ссылка</span>
          </div>

          <div className="modal-actions">
            <button type="button" className="btn btn-secondary" onClick={onClose}>
              Отмена
            </button>
            <button type="submit" disabled={loading} className="btn btn-primary">
              {loading ? 'Сохранение...' : mode === 'create' ? 'Создать' : 'Сохранить'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
