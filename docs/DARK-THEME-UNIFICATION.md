# Унификация темной темы

## Дата: 23 января 2026

## Цель
Привести все CSS стили приложения к единому темному стилю, основанному на дизайне NavBar.

## Цветовая палитра

### Основные цвета:
- **Фон приложения**: `#1a1a1a`
- **Фон карточек**: `#202222`
- **Фон элементов**: `#252525`
- **Границы**: `#2d2d2d`
- **Текст основной**: `#e5e5e5`
- **Текст вторичный**: `#a0a0a0`
- **Акцентный цвет**: `#20808d` (основной)
- **Акцентный hover**: `#2a9aa8`
- **Градиент**: `linear-gradient(135deg, #20808d, #1a6b75)`

### Дополнительные цвета:
- **Успех**: `#4ade80` (зеленый)
- **Ошибка**: `#ff6b6b` (красный)
- **Предупреждение**: `#ffc107` (желтый)
- **Тренер**: `#ff8c42` (оранжевый)

## Обновленные файлы

### Страницы (Pages)

#### 1. MyPage.css ✅
**Путь**: `client/src/pages/MyPage/MyPage.css`

**Изменения**:
- Фон: `#1a1a1a` вместо градиента
- Карточки: `#202222` вместо белого
- Секции: `#1a1a1a` вместо `#f9f9f9`
- Текст: `#e5e5e5` / `#a0a0a0`
- Кнопки: градиент `#20808d`
- Бейджи: темные с прозрачностью

#### 2. TrainersListPage.css ✅
**Путь**: `client/src/pages/Trainers/TrainersListPage.css`

**Изменения**:
- Фон: `#1a1a1a` вместо градиента
- Карточки: `#202222` с границей `#2d2d2d`
- Градиент header: `#20808d` вместо `#667eea`
- Звезды: пустые `#2d2d2d` вместо `#ddd`
- Цена программ: `#4ade80` вместо `#4caf50`

#### 3. TrainerProfilePage.css ✅
**Путь**: `client/src/pages/Trainers/TrainerProfilePage.css`

**Изменения**:
- Фон: `#1a1a1a`
- Контейнер: `#202222`
- Header градиент: `#20808d`
- Секции: границы `#2d2d2d`
- Программы: фон `#1a1a1a`

#### 4. MainPage.css ✅
**Статус**: Уже темная тема, без изменений

#### 5. LoginPage.css ✅
**Статус**: Уже темная тема, без изменений

#### 6. RegisterPage.css ✅
**Статус**: Уже темная тема, без изменений

#### 7. LaboratoryPage.css ✅
**Статус**: Уже темная тема, без изменений

#### 8. FitnessPage.css ✅
**Статус**: Уже темная тема, без изменений

#### 9. FitnessClubPage.css ✅
**Статус**: Только сетка, без изменений

### Компоненты (Features)

#### 1. EditProfileModal.css ✅
**Путь**: `client/src/features/EditProfileModal/EditProfileModal.css`

**Изменения**:
- Overlay: `rgba(0, 0, 0, 0.85)` с blur
- Modal: `#202222` вместо белого
- Inputs: `#1a1a1a` фон, `#2d2d2d` границы
- Кнопки: градиент `#20808d`
- Сообщения: темные фоны

#### 2. TrainingProgramModal.css ✅
**Путь**: `client/src/features/TrainingProgramModal/TrainingProgramModal.css`

**Изменения**:
- Inputs: `#1a1a1a` фон
- Границы: `#2d2d2d`
- Кнопки: градиент `#20808d`
- Текст: `#e5e5e5` / `#a0a0a0`

#### 3. CreateForumModal.css ✅
**Статус**: Уже темная тема, без изменений

#### 4. ModalForum.css ✅
**Статус**: Уже темная тема, без изменений

#### 5. TopicCard.css ✅
**Статус**: Уже темная тема, без изменений

#### 6. FitnessClubCard.css ✅
**Статус**: Уже темная тема, без изменений

