import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ImageUploader } from '@/components/ImageConverter/ImageUploader';
import { ConversionOptionsComponent } from '@/components/ImageConverter/ConversionOptions';
import { ImagePreview } from '@/components/ImageConverter/ImagePreview';
import { DownloadButton } from '@/components/ImageConverter/DownloadButton';
import { BatchCompressor } from '@/components/ImageConverter/BatchCompressor';
import { Button } from '@/components/common/Button';
import { Card } from '@/components/common/Card';
import { useFileUpload } from '@/hooks/useFileUpload';
import { useImageConversion } from '@/hooks/useImageConversion';
import type { ConversionOptions } from '@/types/image.types';

const DEFAULT_OPTIONS: ConversionOptions = {
  format: 'png',
  quality: 0.92,
  maintainAspectRatio: true,
};

const ImageConverterPage: React.FC = () => {
  const { t } = useTranslation();
  const { uploadedFile, handleFileSelect: uploadFile, clearFile, error: uploadError } = useFileUpload();
  const { convertImage, isConverting, progress, error: conversionError } = useImageConversion();
  const [options, setOptions] = useState<ConversionOptions>(DEFAULT_OPTIONS);
  const [result, setResult] = useState<any>(null);
  const [originalDimensions, setOriginalDimensions] = useState<{ width: number; height: number }>();

  const handleFileSelect = async (file: File) => {
    clearFile();
    setResult(null);

    const uploadResult = await uploadFile(file);
    if (uploadResult?.dimensions) {
      setOriginalDimensions(uploadResult.dimensions);
    }
  };

  const handleConvert = async () => {
    if (!uploadedFile?.file) return;

    try {
      const conversionResult = await convertImage(uploadedFile.file, options);
      setResult(conversionResult);
    } catch (err) {
      console.error('Conversion failed:', err);
    }
  };

  const handleReset = () => {
    clearFile();
    setResult(null);
    setOriginalDimensions(undefined);
    setOptions(DEFAULT_OPTIONS);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Page Header */}
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">{t('converter.title')}</h1>
        <p className="text-lg text-gray-600">
          {t('converter.subtitle')}
        </p>
      </div>

      {/* Upload Section */}
      {!uploadedFile && (
        <Card>
          <ImageUploader onFileSelect={handleFileSelect} />
          {uploadError && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 mt-4">
              <div className="flex items-start">
                <svg
                  className="w-5 h-5 text-red-500 mt-0.5 mr-2 flex-shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <div>
                  <h3 className="text-sm font-medium text-red-800">{t('converter.uploadFailed')}</h3>
                  <p className="text-sm text-red-700 mt-1">{uploadError}</p>
                </div>
              </div>
            </div>
          )}
        </Card>
      )}

      {/* Conversion Section */}
      {uploadedFile && (
        <>
          {/* Conversion Options */}
          <Card>
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">{t('converter.conversionOptions')}</h2>
            <ConversionOptionsComponent
              options={options}
              onChange={setOptions}
              originalDimensions={originalDimensions}
            />
          </Card>

          {/* Preview Section */}
          <Card>
            <ImagePreview original={uploadedFile} converted={result} />
          </Card>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              onClick={handleConvert}
              disabled={isConverting || !uploadedFile}
              variant="primary"
              size="lg"
              className="w-full sm:w-auto"
            >
              {isConverting ? (
                <>
                  <svg className="animate-spin h-5 w-5 mr-2" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  {t('converter.converting')} {progress}%
                </>
              ) : (
                <>
                  <svg
                    className="w-5 h-5 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                    />
                  </svg>
                  {t('converter.convert')}
                </>
              )}
            </Button>

            {result && (
              <DownloadButton
                result={result}
                originalFilename={uploadedFile.name}
                disabled={isConverting}
              />
            )}

            <Button
              onClick={handleReset}
              disabled={isConverting}
              variant="secondary"
              size="lg"
              className="w-full sm:w-auto"
            >
              <svg
                className="w-5 h-5 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
              {t('converter.reset')}
            </Button>
          </div>

          {/* Error Message */}
          {conversionError && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <div className="flex items-start">
                <svg
                  className="w-5 h-5 text-red-500 mt-0.5 mr-2 flex-shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <div>
                  <h3 className="text-sm font-medium text-red-800">{t('converter.conversionFailed')}</h3>
                  <p className="text-sm text-red-700 mt-1">{conversionError}</p>
                </div>
              </div>
            </div>
          )}
        </>
      )}

      {/* Info Section */}
      <Card>
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900">{t('converter.info.title')}</h3>
          <ul className="space-y-2 text-sm text-gray-600">
            <li className="flex items-start">
              <svg
                className="w-5 h-5 text-primary-500 mr-2 flex-shrink-0 mt-0.5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span>
                {t('converter.info.security')}
              </span>
            </li>
            <li className="flex items-start">
              <svg
                className="w-5 h-5 text-primary-500 mr-2 flex-shrink-0 mt-0.5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span>{t('converter.info.maxSize')}</span>
            </li>
            <li className="flex items-start">
              <svg
                className="w-5 h-5 text-primary-500 mr-2 flex-shrink-0 mt-0.5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span>
                {t('converter.info.formats')}
              </span>
            </li>
            <li className="flex items-start">
              <svg
                className="w-5 h-5 text-primary-500 mr-2 flex-shrink-0 mt-0.5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span>
                {t('converter.info.quality')}
              </span>
            </li>
          </ul>
        </div>
      </Card>

      {/* Batch Compression Section */}
      <BatchCompressor options={options} />
    </div>
  );
};

export default ImageConverterPage;
