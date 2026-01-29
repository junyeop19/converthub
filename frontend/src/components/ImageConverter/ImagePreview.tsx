import React from 'react';
import type { ConversionResult, ImageFile } from '@/types/image.types';
import { ImageConverter } from '@/utils/imageConverter';

interface ImagePreviewProps {
  original?: ImageFile;
  converted?: ConversionResult;
}

export const ImagePreview: React.FC<ImagePreviewProps> = ({ original, converted }) => {
  if (!original) {
    return null;
  }

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-900">미리보기</h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Original Image */}
        <div className="space-y-2">
          <h4 className="text-sm font-medium text-gray-700">원본</h4>
          <div className="border-2 border-gray-200 rounded-lg overflow-hidden bg-gray-50">
            <img
              src={original.preview}
              alt="Original"
              className="w-full h-64 object-contain"
            />
          </div>
          <div className="text-sm text-gray-600">
            <p>파일명: {original.name}</p>
            <p>크기: {ImageConverter.formatFileSize(original.size)}</p>
          </div>
        </div>

        {/* Converted Image */}
        {converted ? (
          <div className="space-y-2">
            <h4 className="text-sm font-medium text-gray-700">변환됨</h4>
            <div className="border-2 border-primary-200 rounded-lg overflow-hidden bg-gray-50">
              <img
                src={converted.url}
                alt="Converted"
                className="w-full h-64 object-contain"
              />
            </div>
            <div className="text-sm text-gray-600">
              <p>포맷: {converted.format.toUpperCase()}</p>
              <p>크기: {ImageConverter.formatFileSize(converted.size)}</p>
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
                  % {converted.size < original.size ? '감소' : '증가'}
                </p>
              )}
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-center border-2 border-dashed border-gray-300 rounded-lg h-full min-h-[16rem]">
            <p className="text-gray-400">변환 옵션을 선택하고 변환 버튼을 클릭하세요</p>
          </div>
        )}
      </div>
    </div>
  );
};
