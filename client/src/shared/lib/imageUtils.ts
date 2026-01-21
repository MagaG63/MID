// shared/lib/imageUtils.ts
// Утилита для работы с URL изображений

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

/**
 * Преобразует относительный URL в абсолютный
 * @param url - URL изображения (может быть относительным или абсолютным)
 * @returns Абсолютный URL
 */
export function getImageUrl(url: string | undefined | null): string {
  if (!url) {
    return 'https://via.placeholder.com/150';
  }

  // Если URL уже абсолютный (начинается с http:// или https://)
  if (url.startsWith('http://') || url.startsWith('https://')) {
    return url;
  }

  // Если URL относительный, добавляем базовый URL сервера
  if (url.startsWith('/')) {
    return `${API_BASE_URL}${url}`;
  }

  // Если URL не начинается с /, добавляем /
  return `${API_BASE_URL}/${url}`;
}

/**
 * Преобразует массив URL изображений
 * @param urls - Массив URL изображений
 * @returns Массив абсолютных URL
 */
export function getImageUrls(urls: (string | undefined | null)[] | undefined | null): string[] {
  if (!urls || !Array.isArray(urls)) {
    return [];
  }

  return urls.map(getImageUrl).filter(Boolean);
}

/**
 * Обработчик ошибки загрузки изображения
 * @param e - Событие ошибки
 * @param fallbackUrl - URL изображения-заглушки
 */
export function handleImageError(
  e: React.SyntheticEvent<HTMLImageElement>,
  fallbackUrl: string = 'https://via.placeholder.com/150'
): void {
  const target = e.target as HTMLImageElement;
  if (target.src !== fallbackUrl) {
    target.src = fallbackUrl;
  }
}
