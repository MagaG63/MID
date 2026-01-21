# Trainer Reviews Feature - Система отзывов о тренерах

## Обзор
Полная CRUD система для отзывов пользователей о тренерах с рейтингом от 1 до 5.

## Структура базы данных

### Таблица: trainerRevievs
```sql
- id: INTEGER (PK, AUTO_INCREMENT)
- userId: INTEGER (FK -> users.id)
- trainerId: INTEGER (FK -> trainers.id)
- rate: INTEGER (1-5, NOT NULL)
- text: TEXT (OPTIONAL)
- createdAt: DATE
- updatedAt: DATE
```

### Связи
- User hasMany TrainerReview
- Trainer hasMany TrainerReview
- TrainerReview belongsTo User
- TrainerReview belongsTo Trainer

## API Endpoints

### POST /api/trainer-reviews
Создать отзыв (требуется авторизация)

**Request:**
```json
{
  "trainerId": 1,
  "rate": 5,
  "text": "Отличный тренер!"
}
```

**Response:**
```json
{
  "review": {
    "id": 1,
    "userId": 2,
    "trainerId": 1,
    "rate": 5,
    "text": "Отличный тренер!",
    "createdAt": "2026-01-21T...",
    "updatedAt": "2026-01-21T..."
  }
}
```

**Валидация:**
- trainerId: обязательное, число
- rate: обязательное, число от 1 до 5
- text: опциональное, строка
- Один пользователь может оставить только один отзыв одному тренеру

### GET /api/trainer-reviews/trainer/:trainerId
Получить все отзывы тренера (публичный доступ)

**Response:**
```json
{
  "reviews": [
    {
      "id": 1,
      "userId": 2,
      "trainerId": 1,
      "rate": 5,
      "text": "Отличный тренер!",
      "createdAt": "2026-01-21T...",
      "updatedAt": "2026-01-21T...",
      "user": {
        "id": 2,
        "name": "Иван Иванов"
      }
    }
  ]
}
```

### GET /api/trainer-reviews/trainer/:trainerId/rating
Получить средний рейтинг тренера (публичный доступ)

**Response:**
```json
{
  "averageRating": 4.5,
  "totalReviews": 10
}
```

### GET /api/trainer-reviews/user/my-reviews
Получить отзывы текущего пользователя (требуется авторизация)

**Response:**
```json
{
  "reviews": [
    {
      "id": 1,
      "userId": 2,
      "trainerId": 1,
      "rate": 5,
      "text": "Отличный тренер!",
      "createdAt": "2026-01-21T...",
      "updatedAt": "2026-01-21T..."
    }
  ]
}
```

### GET /api/trainer-reviews/:id
Получить один отзыв по ID (публичный доступ)

**Response:**
```json
{
  "review": {
    "id": 1,
    "userId": 2,
    "trainerId": 1,
    "rate": 5,
    "text": "Отличный тренер!",
    "createdAt": "2026-01-21T...",
    "updatedAt": "2026-01-21T...",
    "user": {
      "id": 2,
      "name": "Иван Иванов"
    }
  }
}
```

### PUT /api/trainer-reviews/:id
Обновить отзыв (требуется авторизация, только автор)

**Request:**
```json
{
  "rate": 4,
  "text": "Хороший тренер, но дорого"
}
```

**Response:**
```json
{
  "review": {
    "id": 1,
    "userId": 2,
    "trainerId": 1,
    "rate": 4,
    "text": "Хороший тренер, но дорого",
    "createdAt": "2026-01-21T...",
    "updatedAt": "2026-01-21T..."
  }
}
```

### DELETE /api/trainer-reviews/:id
Удалить отзыв (требуется авторизация, только автор)

**Response:**
```json
{
  "message": "Отзыв успешно удален"
}
```

## Бизнес-логика

### Создание отзыва
- Пользователь должен быть авторизован
- Один пользователь может оставить только один отзыв одному тренеру
- Рейтинг должен быть от 1 до 5
- Текст отзыва опционален

### Редактирование отзыва
- Только автор может редактировать свой отзыв
- Можно изменить рейтинг и/или текст

### Удаление отзыва
- Только автор может удалить свой отзыв

### Средний рейтинг
- Вычисляется автоматически на основе всех отзывов
- Округляется до 1 знака после запятой
- Если отзывов нет, возвращается 0

## Безопасность

### Авторизация
- Создание, редактирование, удаление требуют JWT токен
- Просмотр отзывов доступен всем

### Валидация
- Rate: 1-5 (проверяется на уровне DTO и модели)
- TrainerId: должен существовать
- UserId: берется из JWT токена

### Права доступа
- Редактировать/удалять может только автор отзыва
- Проверка владельца на уровне сервиса

## Файлы

### Backend
- `server/db/migrations/20260121081914-create-trainer-revievs.js` - миграция
- `server/src/trainer-reviews/trainer-review.model.ts` - модель
- `server/src/trainer-reviews/trainer-review.service.ts` - бизнес-логика
- `server/src/trainer-reviews/trainer-review.controller.ts` - API endpoints
- `server/src/trainer-reviews/trainer-review.module.ts` - модуль
- `server/src/trainer-reviews/dto/create-trainer-review.dto.ts` - DTO создания
- `server/src/trainer-reviews/dto/update-trainer-review.dto.ts` - DTO обновления

### Модели (обновлены)
- `server/src/user/user.model.ts` - добавлена связь hasMany TrainerReview
- `server/src/trainer/trainer.model.ts` - добавлена связь hasMany TrainerReview
- `server/src/app.module.ts` - зарегистрирован TrainerReviewModule

## Тестирование

### Создать отзыв
```bash
curl -X POST http://localhost:3000/api/trainer-reviews \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{
    "trainerId": 1,
    "rate": 5,
    "text": "Отличный тренер!"
  }'
```

### Получить отзывы тренера
```bash
curl http://localhost:3000/api/trainer-reviews/trainer/1
```

### Получить рейтинг тренера
```bash
curl http://localhost:3000/api/trainer-reviews/trainer/1/rating
```

### Обновить отзыв
```bash
curl -X PUT http://localhost:3000/api/trainer-reviews/1 \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{
    "rate": 4,
    "text": "Хороший тренер"
  }'
```

### Удалить отзыв
```bash
curl -X DELETE http://localhost:3000/api/trainer-reviews/1 \
  -H "Authorization: Bearer YOUR_TOKEN"
```

## Использование

### Сценарий 1: Пользователь оставляет отзыв
1. Пользователь авторизуется
2. Выбирает тренера
3. Ставит рейтинг (1-5 звезд)
4. Пишет текст отзыва (опционально)
5. Отправляет отзыв
6. Отзыв появляется в профиле тренера

### Сценарий 2: Просмотр отзывов
1. Любой посетитель открывает профиль тренера
2. Видит список всех отзывов
3. Видит средний рейтинг и количество отзывов
4. Может прочитать текст каждого отзыва

### Сценарий 3: Редактирование отзыва
1. Пользователь видит свой отзыв
2. Нажимает "Редактировать"
3. Изменяет рейтинг и/или текст
4. Сохраняет изменения

## Возможные улучшения

- Добавить пагинацию для отзывов
- Добавить сортировку (по дате, по рейтингу)
- Добавить фильтрацию (только 5 звезд, только с текстом)
- Добавить возможность ответа тренера на отзыв
- Добавить модерацию отзывов
- Добавить лайки/дизлайки к отзывам
- Добавить жалобы на отзывы
- Добавить фото к отзывам

## Статус
✅ Backend полностью реализован
⏳ Frontend нужно создать
