import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';
import type { TrainerType } from './trainer.type';
import type { TrainersState, TrainerProfile, TrainerSummary } from './trainer.interfaces';
import { fetchTrainersThunk, loginTrainerThunk, registerTrainerThunk, updateTrainerProfileThunk } from './trainer.thunk';

export const trainerAdapter = createEntityAdapter<TrainerSummary>({
  selectId: (trainer) => trainer.id,
});

const initialState: TrainersState = {
  trainers: [],
  currentTrainer: null,
  authenticatedTrainer: null,
  loading: {
    trainers: false,
    currentTrainer: false,
    authentication: false,
    profileUpdate: false,
  },
  errors: {
    trainers: null,
    currentTrainer: null,
    authentication: null,
    profileUpdate: null,
  },
  filters: {
    search: '',
    specializations: [],
    rating: null,
    priceRange: {
      min: null,
      max: null,
    },
    location: '',
    availability: false,
  },
  pagination: {
    page: 1,
    limit: 10,
    total: 0,
    hasMore: false,
  },
  cache: {
    lastFetch: null,
    ttl: 5 * 60 * 1000, // 5 минут
  },
};

export const trainerSlice = createSlice({
  name: 'trainer',
  initialState,
  reducers: {
    logout: (state) => {
      state.authenticatedTrainer = null;
      state.loading.authentication = false;
      state.errors.authentication = null;
    },
    clearError: (state, action: PayloadAction<keyof TrainersState['errors']>) => {
      state.errors[action.payload] = null;
    },
    clearAllErrors: (state) => {
      state.errors = {
        trainers: null,
        currentTrainer: null,
        authentication: null,
        profileUpdate: null,
      };
    },
    setCurrentTrainer: (state, action: PayloadAction<TrainerProfile | null>) => {
      state.currentTrainer = action.payload;
    },
    updateFilters: (state, action: PayloadAction<Partial<TrainersState['filters']>>) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    resetFilters: (state) => {
      state.filters = initialState.filters;
    },
    setPagination: (state, action: PayloadAction<Partial<TrainersState['pagination']>>) => {
      state.pagination = { ...state.pagination, ...action.payload };
    },
  },
  extraReducers: (builder) => {
    builder
      // Login
      .addCase(loginTrainerThunk.pending, (state) => {
        state.loading.authentication = true;
        state.errors.authentication = null;
      })
      .addCase(loginTrainerThunk.fulfilled, (state, action: PayloadAction<TrainerType>) => {
        console.log('✅ trainerSlice: Сохраняем тренера в store', action.payload);
        
        // ✅ ИСПРАВЛЕНИЕ: Правильное преобразование TrainerType в TrainerProfile
        const trainerData = action.payload;
        
        // Парсим qualificationImages если это строка
        let qualificationImages: any[] = [];
        if (trainerData.qualificationImages) {
          if (typeof trainerData.qualificationImages === 'string') {
            try {
              qualificationImages = JSON.parse(trainerData.qualificationImages);
            } catch {
              qualificationImages = [];
            }
          } else if (Array.isArray(trainerData.qualificationImages)) {
            qualificationImages = trainerData.qualificationImages;
          }
        }
        
        const trainerProfile: TrainerProfile = {
          id: trainerData.id,
          name: trainerData.name,
          email: trainerData.email,
          profileImage: trainerData.profileImage || 'https://via.placeholder.com/150',
          description: (trainerData as any).description || '',
          qualificationImages: qualificationImages.map((url: string, index: number) => ({
            id: `qual_${index}`,
            name: `Сертификат ${index + 1}`,
            url: typeof url === 'string' ? url : url.url || '',
            size: 0,
            type: 'image/jpeg',
            uploadedAt: new Date(),
          })),
          isActive: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        };
        
        console.log('✅ Преобразованный профиль тренера:', trainerProfile);
        
        state.authenticatedTrainer = trainerProfile;
        state.loading.authentication = false;
        state.errors.authentication = null;
      })
      .addCase(loginTrainerThunk.rejected, (state, action) => {
        state.loading.authentication = false;
        state.errors.authentication = action.payload as string;
        state.authenticatedTrainer = null;
      })
      // Register
      .addCase(registerTrainerThunk.pending, (state) => {
        state.loading.authentication = true;
        state.errors.authentication = null;
      })
      .addCase(registerTrainerThunk.fulfilled, (state, action: PayloadAction<TrainerType>) => {
        console.log('✅ trainerSlice: Регистрация тренера успешна', action.payload);
        
        // Преобразуем TrainerType в TrainerProfile для совместимости
        const trainerData = action.payload;
        
        // Парсим qualificationImages если это строка
        let qualificationImages: any[] = [];
        if (trainerData.qualificationImages) {
          if (typeof trainerData.qualificationImages === 'string') {
            try {
              qualificationImages = JSON.parse(trainerData.qualificationImages);
            } catch {
              qualificationImages = [];
            }
          } else if (Array.isArray(trainerData.qualificationImages)) {
            qualificationImages = trainerData.qualificationImages;
          }
        }
        
        const trainerProfile: TrainerProfile = {
          id: trainerData.id,
          name: trainerData.name,
          email: trainerData.email,
          profileImage: trainerData.profileImage || 'https://via.placeholder.com/150',
          description: (trainerData as any).description || '',
          qualificationImages: qualificationImages.map((url: string, index: number) => ({
            id: `qual_${index}`,
            name: `Сертификат ${index + 1}`,
            url: typeof url === 'string' ? url : url.url || '',
            size: 0,
            type: 'image/jpeg',
            uploadedAt: new Date(),
          })),
          isActive: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        };
        
        state.authenticatedTrainer = trainerProfile;
        state.loading.authentication = false;
        state.errors.authentication = null;
      })
      .addCase(registerTrainerThunk.rejected, (state, action) => {
        state.loading.authentication = false;
        state.errors.authentication = action.payload as string;
      })
      // Fetch all trainers
      .addCase(fetchTrainersThunk.pending, (state) => {
        state.loading.trainers = true;
        state.errors.trainers = null;
      })
      .addCase(fetchTrainersThunk.fulfilled, (state, action: PayloadAction<TrainerType[]>) => {
        // Преобразуем TrainerType[] в TrainerSummary[] для совместимости
        state.trainers = action.payload.map(trainer => ({
          ...trainer,
          isActive: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        })) as TrainerSummary[];
        state.loading.trainers = false;
        state.errors.trainers = null;
        state.cache.lastFetch = new Date();
      })
      .addCase(fetchTrainersThunk.rejected, (state, action) => {
        state.loading.trainers = false;
        state.errors.trainers = action.payload as string;
      })
      // Update trainer profile
      .addCase(updateTrainerProfileThunk.pending, (state) => {
        state.loading.profileUpdate = true;
        state.errors.profileUpdate = null;
      })
      .addCase(updateTrainerProfileThunk.fulfilled, (state, action: PayloadAction<TrainerProfile>) => {
        console.log('✅ Профиль тренера обновлен в Redux:', action.payload);
        state.authenticatedTrainer = action.payload;
        state.loading.profileUpdate = false;
        state.errors.profileUpdate = null;
      })
      .addCase(updateTrainerProfileThunk.rejected, (state, action) => {
        state.loading.profileUpdate = false;
        state.errors.profileUpdate = action.payload as string;
      });
  },
});

export const { 
  logout, 
  clearError, 
  clearAllErrors, 
  setCurrentTrainer, 
  updateFilters, 
  resetFilters, 
  setPagination 
} = trainerSlice.actions;

export default trainerSlice.reducer;
