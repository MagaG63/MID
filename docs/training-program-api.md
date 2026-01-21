# Training Program API

## Описание

API для управления программами тренировок. Каждая программа принадлежит конкретному тренеру и содержит информацию о цене, названии и контакте для связи (Telegram).

## Структура данных

### TrainingProgram

```typescript
{
  id: number;
  trainerId: number;
  name: string;
  price: string;
  contact: string; // Telegram link
  createdAt: Date;
  updatedAt: Date;
  trainer?: {
    id: number;
    name: string;
    email: string;
    profileImage: string;
  };
}
```

## API Endpoints

### 1. Создание программы тренировок

**POST** `/api/training-program`

**Request Body:**
```json
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

**Валидация:**
- `trainerId` - обязательное, число
- `name` - обязательное, строка (1-100 символов)
- `price` - обязательное, строка
- `contact` - обязательное, строка (минимум 5 символов)

---

### 2. Получение всех программ

**GET** `/api/training-program`

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

---

### 3. Получение программ конкретного тренера

**GET** `/api/training-program/trainer/:trainerId`

**Параметры:**
- `trainerId` - ID тренера

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

---

### 4. Получение одной программы по ID

**GET** `/api/training-program/:id`

**Параметры:**
- `id` - ID программы

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
    "updatedAt": "2026-01-20T...",
    "trainer": {
      "id": 1,
      "name": "Иван Иванов",
      "email": "trainer@example.com",
      "profileImage": "http://localhost:3000/uploads/profile/..."
    }
  }
}
```

**Ошибки:**
- `404` - Программа не найдена

---

### 5. Обновление программы

**PUT** `/api/training-program/:id`

**Параметры:**
- `id` - ID программы

**Request Body:**
```json
{
  "trainerId": 1,
  "name": "Обновленное название",
  "price": "6000 руб/месяц",
  "contact": "@new_username"
}
```

**Response:**
```json
{
  "program": {
    "id": 1,
    "trainerId": 1,
    "name": "Обновленное название",
    "price": "6000 руб/месяц",
    "contact": "@new_username",
    "createdAt": "2026-01-20T...",
    "updatedAt": "2026-01-20T..."
  }
}
```

**Валидация:**
- Все поля опциональные
- `trainerId` - обязательное для проверки прав доступа

**Ошибки:**
- `404` - Программа не найдена
- `403` - Нет прав для редактирования (программа принадлежит другому тренеру)

---

### 6. Удаление программы

**DELETE** `/api/training-program/:id`

**Параметры:**
- `id` - ID программы

**Request Body:**
```json
{
  "trainerId": 1
}
```

**Response:**
```json
{
  "message": "Программа тренировок успешно удалена"
}
```

**Ошибки:**
- `404` - Программа не найдена
- `403` - Нет прав для удаления (программа принадлежит другому тренеру)

---

## База данных

### Таблица: traineProgramms

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

### Связи

- **TrainingProgram** `belongsTo` **Trainer** (многие к одному)
- **Trainer** `hasMany` **TrainingProgram** (один ко многим)

---

## Примеры использования

### cURL

#### Создание программы
```bash
curl -X POST http://localhost:3000/api/training-program \
  -H "Content-Type: application/json" \
  -d '{
    "trainerId": 1,
    "name": "Программа для начинающих",
    "price": "5000 руб/месяц",
    "contact": "@trainer_username"
  }'
```

#### Получение всех программ
```bash
curl http://localhost:3000/api/training-program
```

#### Получение программ тренера
```bash
curl http://localhost:3000/api/training-program/trainer/1
```

#### Обновление программы
```bash
curl -X PUT http://localhost:3000/api/training-program/1 \
  -H "Content-Type: application/json" \
  -d '{
    "trainerId": 1,
    "name": "Обновленное название",
    "price": "6000 руб/месяц"
  }'
```

#### Удаление программы
```bash
curl -X DELETE http://localhost:3000/api/training-program/1 \
  -H "Content-Type: application/json" \
  -d '{"trainerId": 1}'
```

---

## Миграция

Для применения миграции:

```bash
cd server
npx sequelize-cli db:migrate
```

Для отката:

```bash
npx sequelize-cli db:migrate:undo
```

---

## Безопасность

### Текущая реализация
- Проверка прав доступа по `trainerId` при обновлении и удалении
- Валидация входных данных через DTO

### Рекомендации для production
1. **Аутентификация** - добавить JWT guards
2. **Авторизация** - использовать декораторы для проверки роли
3. **Rate limiting** - ограничение количества запросов
4. **Санитизация** - очистка HTML в полях
5. **Логирование** - запись всех операций

---

## Тестирование

### Сценарий 1: Создание программы

1. Войдите как тренер (получите trainerId)
2. Создайте программу через POST запрос
3. ✅ Программа должна быть создана

### Сценарий 2: Просмотр программ

1. Откройте GET /api/training-program
2. ✅ Должен вернуться список всех программ с информацией о тренерах

### Сценарий 3: Редактирование

1. Попробуйте обновить программу с правильным trainerId
2. ✅ Программа должна обновиться
3. Попробуйте обновить программу с неправильным trainerId
4. ✅ Должна вернуться ошибка 403

### Сценарий 4: Удаление

1. Попробуйте удалить программу с правильным trainerId
2. ✅ Программа должна быть удалена
3. Попробуйте удалить программу с неправильным trainerId
4. ✅ Должна вернуться ошибка 403

---

## Дальнейшие улучшения

1. **Пагинация** - добавить limit/offset для списков
2. **Поиск** - поиск по названию программы
3. **Фильтрация** - фильтр по цене, тренеру
4. **Сортировка** - сортировка по дате, цене, названию
5. **Изображения** - добавить возможность загрузки изображений программы
6. **Описание** - добавить поле с подробным описанием
7. **Категории** - добавить категории программ (силовые, кардио и т.д.)
8. **Отзывы** - система отзывов на программы
9. **Избранное** - возможность добавить программу в избранное
10. **Статистика** - количество просмотров, покупок
