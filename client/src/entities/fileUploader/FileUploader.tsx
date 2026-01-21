// components/FileUploader.tsx
import React, { useRef, useState } from 'react';

type FileUploaderProps = {
  label: string;
  onFileChange: (file: File | null) => void;
  currentFile?: File | null;
  currentFiles?: File[];
  multiple?: boolean;
  accept?: string;
  className?: string;
};

export function FileUploader({
  label,
  onFileChange,
  currentFile,
  currentFiles = [],
  multiple = false,
  accept = 'image/*',
  className = '',
}: FileUploaderProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [localPreview, setLocalPreview] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;
    if (!files || files.length === 0) {
      if (localPreview) URL.revokeObjectURL(localPreview);
      setLocalPreview(null);
      onFileChange(null);
      return;
    }

    const file = files[0];
    const objectUrl = URL.createObjectURL(file);
    setLocalPreview(objectUrl);
    onFileChange(file);
  };

  const handleClear = () => {
    if (localPreview) URL.revokeObjectURL(localPreview);
    setLocalPreview(null);
    onFileChange(null);
    if (inputRef.current) inputRef.current.value = '';
  };

  const getFileName = () => {
    if (multiple && currentFiles.length > 0) {
      return `${currentFiles.length} файлов выбрано`;
    }
    return currentFile?.name || 'Файл не выбран';
  };

  const displayPreview = localPreview;

  return (
    <div className={`form-group ${className}`}>
      <label>{label}</label>
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginTop: '5px' }}>
        <input
          type="file"
          ref={inputRef}
          onChange={handleFileChange}
          accept={accept}
          multiple={multiple}
          style={{ display: 'none' }}
          id={`file-${label.replace(/\s+/g, '-')}`}
        />
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          style={{
            padding: '8px 16px',
            backgroundColor: '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
          }}
        >
          Выбрать файл
        </button>
        <span style={{ flex: 1 }}>{getFileName()}</span>
        {(currentFile || currentFiles.length > 0) && (
          <button
            type="button"
            onClick={handleClear}
            style={{
              padding: '4px 12px',
              backgroundColor: '#dc3545',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
            }}
          >
            Очистить
          </button>
        )}
      </div>
      {displayPreview && (
        <div style={{ marginTop: '10px' }}>
          <img
            src={displayPreview}
            alt="Предпросмотр"
            style={{ maxWidth: '200px', maxHeight: '200px', borderRadius: '8px' }}
          />
        </div>
      )}
    </div>
  );
}
