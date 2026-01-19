import React, { useState, useCallback, useEffect } from 'react';
import { Form, Button, InputGroup } from 'react-bootstrap';
import { useAppDispatch } from '@/shared/lib/hooks';
import { addFoodEntry, clearRecognizedFood } from '@/entities/food-diary/model/foodDiary.Slice';
import type { FoodEntry } from '@/entities/food-diary/model/foodDiary.Type';
import styles from './FoodEntryForm.module.css';

interface FoodEntryFormProps {
  recognizedFood: string;
  imageUrl: string;
}

export default function FoodEntryForm({ 
  recognizedFood,
  imageUrl 
}: FoodEntryFormProps): React.JSX.Element {
  const dispatch = useAppDispatch();
  
  const [foodName, setFoodName] = useState('');
  const [measurementType, setMeasurementType] = useState<'weight' | 'volume'>('weight');
  const [weight, setWeight] = useState<string>('');
  const [volume, setVolume] = useState<string>('');

  // Обновить название еды при распознавании
  useEffect(() => {
    if (recognizedFood) {
      setFoodName(recognizedFood);
    }
  }, [recognizedFood]);

  const isFormValid = useCallback(() => {
    if (!foodName.trim()) return false;
    if (measurementType === 'weight') {
      const weightNum = parseFloat(weight);
      return !isNaN(weightNum) && weightNum > 0;
    } else {
      const volumeNum = parseFloat(volume);
      return !isNaN(volumeNum) && volumeNum > 0;
    }
  }, [foodName, measurementType, weight, volume]);

  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isFormValid()) return;

    const entry: FoodEntry = {
      id: Date.now().toString(),
      foodName: foodName.trim(),
      weight: measurementType === 'weight' ? parseFloat(weight) : undefined,
      volume: measurementType === 'volume' ? parseFloat(volume) : undefined,
      calories: 0, // TODO: Рассчитать из nutrition API
      protein: 0,
      carbs: 0,
      fats: 0,
      imageUrl,
      timestamp: new Date(),
    };

    dispatch(addFoodEntry(entry));
    
    // Очистить форму
    setFoodName('');
    setWeight('');
    setVolume('');
    dispatch(clearRecognizedFood());
  }, [dispatch, foodName, measurementType, weight, volume, imageUrl, isFormValid]);

  const handleMeasurementTypeChange = useCallback((type: 'weight' | 'volume') => {
    setMeasurementType(type);
    // Очистить другое поле
    if (type === 'weight') {
      setVolume('');
    } else {
      setWeight('');
    }
  }, []);

  if (!recognizedFood && !foodName) {
    return <></>;
  }

  return (
    <Form onSubmit={handleSubmit} className={`${styles.entryForm} animate-fadeInUp mt-3`}>
      <Form.Group className="mb-3">
        <Form.Label>Название еды</Form.Label>
        <Form.Control
          type="text"
          value={foodName}
          onChange={(e) => setFoodName(e.target.value)}
          placeholder="Введите название еды"
          required
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Тип измерения</Form.Label>
        <div className="d-flex gap-2">
          <Form.Check
            type="radio"
            id="weight-radio"
            label="Вес (г)"
            checked={measurementType === 'weight'}
            onChange={() => handleMeasurementTypeChange('weight')}
          />
          <Form.Check
            type="radio"
            id="volume-radio"
            label="Объем (мл)"
            checked={measurementType === 'volume'}
            onChange={() => handleMeasurementTypeChange('volume')}
          />
        </div>
      </Form.Group>

      {measurementType === 'weight' ? (
        <Form.Group className="mb-3">
          <Form.Label>Вес (граммы)</Form.Label>
          <InputGroup>
            <Form.Control
              type="number"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              placeholder="Введите вес"
              min="1"
              step="1"
              required
            />
            <InputGroup.Text>г</InputGroup.Text>
          </InputGroup>
        </Form.Group>
      ) : (
        <Form.Group className="mb-3">
          <Form.Label>Объем (миллилитры)</Form.Label>
          <InputGroup>
            <Form.Control
              type="number"
              value={volume}
              onChange={(e) => setVolume(e.target.value)}
              placeholder="Введите объем"
              min="1"
              step="1"
              required
            />
            <InputGroup.Text>мл</InputGroup.Text>
          </InputGroup>
        </Form.Group>
      )}

      <Button 
        variant="primary" 
        type="submit" 
        disabled={!isFormValid()}
        className="w-100"
      >
        Сохранить запись
      </Button>
    </Form>
  );
}
