# Forum CRUD API Documentation

## Структура базы данных

### Таблицы и связи:
- **Forums** (главная таблица)
  - `id` - PRIMARY KEY
  - `title` - название форума
  - `description` - описание
  - `author_id` - FK -> Trainers(id) CASCADE
  - `category_id` - FK -> forum_categories(id) CASCADE
  - `status` - ENUM('active', 'closed', 'archived')
  - `is_pinned` - BOOLEAN (закреплен ли форум)

- **forum_comments** (комментарии)
  - `forum_id` - FK -> Forums(id) CASCADE DELETE
  - `author_id` - FK -> Users(id) CASCADE
  - `parent_id` - FK -> forum_comments(id) CASCADE (для вложенных комментариев)

- **forum_likes** (лайки)
  - `forum_id` - FK -> Forums(id) CASCADE DELETE
  - `user_id` - FK -> Users(id) CASCADE

- **forum_views** (просмотры)
  - `forum_id` - FK -> Forums(id) CASCADE DELETE
  - `user_id` - FK -> Users(id) SET NULL

## API Endpoints

### 1. Получить все форумы
```
GET /api/forum/all
```
**Доступ:** Публичный

**Ответ:**
```json
{
  "forums": [
    {
      "id": 1,
      "title": "Название форума",
      "description": "Описание",
      "author_id": 1,
      "category_id": 1,
      "status": "active",
      "is_pinned": false,
      "author": {
        "id": 1,
        "name": "Имя тренера",
        "email": "email@example.com",
        "profileImage": "url"
      },
      "ForumCategory": {
        "id": 1,
        "name": "Категория",
        "slug": "category-slug",
        "icon": "icon-name",
        "color": "#color"
      },
      "commentsCount": 5,
      "likesCount": 10,
      "viewsCount": 100,
      "createdAt": "2026-01-22T...",
      "updatedAt": "2026-01-22T..."
    }
  ]
}
```

### 2. Получить один форум
```
GET /api/forum/:id
```
**Доступ:** Публичный

**Ответ:**
```json
{
  "forum": {
    "id": 1,
    "title": "Название",
    "description": "Описание",
    "author": {...},
    "ForumCategory": {...},
    "comments": [
      {
        "id": 1,
        "content": "Текст комментария",
        "author": {
          "id": 1,
          "name": "Имя пользователя",
          "email": "email@example.com"
        },
        "createdAt": "..."
      }
    ],
    "commentsCount": 5,
    "likesCount": 10,
    "viewsCount": 100
  }
}
```

### 3. Создать форум
```
POST /api/forum
```
**Доступ:** Требуется авторизация (JWT токен)

**Headers:**
```
Authorization: Bearer <access_token>
```

**Body:**
```json
{
  "title": "Название форума",
  "description": "Описание форума",
  "category_id": 1,
  "status": "active",
  "is_pinned": false
}
```

**Ответ:**
```json
{
  "forum": {
    "id": 1,
    "title": "Название форума",
    "description": "Описание",
    "author_id": 1,
    "category_id": 1,
    "status": "active",
    "is_pinned": false,
    "createdAt": "...",
    "updatedAt": "..."
  },
  "message": "Форум успешно создан"
}
```

### 4. Обновить форум
```
PUT /api/forum/:id
```
**Доступ:** Требуется авторизация, только автор форума

**Headers:**
```
Authorization: Bearer <access_token>
```

**Body:**
```json
{
  "title": "Новое название",
  "description": "Новое описание",
  "category_id": 2,
  "status": "closed"
}
```

**Ответ:**
```json
{
  "forum": {
    "id": 1,
    "title": "Новое название",
    ...
  },
  "message": "Форум успешно обновлен"
}
```

### 5. Удалить форум (каскадное удаление)
```
DELETE /api/forum/:id
```
**Доступ:** Требуется авторизация, только автор форума

**Headers:**
```
Authorization: Bearer <access_token>
```

**Ответ:**
```json
{
  "message": "Форум успешно удален вместе с 5 комментариями, 10 лайками и 100 просмотрами"
}
```

**Что удаляется:**
- ✅ Сам форум
- ✅ Все комментарии (включая вложенные)
- ✅ Все лайки
- ✅ Все просмотры

### 6. Закрепить/открепить форум
```
PUT /api/forum/:id/toggle-pin
```
**Доступ:** Требуется авторизация

**Headers:**
```
Authorization: Bearer <access_token>
```

**Ответ:**
```json
{
  "forum": {
    "id": 1,
    "is_pinned": true,
    ...
  },
  "message": "Форум закреплен"
}
```

### 7. Изменить статус форума
```
PUT /api/forum/:id/status
```
**Доступ:** Требуется авторизация

**Headers:**
```
Authorization: Bearer <access_token>
```

**Body:**
```json
{
  "status": "closed"
}
```

**Возможные статусы:**
- `active` - активный
- `closed` - закрытый (нельзя комментировать)
- `archived` - архивный

**Ответ:**
```json
{
  "forum": {
    "id": 1,
    "status": "closed",
    ...
  },
  "message": "Статус форума изменен на closed"
}
```

## Коды ошибок

- `400` - Неверные данные
- `401` - Не авторизован
- `403` - Нет прав (не автор форума)
- `404` - Форум не найден

## Примеры использования

### Создание форума (curl)
```bash
curl -X POST http://localhost:3000/api/forum \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Как правильно делать приседания?",
    "description": "Обсудим технику выполнения приседаний",
    "category_id": 1
  }'
```

### Удаление форума (curl)
```bash
curl -X DELETE http://localhost:3000/api/forum/1 \
  -H "Authorization: Bearer YOUR_TOKEN"
```

## Безопасность

- ✅ Создание форума - только авторизованные пользователи
- ✅ Обновление форума - только автор
- ✅ Удаление форума - только автор
- ✅ Каскадное удаление всех связанных данных
- ✅ Проверка прав доступа через JWT токен
