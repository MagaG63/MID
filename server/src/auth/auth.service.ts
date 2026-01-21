// auth.service.ts - ПОЛНОСТЬЮ ИСПРАВЛЕННАЯ ВЕРСИЯ
import {
  Injectable,
  UnauthorizedException,
  ConflictException,
  BadRequestException,
} from '@nestjs/common';
import { UserService } from '../user/user.service';
import { TrainerService } from '../trainer/trainer.service';
import { LoginDto, UserRole } from './dto/login.dto';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { User } from '../user/user.model';
import { Trainer } from '../trainer/trainer.model';
import { generateTokens, CustomJwtPayload } from './jwt.utils';

interface AuthResponse {
  accessToken: string;
  refreshToken: string;
  user?: any;
  trainer?: any;
}

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private trainerService: TrainerService,
  ) {}

  async login(dto: LoginDto): Promise<AuthResponse> {
    const { email, password, role } = dto;

    // Если указана роль, проверяем только в соответствующей таблице
    if (role === UserRole.USER) {
      try {
        const user = await this.userService.validateUser(email, password);
        const tokens = generateTokens({
          id: user.id,
          email: user.email,
          name: user.name,
          role: UserRole.USER,
        });

        return {
          ...tokens,
          user: {
            id: user.id,
            email: user.email,
            name: user.name,
            role: UserRole.USER,
          },
        };
      } catch {
        throw new UnauthorizedException('Invalid user credentials');
      }
    }

    if (role === UserRole.TRAINER) {
      try {
        const trainer = await this.trainerService.validateTrainer(
          email,
          password,
        );
        const tokens = generateTokens({
          id: trainer.id,
          email: trainer.email,
          name: trainer.name,
          role: UserRole.TRAINER,
        });

        // Парсим qualificationImages
        const trainerData = trainer.toJSON();
        let qualificationImages: string[] = [];
        if (trainerData.qualificationImages) {
          try {
            qualificationImages = typeof trainerData.qualificationImages === 'string' 
              ? JSON.parse(trainerData.qualificationImages) 
              : trainerData.qualificationImages;
          } catch {
            qualificationImages = [];
          }
        }

        return {
          ...tokens,
          user: {
            // Возвращаем как user, но с ролью trainer
            id: trainer.id,
            email: trainer.email,
            name: trainer.name,
            role: UserRole.TRAINER,
            profileImage: trainer.profileImage,
            qualificationImages,
            description: trainer.description,
          },
        };
      } catch {
        throw new UnauthorizedException('Invalid trainer credentials');
      }
    }

    // Если роль не указана, проверяем как раньше (для обратной совместимости)
    let user: User | Trainer | null = null;
    let detectedRole: UserRole;

    try {
      user = await this.userService.validateUser(email, password);
      detectedRole = UserRole.USER;
    } catch {
      try {
        user = await this.trainerService.validateTrainer(email, password);
        detectedRole = UserRole.TRAINER;
      } catch {
        throw new UnauthorizedException('Invalid credentials');
      }
    }

    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    const tokens = generateTokens({
      id: (user as any).id,
      email: (user as any).email,
      name: (user as any).name,
      role: detectedRole,
    });

    const userData: any = {
      id: (user as any).id,
      email: (user as any).email,
      name: (user as any).name,
      role: detectedRole,
    };

    // Добавляем специфичные поля для тренера
    if (detectedRole === UserRole.TRAINER) {
      const trainerData = (user as any).toJSON();
      userData.profileImage = trainerData.profileImage;
      userData.description = trainerData.description;
      
      // Парсим qualificationImages
      let qualificationImages: string[] = [];
      if (trainerData.qualificationImages) {
        try {
          qualificationImages = typeof trainerData.qualificationImages === 'string' 
            ? JSON.parse(trainerData.qualificationImages) 
            : trainerData.qualificationImages;
        } catch {
          qualificationImages = [];
        }
      }
      userData.qualificationImages = qualificationImages;
    }

    return {
      ...tokens,
      user: userData,
    };
  }

  async register(dto: CreateUserDto): Promise<AuthResponse> {
    // Проверяем, существует ли пользователь
    const existingUser = await this.userService.findByEmail(dto.email);
    if (existingUser) {
      throw new ConflictException('User already exists');
    }

    const user = await this.userService.create({
      name: dto.name || dto.email.split('@')[0],
      email: dto.email,
      password: dto.password,
    });

    const tokens = generateTokens({
      id: user.id,
      email: user.email,
      name: user.name,
      role: UserRole.USER,
    });

    return {
      ...tokens,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: UserRole.USER,
      },
    };
  }

  // УПРОЩЕННАЯ РЕГИСТРАЦИЯ ТРЕНЕРА
  async registerTrainer(dto: any): Promise<AuthResponse> {
    console.log('🔄 Регистрация тренера в auth.service:', {
      email: dto.email,
      name: dto.name,
    });

    // Проверяем, существует ли тренер
    const existingTrainer = await this.trainerService.findByEmail(dto.email);
    if (existingTrainer) {
      throw new ConflictException('Тренер с таким email уже существует');
    }

    // Создаем тренера с минимальными данными
    const trainer = await this.trainerService.create({
      name: dto.name,
      email: dto.email,
      password: dto.password,
      description: dto.description || '',
      profileImage: dto.profileImage || 'https://via.placeholder.com/150',
      qualificationImages: dto.qualificationImages || [],
    });

    console.log('✅ Тренер создан:', trainer.id);

    // Генерируем токены
    const tokens = generateTokens({
      id: trainer.id,
      email: trainer.email,
      name: trainer.name,
      role: UserRole.TRAINER,
    });

    // Используем toJSON() для удаления пароля
    const trainerData = trainer.toJSON();
    
    // Парсим qualificationImages если это строка
    let qualificationImages: string[] = [];
    if (trainerData.qualificationImages) {
      try {
        qualificationImages = typeof trainerData.qualificationImages === 'string' 
          ? JSON.parse(trainerData.qualificationImages) 
          : trainerData.qualificationImages;
      } catch {
        qualificationImages = [];
      }
    }

    return {
      ...tokens,
      trainer: {
        id: trainerData.id,
        email: trainerData.email,
        name: trainerData.name,
        role: UserRole.TRAINER,
        profileImage: trainerData.profileImage,
        qualificationImages,
        description: trainerData.description,
        createdAt: trainerData.createdAt,
        updatedAt: trainerData.updatedAt,
      },
    };
  }

  async refresh(refreshToken: string): Promise<AuthResponse> {
    try {
      const jwt = require('jsonwebtoken');
      const payload = jwt.verify(
        refreshToken,
        process.env.JWT_REFRESH_SECRET || 'refresh_secret',
      ) as unknown as CustomJwtPayload;

      let user: User | Trainer | null = null;

      if (payload.role === UserRole.USER) {
        user = await this.userService.findById(payload.sub);
      } else {
        user = await this.trainerService.findById(payload.sub);
      }

      if (!user) {
        throw new UnauthorizedException('User not found');
      }

      const tokens = generateTokens({
        id: payload.sub,
        email: payload.email,
        name: payload.name,
        role: payload.role,
      });

      const userData: any = {
        id: payload.sub,
        email: payload.email,
        name: payload.name,
        role: payload.role,
      };

      // Добавляем специфичные поля для тренера
      if (payload.role === UserRole.TRAINER && user) {
        const trainerData = (user as any).toJSON();
        userData.profileImage = trainerData.profileImage;
        userData.description = trainerData.description;
        
        // Парсим qualificationImages
        let qualificationImages: string[] = [];
        if (trainerData.qualificationImages) {
          try {
            qualificationImages = typeof trainerData.qualificationImages === 'string' 
              ? JSON.parse(trainerData.qualificationImages) 
              : trainerData.qualificationImages;
          } catch {
            qualificationImages = [];
          }
        }
        userData.qualificationImages = qualificationImages;
      }

      return {
        ...tokens,
        user: userData,
      };
    } catch (error) {
      console.error('Refresh token error:', error);
      throw new UnauthorizedException('Invalid refresh token');
    }
  }
}
