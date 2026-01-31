import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { useTranslation } from 'react-i18next';
import { ACCEPTED_FILE_TYPES, MAX_FILE_SIZE } from '@/constants/formats';
import { ImageConverter } from '@/utils/imageConverter';

interface ImageUploaderProps {
  onFileSelect: (file: File) => void;
  disabled?: boolean;
}

export const ImageUploader: React.FC<ImageUploaderProps> = ({ onFileSelect, disabled = false }) => {
  const { t } = useTranslation();

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (acceptedFiles.length > 0) {
        onFileSelect(acceptedFiles[0]);
      }
    },
    [onFileSelect]
  );

  const { getRootProps, getInputProps, isDragActive, fileRejections } = useDropzone({
    onDrop,
    accept: ACCEPTED_FILE_TYPES,
    maxFiles: 1,
    maxSize: MAX_FILE_SIZE,
    disabled,
  });

  return (
    <div className="w-full">
      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-lg p-12 text-center cursor-pointer transition-all ${
          isDragActive
            ? 'border-primary-500 bg-primary-50'
            : disabled
            ? 'border-gray-200 bg-gray-50 cursor-not-allowed'
            : 'border-gray-300 hover:border-primary-400 hover:bg-gray-50'
        }`}
      >
        <input {...getInputProps()} />

        <div className="space-y-4">
          {/* Upload Icon */}
          <svg
            className={`mx-auto h-16 w-16 ${disabled ? 'text-gray-300' : 'text-gray-400'}`}
            stroke="currentColor"
            fill="none"
            viewBox="0 0 48 48"
            aria-hidden="true"
          >
            <path
              d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>

          {/* Text */}
          <div>
            <p className={`text-lg font-medium ${disabled ? 'text-gray-400' : 'text-gray-700'}`}>
              {isDragActive
                ? t('converter.upload.dropHere')
                : t('converter.upload.dragOrClick')}
            </p>
            <p className={`text-sm mt-1 ${disabled ? 'text-gray-300' : 'text-gray-500'}`}>
              {t('converter.upload.maxSize', { maxSize: ImageConverter.formatFileSize(MAX_FILE_SIZE) })}
            </p>
          </div>

          {/* Supported formats */}
          {!disabled && (
            <div className="flex justify-center gap-2">
              <span className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-xs font-medium">
                JPG
              </span>
              <span className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-xs font-medium">
                PNG
              </span>
              <span className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-xs font-medium">
                WebP
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Error messages */}
      {fileRejections.length > 0 && (
        <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-sm text-red-600 font-medium">
            {fileRejections[0].errors[0].code === 'file-too-large'
              ? t('converter.upload.errors.fileTooLarge')
              : t('converter.upload.errors.unsupportedFormat')}
          </p>
        </div>
      )}
    </div>
  );
};
