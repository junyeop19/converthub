import React from 'react';
import { useTranslation } from 'react-i18next';
import type { ConversionResult, ImageFile } from '@/types/image.types';
import { ImageConverter } from '@/utils/imageConverter';

interface ImagePreviewProps {
  original?: ImageFile;
  converted?: ConversionResult;
}

export const ImagePreview: React.FC<ImagePreviewProps> = ({ original, converted }) => {
  const { t } = useTranslation();

  if (!original) {
    return null;
  }

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-900">{t('converter.preview.title')}</h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Original Image */}
        <div className="space-y-2">
          <h4 className="text-sm font-medium text-gray-700">{t('converter.preview.original')}</h4>
          <div className="border-2 border-gray-200 rounded-lg overflow-hidden bg-gray-50">
            <img
              src={original.preview}
              alt="Original"
              className="w-full h-64 object-contain"
            />
          </div>
          <div className="text-sm text-gray-600">
            <p>{t('converter.preview.filename')}: {original.name}</p>
            <p>{t('converter.preview.size')}: {ImageConverter.formatFileSize(original.size)}</p>
          </div>
        </div>

        {/* Converted Image */}
        {converted ? (
          <div className="space-y-2">
            <h4 className="text-sm font-medium text-gray-700">{t('converter.preview.converted')}</h4>
            <div className="border-2 border-primary-200 rounded-lg overflow-hidden bg-gray-50">
              <img
                src={converted.url}
                alt="Converted"
                className="w-full h-64 object-contain"
              />
            </div>
            <div className="text-sm text-gray-600">
              <p>{t('converter.preview.format')}: {converted.format.toUpperCase()}</p>
              <p>{t('converter.preview.size')}: {ImageConverter.formatFileSize(converted.size)}</p>
              {converted.size !== original.size && (
                <p
                  className={
                    converted.size < original.size ? 'text-green-600' : 'text-red-600'
                  }
                >
                  {converted.size < original.size ? '↓' : '↑'}{' '}
                  {Math.abs(
                    ImageConverter.getCompressionRatio(original.size, converted.size)
                  )}
                  % {converted.size < original.size ? t('converter.preview.decreased') : t('converter.preview.increased')}
                </p>
              )}
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-center border-2 border-dashed border-gray-300 rounded-lg h-full min-h-[16rem]">
            <p className="text-gray-400">{t('converter.preview.selectOptionsMessage')}</p>
          </div>
        )}
      </div>
    </div>
  );
};
