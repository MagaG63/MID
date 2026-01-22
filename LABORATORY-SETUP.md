# Laboratory Module - Инструкция по запуску

## Структура создана:

### 1. Миграция
- `server/db/migrations/20260122122758-create-laboratory.js`
- Поля: id, name, stated, status, post, createdAt, updatedAt

### 2. Модели
- `server/db/models/laboratory.js` (Sequelize модель)
- `server/src/laboratory/laboratory.model.ts` (TypeScript модель)

### 3. Сидер
- `server/db/seeders/20260122123000-laboratory-seed.js`
- 5 тестовых лабораторий

### 4. Backend (NestJS)
```
server/src/laboratory/
├── laboratory.controller.ts  (только GET запросы)
├── laboratory.service.ts     (только findAll и findOne)
├── laboratory.model.ts
└── laboratory.module.ts
```

## Команды для запуска:

### 1. Запустить миграцию
```bash
cd server
npx sequelize-cli db:migrate
```

### 2. Запустить сидер
```bash
npx sequelize-cli db:seed --seed 20260122123000-laboratory-seed.js
```

### 3. Перезапустить сервер
```bash
npm run start:dev
```

## API Endpoints (только чтение):

### GET /api/laboratory
Получить все лаборатории
```json
{
  "laboratories": [
    {
      "id": 1,
      "name": "Лаборатория анализов №1",
      "stated": "Москва",
      "status": "Активна",
      "post": "ул. Ленина, 10",
      "createdAt": "2026-01-22T...",
      "updatedAt": "2026-01-22T..."
    },
    ...
  ]
}
```

### GET /api/laboratory/:id
Получить одну лабораторию по ID
```json
{
  "laboratory": {
    "id": 1,
    "name": "Лаборатория анализов №1",
    "stated": "Москва",
    "status": "Активна",
    "post": "ул. Ленина, 10",
    "createdAt": "2026-01-22T...",
    "updatedAt": "2026-01-22T..."
  }
}
```

## Тестирование:

### Получить все лаборатории
```bash
curl http://localhost:3000/api/laboratory
```

### Получить лабораторию по ID
```bash
curl http://localhost:3000/api/laboratory/1
```

## Готово! 🎉

Модуль Laboratory настроен только для чтения данных (GET запросы).

