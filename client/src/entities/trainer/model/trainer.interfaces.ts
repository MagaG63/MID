

export interface FileInfo {
  id: string;
  name: string;
  url: string;
  size: number;
  type: string;
  uploadedAt: Date;
}

export interface TrainerSummary {
  id: number;
  name: string;
  email: string;
  profileImage: string;
  description?: string;
  rating?: number;
  reviewsCount?: number;
  specializations?: string[];
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface TrainerProfile extends TrainerSummary {
  qualificationImages: FileInfo[];
  experience?: number; // лет опыта
  certifications?: string[];
  workingHours?: {
    start: string;
    end: string;
    days: string[];
  };
  contactInfo?: {
    phone?: string;
    telegram?: string;
    whatsapp?: string;
  };
  pricing?: {
    personalTraining?: number;
    groupTraining?: number;
    consultation?: number;
  };
  bio?: string;
  achievements?: string[];
  languages?: string[];
  location?: {
    city: string;
    gym?: string;
    address?: string;
  };
}

// Состояние Redux для тренеров
export interface TrainersState {
  // Список всех тренеров (краткая информация)
  trainers: TrainerSummary[];
  
  // Текущий выбранный тренер (полная информация)
  currentTrainer: TrainerProfile | null;
  
  // Авторизованный тренер (если пользователь - тренер)
  authenticatedTrainer: TrainerProfile | null;
  
  // Состояния загрузки
  loading: {
    trainers: boolean;
    currentTrainer: boolean;
    authentication: boolean;
    profileUpdate: boolean;
  };
  
  // Ошибки
  errors: {
    trainers: string | null;
    currentTrainer: string | null;
    authentication: string | null;
    profileUpdate: string | null;
  };
  
  // Фильтры и поиск
  filters: {
    search: string;
    specializations: string[];
    rating: number | null;
    priceRange: {
      min: number | null;
      max: number | null;
    };
    location: string;
    availability: boolean;
  };
  
  // Пагинация
  pagination: {
    page: number;
    limit: number;
    total: number;
    hasMore: boolean;
  };
  
  // Кэширование
  cache: {
    lastFetch: Date | null;
    ttl: number; // время жизни кэша в миллисекундах
  };
}

// DTO для создания/обновления профиля тренера
export interface CreateTrainerProfileDto {
  name: string;
  email: string;
  password: string;
  description?: string;
  profileImage?: File;
  qualificationImages?: File[];
  experience?: number;
  certifications?: string[];
  specializations?: string[];
  contactInfo?: TrainerProfile['contactInfo'];
  pricing?: TrainerProfile['pricing'];
  bio?: string;
  workingHours?: TrainerProfile['workingHours'];
  location?: TrainerProfile['location'];
}

export interface UpdateTrainerProfileDto extends Partial<Omit<CreateTrainerProfileDto, 'email' | 'password'>> {
  id: number;
}

// Типы для API ответов
export interface TrainerApiResponse {
  trainer: TrainerProfile;
  message?: string;
}

export interface TrainersListApiResponse {
  trainers: TrainerSummary[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

// Типы для поиска и фильтрации
export interface TrainerSearchParams {
  search?: string;
  specializations?: string[];
  rating?: number;
  priceMin?: number;
  priceMax?: number;
  location?: string;
  page?: number;
  limit?: number;
}

// Типы для аутентификации
export interface TrainerLoginDto {
  email: string;
  password: string;
}

export interface TrainerAuthResponse {
  trainer?: TrainerProfile;
  user?: TrainerProfile; // Сервер может вернуть user с ролью trainer
  accessToken: string;
  refreshToken: string;
}