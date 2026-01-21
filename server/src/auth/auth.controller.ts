// auth.controller.ts - УПРОЩЕННАЯ РАБОЧАЯ ВЕРСИЯ
import {
  Controller,
  Post,
  Body,
  Res,
  Req,
  Delete,
  HttpCode,
  UsePipes,
  ValidationPipe,
  UnauthorizedException,
  UseInterceptors,
  UploadedFile,
  UploadedFiles,
  BadRequestException,
} from '@nestjs/common';
import { FileInterceptor, FilesInterceptor, FileFieldsInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { join } from 'path';
import { existsSync, mkdirSync } from 'fs';
import type { Response, Request } from 'express';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { CreateUserDto } from '../user/dto/create-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  // ✅ РЕГИСТРАЦИЯ ОБЫЧНОГО ПОЛЬЗОВАТЕЛЯ
  @Post('register')
  @UsePipes(new ValidationPipe())
  async register(
    @Body() dto: CreateUserDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const result = await this.authService.register(dto);

    res.cookie('refreshToken', result.refreshToken, {
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000,
      sameSite: 'strict',
    });

    return { user: result.user, accessToken: result.accessToken };
  }

  // ✅ РЕГИСТРАЦИЯ ТРЕНЕРА (рабочая версия)
  @Post('register-trainer')
  @UseInterceptors(
    FileFieldsInterceptor(
      [
        { name: 'profileImage', maxCount: 1 },
        { name: 'qualificationImages', maxCount: 5 },
      ],
      {
        storage: diskStorage({
          destination: (req, file, cb) => {
            let folder = 'uploads';
            if (file.fieldname === 'profileImage') {
              folder = 'uploads/profile';
            } else if (file.fieldname === 'qualificationImages') {
              folder = 'uploads/qualifications';
            }

            const fullPath = join(__dirname, '..', '..', folder);
            if (!existsSync(fullPath)) {
              mkdirSync(fullPath, { recursive: true });
            }
            cb(null, fullPath);
          },
          filename: (req, file, cb) => {
            const uniqueName = `${Date.now()}-${file.originalname}`;
            cb(null, uniqueName);
          },
        }),
        limits: {
          fileSize: 10 * 1024 * 1024, // 10MB
        },
      },
    ),
  )
  async registerTrainer(
    @UploadedFiles()
    files: {
      profileImage?: Express.Multer.File[];
      qualificationImages?: Express.Multer.File[];
    },
    @Body() dto: any,
    @Res({ passthrough: true }) res: Response,
  ) {
    try {
      console.log('🎯 Регистрация тренера:', {
        email: dto.email,
        name: dto.name,
      });

      // Проверяем обязательные поля
      if (!dto.email || !dto.password || !dto.name) {
        throw new BadRequestException(
          'Заполните обязательные поля: email, пароль, имя',
        );
      }

      // Собираем данные для тренера
      const trainerData: any = {
        name: dto.name,
        email: dto.email,
        password: dto.password,
        description: dto.description || '',
      };

      // Обрабатываем profileImage
      if (files.profileImage && files.profileImage[0]) {
        trainerData.profileImage = `http://localhost:3000/uploads/profile/${files.profileImage[0].filename}`;
        console.log('✅ Profile image URL:', trainerData.profileImage);
      } else {
        trainerData.profileImage = 'https://via.placeholder.com/150';
      }

      // Обрабатываем qualificationImages
      if (files.qualificationImages && files.qualificationImages.length > 0) {
        trainerData.qualificationImages = files.qualificationImages.map(
          (file) => `http://localhost:3000/uploads/qualifications/${file.filename}`,
        );
        console.log('✅ Qualification images URLs:', trainerData.qualificationImages);
      } else {
        trainerData.qualificationImages = [];
      }

      console.log('📦 Данные для создания тренера:', trainerData);

      const result = await this.authService.registerTrainer(trainerData);

      res.cookie('refreshToken', result.refreshToken, {
        httpOnly: true,
        maxAge: 7 * 24 * 60 * 60 * 1000,
      });

      return {
        trainer: result.trainer,
        accessToken: result.accessToken,
      };
    } catch (error) {
      console.error('❌ Ошибка регистрации тренера:', error);
      throw error;
    }
  }

  // ✅ ЛОГИН
  @Post('login')
  @UsePipes(new ValidationPipe())
  async login(
    @Body() dto: LoginDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const result = await this.authService.login(dto);

    res.cookie('refreshToken', result.refreshToken, {
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000,
      sameSite: 'strict',
    });

    return { user: result.user, accessToken: result.accessToken };
  }

  // ✅ REFRESH токена
  @Post('refresh')
  @HttpCode(200)
  async refresh(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ) {
    const refreshToken = req.cookies['refreshToken'];
    if (!refreshToken) {
      throw new UnauthorizedException('No refresh token');
    }

    const result = await this.authService.refresh(refreshToken);

    res.cookie('refreshToken', result.refreshToken, {
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000,
      sameSite: 'strict',
    });

    return { user: result.user, accessToken: result.accessToken };
  }

  // ✅ ЛОГАУТ
  @Delete('logout')
  @HttpCode(204)
  logout(@Res({ passthrough: true }) res: Response) {
    res.clearCookie('refreshToken');
  }
}
