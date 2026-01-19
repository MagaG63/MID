# Food Diary API Documentation

## Обзор

API для распознавания еды и подбора диет. Работает на собственном бэкенде без внешних зависимостей.

## Endpoints

### 1. Распознавание еды

**POST** `/api/food-diary/recognize`

Распознает еду по фотографии (base64).

**Request Body:**
```json
{
  "image": "base64_encoded_image_string",
  "userId": "optional_user_id"
}
```

**Response:**
```json
{
  "success": true,
  "foodName": "Греческий салат",
  "confidence": 0.92,
  "alternatives": [
    {
      "name": "Овощной салат",
      "confidence": 0.85
    },
    {
      "name": "Салат с фетой",
      "confidence": 0.75
    }
  ],
  "nutritionEstimate": {
    "caloriesPer100g": 120,
    "proteinPer100g": 3.5,
    "carbsPer100g": 8.2,
    "fatsPer100g": 8.5
  }
}
```

### 2. Подбор диет

**POST** `/api/food-diary/diet-recommendations`

Подбирает диеты на основе параметров пользователя.

**Request Body:**
```json
{
  "weight": 70,
  "height": 175,
  "age": 25,
  "goal": "weight-loss"
}
```

**Goals:**
- `weight-loss` - Похудение
- `muscle-gain` - Набор мышечной массы
- `recomposition` - Рекомпозиция

**Response:**
```json
{
  "success": true,
  "bmr": 1650,
  "tdee": 2310,
  "recommendedCalories": 1810,
  "diets": [
    {
      "id": "1",
      "name": "Средиземноморская диета",
      "description": "Сбалансированная диета...",
      "dailyCalories": 1810,
      "proteinPercent": 25,
      "carbsPercent": 45,
      "fatsPercent": 30,
      "suitableFor": ["weight-loss", "heart-health"]
    }
  ]
}
```

## База данных продуктов

Текущая база включает:
- Греческий салат
- Куриная грудка
- Рис
- Овощной салат
- Стейк
- Паста

Можно расширить в `food-diary.service.ts`.

## Расчет калорий

Используется формула Mifflin-St Jeor:
- BMR = 10 × вес(кг) + 6.25 × рост(см) - 5 × возраст + 5
- TDEE = BMR × 1.55 (умеренная активность)

Рекомендуемые калории:
- Похудение: TDEE - 500
- Набор массы: TDEE + 300
- Поддержание: TDEE

## Тестирование

### curl примеры:

**Распознавание еды:**
```bash
curl -X POST http://localhost:3000/api/food-diary/recognize \
  -H "Content-Type: application/json" \
  -d '{
    "image": "base64_string_here",
    "userId": "test-user"
  }'
```

**Подбор диет:**
```bash
curl -X POST http://localhost:3000/api/food-diary/diet-recommendations \
  -H "Content-Type: application/json" \
  -d '{
    "weight": 70,
    "height": 175,
    "age": 25,
    "goal": "weight-loss"
  }'
```

## Будущие улучшения

1. Интеграция с реальным AI (OpenAI Vision API)
2. Расширение базы продуктов
3. Сохранение истории распознавания
4. Персонализированные рекомендации
5. Учет уровня активности пользователя
