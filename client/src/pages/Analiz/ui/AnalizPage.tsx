import React, { useEffect, useCallback, lazy, Suspense } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import styles from './AnalizPage.module.css';
import '@/shared/styles/components.css';
import { useAppDispatch, useAppSelector } from '@/shared/lib/hooks';
import { recognizeFoodThunk } from '@/entities/food-diary/model/foodDiary.Thunks';
import { clearRecognitionError } from '@/entities/food-diary/model/foodDiary.Slice';

// Lazy loading компонентов
const FoodUploader = lazy(() => import('../components/FoodUploader'));
const FoodEntryForm = lazy(() => import('../components/FoodEntryForm'));
const FoodDiaryList = lazy(() => import('../components/FoodDiaryList'));
const UserParametersForm = lazy(() => import('../components/UserParametersForm'));
const DietModal = lazy(() => import('../components/DietModal'));
const FoodAlternatives = lazy(() => import('../components/FoodAlternatives'));

export default function AnalizPage(): React.JSX.Element {
  const dispatch = useAppDispatch();
  
  const recognizedFood = useAppSelector((store) => store.foodDiary.recognizedFood);
  const isRecognizing = useAppSelector((store) => store.foodDiary.isRecognizing);
  const recognitionError = useAppSelector((store) => store.foodDiary.recognitionError);
  const [uploadedImageUrl, setUploadedImageUrl] = React.useState<string>('');

  const handleImageUpload = useCallback(async (file: File): Promise<void> => {
    console.log('📸 AnalizPage: handleImageUpload called with file:', file.name);
    
    // Создать URL для preview
    const imageUrl = URL.createObjectURL(file);
    setUploadedImageUrl(imageUrl);
    
    console.log('📤 AnalizPage: Dispatching recognizeFoodThunk...');
    await dispatch(recognizeFoodThunk(file));
    console.log('✅ AnalizPage: recognizeFoodThunk dispatched');
  }, [dispatch]);

  // Очистить ошибку через 5 секунд
  useEffect(() => {
    if (recognitionError) {
      const timer = setTimeout(() => {
        dispatch(clearRecognitionError());
      }, 5000);
      return () => clearTimeout(timer);
    }
    return undefined;
  }, [recognitionError, dispatch]);

  return (
    <Container fluid className={`${styles.analizPage} animate-fadeIn`}>
      <Row className="mb-4">
        <Col>
          <h1 className={`${styles.pageTitle} text-center animate-fadeInDown`}>
            Анализ питания
          </h1>
          <p className="text-center text-muted animate-fadeInUp">
            Загрузите фото вашей еды, и AI автоматически определит, что вы съели
          </p>
        </Col>
      </Row>

      <Row>
        <Col lg={6} className="mb-4">
          <div className={`${styles.section} animate-slideInLeft`}>
            <h3>Дневник питания</h3>
            <Suspense fallback={<div className="text-center">Загрузка...</div>}>
              <FoodUploader
                onImageUpload={handleImageUpload}
                isRecognizing={isRecognizing}
              />
            </Suspense>
            {recognitionError && (
              <div className="alert alert-warning mt-3 animate-fadeIn" role="alert">
                {recognitionError}
                <br />
                <small>Вы можете ввести название еды вручную</small>
              </div>
            )}
            {recognizedFood && (
              <div className="alert alert-success mt-3 animate-scaleIn" role="alert">
                <strong>Распознано:</strong> {recognizedFood}
              </div>
            )}
            <Suspense fallback={null}>
              <FoodAlternatives />
            </Suspense>
            <Suspense fallback={<div className="text-center">Загрузка...</div>}>
              <FoodEntryForm 
                recognizedFood={recognizedFood}
                imageUrl={uploadedImageUrl}
              />
            </Suspense>
            <Suspense fallback={<div className="text-center">Загрузка...</div>}>
              <FoodDiaryList />
            </Suspense>
          </div>
        </Col>

        <Col lg={6} className="mb-4">
          <div className={`${styles.section} animate-slideInRight`}>
            <h3>Ваши параметры</h3>
            <Suspense fallback={<div className="text-center">Загрузка...</div>}>
              <UserParametersForm />
            </Suspense>
          </div>
        </Col>
      </Row>

      {/* DietModal */}
      <Suspense fallback={null}>
        <DietModal />
      </Suspense>
    </Container>
  );
}
