import React from 'react';
import { Card, Badge } from 'react-bootstrap';
import { useAppSelector } from '@/shared/lib/hooks';
import styles from './FoodDiaryList.module.css';

export default function FoodDiaryList(): React.JSX.Element {
  const foodEntries = useAppSelector((store) => store.foodDiary.foodEntries);

  // Фильтровать записи за сегодня
  const todayEntries = foodEntries.filter((entry) => {
    const entryDate = new Date(entry.timestamp);
    const today = new Date();
    return (
      entryDate.getDate() === today.getDate() &&
      entryDate.getMonth() === today.getMonth() &&
      entryDate.getFullYear() === today.getFullYear()
    );
  });

  // Подсчитать общую калорийность
  const totalCalories = todayEntries.reduce((sum, entry) => sum + entry.calories, 0);

  if (todayEntries.length === 0) {
    return (
      <div className={`${styles.emptyState} mt-4`}>
        <p className="text-muted text-center">
          Записей за сегодня пока нет. Добавьте первую запись!
        </p>
      </div>
    );
  }

  return (
    <div className={`${styles.diaryList} mt-4`}>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h5>Записи за сегодня</h5>
        <Badge bg="primary" className={styles.totalBadge}>
          {totalCalories} ккал
        </Badge>
      </div>

      <div className={styles.entriesList}>
        {todayEntries.map((entry, index) => (
          <Card 
            key={entry.id} 
            className={`${styles.entryCard} animate-fadeInUp mb-2`}
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <Card.Body className="d-flex gap-3">
              {entry.imageUrl && (
                <img
                  src={entry.imageUrl}
                  alt={entry.foodName}
                  className={styles.entryImage}
                />
              )}
              <div className="flex-grow-1">
                <h6 className={styles.foodName}>{entry.foodName}</h6>
                <div className={styles.entryDetails}>
                  {entry.weight && (
                    <span className="text-muted">{entry.weight}г</span>
                  )}
                  {entry.volume && (
                    <span className="text-muted">{entry.volume}мл</span>
                  )}
                  <span className="text-muted">
                    {new Date(entry.timestamp).toLocaleTimeString('ru-RU', {
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </span>
                </div>
              </div>
              <div className={styles.caloriesInfo}>
                <strong>{entry.calories}</strong>
                <small className="text-muted">ккал</small>
              </div>
            </Card.Body>
          </Card>
        ))}
      </div>
    </div>
  );
}
