import React, { useState, useCallback, useEffect } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router';
import { useAppDispatch, useAppSelector } from '@/shared/lib/hooks';
import { setUserParameters, setShowDietModal } from '@/entities/food-diary/model/foodDiary.Slice';
import { fetchDietRecommendationsThunk } from '@/entities/food-diary/model/foodDiary.Thunks';
import { useLocalStorage } from '@/shared/lib/useLocalStorage';
import type { UserParameters } from '@/entities/food-diary/model/foodDiary.Type';
import GoalTooltip from './GoalTooltip';
import styles from './UserParametersForm.module.css';

export default function UserParametersForm(): React.JSX.Element {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const userParameters = useAppSelector((store) => store.foodDiary.userParameters);
  
  // Сохранять параметры в localStorage
  const [savedParams, setSavedParams] = useLocalStorage<UserParameters | null>('userParameters', null);

  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [age, setAge] = useState('');
  const [goal, setGoal] = useState<'weight-loss' | 'muscle-gain' | 'recomposition'>('weight-loss');
  const [showTooltip, setShowTooltip] = useState(false);

  // Загрузить сохраненные параметры
  useEffect(() => {
    if (savedParams) {
      setWeight(savedParams.weight.toString());
      setHeight(savedParams.height.toString());
      setAge(savedParams.age.toString());
      setGoal(savedParams.goal);
      dispatch(setUserParameters(savedParams));
    }
  }, [savedParams, dispatch]);

  const isFormValid = useCallback(() => {
    const weightNum = parseFloat(weight);
    const heightNum = parseFloat(height);
    const ageNum = parseFloat(age);

    return (
      !isNaN(weightNum) && weightNum > 0 &&
      !isNaN(heightNum) && heightNum > 0 &&
      !isNaN(ageNum) && ageNum > 0 && ageNum < 150
    );
  }, [weight, height, age]);

  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();

    if (!isFormValid()) return;

    const params: UserParameters = {
      weight: parseFloat(weight),
      height: parseFloat(height),
      age: parseFloat(age),
      goal,
    };

    dispatch(setUserParameters(params));
    setSavedParams(params);
    
    // Редирект на страницу дневника питания
    // TODO: добавить проверку авторизации пользователя
    navigate('/analiz');
  }, [dispatch, navigate, weight, height, age, goal, isFormValid, setSavedParams]);

  const handleGetDiet = useCallback(async () => {
    if (userParameters) {
      await dispatch(fetchDietRecommendationsThunk(userParameters));
      dispatch(setShowDietModal(true));
    }
  }, [dispatch, userParameters]);

  return (
    <Form onSubmit={handleSubmit} className={`${styles.parametersForm} animate-fadeIn`}>
      {/* Секция: Ваши параметры */}
      <div className={styles.section}>
        <h5 className={styles.sectionTitle}>Ваши параметры</h5>
        <Row>
          <Col md={6} className="mb-3">
            <Form.Group>
              <Form.Label>Вес (кг)</Form.Label>
              <Form.Control
                type="number"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                placeholder="Например: 70"
                min="1"
                step="0.1"
                required
              />
            </Form.Group>
          </Col>

          <Col md={6} className="mb-3">
            <Form.Group>
              <Form.Label>Рост (см)</Form.Label>
              <Form.Control
                type="number"
                value={height}
                onChange={(e) => setHeight(e.target.value)}
                placeholder="Например: 175"
                min="1"
                step="1"
                required
              />
            </Form.Group>
          </Col>
        </Row>

        <Row>
          <Col md={12} className="mb-3">
            <Form.Group>
              <Form.Label>Возраст (лет)</Form.Label>
              <Form.Control
                type="number"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                placeholder="Например: 25"
                min="1"
                max="150"
                step="1"
                required
              />
            </Form.Group>
          </Col>
        </Row>
      </div>

      {/* Секция: Цель */}
      <div className={styles.section}>
        <h5 className={styles.sectionTitle}>Цель</h5>
        <Row>
          <Col md={12} className="mb-3">
            <Form.Group className={styles.goalGroup}>
              <Form.Label>Выберите вашу цель</Form.Label>
              <div 
                className={styles.selectWrapper}
                onMouseEnter={() => setShowTooltip(true)}
                onMouseLeave={() => setShowTooltip(false)}
              >
                <Form.Select
                  value={goal}
                  onChange={(e) => setGoal(e.target.value as typeof goal)}
                >
                  <option value="weight-loss">Спортивное похудение</option>
                  <option value="muscle-gain">Набор мышечной массы</option>
                  <option value="recomposition">Рекомпозиция</option>
                </Form.Select>
                <GoalTooltip goal={goal} show={showTooltip} />
              </div>
            </Form.Group>
          </Col>
        </Row>
      </div>

      <div className="d-flex gap-2">
        <Button 
          variant="primary" 
          type="submit" 
          disabled={!isFormValid()}
          className="flex-grow-1"
        >
          Сохранить параметры
        </Button>

        {userParameters && (
          <Button 
            variant="success" 
            onClick={handleGetDiet}
            className={`flex-grow-1 ${styles.dietButton}`}
          >
            Подобрать диету
          </Button>
        )}
      </div>

      {userParameters && (
        <div className={`${styles.savedInfo} mt-3 animate-fadeIn`}>
          <small className="text-success">
            Параметры сохранены
          </small>
        </div>
      )}
    </Form>
  );
}
