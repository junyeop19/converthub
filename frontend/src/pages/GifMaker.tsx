import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDropzone } from 'react-dropzone';
import { Button } from '@/components/common/Button';
import { Card } from '@/components/common/Card';
import { GifMaker as GifMakerUtil } from '@/utils/gifMaker';
import type { ImageFile } from '@/types/image.types';
import { MAX_FILE_SIZE } from '@/constants/formats';

const GifMakerPage: React.FC = () => {
  const { t } = useTranslation();
  const [images, setImages] = useState<ImageFile[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [gifResult, setGifResult] = useState<{ url: string; blob: Blob } | null>(null);
  const [error, setError] = useState<string | null>(null);

  // GIF options
  const [frameDelay, setFrameDelay] = useState(0.5); // seconds
  const [gifWidth, setGifWidth] = useState(500);
  const [gifHeight, setGifHeight] = useState(500);

  const onDrop = (acceptedFiles: File[]) => {
    setError(null);
    const newImages: ImageFile[] = [];

    acceptedFiles.forEach((file) => {
      if (file.size > MAX_FILE_SIZE) {
        setError(t('converter.upload.errors.fileTooLarge'));
        return;
      }

      if (!file.type.startsWith('image/')) {
        setError(t('converter.upload.errors.unsupportedFormat'));
        return;
      }

      const preview = URL.createObjectURL(file);
      newImages.push({
        file,
        preview,
        name: file.name,
        size: file.size,
        type: file.type,
      });
    });

    setImages((prev) => [...prev, ...newImages]);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.webp'],
    },
    multiple: true,
  });

  const removeImage = (index: number) => {
    setImages((prev) => {
      const newImages = [...prev];
      URL.revokeObjectURL(newImages[index].preview);
      newImages.splice(index, 1);
      return newImages;
    });
  };

  const moveImage = (index: number, direction: 'up' | 'down') => {
    setImages((prev) => {
      const newImages = [...prev];
      const newIndex = direction === 'up' ? index - 1 : index + 1;

      if (newIndex < 0 || newIndex >= newImages.length) return prev;

      [newImages[index], newImages[newIndex]] = [newImages[newIndex], newImages[index]];
      return newImages;
    });
  };

  const handleCreateGif = async () => {
    if (images.length < 2) {
      setError(t('gifMaker.errors.minimumImages'));
      return;
    }

    setIsProcessing(true);
    setProgress(0);
    setError(null);
    setGifResult(null);

    try {
      setProgress(30);

      const result = await GifMakerUtil.createGifFromFiles(
        images.map((img) => img.file),
        {
          interval: frameDelay,
          gifWidth,
          gifHeight,
        }
      );

      setProgress(100);
      setGifResult({ url: result.dataUrl, blob: result.blob });
    } catch (err) {
      console.error('GIF creation failed:', err);
      setError(err instanceof Error ? err.message : 'Failed to create GIF');
    } finally {
      setIsProcessing(false);
      setProgress(0);
    }
  };

  const handleDownload = () => {
    if (!gifResult) return;

    const link = document.createElement('a');
    link.href = gifResult.url;
    link.download = `animated-${Date.now()}.gif`;
    link.click();
  };

  const handleReset = () => {
    images.forEach((img) => URL.revokeObjectURL(img.preview));
    setImages([]);
    setGifResult(null);
    setError(null);
    setProgress(0);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Page Header */}
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          {t('gifMaker.title')}
        </h1>
        <p className="text-lg text-gray-600">
          {t('gifMaker.subtitle')}
        </p>
      </div>

      {/* Upload Section */}
      {images.length === 0 && !gifResult && (
        <Card>
          <div
            {...getRootProps()}
            className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
              isDragActive
                ? 'border-primary-500 bg-primary-50'
                : 'border-gray-300 hover:border-primary-400'
            }`}
          >
            <input {...getInputProps()} />
            <svg
              className="mx-auto h-12 w-12 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            <p className="mt-2 text-sm text-gray-600">
              {isDragActive ? t('gifMaker.dropHere') : t('gifMaker.dragOrClick')}
            </p>
            <p className="mt-1 text-xs text-gray-500">{t('gifMaker.supportedFormats')}</p>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 mt-4">
              <p className="text-sm text-red-700">{error}</p>
            </div>
          )}
        </Card>
      )}

      {/* Images Preview */}
      {images.length > 0 && !gifResult && (
        <>
          <Card>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">
                  {t('gifMaker.imagesPreview')} ({images.length})
                </h3>
                <Button onClick={handleReset} variant="secondary" size="sm">
                  {t('gifMaker.reset')}
                </Button>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 max-h-96 overflow-y-auto">
                {images.map((image, index) => (
                  <div key={index} className="relative group border-2 border-gray-200 rounded-lg p-2">
                    <div className="absolute top-1 left-1 bg-primary-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">
                      {index + 1}
                    </div>
                    <img
                      src={image.preview}
                      alt={image.name}
                      className="w-full h-24 object-cover rounded"
                    />
                    <div className="absolute top-1 right-1 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        onClick={() => moveImage(index, 'up')}
                        disabled={index === 0}
                        className="bg-blue-500 text-white rounded p-1 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                        </svg>
                      </button>
                      <button
                        onClick={() => moveImage(index, 'down')}
                        disabled={index === images.length - 1}
                        className="bg-blue-500 text-white rounded p-1 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </button>
                      <button
                        onClick={() => removeImage(index)}
                        className="bg-red-500 text-white rounded p-1"
                      >
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                    <p className="text-xs text-gray-600 mt-1 truncate">{image.name}</p>
                  </div>
                ))}
              </div>
            </div>
          </Card>

          {/* GIF Options */}
          <Card>
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900">
                {t('gifMaker.options.title')}
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Frame Delay */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t('gifMaker.options.frameDelay')} ({frameDelay}s)
                  </label>
                  <input
                    type="range"
                    min="0.1"
                    max="2"
                    step="0.1"
                    value={frameDelay}
                    onChange={(e) => setFrameDelay(parseFloat(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                  />
                </div>

                {/* Width */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t('gifMaker.options.width')}
                  </label>
                  <input
                    type="number"
                    min="100"
                    max="1000"
                    value={gifWidth}
                    onChange={(e) => setGifWidth(parseInt(e.target.value) || 500)}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                  />
                </div>

                {/* Height */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t('gifMaker.options.height')}
                  </label>
                  <input
                    type="number"
                    min="100"
                    max="1000"
                    value={gifHeight}
                    onChange={(e) => setGifHeight(parseInt(e.target.value) || 500)}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                  />
                </div>
              </div>
            </div>
          </Card>

          {/* Action Button */}
          <div className="flex justify-center">
            <Button
              onClick={handleCreateGif}
              disabled={isProcessing || images.length < 2}
              variant="primary"
              size="lg"
            >
              {isProcessing ? (
                <>
                  <svg className="animate-spin h-5 w-5 mr-2" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  {t('gifMaker.creating')} {progress}%
                </>
              ) : (
                <>
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {t('gifMaker.createGif')}
                </>
              )}
            </Button>
          </div>

          {/* Error */}
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <p className="text-sm text-red-700">{error}</p>
            </div>
          )}
        </>
      )}

      {/* Result */}
      {gifResult && (
        <Card>
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">
              {t('gifMaker.result')}
            </h3>

            <div className="border-2 border-primary-200 rounded-lg overflow-hidden bg-gray-50 flex justify-center p-4">
              <img
                src={gifResult.url}
                alt="Generated GIF"
                className="max-w-full max-h-96 object-contain"
              />
            </div>

            <div className="flex gap-4 justify-center">
              <Button onClick={handleDownload} variant="primary" size="lg">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                {t('gifMaker.download')}
              </Button>

              <Button onClick={handleReset} variant="secondary" size="lg">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                {t('gifMaker.createAnother')}
              </Button>
            </div>
          </div>
        </Card>
      )}

      {/* Info Section */}
      <Card>
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900">
            {t('gifMaker.info.title')}
          </h3>
          <ul className="space-y-2 text-sm text-gray-600">
            <li className="flex items-start">
              <svg className="w-5 h-5 text-primary-500 mr-2 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>{t('gifMaker.info.browserProcessing')}</span>
            </li>
            <li className="flex items-start">
              <svg className="w-5 h-5 text-primary-500 mr-2 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>{t('gifMaker.info.minimumImages')}</span>
            </li>
            <li className="flex items-start">
              <svg className="w-5 h-5 text-primary-500 mr-2 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>{t('gifMaker.info.reorder')}</span>
            </li>
            <li className="flex items-start">
              <svg className="w-5 h-5 text-primary-500 mr-2 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>{t('gifMaker.info.frameDelay')}</span>
            </li>
          </ul>
        </div>
      </Card>
    </div>
  );
};

export default GifMakerPage;
