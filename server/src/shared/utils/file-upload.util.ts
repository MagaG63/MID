// shared/utils/file-upload.util.ts
import { existsSync, mkdirSync } from 'fs';
import { extname } from 'path';
import { v4 as uuidv4 } from 'uuid';

export class FileUploadUtil {
  // Пути для хранения файлов
  static readonly UPLOAD_PATH = 'uploads';
  static readonly PROFILE_PATH = `${this.UPLOAD_PATH}/profile`;
  static readonly QUALIFICATIONS_PATH = `${this.UPLOAD_PATH}/qualifications`;

  // Создаем папки если их нет
  static ensureUploadDirs() {
    [this.UPLOAD_PATH, this.PROFILE_PATH, this.QUALIFICATIONS_PATH].forEach(
      (dir) => {
        if (!existsSync(dir)) {
          mkdirSync(dir, { recursive: true });
        }
      },
    );
  }

  // Генерация уникального имени файла
  static generateFileName(originalName: string): string {
    const ext = extname(originalName);
    return `${uuidv4()}${ext}`;
  }

  // Получение полного URL для файла
  static getFileUrl(
    filename: string,
    type: 'profile' | 'qualification',
  ): string {
    if (!filename) return 'https://via.placeholder.com/150';

    const baseUrl = process.env.BASE_URL || 'http://localhost:3000';
    const folder = type === 'profile' ? 'profile' : 'qualifications';

    return `${baseUrl}/uploads/${folder}/${filename}`;
  }

  // Валидация файла
  static validateFile(
    file: Express.Multer.File,
    fileType: 'profile' | 'qualification', // ← ДОБАВЬТЕ ЭТОТ ПАРАМЕТР
  ): boolean {
    const allowedTypes = [
      'image/jpeg',
      'image/jpg',
      'image/png',
      'image/gif',
      'image/webp',
      'application/pdf', // Добавляем PDF для сертификатов
    ];

    // Используйте fileType вместо type
    const maxSize = fileType === 'profile' ? 5 * 1024 * 1024 : 10 * 1024 * 1024; // 5MB или 10MB

    return allowedTypes.includes(file.mimetype) && file.size <= maxSize;
  }
}
