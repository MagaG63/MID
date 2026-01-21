
# Исправления системы аутентификации

## Что было исправлено

### 1. Регистрация пользователей
- ✅ Исправлен путь API запроса (`/api/auth/register`)
- ✅ Добавлена поддержка роли при регистрации
- ✅ Правильная обработка токенов после регистрации

### 2. Регистрация тренеров
- ✅ Исправлена отправка FormData с файлами
- ✅ Добавлена обработка profileImage и qualificationImages
- ✅ Исправлены импорты в auth.controller.ts (join, existsSync, mkdirSync)
- ✅ Правильная обработка ответа сервера (trainer/user)
- ✅ Исправлено сохранение qualificationImages как JSON строки в SQLite

### 3. Вход (Login)
- ✅ Добавлена явная передача роли на сервер
- ✅ Исправлена обработка ответа для тренеров (user с ролью trainer)
- ✅ Правильное сохранение токенов в axiosInstance
- ✅ Правильный парсинг qualificationImages из JSON строки

### 4. Выход (Logout)
- ✅ Добавлена очистка access token на клиенте
- ✅ Добавлена очистка refresh token на сервере
- ✅ Правильная очистка Redux состояния
- ✅ Перенаправление на главную страницу после выхода

### 5. Восстановление сессии
- ✅ Исправлен useAuth хук для работы с authenticatedTrainer
- ✅ Правильная обработка refresh token
- ✅ Предотвращение дублирования запросов

### 6. Модель Trainer
- ✅ Исправлена работа с полями rating и isActive (сделаны опциональными)
- ✅ Правильное сохранение qualificationImages как JSON строки
- ✅ Правильный парсинг qualificationImages при чтении из БД
- ✅ Исправлены типы в SafeTrainerData интерфейсе

## Как использовать

### Регистрация пользователя
```typescript
await dispatch(registerUserThunk({
  name: 'Имя',
  email: 'email@example.com',
  password: 'password123'
}));
```

### Регистрация тренера
```typescript
const formData = new FormData();
formData.append('name', 'Имя тренера');
formData.append('email', 'trainer@example.com');
formData.append('password', 'password123');
formData.append('description', 'Описание');
formData.append('profileImage', fileObject);
formData.append('qualificationImages', fileObject1);
formData.append('qualificationImages', fileObject2);

await dispatch(registerTrainerThunk(formData));
```

### Вход
```typescript
// Для пользователя
await dispatch(loginUserThunk({
  email: 'user@example.com',
  password: 'password123',
  role: 'user'
}));

// Для тренера
await dispatch(loginTrainerThunk({
  email: 'trainer@example.com',
  password: 'password123'
}));
```

### Выход
```typescript
// В NavBar уже реализовано
<button onClick={handleLogout}>Выйти</button>
```

## API Endpoints

### POST /api/auth/register
Регистрация обычного пользователя
```json
{
  "name": "Имя",
  "email": "email@example.com",
  "password": "password123"
}
```

### POST /api/auth/register-trainer
Регистрация тренера (multipart/form-data)
- name: string
- email: string
- password: string
- description: string (optional)
- profileImage: File (optional)
- qualificationImages: File[] (optional, max 5)

### POST /api/auth/login
Вход для пользователя или тренера
```json
{
  "email": "email@example.com",
  "password": "password123",
  "role": "user" | "trainer"
}
```

### POST /api/auth/refresh
Обновление токена (использует httpOnly cookie)

### DELETE /api/auth/logout
Выход (очищает httpOnly cookie)

## Структура ответов

### Успешная регистрация/вход
```json
{
  "user": {
    "id": 1,
    "email": "email@example.com",
    "name": "Имя",
    "role": "user" | "trainer",
    // для тренера дополнительно:
    "profileImage": "url",
    "qualificationImages": ["url1", "url2"],
    "description": "текст"
  },
  "accessToken": "jwt_token"
}
```

## Важные замечания

1. **Токены**: Access token хранится в памяти, refresh token в httpOnly cookie
2. **Роли**: Сервер возвращает `user` объект с полем `role` для обоих типов пользователей
3. **Файлы**: Для тренеров используется FormData для загрузки изображений
4. **Сессия**: Автоматически восстанавливается при перезагрузке страницы через refresh token
