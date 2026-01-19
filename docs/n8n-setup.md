# Настройка n8n для распознавания еды

## Требования

- n8n установлен и запущен (локально или на сервере)
- OpenAI API ключ (для GPT-4 Vision)
- Или Google Cloud Vision API ключ

## Workflow 1: Food Recognition

### Шаги настройки:

1. **Создайте новый workflow в n8n**

2. **Добавьте Webhook Node**
   - Method: POST
   - Path: `food-recognition`
   - Response Mode: "When Last Node Finishes"
   - Response Data: "First Entry JSON"

3. **Добавьте Function Node для обработки изображения**
   ```javascript
   // Получаем base64 изображение из запроса
   const imageBase64 = $input.item.json.body.image;
   const userId = $input.item.json.body.userId || 'anonymous';
   
   return {
     json: {
       image: imageBase64,
       userId: userId
     }
   };
   ```

4. **Добавьте OpenAI Node (GPT-4 Vision)**
   - Model: gpt-4-vision-preview
   - Prompt: 
   ```
   Analyze this food image and identify what food items are present.
   Return ONLY a JSON object with this exact structure:
   {
     "success": true,
     "foodName": "название блюда на русском",
     "confidence": 0.95,
     "alternatives": [
       {"name": "альтернативное название 1", "confidence": 0.85},
       {"name": "альтернативное название 2", "confidence": 0.75}
     ],
     "nutritionEstimate": {
       "caloriesPer100g": 120,
       "proteinPer100g": 3.5,
       "carbsPer100g": 8.2,
       "fatsPer100g": 8.5
     }
   }
   
   Be specific about the dish name in Russian. If you're not sure, provide alternatives.
   ```
   - Image: `={{$json.image}}`

5. **Добавьте Function Node для парсинга ответа**
   ```javascript
   try {
     const response = $input.item.json.choices[0].message.content;
     
     // Пытаемся распарсить JSON из ответа
     let parsed;
     try {
       parsed = JSON.parse(response);
     } catch (e) {
       // Если не JSON, пытаемся извлечь название еды из текста
       parsed = {
         success: true,
         foodName: response.trim(),
         confidence: 0.8,
         alternatives: []
       };
     }
     
     return {
       json: parsed
     };
   } catch (error) {
     return {
       json: {
         success: false,
         foodName: "",
         confidence: 0,
         error: error.message
       }
     };
   }
   ```

6. **Подключите все ноды последовательно**
   Webhook → Function (обработка) → OpenAI → Function (парсинг) → Webhook Response

7. **Активируйте workflow**

8. **Скопируйте Production Webhook URL**
   - Будет выглядеть как: `https://your-n8n.com/webhook/food-recognition`

## Workflow 2: Diet Recommendation

### Шаги настройки:

1. **Создайте новый workflow в n8n**

2. **Добавьте Webhook Node**
   - Method: POST
   - Path: `diet-recommendation`
   - Response Mode: "When Last Node Finishes"

3. **Добавьте Function Node для расчета BMR и TDEE**
   ```javascript
   const { weight, height, age, goal } = $input.item.json.body;
   
   // Формула Mifflin-St Jeor для мужчин (упрощенная)
   const bmr = 10 * weight + 6.25 * height - 5 * age + 5;
   
   // TDEE с умеренной активностью (коэффициент 1.55)
   const tdee = bmr * 1.55;
   
   // Рекомендуемые калории в зависимости от цели
   let recommendedCalories;
   if (goal === 'weight-loss') {
     recommendedCalories = tdee - 500; // дефицит 500 ккал
   } else if (goal === 'muscle-gain') {
     recommendedCalories = tdee + 300; // профицит 300 ккал
   } else {
     recommendedCalories = tdee; // поддержание
   }
   
   return {
     json: {
       weight,
       height,
       age,
       goal,
       bmr: Math.round(bmr),
       tdee: Math.round(tdee),
       recommendedCalories: Math.round(recommendedCalories)
     }
   };
   ```

4. **Добавьте OpenAI Node для подбора диет**
   - Model: gpt-4
   - Prompt:
   ```
   User parameters:
   - Weight: {{$json.weight}} kg
   - Height: {{$json.height}} cm
   - Age: {{$json.age}} years
   - Goal: {{$json.goal}}
   - Recommended daily calories: {{$json.recommendedCalories}}
   
   Recommend 3 suitable diets for this user. Return ONLY a JSON array with this structure:
   [
     {
       "id": "1",
       "name": "Название диеты на русском",
       "description": "Подробное описание диеты на русском",
       "dailyCalories": {{$json.recommendedCalories}},
       "proteinPercent": 25,
       "carbsPercent": 45,
       "fatsPercent": 30,
       "suitableFor": ["weight-loss", "health"]
     }
   ]
   
   Make sure the diets are appropriate for the user's goal and calorie needs.
   ```

5. **Добавьте Function Node для форматирования ответа**
   ```javascript
   try {
     const response = $input.item.json.choices[0].message.content;
     const diets = JSON.parse(response);
     
     return {
       json: {
         success: true,
         bmr: $node["Calculate BMR"].json.bmr,
         tdee: $node["Calculate BMR"].json.tdee,
         recommendedCalories: $node["Calculate BMR"].json.recommendedCalories,
         diets: diets
       }
     };
   } catch (error) {
     return {
       json: {
         success: false,
         error: error.message,
         diets: []
       }
     };
   }
   ```

6. **Активируйте workflow и скопируйте URL**

## Локальное тестирование

Если n8n запущен локально, используйте ngrok для создания публичного URL:

```bash
ngrok http 5678
```

Затем используйте ngrok URL вместо localhost.

## Переменные окружения

Создайте файл `.env.local` в клиенте:

```env
VITE_N8N_FOOD_RECOGNITION_URL=https://your-n8n.com/webhook/food-recognition
VITE_N8N_DIET_RECOMMENDATION_URL=https://your-n8n.com/webhook/diet-recommendation
```

## Тестирование через curl

### Food Recognition:
```bash
curl -X POST https://your-n8n.com/webhook/food-recognition \
  -H "Content-Type: application/json" \
  -d '{
    "image": "base64_encoded_image_here",
    "userId": "test-user"
  }'
```

### Diet Recommendation:
```bash
curl -X POST https://your-n8n.com/webhook/diet-recommendation \
  -H "Content-Type: application/json" \
  -d '{
    "weight": 70,
    "height": 175,
    "age": 25,
    "goal": "weight-loss"
  }'
```
