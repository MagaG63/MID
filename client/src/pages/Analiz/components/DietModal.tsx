import React, { useEffect, useRef } from 'react';
import { Modal, Card, Badge, Row, Col } from 'react-bootstrap';
import { useAppDispatch, useAppSelector } from '@/shared/lib/hooks';
import { setShowDietModal } from '@/entities/food-diary/model/foodDiary.Slice';
import gsap from 'gsap';
import styles from './DietModal.module.css';

export default function DietModal(): React.JSX.Element {
  const dispatch = useAppDispatch();
  const show = useAppSelector((store) => store.foodDiary.showDietModal);
  const diets = useAppSelector((store) => store.foodDiary.recommendedDiets);
  
  const modalRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    if (show && cardsRef.current.length > 0) {
      // GSAP анимация появления карточек
      gsap.fromTo(
        cardsRef.current,
        {
          opacity: 0,
          y: 30,
          scale: 0.9,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.5,
          stagger: 0.15,
          ease: 'back.out(1.7)',
        }
      );
    }
  }, [show, diets]);

  const handleClose = () => {
    dispatch(setShowDietModal(false));
  };

  return (
    <Modal 
      show={show} 
      onHide={handleClose} 
      size="lg"
      centered
      className={styles.dietModal}
    >
      <Modal.Header closeButton className={styles.modalHeader}>
        <Modal.Title>
          <svg className={styles.modalIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          Рекомендованные диеты
        </Modal.Title>
      </Modal.Header>
      
      <Modal.Body className={styles.modalBody}>
        {diets.length === 0 ? (
          <div className={styles.emptyState}>
            <p className="text-muted text-center">
              Загружаем рекомендации...
            </p>
          </div>
        ) : (
          <Row>
            {diets.map((diet, index) => (
              <Col md={12} key={diet.id} className="mb-3">
                <Card 
                  ref={(el) => {
                    if (el) cardsRef.current[index] = el;
                  }}
                  className={styles.dietCard}
                >
                  <Card.Body>
                    <div className="d-flex justify-content-between align-items-start mb-2">
                      <Card.Title className={styles.dietName}>
                        {diet.name}
                      </Card.Title>
                      <Badge bg="primary" className={styles.caloriesBadge}>
                        {diet.dailyCalories} ккал/день
                      </Badge>
                    </div>
                    
                    <Card.Text className={styles.dietDescription}>
                      {diet.description}
                    </Card.Text>

                    <div className={styles.macros}>
                      <div className={styles.macroItem}>
                        <span className={styles.macroLabel}>Белки</span>
                        <span className={styles.macroValue}>{diet.proteinPercent}%</span>
                      </div>
                      <div className={styles.macroItem}>
                        <span className={styles.macroLabel}>Углеводы</span>
                        <span className={styles.macroValue}>{diet.carbsPercent}%</span>
                      </div>
                      <div className={styles.macroItem}>
                        <span className={styles.macroLabel}>Жиры</span>
                        <span className={styles.macroValue}>{diet.fatsPercent}%</span>
                      </div>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        )}
      </Modal.Body>
    </Modal>
  );
}
