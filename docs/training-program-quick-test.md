# Quick Test Guide: Training Program Feature

## Prerequisites
1. Server running on `http://localhost:3000`
2. Client running on `http://localhost:5173`
3. Database migrated with training program table

## Test Steps

### 1. Start the Application

**Server:**
```bash
cd server
npm run start
```

**Client:**
```bash
cd client
npm run dev
```

### 2. Login as Trainer

1. Navigate to `http://localhost:5173/login`
2. Login with trainer credentials OR register new trainer
3. You should be redirected to home page

### 3. Access Profile

1. Click on your profile/avatar in navigation
2. Or navigate to `http://localhost:5173/profile`
3. You should see your trainer profile page

### 4. Test Create Program

1. Scroll to "Программы тренировок" section
2. Click "Добавить программу" button
3. Fill in the form:
   - **Название**: "Программа для начинающих"
   - **Цена**: "5000 руб/месяц"
   - **Контакт**: "@my_telegram"
4. Click "Создать"
5. Modal should close
6. New program should appear in the list

### 5. Test Edit Program

1. Find the program you just created
2. Click "Редактировать" button
3. Modify any field (e.g., change price to "6000 руб/месяц")
4. Click "Сохранить"
5. Modal should close
6. Program should update in the list

### 6. Test Delete Program

1. Find a program in the list
2. Click "Удалить" button
3. Confirm deletion in the alert
4. Program should disappear from the list

### 7. Test Validation

1. Click "Добавить программу"
2. Try to submit empty form - should show validation errors
3. Try to submit with name < 3 characters - should fail
4. Fill all required fields correctly - should succeed

### 8. Test as User (Negative Test)

1. Logout
2. Login as regular user (not trainer)
3. Go to profile page
4. "Программы тренировок" section should NOT appear

## Expected Results

✅ Trainers can create, edit, and delete their programs
✅ Programs persist after page refresh
✅ Only program owner can modify/delete
✅ Users don't see training program management
✅ Form validation works correctly
✅ Loading states show during API calls
✅ Error messages display on failures

## API Testing (Optional)

Use Postman or curl to test endpoints directly:

### Get Trainer's Programs
```bash
curl http://localhost:3000/api/training-program/trainer/1
```

### Create Program
```bash
curl -X POST http://localhost:3000/api/training-program \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{
    "name": "Test Program",
    "price": "5000 руб",
    "contact": "@test",
    "trainerId": 1
  }'
```

### Update Program
```bash
curl -X PUT http://localhost:3000/api/training-program/1 \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{
    "name": "Updated Program",
    "price": "6000 руб",
    "contact": "@test",
    "trainerId": 1
  }'
```

### Delete Program
```bash
curl -X DELETE http://localhost:3000/api/training-program/1 \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{"trainerId": 1}'
```

## Troubleshooting

### Programs not loading
- Check browser console for errors
- Verify trainer is logged in
- Check network tab for API calls
- Ensure server is running

### Cannot create program
- Verify all required fields are filled
- Check if trainerId is present in Redux state
- Look for validation errors in console

### 404 errors
- Ensure TrainingProgramModule is registered in app.module.ts
- Verify server restarted after changes
- Check API endpoint URLs match

### TypeScript errors
- Run `npm run build` in client folder
- Check for missing imports
- Verify all types are correctly defined

## Database Check

To verify programs in database:
```bash
cd server
sqlite3 database.sqlite
SELECT * FROM traineprogramms;
```

## Success Criteria

- ✅ All CRUD operations work without errors
- ✅ UI updates immediately after operations
- ✅ Data persists after page refresh
- ✅ Only trainers see the feature
- ✅ Ownership validation prevents unauthorized access
- ✅ Form validation prevents invalid data
