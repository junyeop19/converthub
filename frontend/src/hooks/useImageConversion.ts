import { useState, useCallback } from 'react';
import { ImageConverter } from '@/utils/imageConverter';
import type { ConversionOptions, ConversionResult } from '@/types/image.types';

/**
 * Hook for managing image conversion process
 */
export const useImageConversion = () => {
  const [isConverting, setIsConverting] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);

  const convertImage = useCallback(
    async (file: File, options: ConversionOptions): Promise<ConversionResult | null> => {
      setIsConverting(true);
      setProgress(0);
      setError(null);

      try {
        // Step 1: Initial setup (10%)
        setProgress(10);

        // Step 2: Convert format with quality settings (Canvas API handles both)
        setProgress(30);
        const result = await ImageConverter.convertImage(file, options);
        setProgress(100);

        return result;
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Conversion failed';
        setError(errorMessage);
        console.error('Image conversion error:', err);
        return null;
      } finally {
        setIsConverting(false);
      }
    },
    []
  );

  const reset = useCallback(() => {
    setIsConverting(false);
    setProgress(0);
    setError(null);
  }, []);

  return {
    convertImage,
    isConverting,
    progress,
    error,
    reset,
  };
};
