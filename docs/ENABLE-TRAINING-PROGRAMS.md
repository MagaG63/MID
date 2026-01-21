# Как включить функциональность Training Programs

## Текущее состояние
Функциональность training programs **временно отключена** в `MyPage.tsx`, чтобы сайт работал без ошибок.

## Почему отключено?
Белый экран появлялся из-за ошибки при загрузке программ тренировок. Возможные причины:
1. Сервер не запущен или эндпоинт не работает
2. Ошибка в API запросе
3. Проблема с Redux state

## Как включить обратно

### Шаг 1: Убедись что сервер работает
```bash
cd server
npm run start
```

Проверь что сервер запустился на http://localhost:3000

### Шаг 2: Проверь эндпоинт вручную
Открой в браузере или Postman:
```
GET http://localhost:3000/api/training-program/trainer/1
```

Должен вернуть:
```json
{
  "programs": []
}
```

Если получаешь 404 или другую ошибку - значит проблема на сервере.

### Шаг 3: Раскомментируй код в MyPage.tsx

#### 3.1 Раскомментируй импорты (строки ~11-19)
```typescript
import TrainingProgramModal, {
  TrainingProgramFormData,
} from '@/features/TrainingProgramModal/TrainingProgramModal';
import {
  fetchTrainerProgramsThunk,
  createProgramThunk,
  updateProgramThunk,
  deleteProgramThunk,
} from '@/entities/training-program';
```

#### 3.2 Раскомментируй state (строки ~28-32)
```typescript
const [isProgramModalOpen, setIsProgramModalOpen] = useState(false);
const [editingProgram, setEditingProgram] = useState<TrainingProgramFormData | null>(null);

const trainingPrograms = useAppSelector((state) => state.trainingProgram.programs);
const programsLoading = useAppSelector((state) => state.trainingProgram.loading);
```

#### 3.3 Раскомментируй useEffect и handlers (строки ~85-150)
```typescript
// Загружаем программы тренера
useEffect(() => {
  if (currentTrainer?.id) {
    dispatch(fetchTrainerProgramsThunk(currentTrainer.id)).catch((error) => {
      console.error('Ошибка загрузки программ:', error);
    });
  }
}, [currentTrainer?.id, dispatch]);

const handleCreateProgram = () => {
  setEditingProgram(null);
  setIsProgramModalOpen(true);
};

const handleEditProgram = (program: any) => {
  setEditingProgram({
    id: program.id,
    name: program.name,
    price: program.price,
    contact: program.contact,
  });
  setIsProgramModalOpen(true);
};

const handleDeleteProgram = async (programId: number) => {
  if (!currentTrainer?.id) return;

  if (window.confirm('Вы уверены, что хотите удалить эту программу?')) {
    try {
      await dispatch(
        deleteProgramThunk({ id: programId, trainerId: currentTrainer.id }),
      ).unwrap();
    } catch (error: any) {
      alert(error || 'Ошибка удаления программы');
    }
  }
};

const handleProgramSubmit = async (data: TrainingProgramFormData) => {
  if (!currentTrainer?.id) {
    throw new Error('Не авторизован как тренер');
  }

  if (editingProgram?.id) {
    // Обновление
    await dispatch(
      updateProgramThunk({
        id: editingProgram.id,
        trainerId: currentTrainer.id,
        data: {
          name: data.name,
          price: data.price,
          contact: data.contact,
          trainerId: currentTrainer.id,
        },
      }),
    ).unwrap();
  } else {
    // Создание
    await dispatch(
      createProgramThunk({
        name: data.name,
        price: data.price,
        contact: data.contact,
        trainerId: currentTrainer.id,
      }),
    ).unwrap();
  }
};
```

#### 3.4 Раскомментируй JSX секцию (строки ~260-310)
```typescript
{/* Программы тренировок (только для тренера) */}
{isTrainer && (
  <div className="profile-section">
    <div className="section-header">
      <h2 className="section-title">Программы тренировок</h2>
      <button className="btn btn-primary btn-sm" onClick={handleCreateProgram}>
        + Добавить программу
      </button>
    </div>

    {programsLoading ? (
      <div className="loading">Загрузка программ...</div>
    ) : trainingPrograms.length === 0 ? (
      <div className="empty-state">
        <p>У вас пока нет программ тренировок</p>
        <button className="btn btn-primary" onClick={handleCreateProgram}>
          Создать первую программу
        </button>
      </div>
    ) : (
      <div className="programs-list">
        {trainingPrograms.map((program) => (
          <div key={program.id} className="program-card">
            <div className="program-info">
              <h3 className="program-name">{program.name}</h3>
              <p className="program-price">{program.price}</p>
              <p className="program-contact">
                <span>Контакт:</span> {program.contact}
              </p>
            </div>
            <div className="program-actions">
              <button
                className="btn btn-secondary btn-sm"
                onClick={() => handleEditProgram(program)}
              >
                Редактировать
              </button>
              <button
                className="btn btn-danger btn-sm"
                onClick={() => handleDeleteProgram(program.id)}
              >
                Удалить
              </button>
            </div>
          </div>
        ))}
      </div>
    )}
  </div>
)}
```

#### 3.5 Раскомментируй модальное окно (строки ~340-350)
```typescript
{/* Модальное окно программы тренировок */}
<TrainingProgramModal
  isOpen={isProgramModalOpen}
  onClose={() => {
    setIsProgramModalOpen(false);
    setEditingProgram(null);
  }}
  onSubmit={handleProgramSubmit}
  initialData={editingProgram}
  mode={editingProgram ? 'edit' : 'create'}
/>
```

### Шаг 4: Проверь что все работает
1. Перезапусти клиент (если нужно)
2. Открой профиль тренера
3. Проверь консоль браузера (F12) - не должно быть ошибок
4. Попробуй создать программу

## Если снова белый экран

### Проверь консоль браузера
Нажми F12 и посмотри на ошибки. Скорее всего увидишь одну из:

#### 1. Network Error / 404
```
GET http://localhost:3000/api/training-program/trainer/1 404 (Not Found)
```

**Решение**: Проблема на сервере. Проверь:
- Запущен ли сервер
- Зарегистрирован ли TrainingProgramModule в app.module.ts
- Нет ли ошибок при запуске сервера

#### 2. Cannot read property 'programs' of undefined
```
TypeError: Cannot read property 'programs' of undefined
```

**Решение**: Проблема в Redux store. Проверь:
- Добавлен ли trainingProgram reducer в store.ts
- Правильно ли импортирован reducer

#### 3. Module not found
```
Error: Cannot find module '@/entities/training-program'
```

**Решение**: Проблема с импортами. Проверь:
- Существует ли файл client/src/entities/training-program/index.ts
- Правильно ли экспортируется reducer

## Альтернативное решение

Если ничего не помогает, можно создать упрощенную версию без Redux:

1. Убери Redux state
2. Используй useState для хранения программ
3. Загружай программы напрямую через API service
4. Обновляй state после каждой операции

Пример:
```typescript
const [programs, setPrograms] = useState([]);

useEffect(() => {
  if (currentTrainer?.id) {
    TrainingProgramService.getByTrainerId(currentTrainer.id)
      .then(setPrograms)
      .catch(console.error);
  }
}, [currentTrainer?.id]);
```

## Нужна помощь?

Если не получается включить - пришли:
1. Скриншот консоли браузера (F12)
2. Логи сервера
3. Текст ошибки

И я помогу разобраться!
