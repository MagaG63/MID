# Исправления для страниц тренеров и отзывов

## Проблемы которые были исправлены

### 1. ❌ Ошибка 400 при загрузке тренеров
**Проблема:** `GET /api/trainer/all` возвращал 400, потому что эндпоинта не существовало

**Исправление:**
- ✅ Добавлен эндпоинт `GET /api/trainer` в `trainer.controller.ts`
- ✅ Изменен путь в `trainer.api.ts` с `/api/trainer/all` на `/api/trainer`

### 2. ❌ Неполная структура entity trainer-reviews
**Проблема:** Не было slice и index файлов для trainer-reviews

**Исправление:**
- ✅ Создан `trainer-review.slice.ts` с actions и reducer
- ✅ Создан `index.ts` с экспортами
- ✅ Теперь структура соответствует другим entities

## Файлы изменены

### Backend
- ✅ `server/src/trainer/trainer.controller.ts`
  - Добавлен метод `getAllTrainers()` с декоратором `@Get()`
  - Возвращает `{ trainers: SafeTrainerData[] }`

### Frontend
- ✅ `client/src/entities/trainer/api/trainer.api.ts`
  - Изменен путь с `/api/trainer/all` на `/api/trainer`

- ✅ `client/src/entities/trainer-reviews/model/trainer-review.slice.ts` (создан)
  - Redux slice с actions: setReviews, addReview, updateReview, deleteReview
  - State: reviews, loading, error

- ✅ `client/src/entities/trainer-reviews/index.ts` (создан)
  - Экспорты reducer, actions, types, service

## Структура trainer-reviews entity

```
client/src/entities/trainer-reviews/
├── index.ts                          ✅ Экспорты
├── model/
│   ├── trainer-review.type.ts        ✅ Types
│   └── trainer-review.slice.ts       ✅ Redux slice
└── api/
    └── trainer-review.service.ts     ✅ API service
```

## API Endpoints

### Тренеры
- `GET /api/trainer` - получить всех тренеров ✅
- `GET /api/trainer/:id` - получить одного тренера ✅

### Отзывы
- `GET /api/trainer-reviews/trainer/:trainerId` - отзывы тренера ✅
- `GET /api/trainer-reviews/trainer/:trainerId/rating` - рейтинг ✅
- `POST /api/trainer-reviews` - создать отзыв ✅
- `PUT /api/trainer-reviews/:id` - обновить отзыв ✅
- `DELETE /api/trainer-reviews/:id` - удалить отзыв ✅

### Программы
- `GET /api/training-program/trainer/:trainerId` - программы тренера ✅

## Как проверить

### 1. Перезапусти сервер
```bash
cd server
npm run start
```

Должен запуститься без ошибок.

### 2. Проверь эндпоинт тренеров
```bash
curl http://localhost:3000/api/trainer
```

Должен вернуть:
```json
{
  "trainers": [...]
}
```

### 3. Перезапусти клиент
```bash
cd client
npm run dev
```

### 4. Зайди как user
1. Логин как user
2. Нажми "Тренеры" в навигации
3. Должен загрузиться список тренеров

### 5. Проверь профиль тренера
1. Нажми на карточку тренера
2. Должен открыться профиль
3. Должны быть видны отзывы
4. Должна быть кнопка "Оставить отзыв"

### 6. Оставь отзыв
1. Нажми "Оставить отзыв"
2. Выбери рейтинг
3. Напиши текст
4. Нажми "Отправить"
5. Отзыв должен появиться в списке

## Что теперь работает

✅ Загрузка списка тренеров
✅ Отображение карточек с рейтингом
✅ Переход в профиль тренера
✅ Отображение отзывов
✅ Создание отзывов (только user)
✅ Отображение программ тренировок
✅ Защита доступа (только user)

## Если все еще есть ошибки

### Ошибка: Cannot read property 'trainers'
**Решение:** Проверь что сервер вернул правильный формат `{ trainers: [...] }`

### Ошибка: 404 Not Found
**Решение:** Убедись что сервер запущен и эндпоинты зарегистрированы

### Ошибка: 401 Unauthorized
**Решение:** Убедись что ты авторизован как user

### Белый экран
**Решение:** 
1. Открой консоль браузера (F12)
2. Посмотри на ошибки
3. Проверь Network tab

## Статус
✅ Все исправлено и должно работать!
