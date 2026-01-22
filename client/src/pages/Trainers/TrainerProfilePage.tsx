// pages/Trainers/TrainerProfilePage.tsx
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router';
import TrainerReviewService from '@/entities/trainer-reviews/api/trainer-review.service';
import TrainingProgramService from '@/entities/training-program/api/training-program.service';
import axiosInstance from '@/shared/api/axiosInstance';
import TrainerReviews from '@/features/TrainerReviews/TrainerReviews';
import { getImageUrl, handleImageError } from '@/shared/lib/imageUtils';
import type { TrainerRatingData } from '@/entities/trainer-reviews/model/trainer-review.type';
import type { TrainingProgramType } from '@/entities/training-program/model/training-program.type';
import './TrainerProfilePage.css';

interface TrainerData {
  id: number;
  name: string;
  email: string;
  description: string;
  profileImage: string;
  qualificationImages: string[];
}

export default function TrainerProfilePage(): React.JSX.Element {
  const { trainerId } = useParams<{ trainerId: string }>();
  const navigate = useNavigate();
  
  const [trainer, setTrainer] = useState<TrainerData | null>(null);
  const [rating, setRating] = useState<TrainerRatingData>({ averageRating: 0, totalReviews: 0 });
  const [programs, setPrograms] = useState<TrainingProgramType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!trainerId) {
      navigate('/trainers');
      return;
    }

    loadTrainerData();
  }, [trainerId]);

  const loadTrainerData = async () => {
    try {
      setLoading(true);
      setError('');

      const [trainerResponse, ratingData, programsData] = await Promise.all([
        axiosInstance.get(`/api/trainer/${trainerId}`),
        TrainerReviewService.getTrainerRating(Number(trainerId)),
        TrainingProgramService.getByTrainerId(Number(trainerId)),
      ]);

      const trainerData = trainerResponse.data.trainer;
      
      // Парсим qualificationImages если это строка
      let qualificationImages: string[] = [];
      if (trainerData.qualificationImages) {
        if (typeof trainerData.qualificationImages === 'string') {
          try {
            qualificationImages = JSON.parse(trainerData.qualificationImages);
          } catch {
            qualificationImages = [];
          }
        } else if (Array.isArray(trainerData.qualificationImages)) {
          qualificationImages = trainerData.qualificationImages;
        }
      }

      setTrainer({
        ...trainerData,
        qualificationImages,
      });
      setRating(ratingData);
      setPrograms(programsData);
    } catch (error: any) {
      console.error('Error loading trainer data:', error);
      setError('Ошибка загрузки данных тренера');
    } finally {
      setLoading(false);
    }
  };

  // Функция для обновления только рейтинга (без полной перезагрузки)
  const refreshRating = async () => {
    try {
      const ratingData = await TrainerReviewService.getTrainerRating(Number(trainerId));
      setRating(ratingData);
    } catch (error) {
      console.error('Error refreshing rating:', error);
    }
  };

  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;

    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push(<span key={i} className="star filled">★</span>);
      } else if (i === fullStars && hasHalfStar) {
        stars.push(<span key={i} className="star half">★</span>);
      } else {
        stars.push(<span key={i} className="star empty">☆</span>);
      }
    }

    return stars;
  };

  if (loading) {
    return (
      <div className="trainer-profile-page">
        <div className="loading">Загрузка профиля тренера...</div>
      </div>
    );
  }

  if (error || !trainer) {
    return (
      <div className="trainer-profile-page">
        <div className="error-state">
          <h2>Ошибка</h2>
          <p>{error || 'Тренер не найден'}</p>
          <button className="btn btn-primary" onClick={() => navigate('/trainers')}>
            Вернуться к списку тренеров
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="trainer-profile-page">
      <button className="back-btn" onClick={() => navigate('/trainers')}>
        ← Назад к списку
      </button>

      <div className="profile-container">
        {/* Шапка профиля */}
        <div className="profile-header">
          <div className="profile-image-section">
            {trainer.profileImage ? (
              <img
                src={getImageUrl(trainer.profileImage)}
                alt={trainer.name}
                className="profile-image"
                onError={(e) => handleImageError(e)}
              />
            ) : (
              <div className="profile-image-placeholder">
                <span>👤</span>
              </div>
            )}
          </div>

          <div className="profile-info-section">
            <h1 className="trainer-name">{trainer.name}</h1>
            
            <div className="trainer-rating-large">
              <div className="stars">{renderStars(rating.averageRating)}</div>
              <span className="rating-text">
                {rating.averageRating.toFixed(1)} ({rating.totalReviews} отзывов)
              </span>
            </div>

            {trainer.description && (
              <div className="trainer-description">
                <p>{trainer.description}</p>
              </div>
            )}
          </div>
        </div>

        {/* Сертификаты */}
        {trainer.qualificationImages && trainer.qualificationImages.length > 0 && (
          <div className="profile-section">
            <h2 className="section-title">Сертификаты и квалификация</h2>
            <div className="qualifications-grid">
              {trainer.qualificationImages.map((cert, index) => {
                const certUrl = typeof cert === 'string' ? cert : (cert as any).url || cert;
                return (
                  <div key={index} className="certificate-item">
                    <img
                      src={getImageUrl(certUrl)}
                      alt={`Сертификат ${index + 1}`}
                      className="certificate-image"
                      onError={(e) => handleImageError(e, 'https://via.placeholder.com/300x200?text=Сертификат')}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Программы тренировок */}
        <div className="profile-section">
          <h2 className="section-title">Программы тренировок</h2>
          {programs.length > 0 ? (
            <div className="programs-grid">
              {programs.map((program) => (
                <div key={program.id} className="program-card">
                  <h3 className="program-name">{program.name}</h3>
                  <p className="program-price">{program.price}</p>
                  <p className="program-contact">
                    <strong>Контакт:</strong> {program.contact}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <div className="no-programs">
              <p>У этого тренера пока нет программ тренировок</p>
            </div>
          )}
        </div>

        {/* Отзывы */}
        <div className="profile-section">
          <TrainerReviews trainerId={trainer.id} onReviewAdded={refreshRating} />
        </div>
      </div>
    </div>
  );
}
