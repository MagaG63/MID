# Отладка белого экрана

## Шаги для диагностики

### 1. Проверь консоль браузера
Открой DevTools (F12) и посмотри на вкладку Console:
- Есть ли красные ошибки?
- Какой текст ошибки?
- В каком файле ошибка?

### 2. Проверь Network
На вкладке Network посмотри:
- Загружаются ли файлы JS?
- Есть ли 404 ошибки?
- Есть ли ошибки API запросов?

### 3. Перезапусти клиент
```bash
cd client
# Останови текущий процесс (Ctrl+C)
npm run dev
```

### 4. Очисти кэш браузера
- Ctrl + Shift + Delete
- Или Hard Refresh: Ctrl + F5

### 5. Проверь, что сервер запущен
```bash
cd server
npm run start
```

Сервер должен быть на http://localhost:3000

### 6. Проверь URL
Убедись, что ты на правильной странице:
- http://localhost:5173/ - главная
- http://localhost:5173/login - логин
- http://localhost:5173/profile - профиль

## Возможные причины белого экрана

### 1. Ошибка импорта
Если в консоли видишь:
```
Failed to resolve module
Cannot find module
```

**Решение**: Проверь, что все файлы созданы правильно

### 2. Ошибка Redux
Если в консоли видишь:
```
Cannot read property 'trainingProgram' of undefined
```

**Решение**: Убедись, что reducer добавлен в store

### 3. Ошибка API
Если в консоли видишь:
```
Network Error
404 Not Found
```

**Решение**: Проверь, что сервер запущен и эндпоинты работают

### 4. Синтаксическая ошибка
Если в консоли видишь:
```
Unexpected token
Syntax error
```

**Решение**: Проверь код на опечатки

## Быстрое решение

Если ничего не помогает, попробуй откатить изменения:

### Вариант 1: Временно отключи training program
В `client/src/app/store/store.ts` закомментируй:
```typescript
// import trainingProgramReducer from '@/entities/training-program';

export const store = configureStore({
  reducer: { 
    fitness: fitnessReducer,   
    trainer: trainerReducer,  
    user: userReducer,  
    forums: forumsReducer, 
    foodDiary: foodDiaryReducer,
    // trainingProgram: trainingProgramReducer  // ← закомментируй
  }
});
```

Если после этого белый экран исчез, значит проблема в training program модуле.

### Вариант 2: Проверь MyPage.tsx
Закомментируй импорты training program в `MyPage.tsx`:
```typescript
// import TrainingProgramModal from '@/features/TrainingProgramModal/TrainingProgramModal';
// import { fetchTrainerProgramsThunk, ... } from '@/entities/training-program';
```

И закомментируй useEffect с загрузкой программ.

## Что проверить в коде

### 1. store.ts
```typescript
import trainingProgramReducer from '@/entities/training-program';
// ↑ Должен быть default import, не { trainingProgramReducer }
```

### 2. index.ts
```typescript
export { default as trainingProgramReducer } from './model/training-program.slice';
// ↑ Должен быть именно так
```

### 3. slice.ts
```typescript
export default trainingProgramSlice.reducer;
// ↑ В конце файла должен быть default export
```

## Логи для отладки

Добавь в начало MyPage.tsx:
```typescript
console.log('🔍 MyPage loaded');
console.log('🔍 currentTrainer:', currentTrainer);
console.log('🔍 trainingPrograms:', trainingPrograms);
```

Это поможет понять, на каком этапе происходит ошибка.

## Если все еще белый экран

Пришли мне:
1. Скриншот консоли браузера (F12 → Console)
2. Скриншот Network tab (F12 → Network)
3. URL страницы, на которой белый экран
4. Текст ошибки из консоли (если есть)

И я помогу найти проблему!
