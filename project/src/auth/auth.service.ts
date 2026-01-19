import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { TrainerService } from '../trainer/trainer.service';
import { LoginDto, UserRole } from './dto/login.dto';
import { User } from '../user/user.model';
import { Trainer } from '../trainer/trainer.model';
import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcrypt';
import { generateTokens, CustomJwtPayload } from './jwt.utils';

interface AuthUser {
  id: number;
  email: string;
  name: string;
  role: UserRole;
}

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private trainerService: TrainerService,
  ) {}

  async login(dto: LoginDto) {
    let user: User | Trainer;
    let role: UserRole;

    try {
      user = await this.userService.validateUser(dto.email, dto.password);
      role = UserRole.USER;
    } catch {
      try {
        user = await this.trainerService.validateTrainer(
          dto.email,
          dto.password,
        );
        role = UserRole.TRAINER;
      } catch {
        throw new UnauthorizedException('Invalid credentials');
      }
    }

    const tokens = generateTokens({
      id: (user as any).id,
      email: (user as any).email,
      name: (user as any).name,
      role,
    });

    return {
      ...tokens,
      user: {
        id: (user as any).id,
        email: (user as any).email,
        name: (user as any).name,
        role,
      },
    };
  }

  async register(dto: LoginDto) {
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

  async registerTrainer(dto: any) {
    const trainer = await this.trainerService.create(dto);

    const tokens = generateTokens({
      id: trainer.id,
      email: trainer.email,
      name: trainer.name,
      role: UserRole.TRAINER,
    });

    return {
      ...tokens,
      trainer: {
        id: trainer.id,
        email: trainer.email,
        name: trainer.name,
        role: UserRole.TRAINER,
        profileImage: trainer.profileImage,
        qualificationImages: trainer.qualificationImages,
      },
    };
  }

  // ✅ ЕДИНСТВЕННЫЙ refresh метод - УДАЛИТЬ ВСЕ ДУБЛИ ПОСЛЕ НЕГО
  async refresh(refreshToken: string) {
    try {
      const payload = jwt.verify(
        refreshToken,
        process.env.JWT_REFRESH_SECRET || 'refresh_secret',
      ) as unknown as CustomJwtPayload;

      let user: User | Trainer;
      if (payload.role === UserRole.USER) {
        user = await this.userService.findById(payload.sub);
      } else {
        user = await this.trainerService.findById(payload.sub);
      }

      const tokens = generateTokens({
        id: payload.sub,
        email: payload.email,
        name: payload.name,
        role: payload.role,
      });

      return {
        ...tokens,
        user: {
          id: payload.sub,
          email: payload.email,
          name: payload.name,
          role: payload.role,
        },
      };
    } catch {
      throw new UnauthorizedException('Invalid refresh token');
    }
  }
}
