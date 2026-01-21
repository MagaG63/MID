// trainer.controller.ts
import {
  Controller,
  Post,
  Put,
  Get,
  Param,
  ParseIntPipe,
  UseInterceptors,
  UploadedFile,
  UploadedFiles,
  Body,
  BadRequestException,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { FileInterceptor, FilesInterceptor, FileFieldsInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { join } from 'path';
import { existsSync, mkdirSync } from 'fs';
import { TrainerService, SafeTrainerData } from './trainer.service';
import { RegisterTrainerDto } from './dto/register-trainer.dto';
import { FileUploadUtil } from '../shared/utils/file-upload.util';
import { extname } from 'path';
import { v4 as uuidv4 } from 'uuid';

@Controller('trainer')
export class TrainerController {
  constructor(private readonly trainerService: TrainerService) {
    // Создаем папки при старте
    FileUploadUtil.ensureUploadDirs();
  }

  // Получить всех тренеров
  @Get()
  async getAllTrainers(): Promise<{ trainers: SafeTrainerData[] }> {
    const trainers = await this.trainerService.getAllTrainers();
    return { trainers };
  }

  // Получить одного тренера по ID
  @Get(':id')
  async getTrainerById(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<{ trainer: SafeTrainerData }> {
    const trainer = await this.trainerService.findById(id);
    
    if (!trainer) {
      throw new BadRequestException('Тренер не найден');
    }

    // Преобразуем в SafeTrainerData
    const safeData: SafeTrainerData = {
      id: trainer.id,
      name: trainer.name,
      email: trainer.email,
      description: trainer.description || '',
      profileImage: trainer.profileImage || 'https://via.placeholder.com/150',
      qualificationImages: trainer.qualificationImages 
        ? (typeof trainer.qualificationImages === 'string' 
            ? JSON.parse(trainer.qualificationImages) 
            : trainer.qualificationImages)
        : [],
      createdAt: trainer.createdAt,
      updatedAt: trainer.updatedAt,
    };

    return { trainer: safeData };
  }

  @Post('register')
  @UseInterceptors(
    FileInterceptor('profileImage', {
      storage: diskStorage({
        destination: (req, file, cb) => {
          cb(null, FileUploadUtil.PROFILE_PATH);
        },
        filename: (req, file, cb) => {
          const uniqueName = FileUploadUtil.generateFileName(file.originalname);
          cb(null, uniqueName);
        },
      }),
      limits: { fileSize: 5 * 1024 * 1024 },
      fileFilter: (req, file, cb) => {
        const allowedTypes = /jpeg|jpg|png|gif|webp/;
        const mimetype = allowedTypes.test(file.mimetype);
        const extnameCheck = allowedTypes.test(
          extname(file.originalname).toLowerCase(),
        );

        if (mimetype && extnameCheck) {
          return cb(null, true);
        }
        cb(
          new BadRequestException(
            'Недопустимый тип файла. Только изображения (jpeg, jpg, png, gif, webp)',
          ),
          false,
        );
      },
    }),
    FilesInterceptor('qualificationImages', 5, {
      // Максимум 5 файлов
      storage: diskStorage({
        destination: (req, file, cb) => {
          cb(null, FileUploadUtil.QUALIFICATIONS_PATH);
        },
        filename: (req, file, cb) => {
          const uniqueName = FileUploadUtil.generateFileName(file.originalname);
          cb(null, uniqueName);
        },
      }),
      limits: { fileSize: 10 * 1024 * 1024 },
      fileFilter: (req, file, cb) => {
        const allowedTypes = /jpeg|jpg|png|gif|webp|pdf/;
        const mimetype = allowedTypes.test(file.mimetype);
        const extnameCheck = allowedTypes.test(
          extname(file.originalname).toLowerCase(),
        );

        if (mimetype && extnameCheck) {
          return cb(null, true);
        }
        cb(
          new BadRequestException(
            'Недопустимый тип файла. Только изображения и PDF',
          ),
          false,
        );
      },
    }),
  )
  @UsePipes(new ValidationPipe({ transform: true }))
  async register(
    @UploadedFile() profileImage: Express.Multer.File,
    @UploadedFiles() qualificationImages: Express.Multer.File[],
    @Body() dto: RegisterTrainerDto,
  ) {
    try {
      // Подготавливаем данные для сохранения
      const dataToSave: RegisterTrainerDto = {
        ...dto,
        profileImage: profileImage
          ? FileUploadUtil.getFileUrl(profileImage.filename, 'profile')
          : 'https://via.placeholder.com/150',
        qualificationImages: qualificationImages
          ? qualificationImages.map((file) =>
              FileUploadUtil.getFileUrl(file.filename, 'qualification'),
            )
          : [],
      };

      return await this.trainerService.create(dataToSave);
    } catch (error) {
      throw new BadRequestException(`Ошибка регистрации: ${error.message}`);
    }
  }

  // Обновление профиля тренера
  @Put('profile')
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
          fileSize: 10 * 1024 * 1024,
        },
      },
    ),
  )
  async updateProfile(
    @UploadedFiles()
    files: {
      profileImage?: Express.Multer.File[];
      qualificationImages?: Express.Multer.File[];
    },
    @Body() dto: any,
  ): Promise<{ trainer: SafeTrainerData }> {
    try {
      console.log('🔄 Обновление профиля тренера:', dto.email);

      // Находим тренера по email
      const trainer = await this.trainerService.findByEmail(dto.email);
      if (!trainer) {
        throw new BadRequestException('Тренер не найден');
      }

      // Подготавливаем данные для обновления
      const updateData: any = {
        name: dto.name,
        description: dto.description || '',
      };

      // Обрабатываем profileImage
      if (files.profileImage && files.profileImage[0]) {
        updateData.profileImage = `http://localhost:3000/uploads/profile/${files.profileImage[0].filename}`;
      }

      // Обрабатываем qualificationImages
      if (files.qualificationImages && files.qualificationImages.length > 0) {
        // Получаем текущие сертификаты
        let currentCerts: string[] = [];
        try {
          const trainerData = trainer.toJSON();
          currentCerts =
            typeof trainerData.qualificationImages === 'string'
              ? JSON.parse(trainerData.qualificationImages)
              : trainerData.qualificationImages || [];
        } catch {
          currentCerts = [];
        }

        // Добавляем новые сертификаты
        const newCerts = files.qualificationImages.map(
          (file) => `http://localhost:3000/uploads/qualifications/${file.filename}`,
        );
        updateData.qualificationImages = [...currentCerts, ...newCerts];
      }

      console.log('📦 Данные для обновления:', updateData);

      const updatedTrainer = await this.trainerService.updateTrainer(
        trainer.id,
        updateData,
      );

      return { trainer: updatedTrainer };
    } catch (error) {
      console.error('❌ Ошибка обновления профиля:', error);
      throw error;
    }
  }
}
