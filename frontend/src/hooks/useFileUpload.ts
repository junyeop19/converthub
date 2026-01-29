import { useState, useCallback } from 'react';
import type { ImageFile } from '@/types/image.types';
import { createPreviewUrl } from '@/utils/fileUtils';
import { ImageCompressor } from '@/utils/imageCompressor';
import { MAX_FILE_SIZE } from '@/constants/formats';

/**
 * Hook for managing file upload state
 */
export const useFileUpload = () => {
  const [uploadedFile, setUploadedFile] = useState<ImageFile | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFileSelect = useCallback(async (file: File) => {
    setIsUploading(true);
    setError(null);

    try {
      // Validate file
      const validation = ImageCompressor.validateImageFile(file, MAX_FILE_SIZE);
      if (!validation.valid) {
        setError(validation.error || 'Invalid file');
        setUploadedFile(null);
        return null;
      }

      // Create preview URL
      const preview = await createPreviewUrl(file);

      // Get image dimensions
      const dimensions = await ImageCompressor.getImageDimensions(file);

      const imageFile: ImageFile = {
        file,
        preview,
        name: file.name,
        size: file.size,
        type: file.type,
      };

      setUploadedFile(imageFile);
      return { imageFile, dimensions };
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'File upload failed';
      setError(errorMessage);
      console.error('File upload error:', err);
      return null;
    } finally {
      setIsUploading(false);
    }
  }, []);

  const clearFile = useCallback(() => {
    if (uploadedFile?.preview) {
      URL.revokeObjectURL(uploadedFile.preview);
    }
    setUploadedFile(null);
    setError(null);
  }, [uploadedFile]);

  return {
    uploadedFile,
    isUploading,
    error,
    handleFileSelect,
    clearFile,
  };
};
