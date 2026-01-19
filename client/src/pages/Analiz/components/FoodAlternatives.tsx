import React, { useCallback } from 'react';
import { Button } from 'react-bootstrap';
import { useAppDispatch, useAppSelector } from '@/shared/lib/hooks';
import { setRecognizedFood } from '@/entities/food-diary/model/foodDiary.Slice';
import styles from './FoodAlternatives.module.css';

export default function FoodAlternatives(): React.JSX.Element {
  const dispatch = useAppDispatch();
  const alternatives = useAppSelector((store) => store.foodDiary.recognitionAlternatives);

  const handleSelectAlternative = useCallback((name: string) => {
    dispatch(setRecognizedFood(name));
  }, [dispatch]);

  if (alternatives.length === 0) {
    return <></>;
  }

  return (
    <div className={`${styles.alternatives} mt-3 animate-fadeIn`}>
      <p className={styles.alternativesTitle}>Или выберите из альтернатив:</p>
      <div className={styles.alternativesList}>
        {alternatives.map((alt, index) => (
          <Button
            key={index}
            variant="outline-secondary"
            size="sm"
            className={styles.alternativeButton}
            onClick={() => handleSelectAlternative(alt.name)}
          >
            {alt.name}
            <span className={styles.confidence}>
              {Math.round(alt.confidence * 100)}%
            </span>
          </Button>
        ))}
      </div>
    </div>
  );
}
