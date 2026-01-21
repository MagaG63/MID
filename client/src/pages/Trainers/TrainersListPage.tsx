// pages/Trainers/TrainersListPage.tsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { useAppDispatch, useAppSelector } from '@/shared/lib/hooks';
import { fetchTrainersThunk } from '@/entities/trainer/model/trainer.thunk';
import TrainerReviewService from '@/entities/trainer-reviews/api/trainer-review.service';
import TrainingProgramService from '@/entities/training-program/api/training-program.service';
import type { TrainerRatingData } from '@/entities/trainer-reviews/model/trainer-review.type';
import type { TrainingProgramType } from '@/entities/training-program/model/training-program.type';
import { getImageUrl, handleImageError } from '@/shared/lib/imageUtils';
import './TrainersListPage.css';

interface TrainerWithData {
  id: number;
  name: string;
  email: string;
  description: string;
  profileImage: string;
  rating: TrainerRatingData;
  programs: TrainingProgramType[];
}

export default function TrainersListPage(): React.JSX.Element {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const trainers = useAppSelector((state) => state.trainer.trainers);
  const loading = useAppSelector((state) => state.trainer.loading.trainers);
  
  const [trainersWithData, setTrainersWithData] = useState<TrainerWithData[]>([]);
  const [dataLoading, setDataLoading] = useState(true);

  // Загружаем список тренеров
  useEffect(() => {
    dispatch(fetchTrainersThunk());
  }, [dispatch]);

  // Загружаем рейтинги и программы для каждого тренера
  useEffect(() => {
    const loadTrainersData = async () => {
      if (trainers.length === 0) {
        setDataLoading(false);
        return;
      }

      setDataLoading(true);
      try {
        const trainersData = await Promise.all(
          trainers.map(async (trainer) => {
            try {
              const [rating, programs] = await Promise.all([
                TrainerReviewService.getTrainerRating(trainer.id),
                TrainingProgramService.getByTrainerId(trainer.id),
              ]);

              return {
                id: trainer.id,
                name: trainer.name,
                email: trainer.email,
                description: (trainer as any).description || '',
                profileImage: (trainer as any).profileImage || '',
                rating,
                programs,
              };
            } catch (error) {
              console.error(`Error loading data for trainer ${trainer.id}:`, error);
              return {
                id: trainer.id,
                name: trainer.name,
                email: trainer.email,
                description: (trainer as any).description || '',
                profileImage: (trainer as any).profileImage || '',
                rating: { averageRating: 0, totalReviews: 0 },
                programs: [],
              };
            }
          })
        );

        setTrainersWithData(trainersData);
      } catch (error) {
        console.error('Error loading trainers data:', error);
      } finally {
        setDataLoading(false);
      }
    };

    loadTrainersData();
  }, [trainers]);

  const handleTrainerClick = (trainerId: number) => {
    navigate(`/trainers/${trainerId}`);
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

  if (loading || dataLoading) {
    return (
      <div className="trainers-page">
        <div className="loading">Загрузка тренеров...</div>
      </div>
    );
  }

  if (trainersWithData.length === 0) {
    return (
      <div className="trainers-page">
        <div className="empty-state">
          <h2>Тренеры не найдены</h2>
          <p>В данный момент нет доступных тренеров</p>
        </div>
      </div>
    );
  }

  return (
    <div className="trainers-page">
      <div className="trainers-header">
        <h1>Наши тренеры</h1>
        <p>Выберите тренера и начните свой путь к здоровью</p>
      </div>

      <div className="trainers-grid">
        {trainersWithData.map((trainer) => (
          <div
            key={trainer.id}
            className="trainer-card"
            onClick={() => handleTrainerClick(trainer.id)}
          >
            <div className="trainer-image-container">
              {trainer.profileImage ? (
                <img
                  src={getImageUrl(trainer.profileImage)}
                  alt={trainer.name}
                  className="trainer-image"
                  onError={(e) => handleImageError(e)}
                />
              ) : (
                <div className="trainer-image-placeholder">
                  <span>👤</span>
                </div>
              )}
            </div>

            <div className="trainer-info">
              <h3 className="trainer-name">{trainer.name}</h3>
              
              <div className="trainer-rating">
                <div className="stars">{renderStars(trainer.rating.averageRating)}</div>
                <span className="rating-text">
                  {trainer.rating.averageRating.toFixed(1)} ({trainer.rating.totalReviews} отзывов)
                </span>
              </div>

              {trainer.description && (
                <p className="trainer-description">
                  {trainer.description.length > 100
                    ? `${trainer.description.substring(0, 100)}...`
                    : trainer.description}
                </p>
              )}

              <div className="trainer-programs">
                <h4>Программы тренировок:</h4>
                {trainer.programs.length > 0 ? (
                  <ul className="programs-list">
                    {trainer.programs.slice(0, 3).map((program) => (
                      <li key={program.id}>
                        <span className="program-name">{program.name}</span>
                        <span className="program-price">{program.price}</span>
                      </li>
                    ))}
                    {trainer.programs.length > 3 && (
                      <li className="more-programs">
                        +{trainer.programs.length - 3} еще...
                      </li>
                    )}
                  </ul>
                ) : (
                  <p className="no-programs">Нет доступных программ</p>
                )}
              </div>

              <button className="view-profile-btn">Посмотреть профиль</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
