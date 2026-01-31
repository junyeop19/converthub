import React, { useState, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import Cropper from 'react-easy-crop';
import { ImageUploader } from '@/components/ImageConverter/ImageUploader';
import { Button } from '@/components/common/Button';
import { Card } from '@/components/common/Card';
import { useFileUpload } from '@/hooks/useFileUpload';
import { ImageEditor as ImageEditorUtil, CropArea } from '@/utils/imageEditor';

// Type definitions for react-easy-crop
interface Point {
  x: number;
  y: number;
}

interface Area {
  x: number;
  y: number;
  width: number;
  height: number;
}

const ImageEditorPage: React.FC = () => {
  const { t } = useTranslation();
  const { uploadedFile, handleFileSelect: uploadFile, clearFile, error: uploadError } = useFileUpload();

  const [crop, setCrop] = useState<Point>({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);
  const [flipH, setFlipH] = useState(false);
  const [flipV, setFlipV] = useState(false);
  const [editedImage, setEditedImage] = useState<{ url: string; blob: Blob } | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFileSelect = async (file: File) => {
    clearFile();
    setEditedImage(null);
    setRotation(0);
    setFlipH(false);
    setFlipV(false);
    setCrop({ x: 0, y: 0 });
    setZoom(1);
    await uploadFile(file);
  };

  const onCropComplete = useCallback((_croppedArea: Area, croppedAreaPixels: Area) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const handleRotate = (degrees: number) => {
    setRotation((prev) => (prev + degrees) % 360);
  };

  const handleApplyEdits = async () => {
    if (!uploadedFile?.file) return;

    setIsProcessing(true);
    setError(null);

    try {
      const cropArea: CropArea | undefined = croppedAreaPixels
        ? {
            x: croppedAreaPixels.x,
            y: croppedAreaPixels.y,
            width: croppedAreaPixels.width,
            height: croppedAreaPixels.height,
          }
        : undefined;

      const blob = await ImageEditorUtil.applyEdits(uploadedFile.file, {
        rotation,
        flipHorizontal: flipH,
        flipVertical: flipV,
        crop: cropArea,
      });

      const url = URL.createObjectURL(blob);
      setEditedImage({ url, blob });
    } catch (err) {
      console.error('Edit failed:', err);
      setError(err instanceof Error ? err.message : 'Failed to apply edits');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDownload = () => {
    if (!editedImage) return;

    const link = document.createElement('a');
    link.href = editedImage.url;
    link.download = `edited-${uploadedFile?.name || 'image.png'}`;
    link.click();
  };

  const handleReset = () => {
    clearFile();
    setEditedImage(null);
    setRotation(0);
    setFlipH(false);
    setFlipV(false);
    setCrop({ x: 0, y: 0 });
    setZoom(1);
    setError(null);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Page Header */}
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          {t('imageEditor.title')}
        </h1>
        <p className="text-lg text-gray-600">
          {t('imageEditor.subtitle')}
        </p>
      </div>

      {/* Upload Section */}
      {!uploadedFile && (
        <Card>
          <ImageUploader onFileSelect={handleFileSelect} />
          {uploadError && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 mt-4">
              <p className="text-sm text-red-700">{uploadError}</p>
            </div>
          )}
        </Card>
      )}

      {/* Editing Section */}
      {uploadedFile && !editedImage && (
        <>
          {/* Crop Area */}
          <Card>
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900">
                {t('imageEditor.cropArea')}
              </h3>
              <div className="relative h-96 bg-gray-900 rounded-lg overflow-hidden">
                <Cropper
                  image={uploadedFile.preview}
                  crop={crop}
                  zoom={zoom}
                  rotation={rotation}
                  aspect={undefined}
                  onCropChange={setCrop}
                  onZoomChange={setZoom}
                  onCropComplete={onCropComplete}
                  transform={`translate(${crop.x}px, ${crop.y}px) scale(${zoom}) rotate(${rotation}deg) scaleX(${flipH ? -1 : 1}) scaleY(${flipV ? -1 : 1})`}
                />
              </div>

              {/* Zoom Control */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t('imageEditor.zoom')}: {Math.round(zoom * 100)}%
                </label>
                <input
                  type="range"
                  min="1"
                  max="3"
                  step="0.1"
                  value={zoom}
                  onChange={(e) => setZoom(parseFloat(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                />
              </div>
            </div>
          </Card>

          {/* Edit Controls */}
          <Card>
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900">
                {t('imageEditor.editControls')}
              </h3>

              {/* Rotation */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  {t('imageEditor.rotation')}
                </label>
                <div className="flex gap-3">
                  <Button
                    onClick={() => handleRotate(-90)}
                    variant="secondary"
                    size="sm"
                  >
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2M3 12l6.414 6.414a2 2 0 001.414.586H19a2 2 0 002-2V7a2 2 0 00-2-2h-8.172a2 2 0 00-1.414.586L3 12z" />
                    </svg>
                    {t('imageEditor.rotateLeft')}
                  </Button>
                  <Button
                    onClick={() => handleRotate(90)}
                    variant="secondary"
                    size="sm"
                  >
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2M3 12l6.414 6.414a2 2 0 001.414.586H19a2 2 0 002-2V7a2 2 0 00-2-2h-8.172a2 2 0 00-1.414.586L3 12z" />
                    </svg>
                    {t('imageEditor.rotateRight')}
                  </Button>
                  <span className="text-sm text-gray-600 self-center ml-2">
                    {rotation}°
                  </span>
                </div>
              </div>

              {/* Flip */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  {t('imageEditor.flip')}
                </label>
                <div className="flex gap-3">
                  <Button
                    onClick={() => setFlipH(!flipH)}
                    variant={flipH ? 'primary' : 'secondary'}
                    size="sm"
                  >
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                    </svg>
                    {t('imageEditor.flipHorizontal')}
                  </Button>
                  <Button
                    onClick={() => setFlipV(!flipV)}
                    variant={flipV ? 'primary' : 'secondary'}
                    size="sm"
                  >
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
                    </svg>
                    {t('imageEditor.flipVertical')}
                  </Button>
                </div>
              </div>
            </div>
          </Card>

          {/* Action Buttons */}
          <div className="flex gap-4 justify-center">
            <Button
              onClick={handleApplyEdits}
              disabled={isProcessing}
              variant="primary"
              size="lg"
            >
              {isProcessing ? (
                <>
                  <svg className="animate-spin h-5 w-5 mr-2" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  {t('imageEditor.processing')}
                </>
              ) : (
                <>
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  {t('imageEditor.applyEdits')}
                </>
              )}
            </Button>

            <Button onClick={handleReset} variant="secondary" size="lg">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
              {t('imageEditor.reset')}
            </Button>
          </div>

          {/* Error Message */}
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <p className="text-sm text-red-700">{error}</p>
            </div>
          )}
        </>
      )}

      {/* Result Section */}
      {editedImage && (
        <Card>
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">
              {t('imageEditor.result')}
            </h3>
            <div className="border-2 border-primary-200 rounded-lg overflow-hidden bg-gray-50">
              <img
                src={editedImage.url}
                alt="Edited"
                className="w-full max-h-96 object-contain"
              />
            </div>

            <div className="flex gap-4 justify-center">
              <Button onClick={handleDownload} variant="primary" size="lg">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                {t('imageEditor.download')}
              </Button>

              <Button onClick={handleReset} variant="secondary" size="lg">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                {t('imageEditor.editAnother')}
              </Button>
            </div>
          </div>
        </Card>
      )}

      {/* Info Section */}
      <Card>
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900">
            {t('imageEditor.info.title')}
          </h3>
          <ul className="space-y-2 text-sm text-gray-600">
            <li className="flex items-start">
              <svg className="w-5 h-5 text-primary-500 mr-2 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>{t('imageEditor.info.browserProcessing')}</span>
            </li>
            <li className="flex items-start">
              <svg className="w-5 h-5 text-primary-500 mr-2 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>{t('imageEditor.info.features')}</span>
            </li>
            <li className="flex items-start">
              <svg className="w-5 h-5 text-primary-500 mr-2 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>{t('imageEditor.info.quality')}</span>
            </li>
          </ul>
        </div>
      </Card>
    </div>
  );
};

export default ImageEditorPage;
