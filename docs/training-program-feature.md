# Training Program Management Feature

## Overview
Complete CRUD system for trainers to manage their training programs through their profile page.

## Features Implemented

### Backend (NestJS)
- **Model**: `TrainingProgram` with fields: id, name, price, contact, trainerId
- **Controller**: `/api/training-program` with 6 endpoints
- **Service**: Full CRUD operations with ownership validation
- **DTOs**: Create and Update validation
- **Relationships**: Trainer hasMany TrainingProgram

### Frontend (React + Redux)
- **Entity Layer**: Complete Redux slice with thunks for async operations
- **API Service**: Axios-based service for all CRUD operations
- **Modal Component**: `TrainingProgramModal` for create/edit
- **Profile Integration**: Training programs section in trainer profile

## API Endpoints

### GET /api/training-program
Get all training programs

### GET /api/training-program/:id
Get single program by ID

### GET /api/training-program/trainer/:trainerId
Get all programs for specific trainer

### POST /api/training-program
Create new program
```json
{
  "name": "Program name",
  "price": "5000 руб/месяц",
  "contact": "@telegram_username",
  "trainerId": 1
}
```

### PUT /api/training-program/:id
Update program (requires trainerId for ownership validation)
```json
{
  "name": "Updated name",
  "price": "6000 руб/месяц",
  "contact": "@new_username",
  "trainerId": 1
}
```

### DELETE /api/training-program/:id
Delete program (requires trainerId in body for ownership validation)
```json
{
  "trainerId": 1
}
```

## Frontend Architecture

### Redux Store
```typescript
state.trainingProgram = {
  programs: TrainingProgramType[],
  loading: boolean,
  error: string | null
}
```

### Thunks
- `fetchTrainerProgramsThunk(trainerId)` - Load trainer's programs
- `createProgramThunk(data)` - Create new program
- `updateProgramThunk({ id, trainerId, data })` - Update program
- `deleteProgramThunk({ id, trainerId })` - Delete program

### Components
- `TrainingProgramModal` - Modal for create/edit with form validation
- `MyPage` - Profile page with programs list and management UI

## UI Features

### For Trainers
1. **Programs Section** in profile page
2. **Add Program** button to create new programs
3. **Program Cards** showing:
   - Program name
   - Price
   - Contact (Telegram)
   - Edit and Delete buttons
4. **Empty State** when no programs exist
5. **Loading State** while fetching data

### Modal Features
- Create and Edit modes
- Form validation (required fields, min/max length)
- Error handling with user feedback
- Escape key to close
- Click outside to close

## Security
- Ownership validation: Only program owner (trainer) can update/delete
- TrainerId required for all CUD operations
- JWT authentication required for all endpoints

## Files Created/Modified

### Created
- `client/src/entities/training-program/index.ts`
- `client/src/entities/training-program/model/training-program.slice.ts`
- `client/src/entities/training-program/model/training-program.type.ts`
- `client/src/entities/training-program/model/training-program.thunks.ts`
- `client/src/entities/training-program/api/training-program.service.ts`
- `client/src/features/TrainingProgramModal/TrainingProgramModal.tsx`
- `client/src/features/TrainingProgramModal/TrainingProgramModal.css`
- `server/src/training-program/*` (all files)
- `server/db/migrations/20260120150548-create-traine-programm.js`

### Modified
- `client/src/app/store/store.ts` - Added trainingProgram reducer
- `client/src/pages/MyPage/MyPage.tsx` - Added programs section and handlers
- `client/src/pages/MyPage/MyPage.css` - Added program styles
- `server/src/app.module.ts` - Registered TrainingProgramModule
- `server/src/trainer/trainer.model.ts` - Added hasMany relationship

## Usage Example

### Creating a Program
1. Trainer logs in
2. Goes to profile page
3. Clicks "Добавить программу"
4. Fills form: name, price, contact
5. Clicks "Создать"
6. Program appears in list

### Editing a Program
1. Click "Редактировать" on program card
2. Modal opens with current data
3. Modify fields
4. Click "Сохранить"
5. Program updates in list

### Deleting a Program
1. Click "Удалить" on program card
2. Confirm deletion
3. Program removed from list

## Testing
To test the feature:
1. Register/login as trainer
2. Navigate to profile page
3. Create a training program
4. Edit the program
5. Delete the program
6. Verify all operations work correctly

## Notes
- Only trainers can manage programs (users don't see this section)
- Programs are automatically loaded when trainer opens profile
- Contact field is for Telegram username or link
- Price is free-form text (e.g., "5000 руб/месяц", "$100/month")
