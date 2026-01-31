import React, { useState, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useDropzone } from 'react-dropzone';
import { PDFDocument } from 'pdf-lib';
import { Button } from '@/components/common/Button';
import { Card } from '@/components/common/Card';
import { ACCEPTED_FILE_TYPES, MAX_FILE_SIZE } from '@/constants/formats';

interface UploadedImage {
  file: File;
  preview: string;
  id: string;
}

type PageSize = 'A4' | 'Letter' | 'Legal';

const PAGE_SIZES = {
  A4: { width: 595, height: 842 },
  Letter: { width: 612, height: 792 },
  Legal: { width: 612, height: 1008 },
};

const ImageToPdfPage: React.FC = () => {
  const { t } = useTranslation();
  const [images, setImages] = useState<UploadedImage[]>([]);
  const [pageSize, setPageSize] = useState<PageSize>('A4');
  const [isConverting, setIsConverting] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const newImages = acceptedFiles.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
      id: Math.random().toString(36).substr(2, 9),
    }));
    setImages((prev) => [...prev, ...newImages]);
    setError(null);
  }, []);

  const { getRootProps, getInputProps, isDragActive, fileRejections } = useDropzone({
    onDrop,
    accept: ACCEPTED_FILE_TYPES,
    maxSize: MAX_FILE_SIZE,
    multiple: true,
  });

  const removeImage = (id: string) => {
    setImages((prev) => {
      const filtered = prev.filter((img) => img.id !== id);
      const removed = prev.find((img) => img.id === id);
      if (removed) {
        URL.revokeObjectURL(removed.preview);
      }
      return filtered;
    });
  };

  const moveImage = (id: string, direction: 'up' | 'down') => {
    setImages((prev) => {
      const index = prev.findIndex((img) => img.id === id);
      if (
        (direction === 'up' && index === 0) ||
        (direction === 'down' && index === prev.length - 1)
      ) {
        return prev;
      }

      const newImages = [...prev];
      const newIndex = direction === 'up' ? index - 1 : index + 1;
      [newImages[index], newImages[newIndex]] = [newImages[newIndex], newImages[index]];
      return newImages;
    });
  };

  const convertToPdf = async () => {
    if (images.length === 0) return;

    setIsConverting(true);
    setProgress(0);
    setError(null);

    try {
      const pdfDoc = await PDFDocument.create();
      const pageOptions = PAGE_SIZES[pageSize];

      for (let i = 0; i < images.length; i++) {
        const image = images[i];
        setProgress(Math.round(((i + 1) / images.length) * 100));

        const imageBytes = await image.file.arrayBuffer();
        let embeddedImage;

        if (image.file.type === 'image/png') {
          embeddedImage = await pdfDoc.embedPng(imageBytes);
        } else if (image.file.type === 'image/jpeg' || image.file.type === 'image/jpg') {
          embeddedImage = await pdfDoc.embedJpg(imageBytes);
        } else {
          // Convert to JPEG for other formats
          const bitmap = await createImageBitmap(image.file);
          const canvas = document.createElement('canvas');
          canvas.width = bitmap.width;
          canvas.height = bitmap.height;
          const ctx = canvas.getContext('2d');
          ctx?.drawImage(bitmap, 0, 0);
          const jpegBlob = await new Promise<Blob>((resolve) => {
            canvas.toBlob((blob) => resolve(blob!), 'image/jpeg', 0.95);
          });
          const jpegBytes = await jpegBlob.arrayBuffer();
          embeddedImage = await pdfDoc.embedJpg(jpegBytes);
        }

        const page = pdfDoc.addPage([pageOptions.width, pageOptions.height]);
        const { width: imgWidth, height: imgHeight } = embeddedImage.scale(1);

        // Calculate dimensions to fit image on page while maintaining aspect ratio
        const pageAspect = pageOptions.width / pageOptions.height;
        const imageAspect = imgWidth / imgHeight;

        let drawWidth, drawHeight;
        if (imageAspect > pageAspect) {
          // Image is wider than page
          drawWidth = pageOptions.width - 40; // 20px margin on each side
          drawHeight = drawWidth / imageAspect;
        } else {
          // Image is taller than page
          drawHeight = pageOptions.height - 40;
          drawWidth = drawHeight * imageAspect;
        }

        const x = (pageOptions.width - drawWidth) / 2;
        const y = (pageOptions.height - drawHeight) / 2;

        page.drawImage(embeddedImage, {
          x,
          y,
          width: drawWidth,
          height: drawHeight,
        });
      }

      const pdfBytes = await pdfDoc.save();
      const blob = new Blob([new Uint8Array(pdfBytes)], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);

      const link = document.createElement('a');
      link.href = url;
      link.download = `converted-${Date.now()}.pdf`;
      link.click();

      URL.revokeObjectURL(url);
      setProgress(100);
    } catch (err) {
      console.error('PDF conversion failed:', err);
      setError(err instanceof Error ? err.message : 'Failed to convert to PDF');
    } finally {
      setIsConverting(false);
    }
  };

  const handleReset = () => {
    images.forEach((img) => URL.revokeObjectURL(img.preview));
    setImages([]);
    setError(null);
    setProgress(0);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Page Header */}
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          {t('imageToPdf.title')}
        </h1>
        <p className="text-lg text-gray-600">{t('imageToPdf.subtitle')}</p>
      </div>

      {/* Upload Section */}
      <Card>
        <div
          {...getRootProps()}
          className={`border-2 border-dashed rounded-lg p-12 text-center cursor-pointer transition-all ${
            isDragActive
              ? 'border-primary-500 bg-primary-50'
              : 'border-gray-300 hover:border-primary-400 hover:bg-gray-50'
          }`}
        >
          <input {...getInputProps()} />
          <div className="space-y-4">
            <svg
              className="mx-auto h-16 w-16 text-gray-400"
              stroke="currentColor"
              fill="none"
              viewBox="0 0 48 48"
            >
              <path
                d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <div>
              <p className="text-lg font-medium text-gray-700">
                {isDragActive
                  ? t('imageToPdf.dropHere')
                  : t('imageToPdf.dragOrClick')}
              </p>
              <p className="text-sm mt-1 text-gray-500">
                {t('imageToPdf.supportedFormats')}
              </p>
            </div>
          </div>
        </div>

        {fileRejections.length > 0 && (
          <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-sm text-red-600 font-medium">
              {fileRejections[0].errors[0].code === 'file-too-large'
                ? t('imageToPdf.errors.fileTooLarge')
                : t('imageToPdf.errors.unsupportedFormat')}
            </p>
          </div>
        )}
      </Card>

      {/* Images Preview */}
      {images.length > 0 && (
        <>
          <Card>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold text-gray-900">
                  {t('imageToPdf.imagesPreview')} ({images.length})
                </h3>
                <div className="flex items-center space-x-4">
                  <label className="text-sm font-medium text-gray-700">
                    {t('imageToPdf.pageSize')}:
                  </label>
                  <select
                    value={pageSize}
                    onChange={(e) => setPageSize(e.target.value as PageSize)}
                    className="p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  >
                    <option value="A4">A4</option>
                    <option value="Letter">Letter</option>
                    <option value="Legal">Legal</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {images.map((image, index) => (
                  <div
                    key={image.id}
                    className="relative border-2 border-gray-200 rounded-lg overflow-hidden group"
                  >
                    <img
                      src={image.preview}
                      alt={`Preview ${index + 1}`}
                      className="w-full h-48 object-cover"
                    />
                    <div className="absolute top-2 left-2 bg-primary-500 text-white px-2 py-1 rounded text-xs font-medium">
                      {index + 1}
                    </div>
                    <div className="absolute top-2 right-2 flex space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        onClick={() => moveImage(image.id, 'up')}
                        disabled={index === 0}
                        className="bg-white p-1 rounded shadow-sm disabled:opacity-50"
                        title={t('imageToPdf.moveUp')}
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                        </svg>
                      </button>
                      <button
                        onClick={() => moveImage(image.id, 'down')}
                        disabled={index === images.length - 1}
                        className="bg-white p-1 rounded shadow-sm disabled:opacity-50"
                        title={t('imageToPdf.moveDown')}
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </button>
                      <button
                        onClick={() => removeImage(image.id)}
                        className="bg-red-500 text-white p-1 rounded shadow-sm"
                        title={t('imageToPdf.remove')}
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Card>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              onClick={convertToPdf}
              disabled={isConverting || images.length === 0}
              variant="primary"
              size="lg"
              className="w-full sm:w-auto"
            >
              {isConverting ? (
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
                  {t('imageToPdf.converting')} {progress}%
                </>
              ) : (
                <>
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                    />
                  </svg>
                  {t('imageToPdf.convertToPdf')}
                </>
              )}
            </Button>

            <Button
              onClick={handleReset}
              disabled={isConverting}
              variant="secondary"
              size="lg"
              className="w-full sm:w-auto"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
              {t('imageToPdf.reset')}
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
                    {t('imageToPdf.conversionFailed')}
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
            {t('imageToPdf.info.title')}
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
              <span>{t('imageToPdf.info.multipleImages')}</span>
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
              <span>{t('imageToPdf.info.reorder')}</span>
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
              <span>{t('imageToPdf.info.browserProcessing')}</span>
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
              <span>{t('imageToPdf.info.pageSizes')}</span>
            </li>
          </ul>
        </div>
      </Card>
    </div>
  );
};

export default ImageToPdfPage;
