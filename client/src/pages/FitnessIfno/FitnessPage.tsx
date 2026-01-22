import { getOneFitnessClubThunk } from '@/entities/fitnessClubs/model/fitness.Thunks';
import { useAppDispatch, useAppSelector } from '@/shared/lib/hooks';
import { useEffect } from 'react';
import { useParams } from 'react-router';
import './FitnessPage.css';

function FitnessPage(): React.JSX.Element {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const club = useAppSelector((store) => store.fitness.currentClub);

  useEffect(() => {
    if (id) {
      void dispatch(getOneFitnessClubThunk(Number(id)));
    }
  }, [id]);

  if (!club) {
    return (
      <div className="fitness-club-page">
        <div className="not-found">Фитнес клуб не найден</div>
      </div>
    );
  }

  // Моковые данные для демонстрации
  const mockTags = [
    'Бассейн',
    'Сауна',
    'Групповые занятия',
    'Персональные тренировки',
    'Кардио зона',
    'Массаж',
  ];
  const mockFacilities = [
    'Современные тренажеры',
    'Зона свободных весов',
    'Кардио оборудование',
    'Раздевалки с душевыми',
    'Парковка',
    'Wi-Fi',
  ];

  return (
    <div className="fitness-club-page">
      <div className="fitness-club-card">
        <img src={club.image || '/images/default-gym.jpg'} alt={club.name} className="club-image" />

        <div className="club-content">
          {/* Заголовок и рейтинг */}
          <div className="club-header">
            <h1 className="club-name">{club.name}</h1>
            <div className="club-rating">★ {club.rating} (120 отзывов)</div>
          </div>

          {/* Контактная информация */}
          <div className="club-contact">
            <p>📍 {club.address}</p>
            <p>📞 {club.phone}</p>
            <p>✉️ {club.email}</p>
            <a
              href={club.website}
              className="club-website"
              target="_blank"
              rel="noopener noreferrer"
            >
              🌐 {club.website}
            </a>
          </div>

          {/* Описание */}
          <div className="club-description">
            <p>{club.description}</p>
          </div>

          {/* Часы работы */}
          <div className="club-hours">
            <h3 className="section-title">� Часы работы</h3>
            <p>
              <strong>Режим работы:</strong> {club.workingHours}
            </p>
          </div>

          {/* Теги услуг */}
          <div className="club-tags">
            <h3 className="section-title">🏷️ Услуги и особенности</h3>
            <div className="tags-container">
              {mockTags.map((tag, index) => (
                <span key={index} className="tag">
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Оборудование */}
          <div className="club-facilities">
            <h3 className="section-title">🏋️ Оборудование и зоны</h3>
            <ul className="facilities-list">
              {mockFacilities.map((facility, index) => (
                <li key={index} className="facility-item">
                  ✓ {facility}
                </li>
              ))}
            </ul>
          </div>

          {/* Цены */}
          <div className="club-pricing">
            <h3 className="section-title">💰 Стоимость абонементов</h3>
            <div className="pricing-grid">
              <div className="price-item">
                <span className="price-label">Месяц</span>
                <span className="price-value">{club.priceRange}</span>
              </div>
              <div className="price-item">
                <span className="price-label">Квартал</span>
                <span className="price-value">{`${Math.round(Number(club.priceRange) * 2.3)}руб`}</span>
              </div>
              <div className="price-item">
                <span className="price-label">Год</span>
                <span className="price-value">{`${Number(club.priceRange) * 9}руб`}</span>
              </div>
              <div className="price-item">
                <span className="price-label">Пробное</span>
                <span className="price-value">500 ₽</span>
              </div>
            </div>
          </div>

          {/* Кнопки действий */}
          <div className="club-actions">
            <button className="btn-primary">Записаться на пробное</button>
            <button className="btn-secondary">Позвонить</button>
            <button className="btn-outline">Сохранить в избранное</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FitnessPage;
