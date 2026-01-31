import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ImageUploader } from '@/components/ImageConverter/ImageUploader';
import { Button } from '@/components/common/Button';
import { Card } from '@/components/common/Card';
import { useFileUpload } from '@/hooks/useFileUpload';
import { removeBackground } from '@imgly/background-removal';

const BackgroundRemoverPage: React.FC = () => {
  const { t } = useTranslation();
  const { uploadedFile, handleFileSelect: uploadFile, clearFile, error: uploadError } = useFileUpload();
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [result, setResult] = useState<{ url: string; blob: Blob } | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleFileSelect = async (file: File) => {
    clearFile();
    setResult(null);
    setError(null);
    await uploadFile(file);
  };

  const handleRemoveBackground = async () => {
    if (!uploadedFile?.file) return;

    setIsProcessing(true);
    setProgress(0);
    setError(null);

    try {
      const blob = await removeBackground(uploadedFile.file, {
        progress: (_key, current, total) => {
          const percentage = Math.round((current / total) * 100);
          setProgress(percentage);
        },
      });

      const url = URL.createObjectURL(blob);
      setResult({ url, blob });
    } catch (err) {
      console.error('Background removal failed:', err);
      setError(err instanceof Error ? err.message : 'Failed to remove background');
    } finally {
      setIsProcessing(false);
      setProgress(0);
    }
  };

  const handleDownload = () => {
    if (!result) return;

    const link = document.createElement('a');
    link.href = result.url;
    link.download = `${uploadedFile?.name.replace(/\.[^/.]+$/, '')}-no-bg.png`;
    link.click();
  };

  const handleReset = () => {
    clearFile();
    setResult(null);
    setError(null);
    setProgress(0);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Page Header */}
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          {t('backgroundRemover.title')}
        </h1>
        <p className="text-lg text-gray-600">
          {t('backgroundRemover.subtitle')}
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
                  <h3 className="text-sm font-medium text-red-800">
                    {t('backgroundRemover.uploadFailed')}
                  </h3>
                  <p className="text-sm text-red-700 mt-1">{uploadError}</p>
                </div>
              </div>
            </div>
          )}
        </Card>
      )}

      {/* Preview Section */}
      {uploadedFile && (
        <>
          <Card>
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900">
                {t('backgroundRemover.preview')}
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Original Image */}
                <div className="space-y-2">
                  <h4 className="text-sm font-medium text-gray-700">
                    {t('backgroundRemover.original')}
                  </h4>
                  <div className="border-2 border-gray-200 rounded-lg overflow-hidden bg-gray-50">
                    <img
                      src={uploadedFile.preview}
                      alt="Original"
                      className="w-full h-64 object-contain"
                    />
                  </div>
                </div>

                {/* Processed Image */}
                {result ? (
                  <div className="space-y-2">
                    <h4 className="text-sm font-medium text-gray-700">
                      {t('backgroundRemover.result')}
                    </h4>
                    <div
                      className="border-2 border-primary-200 rounded-lg overflow-hidden bg-transparent"
                      style={{
                        backgroundImage:
                          'linear-gradient(45deg, #ccc 25%, transparent 25%), linear-gradient(-45deg, #ccc 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #ccc 75%), linear-gradient(-45deg, transparent 75%, #ccc 75%)',
                        backgroundSize: '20px 20px',
                        backgroundPosition: '0 0, 0 10px, 10px -10px, -10px 0px',
                      }}
                    >
                      <img
                        src={result.url}
                        alt="Background Removed"
                        className="w-full h-64 object-contain"
                      />
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center justify-center border-2 border-dashed border-gray-300 rounded-lg h-full min-h-[16rem]">
                    <p className="text-gray-400">
                      {t('backgroundRemover.clickToProcess')}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </Card>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              onClick={handleRemoveBackground}
              disabled={isProcessing || !uploadedFile}
              variant="primary"
              size="lg"
              className="w-full sm:w-auto"
            >
              {isProcessing ? (
                <>
                  <svg className="animate-spin h-5 w-5 mr-2" viewBox="0 0 24 24">
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                      fill="none"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                  {t('backgroundRemover.processing')} {progress}%
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
                      d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                  {t('backgroundRemover.removeBackground')}
                </>
              )}
            </Button>

            {result && (
              <Button
                onClick={handleDownload}
                disabled={isProcessing}
                variant="primary"
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
                    d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                  />
                </svg>
                {t('backgroundRemover.download')}
              </Button>
            )}

            <Button
              onClick={handleReset}
              disabled={isProcessing}
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
              {t('backgroundRemover.reset')}
            </Button>
          </div>

          {/* Error Message */}
          {error && (
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
                  <h3 className="text-sm font-medium text-red-800">
                    {t('backgroundRemover.processingFailed')}
                  </h3>
                  <p className="text-sm text-red-700 mt-1">{error}</p>
                </div>
              </div>
            </div>
          )}
        </>
      )}

      {/* Info Section */}
      <Card>
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900">
            {t('backgroundRemover.info.title')}
          </h3>
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
              <span>{t('backgroundRemover.info.browserProcessing')}</span>
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
              <span>{t('backgroundRemover.info.aiPowered')}</span>
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
              <span>{t('backgroundRemover.info.pngOutput')}</span>
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
              <span>{t('backgroundRemover.info.firstUseNote')}</span>
            </li>
          </ul>
        </div>
      </Card>
    </div>
  );
};

export default BackgroundRemoverPage;
