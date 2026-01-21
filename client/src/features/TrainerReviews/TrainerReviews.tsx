// features/TrainerReviews/TrainerReviews.tsx
import React, { useState, useEffect } from 'react';
import TrainerReviewService from '@/entities/trainer-reviews/api/trainer-review.service';
import type { TrainerReviewType } from '@/entities/trainer-reviews/model/trainer-review.type';
import { useAuth } from '@/shared/lib/useAuth';
import './TrainerReviews.css';

interface TrainerReviewsProps {
  trainerId: number;
}

export default function TrainerReviews({ trainerId }: TrainerReviewsProps): React.JSX.Element {
  const { isLoggedIn, role } = useAuth();
  const [reviews, setReviews] = useState<TrainerReviewType[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ rate: 5, text: '' });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    loadReviews();
  }, [trainerId]);

  const loadReviews = async () => {
    try {
      setLoading(true);
      const data = await TrainerReviewService.getByTrainerId(trainerId);
      setReviews(data);
    } catch (error) {
      console.error('Error loading reviews:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');

    try {
      await TrainerReviewService.create({
        trainerId,
        rate: formData.rate,
        text: formData.text,
      });

      // Перезагружаем отзывы
      await loadReviews();
      
      // Сбрасываем форму
      setFormData({ rate: 5, text: '' });
      setShowForm(false);
    } catch (error: any) {
      console.error('Error creating review:', error);
      setError(error.response?.data?.message || 'Ошибка при создании отзыва');
    } finally {
      setSubmitting(false);
    }
  };

  const renderStars = (rating: number, interactive = false, onChange?: (rate: number) => void) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <span
          key={i}
          className={`star ${i <= rating ? 'filled' : 'empty'} ${interactive ? 'interactive' : ''}`}
          onClick={() => interactive && onChange && onChange(i)}
        >
          {i <= rating ? '★' : '☆'}
        </span>
      );
    }
    return stars;
  };

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('ru-RU', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  if (loading) {
    return <div className="reviews-loading">Загрузка отзывов...</div>;
  }

  return (
    <div className="trainer-reviews">
      <div className="reviews-header">
        <h2>Отзывы ({reviews.length})</h2>
        {isLoggedIn && role === 'user' && !showForm && (
          <button className="btn btn-primary" onClick={() => setShowForm(true)}>
            Оставить отзыв
          </button>
        )}
      </div>

      {/* Форма добавления отзыва */}
      {showForm && (
        <div className="review-form-container">
          <form onSubmit={handleSubmit} className="review-form">
            <h3>Ваш отзыв</h3>
            
            {error && <div className="error-message">{error}</div>}

            <div className="form-group">
              <label>Оценка:</label>
              <div className="stars-input">
                {renderStars(formData.rate, true, (rate) => setFormData({ ...formData, rate }))}
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="review-text">Комментарий (необязательно):</label>
              <textarea
                id="review-text"
                value={formData.text}
                onChange={(e) => setFormData({ ...formData, text: e.target.value })}
                placeholder="Расскажите о вашем опыте работы с тренером..."
                rows={4}
              />
            </div>

            <div className="form-actions">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => {
                  setShowForm(false);
                  setError('');
                }}
              >
                Отмена
              </button>
              <button type="submit" className="btn btn-primary" disabled={submitting}>
                {submitting ? 'Отправка...' : 'Отправить'}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Список отзывов */}
      {reviews.length === 0 ? (
        <div className="no-reviews">
          <p>Пока нет отзывов. Будьте первым!</p>
        </div>
      ) : (
        <div className="reviews-list">
          {reviews.map((review) => (
            <div key={review.id} className="review-card">
              <div className="review-header">
                <div className="review-author">
                  <div className="author-avatar">
                    {review.user?.name.charAt(0).toUpperCase()}
                  </div>
                  <div className="author-info">
                    <h4>{review.user?.name || 'Пользователь'}</h4>
                    <span className="review-date">{formatDate(review.createdAt)}</span>
                  </div>
                </div>
                <div className="review-rating">
                  {renderStars(review.rate)}
                </div>
              </div>
              {review.text && (
                <div className="review-text">
                  <p>{review.text}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
