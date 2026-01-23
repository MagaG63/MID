import React, { useState, useEffect, useRef } from 'react';
import './CreateForumModal.css';

interface CreateForumModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: { title: string; description: string; category_id: number }) => Promise<void>;
}

export default function CreateForumModal({
  isOpen,
  onClose,
  onSubmit,
}: CreateForumModalProps): React.JSX.Element | null {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const isSubmittingRef = useRef(false);

  const [formData, setFormData] = useState({
    title: '',
    description: '',
  });

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

  // Сброс формы при открытии
  useEffect(() => {
    if (isOpen) {
      setFormData({
        title: '',
        description: '',
      });
      setError('');
      setSuccess(false);
      isSubmittingRef.current = false; // Сбрасываем флаг
    }
  }, [isOpen]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({ ...prev, [name]: value }));
    // console.log(name,value)
    setError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('sssss')
    // Защита от двойной отправки через ref
    if (isSubmittingRef.current || loading) {
      console.log('⚠️ Форма уже отправляется, игнорируем');
      return;
    }
    
    isSubmittingRef.current = true;
    setLoading(true);
    setError('');
    setSuccess(false);

    try {
      if (!formData.title.trim()) {
        throw new Error('Введите тему');
      }
      if (!formData.description.trim()) {
        throw new Error('Введите описание темы');
      }

      console.log('📤 Отправка формы:', formData);

      await onSubmit({
        title: formData.title.trim(),
        description: formData.description.trim(),
        category_id: 1,
      });

      console.log('✅ Форма успешно отправлена');
      setSuccess(true);
      setTimeout(() => {
        onClose();
      }, 1500);
    } catch (err: any) {
      console.error('❌ Ошибка создания темы:', err);
      setError(err.message || 'Ошибка создания темы');
      isSubmittingRef.current = false; // Сбрасываем при ошибке
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  console.log('🟢 CreateForumModal рендерится, isOpen:', isOpen);

  return (
    <div className="modal-overlay forum-modal-overlay" onClick={onClose}>
      <div className="modal-content forum-modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2 className="modal-title">Добавить тему</h2>
          <button className="modal-close" onClick={onClose} aria-label="Закрыть">
            ×
          </button>
        </div>

        {success && (
          <div className="success-message">
            <p>✅ Тема успешно добавлена!</p>
          </div>
        )}

        {error && (
          <div className="error-message">
            <p>{error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="modal-form">
          <div className="form-group">
            <label htmlFor="title">Тема</label>
            <input
              id="title"
              name="title"
              type="text"
              placeholder="Введите тему"
              value={formData.title}
              onChange={handleChange}
              required
              minLength={5}
              maxLength={200}
            />
          </div>

          <div className="form-group">
            <label htmlFor="description">Описание темы</label>
            <textarea
              id="description"
              name="description"
              placeholder="Введите описание темы"
              value={formData.description}
              onChange={handleChange}
              required
              rows={6}
              minLength={10}
              maxLength={2000}
            />
          </div>

          <div className="modal-actions">
            <button type="submit" disabled={loading} className="btn btn-primary btn-full">
              {loading ? 'Добавление...' : 'Добавить тему'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
