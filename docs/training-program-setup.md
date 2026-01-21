# Настройка Training Program

## Что было создано

### Структура файлов

```
server/
├── db/
│   ├── migrations/
│   │   └── 20260120150548-create-traine-programm.js  ✅ Миграция
│   └── models/
│       └── training-program.model.ts                  ✅ Модель Sequelize
├── src/
│   ├── training-program/
│   │   ├── dto/
│   │   │   ├── create-training-program.dto.ts        ✅ DTO для создания
│   │   │   └── update-training-program.dto.ts        ✅ DTO для обновления
│   │   ├── training-program.controller.ts            ✅ Контроллер
│   │   ├── training-program.service.ts               ✅ Сервис
│   │   └── training-program.module.ts                ✅ Модуль
│   ├── trainer/
│   │   └── trainer.model.ts                          ✅ Обновлена связь
│   └── app.module.ts                                 ✅ Зарегистрирован модуль
```

## Запуск миграции

### Вариант 1: Через командную строку (CMD)

```cmd
cd server
node_modules\.bin\sequelize-cli db:migrate
```

### Вариант 2: Через npm script

Добавьте в `server/package.json`:

```json
{
  "scripts": {
    "migrate": "sequelize-cli db:migrate",
    "migrate:undo": "sequelize-cli db:migrate:undo"
  }
}
```

Затем запустите:

```cmd
cd server
npm run migrate
```

### Вариант 3: Вручную через SQL

Если миграция не работает, выполните SQL напрямую:

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

## Проверка

### 1. Проверьте, что таблица создана

```sql
SELECT name FROM sqlite_master WHERE type='table' AND name='traineProgramms';
```

### 2. Запустите сервер

```cmd
cd server
npm run start:dev
```

### 3. Проверьте доступность эндпоинтов

```bash
# Получение всех программ
curl http://localhost:3000/api/training-program

# Создание программы
curl -X POST http://localhost:3000/api/training-program \
  -H "Content-Type: application/json" \
  -d '{
    "trainerId": 1,
    "name": "Тестовая программа",
    "price": "5000 руб",
    "contact": "@test_trainer"
  }'
```

## API Endpoints

После запуска доступны следующие эндпоинты:

- `GET /api/training-program` - Получить все программы
- `GET /api/training-program/:id` - Получить программу по ID
- `GET /api/training-program/trainer/:trainerId` - Получить программы тренера
- `POST /api/training-program` - Создать программу
- `PUT /api/training-program/:id` - Обновить программу
- `DELETE /api/training-program/:id` - Удалить программу

## Связи в базе данных

### TrainingProgram → Trainer (Many-to-One)

Каждая программа принадлежит одному тренеру:

```typescript
// В TrainingProgram
@BelongsTo(() => Trainer)
trainer: Trainer;
```

### Trainer → TrainingProgram (One-to-Many)

У тренера может быть много программ:

```typescript
// В Trainer
@HasMany(() => TrainingProgram)
trainingPrograms: TrainingProgram[];
```

## Примеры использования

### Создание программы

```typescript
const program = await trainingProgramService.create({
  trainerId: 1,
  name: "Программа для начинающих",
  price: "5000 руб/месяц",
  contact: "@trainer_username"
});
```

### Получение программ тренера

```typescript
const programs = await trainingProgramService.findByTrainerId(1);
```

### Обновление программы

```typescript
const updated = await trainingProgramService.update(
  1, // programId
  1, // trainerId (для проверки прав)
  {
    name: "Обновленное название",
    price: "6000 руб/месяц"
  }
);
```

### Удаление программы

```typescript
await trainingProgramService.remove(
  1, // programId
  1  // trainerId (для проверки прав)
);
```

## Безопасность

### Проверка прав доступа

При обновлении и удалении проверяется, что программа принадлежит тренеру:

```typescript
if (program.trainerId !== trainerId) {
  throw new ForbiddenException('Вы не можете редактировать эту программу');
}
```

### Рекомендации

1. **Добавить JWT аутентификацию** - получать trainerId из токена
2. **Добавить роли** - только тренеры могут создавать программы
3. **Валидация Telegram** - проверять формат ссылки
4. **Rate limiting** - ограничить количество создаваемых программ

## Тестирование

### 1. Создайте тренера

```bash
curl -X POST http://localhost:3000/api/auth/register-trainer \
  -F "name=Test Trainer" \
  -F "email=trainer@test.com" \
  -F "password=test123"
```

### 2. Создайте программу

```bash
curl -X POST http://localhost:3000/api/training-program \
  -H "Content-Type: application/json" \
  -d '{
    "trainerId": 1,
    "name": "Программа для начинающих",
    "price": "5000 руб/месяц",
    "contact": "@trainer_test"
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
    "price": "6000 руб/месяц"
  }'
```

### 5. Удалите программу

```bash
curl -X DELETE http://localhost:3000/api/training-program/1 \
  -H "Content-Type: application/json" \
  -d '{"trainerId": 1}'
```

## Возможные проблемы

### Ошибка: Table doesn't exist

**Решение:** Запустите миграцию вручную через SQL или проверьте, что миграция выполнена.

### Ошибка: Foreign key constraint failed

**Решение:** Убедитесь, что тренер с указанным trainerId существует в базе данных.

### Ошибка: 403 Forbidden

**Решение:** Проверьте, что trainerId в запросе совпадает с trainerId программы.

### Ошибка: 404 Not Found

**Решение:** Проверьте, что программа с указанным ID существует.

## Дальнейшая разработка

### Клиентская часть

Создайте компоненты для:
1. Список программ тренера
2. Форма создания программы
3. Форма редактирования программы
4. Карточка программы с кнопкой "Связаться"

### Интеграция с Telegram

Добавьте валидацию и форматирование Telegram ссылок:
- `@username` → `https://t.me/username`
- Проверка существования пользователя
- Кнопка "Открыть в Telegram"

### Аналитика

Добавьте отслеживание:
- Количество просмотров программы
- Количество кликов на контакт
- Популярные программы
- Конверсия в покупки
