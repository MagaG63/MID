import React, { useState, useRef, useCallback } from 'react';
import { Card, Button } from 'react-bootstrap';
import styles from './FoodUploader.module.css';

interface FoodUploaderProps {
  onImageUpload: (file: File) => void;
  isRecognizing: boolean;
}

export default function FoodUploader({
  onImageUpload,
  isRecognizing,
}: FoodUploaderProps): React.JSX.Element {
  const [preview, setPreview] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = useCallback((file: File) => {
    setError(null);

    const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
    if (!validTypes.includes(file.type)) {
      setError('Пожалуйста, загрузите изображение (JPG, PNG, WEBP)');
      return;
    }

    const maxSize = 10 * 1024 * 1024;
    if (file.size > maxSize) {
      setError('Размер файла не должен превышать 10MB');
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result as string);
    };
    reader.readAsDataURL(file);

    onImageUpload(file);
  }, [onImageUpload]);

  const handleFileInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFileSelect(file);
    }
  }, [handleFileSelect]);

  const handleUploadClick = useCallback(() => {
    fileInputRef.current?.click();
  }, []);

  const handleDragEnter = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const file = e.dataTransfer.files?.[0];
    if (file) {
      handleFileSelect(file);
    }
  }, [handleFileSelect]);

  return (
    <Card className={styles.uploaderCard}>
      <Card.Body>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/jpeg,image/jpg,image/png,image/webp"
          onChange={handleFileInputChange}
          style={{ display: 'none' }}
        />

        {!preview ? (
          <div
            className={`${styles.uploadArea} ${isDragging ? styles.dragging : ''}`}
            onClick={handleUploadClick}
            onDragEnter={handleDragEnter}
            onDragLeave={handleDragLeave}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
          >
            <svg className={styles.uploadIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <p className={styles.uploadText}>
              Нажмите, чтобы загрузить фото еды
            </p>
            <p className={styles.uploadHint}>
              или перетащите файл сюда
            </p>
          </div>
        ) : (
          <div className={styles.previewArea}>
            <img
              src={preview}
              alt="Preview"
              className={styles.previewImage}
            />
            {isRecognizing && (
              <div className={styles.recognizingOverlay}>
                <div className={styles.spinner}></div>
                <p>Распознаем еду...</p>
              </div>
            )}
            <Button
              variant="outline-secondary"
              size="sm"
              className={styles.changeButton}
              onClick={handleUploadClick}
              disabled={isRecognizing}
            >
              Изменить фото
            </Button>
          </div>
        )}

        {error && (
          <div className={`alert alert-danger mt-3 ${styles.errorAlert}`} role="alert">
            {error}
          </div>
        )}
      </Card.Body>
    </Card>
  );
}