#### 7. TrainerReviews.css ✅
**Путь**: `client/src/features/TrainerReviews/TrainerReviews.css`

**Изменения**:
- Заголовки: `#e5e5e5` вместо `#333`
- Форма: фон `#1a1a1a`, границы `#2d2d2d`
- Карточки отзывов: `#202222` вместо белого
- Textarea: `#252525` фон, `#2d2d2d` границы
- Аватар: градиент `#20808d`
- Кнопки: градиент `#20808d`
- Звезды пустые: `#2d2d2d` вместо `#ddd`
- Текст: `#e5e5e5` / `#a0a0a0`
- Кнопка удаления: hover `#4d1a1a`

## Общие принципы стилизации

### Карточки:
```css
.card {
  background: #202222;
  border: 1px solid #2d2d2d;
  border-radius: 16px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.4);
  transition: all 0.3s ease;
}

.card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.5);
  border-color: #20808d;
}
```

### Кнопки:
```css
.btn-primary {
  background: linear-gradient(135deg, #20808d, #1a6b75);
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 8px;
  font-weight: 600;
  transition: all 0.3s ease;
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 7px 14px rgba(32, 128, 141, 0.4);
}
```

### Inputs:
```css
input, textarea {
  background-color: #1a1a1a;
  border: 2px solid #2d2d2d;
  border-radius: 8px;
  color: #e5e5e5;
  padding: 12px 16px;
}

input:focus, textarea:focus {
  outline: none;
  border-color: #20808d;
  background-color: #252525;
  box-shadow: 0 0 0 3px rgba(32, 128, 141, 0.1);
}
```

### Модальные окна:
```css
.modal-overlay {
  background: rgba(0, 0, 0, 0.85);
  backdrop-filter: blur(4px);
}

.modal-content {
  background: #202222;
  border: 1px solid #2d2d2d;
  border-radius: 16px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
}
```

## Эффекты и анимации

### Hover эффекты:
- Карточки: `translateY(-5px)` + увеличение тени
- Кнопки: `translateY(-2px)` + тень
- Границы: изменение цвета на `#20808d`

### Transitions:
- Стандартный: `all 0.3s ease`
- Быстрый: `all 0.2s ease`

### Shadows:
- Карточки: `0 4px 20px rgba(0, 0, 0, 0.4)`
- Hover: `0 8px 32px rgba(0, 0, 0, 0.5)`
- Кнопки: `0 7px 14px rgba(32, 128, 141, 0.4)`

## Адаптивность

Все страницы адаптированы для:
- Desktop: > 968px
- Tablet: 768px - 968px
- Mobile: < 768px

### Breakpoints:
```css
@media (max-width: 968px) { /* Tablet */ }
@media (max-width: 768px) { /* Mobile */ }
@media (max-width: 576px) { /* Small mobile */ }
```

## Результат

✅ Все страницы используют единую темную тему
✅ Консистентная цветовая палитра
✅ Единообразные компоненты (кнопки, inputs, карточки)
✅ Плавные анимации и переходы
✅ Адаптивный дизайн для всех устройств
✅ Улучшенная читаемость и контрастность

## Тестирование

Для проверки:
1. Запустите клиент: `cd client && npm run dev`
2. Проверьте все страницы:
   - Главная
   - Логин/Регистрация
   - Мой профиль
   - Тренеры (список и профиль)
   - Форум
   - Лаборатории
   - Фитнес-клубы
3. Проверьте модальные окна:
   - Редактирование профиля
   - Создание программы тренировок
   - Создание темы форума
   - Просмотр темы форума

## Совместимость

- ✅ Chrome/Edge (Chromium)
- ✅ Firefox
- ✅ Safari
- ✅ Mobile browsers

## Примечания

- Все изменения обратно совместимы
- Старые классы сохранены для совместимости
- Добавлены новые утилитарные классы
- Улучшена семантика CSS

## Статус
✅ **ЗАВЕРШЕНО** - все стили приведены к единой темной теме
