

export const mockTopics: Topic[] = [
  {
    id: 1,
    title: 'Изучение React',
    description:
      'Обсуждаем лучшие практики и подходы к изучению React для начинающих разработчиков',
    author: 'Алексей Петров',
    createdAt: '2024-01-15',
  },
  {
    id: 2,
    title: 'TypeScript vs JavaScript',
    description:
      'Сравниваем преимущества и недостатки TypeScript по сравнению с обычным JavaScript',
    author: 'Мария Иванова',
    createdAt: '2024-01-14',
  },
  {
    id: 3,
    title: 'Архитектура фронтенд приложений',
    description: 'Разбираем различные подходы к архитектуре современных фронтенд приложений',
    author: 'Дмитрий Сидоров',
    createdAt: '2024-01-13',
  },
  {
    id: 4,
    title: 'Оптимизация производительности',
    description:
      'Делимся опытом оптимизации производительности веб-приложений и лучшими практиками',
    author: 'Елена Козлова',
    createdAt: '2024-01-12',
  },
  {
    id: 5,
    title: 'CSS Grid vs Flexbox',
    description: 'Когда использовать CSS Grid, а когда Flexbox? Разбираем на практических примерах',
    author: 'Андрей Волков',
    createdAt: '2024-01-11',
  },
];
export type Review = {
  id: number;
  author: string;
  rating: number;
  comment: string;
  date: string;
};

export type FitnessClub = {
  id: number;
  name: string;
  description: string;
  address: string;
  phone: string;
  email: string;
  website: string;
  rating: number;
  priceRange: string;
  facilities: string[];
  workingHours: string;
  image: string;
  reviews: Review[];
};

export const mockFitnessClubs: FitnessClub[] = [
  {
    id: 1,
    name: 'ddxFitness',
    description:
      'Современный фитнес-клуб с профессиональным оборудованием и опытными тренерами. Специализируемся на силовых тренировках и функциональном фитнесе.',
    address: 'ул. Спортивная, 15, Москва',
    phone: '+7 (495) 123-45-67',
    email: 'info@ddxfitness.ru',
    website: 'www.ddxfitness.ru',
    rating: 4.8,
    priceRange: '3000-5000 ₽/месяц',
    facilities: [
      'Тренажерный зал',
      'Кардио зона',
      'Групповые занятия',
      'Сауна',
      'Раздевалки',
      'Парковка',
    ],
    workingHours: 'Пн-Вс: 06:00-24:00',
    image:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTA9j9er1aBd4ZaMp6C5UYWIQvNssrz80JuNg&s',
    reviews: [
      {
        id: 1,
        author: 'Александр К.',
        rating: 5,
        comment:
          'Отличный зал! Современное оборудование, чистота, профессиональные тренеры. Рекомендую!',
        date: '2024-01-10',
      },
      {
        id: 2,
        author: 'Мария С.',
        rating: 4,
        comment: 'Хороший клуб, но иногда много людей в вечернее время. В целом довольна.',
        date: '2024-01-08',
      },
    ],
  },
  {
    id: 2,
    name: 'MyFitLab',
    description:
      'Инновационный фитнес-клуб с научным подходом к тренировкам. Индивидуальные программы и современные технологии для достижения ваших целей.',
    address: 'пр. Фитнес, 42, Москва',
    phone: '+7 (495) 987-65-43',
    email: 'hello@myfitlab.ru',
    website: 'www.myfitlab.ru',
    rating: 4.6,
    priceRange: '4000-7000 ₽/месяц',
    facilities: [
      'Тренажерный зал',
      'Функциональная зона',
      'Бассейн',
      'Спа-центр',
      'Кафе',
      'Детская комната',
    ],
    workingHours: 'Пн-Пт: 06:00-23:00, Сб-Вс: 08:00-22:00',
    image:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRGn42rRG_VR324IMIEMlk4OPPQuAzI-sGgew&s',
    reviews: [
      {
        id: 3,
        author: 'Дмитрий П.',
        rating: 5,
        comment: 'Потрясающий клуб! Бассейн супер, тренеры профессионалы. Стоит своих денег.',
        date: '2024-01-12',
      },
    ],
  },
];
