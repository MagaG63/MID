# Training Program - Быстрый старт

## Что исправлено

Модель `TrainingProgram` перенесена из `db/models` в `src/training-program` для правильной работы с TypeScript и NestJS.

## Структура файлов

```
server/src/training-program/
├── dto/
│   ├── create-training-program.dto.ts
│   └── update-training-program.dto.ts
├── training-program.model.ts          ✅ Модель здесь
├── training-program.controller.ts
├── training-program.service.ts
└── training-program.module.ts
```

## Запуск

### 1. Примените миграцию

```cmd
cd server
node_modules\.bin\sequelize-cli db:migrate
```

Или вручную выполните SQL:

```sql
CREATE TABLE traineProgramms (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  trainerId INTEGER NOT NULL,
  name VARCHAR(255) NOT NULL,
  price VARCHAR(255) NOT NULL,
  contact VARCHAR(255) NOT NULL,
  createdAt DATETIME NOT NULL,
  updatedAt DATETIME NOT NULL,
  FOREIGN KEY (trainerId) REFERENCES trainers(id) ON DELETE CASCADE ON UPDATE CASCADE
);
```

### 2. Запустите сервер

```cmd
npm run start:dev
```

### 3. Проверьте работу

```bash
# Получить все программы
curl http://localhost:3000/api/training-program

# Создать программу
curl -X POST http://localhost:3000/api/training-program \
  -H "Content-Type: application/json" \
  -d '{
    "trainerId": 1,
    "name": "Программа для начинающих",
    "price": "5000 руб/месяц",
    "contact": "@trainer_username"
  }'
```

## API Endpoints

| Метод | URL | Описание |
|-------|-----|----------|
| GET | `/api/training-program` | Все программы |
| GET | `/api/training-program/:id` | Одна программа |
| GET | `/api/training-program/trainer/:trainerId` | Программы тренера |
| POST | `/api/training-program` | Создать программу |
| PUT | `/api/training-program/:id` | Обновить программу |
| DELETE | `/api/training-program/:id` | Удалить программу |

## Пример использования

### Создание программы

**Request:**
```json
POST /api/training-program
{
  "trainerId": 1,
  "name": "Программа для начинающих",
  "price": "5000 руб/месяц",
  "contact": "@trainer_username"
}
```

**Response:**
```json
{
  "program": {
    "id": 1,
    "trainerId": 1,
    "name": "Программа для начинающих",
    "price": "5000 руб/месяц",
    "contact": "@trainer_username",
    "createdAt": "2026-01-20T...",
    "updatedAt": "2026-01-20T..."
  }
}
```

### Получение программ тренера

**Request:**
```
GET /api/training-program/trainer/1
```

**Response:**
```json
{
  "programs": [
    {
      "id": 1,
      "trainerId": 1,
      "name": "Программа для начинающих",
      "price": "5000 руб/месяц",
      "contact": "@trainer_username",
      "createdAt": "2026-01-20T...",
      "updatedAt": "2026-01-20T...",
      "trainer": {
        "id": 1,
        "name": "Иван Иванов",
        "email": "trainer@example.com",
        "profileImage": "http://localhost:3000/uploads/profile/..."
      }
    }
  ]
}
```

## Связи

### TrainingProgram → Trainer

```typescript
@BelongsTo(() => Trainer)
trainer: Trainer;
```

### Trainer → TrainingProgram

```typescript
@HasMany(() => TrainingProgram)
trainingPrograms: TrainingProgram[];
```

## Безопасность

При обновлении и удалении проверяется, что программа принадлежит тренеру:

```typescript
if (program.trainerId !== trainerId) {
  throw new ForbiddenException('Вы не можете редактировать эту программу');
}
```

## Валидация

### CreateTrainingProgramDto

- `trainerId` - обязательное, число
- `name` - обязательное, строка (1-100 символов)
- `price` - обязательное, строка
- `contact` - обязательное, строка (минимум 5 символов)

### UpdateTrainingProgramDto

Все поля опциональные:
- `name` - строка (1-100 символов)
- `price` - строка
- `contact` - строка (минимум 5 символов)

## Тестирование

### 1. Создайте тренера

Сначала зарегистрируйте тренера или используйте существующего.

### 2. Создайте программу

```bash
curl -X POST http://localhost:3000/api/training-program \
  -H "Content-Type: application/json" \
  -d '{
    "trainerId": 1,
    "name": "Тестовая программа",
    "price": "5000 руб",
    "contact": "@test_trainer"
  }'
```

### 3. Получите программы

```bash
curl http://localhost:3000/api/training-program
```

### 4. Обновите программу

```bash
curl -X PUT http://localhost:3000/api/training-program/1 \
  -H "Content-Type: application/json" \
  -d '{
    "trainerId": 1,
    "name": "Обновленная программа",
    "price": "6000 руб"
  }'
```

### 5. Удалите программу

```bash
curl -X DELETE http://localhost:3000/api/training-program/1 \
  -H "Content-Type: application/json" \
  -d '{"trainerId": 1}'
```

## Возможные ошибки

### 404 Not Found
- Программа с указанным ID не существует
- Проверьте ID программы

### 403 Forbidden
- Программа принадлежит другому тренеру
- Проверьте trainerId в запросе

### 400 Bad Request
- Неверные данные в запросе
- Проверьте валидацию полей

### Foreign key constraint failed
- Тренер с указанным trainerId не существует
- Создайте тренера или используйте существующий ID

## Следующие шаги

1. **Добавьте JWT аутентификацию** - получайте trainerId из токена
2. **Создайте клиентскую часть** - компоненты для работы с программами
3. **Добавьте изображения** - возможность загрузки обложки программы
4. **Добавьте описание** - подробное описание программы
5. **Добавьте категории** - типы программ (силовые, кардио и т.д.)

## Документация

Полная документация доступна в:
- `docs/training-program-api.md` - описание API
- `docs/training-program-setup.md` - детальная настройка
