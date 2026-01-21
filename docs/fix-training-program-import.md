# Исправление ошибки импорта TrainingProgram

## Проблема

При запуске сервера возникала ошибка:
```
Error: Cannot find module './training-program/training-program.model'
```

## Причина

В `trainer.model.ts` использовался динамический импорт через `require()` с неправильным путем.

## Решение

### Было (неправильно):
```typescript
// trainer.model.ts
@HasMany(() => require('./training-program/training-program.model').TrainingProgram)
declare trainingPrograms: any[];
```

### Стало (правильно):
```typescript
// trainer.model.ts
import { TrainingProgram } from '../training-program/training-program.model';

@HasMany(() => TrainingProgram)
declare trainingPrograms: TrainingProgram[];
```

## Как исправить

### 1. Остановите сервер

Нажмите `Ctrl+C` в терминале где запущен сервер.

### 2. Удалите папку dist

```cmd
cd server
rmdir /s /q dist
```

Или вручную удалите папку `server/dist`.

### 3. Перезапустите сервер

```cmd
npm run start:dev
```

## Проверка

После запуска сервер должен успешно подключиться к базе данных:

```
[Nest] LOG [NestFactory] Starting Nest application...
[Nest] LOG [InstanceLoader] AppModule dependencies initialized
[Nest] LOG [InstanceLoader] TrainingProgramModule dependencies initialized
[Nest] LOG [RoutesResolver] TrainingProgramController {/api/training-program}
[Nest] LOG [NestApplication] Nest application successfully started
✅ Сервер запущен на http://localhost:3000
```

## Тестирование

Проверьте, что API работает:

```bash
# Получить все программы
curl http://localhost:3000/api/training-program

# Должен вернуться пустой массив или список программ
{"programs":[]}
```

## Почему это важно

### Проблемы с require()

1. **Динамический импорт** - `require()` выполняется во время выполнения, а не компиляции
2. **Относительные пути** - путь `./training-program/...` неправильный из `trainer/`
3. **TypeScript** - не может проверить типы при динамическом импорте

### Преимущества статического импорта

1. **Проверка типов** - TypeScript проверяет типы на этапе компиляции
2. **Автодополнение** - IDE может предложить правильные пути
3. **Рефакторинг** - IDE может автоматически обновить импорты
4. **Производительность** - импорты разрешаются на этапе компиляции

## Структура импортов

```
server/src/
├── trainer/
│   └── trainer.model.ts          → импортирует ../training-program/...
└── training-program/
    └── training-program.model.ts → импортирует ../trainer/...
```

### Правильные пути

Из `trainer/trainer.model.ts`:
```typescript
import { TrainingProgram } from '../training-program/training-program.model';
```

Из `training-program/training-program.model.ts`:
```typescript
import { Trainer } from '../trainer/trainer.model';
```

## Циклические зависимости

### Проблема

Trainer импортирует TrainingProgram, а TrainingProgram импортирует Trainer - это циклическая зависимость.

### Решение в Sequelize-TypeScript

Используйте функцию-стрелку в декораторе:

```typescript
// В Trainer
@HasMany(() => TrainingProgram)  // ✅ Функция-стрелка
trainingPrograms: TrainingProgram[];

// В TrainingProgram
@BelongsTo(() => Trainer)  // ✅ Функция-стрелка
trainer: Trainer;
```

Функция-стрелка откладывает разрешение типа до момента использования, что позволяет избежать проблем с циклическими зависимостями.

## Дополнительные проверки

### 1. Проверьте, что модели зарегистрированы

В `app.module.ts`:
```typescript
SequelizeModule.forRoot({
  models: [User, Fitness, Trainer, Forum, TrainingProgram],  // ✅
})
```

### 2. Проверьте, что модуль зарегистрирован

В `app.module.ts`:
```typescript
@Module({
  imports: [
    // ...
    TrainingProgramModule,  // ✅
  ],
})
```

### 3. Проверьте, что контроллер зарегистрирован

В `training-program.module.ts`:
```typescript
@Module({
  controllers: [TrainingProgramController],  // ✅
})
```

## Если проблема сохраняется

### 1. Полная очистка

```cmd
cd server
rmdir /s /q dist
rmdir /s /q node_modules
npm install
npm run start:dev
```

### 2. Проверьте tsconfig.json

Убедитесь, что настройки правильные:
```json
{
  "compilerOptions": {
    "module": "commonjs",
    "esModuleInterop": true,
    "allowSyntheticDefaultImports": true
  }
}
```

### 3. Проверьте версии пакетов

```cmd
npm list sequelize-typescript
npm list @nestjs/sequelize
```

Должны быть совместимые версии.

## Итог

После исправления:
- ✅ Используется статический импорт вместо `require()`
- ✅ Правильный относительный путь `../training-program/...`
- ✅ TypeScript может проверить типы
- ✅ Нет ошибок при запуске сервера
- ✅ API endpoints доступны
