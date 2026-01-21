# 🔧 Быстрое исправление сервера

## Проблема
```
Error: Cannot find module './training-program/training-program.model'
```

## Решение (3 шага)

### 1️⃣ Остановите сервер
Нажмите `Ctrl+C` в терминале

### 2️⃣ Удалите папку dist
```cmd
cd server
rmdir /s /q dist
```

### 3️⃣ Перезапустите сервер
```cmd
npm run start:dev
```

## ✅ Готово!

Сервер должен запуститься без ошибок.

## Проверка работы

```bash
curl http://localhost:3000/api/training-program
```

Должен вернуться: `{"programs":[]}`

---

## Что было исправлено

В файле `server/src/trainer/trainer.model.ts` изменен импорт:

**Было:**
```typescript
@HasMany(() => require('./training-program/training-program.model').TrainingProgram)
```

**Стало:**
```typescript
import { TrainingProgram } from '../training-program/training-program.model';

@HasMany(() => TrainingProgram)
```

---

## Если не помогло

Полная переустановка:
```cmd
cd server
rmdir /s /q dist
rmdir /s /q node_modules
npm install
npm run start:dev
```
