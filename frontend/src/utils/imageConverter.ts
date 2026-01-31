import type { ConversionOptions, ConversionResult } from '@/types/image.types';
import { SUPPORTED_FORMATS } from '@/constants/formats';

/**
 * Image converter using Canvas API
 */
export class ImageConverter {
  /**
   * Convert image to specified format using Canvas API
   */
  static async convertImage(
    file: File,
    options: ConversionOptions
  ): Promise<ConversionResult> {
    return new Promise((resolve, reject) => {
      const img = new Image();
      const reader = new FileReader();

      reader.onload = (e) => {
        img.src = e.target?.result as string;
      };

      img.onload = () => {
        try {
          const canvas = document.createElement('canvas');
          const ctx = canvas.getContext('2d');

          if (!ctx) {
            throw new Error('Canvas context not available');
          }

          // Calculate dimensions
          const { width, height } = this.calculateDimensions(
            img.width,
            img.height,
            options
          );

          canvas.width = width;
          canvas.height = height;

          // Draw image
          ctx.drawImage(img, 0, 0, width, height);

          // Convert to blob
          canvas.toBlob(
            (blob) => {
              if (!blob) {
                reject(new Error('Conversion failed'));
                return;
              }

              const url = URL.createObjectURL(blob);
              resolve({
                blob,
                url,
                size: blob.size,
                format: options.format,
              });
            },
            SUPPORTED_FORMATS[options.format].mimeType,
            options.quality
          );
        } catch (error) {
          reject(error);
        }
      };

      img.onerror = () => {
        reject(new Error('Failed to load image'));
      };

      reader.onerror = () => {
        reject(new Error('Failed to read file'));
      };

      reader.readAsDataURL(file);
    });
  }

  /**
   * Calculate target dimensions based on options
   */
  private static calculateDimensions(
    originalWidth: number,
    originalHeight: number,
    options: ConversionOptions
  ): { width: number; height: number } {
    let width = options.width || originalWidth;
    let height = options.height || originalHeight;

    if (options.maintainAspectRatio) {
      const aspectRatio = originalWidth / originalHeight;

      if (options.width && !options.height) {
        // Only width specified
        height = Math.round(options.width / aspectRatio);
      } else if (options.height && !options.width) {
        // Only height specified
        width = Math.round(options.height * aspectRatio);
      } else if (options.width && options.height) {
        // Both specified - fit within bounds while maintaining aspect ratio
        const targetRatio = options.width / options.height;
        if (aspectRatio > targetRatio) {
          width = options.width;
          height = Math.round(options.width / aspectRatio);
        } else {
          height = options.height;
          width = Math.round(options.height * aspectRatio);
        }
      }
    }

    return { width, height };
  }

  /**
   * Get compression ratio percentage
   */
  static getCompressionRatio(originalSize: number, compressedSize: number): number {
    return Math.round((1 - compressedSize / originalSize) * 100);
  }

  /**
   * Format file size for display
   */
  static formatFileSize(bytes: number): string {
    if (bytes === 0) return '0 Bytes';

    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i];
  }

  /**
   * Compress image to target file size (in bytes)
   * Uses binary search to find optimal quality
   */
  static async compressToTargetSize(
    file: File,
    targetSizeBytes: number,
    options: ConversionOptions
  ): Promise<ConversionResult> {
    let minQuality = 0.1;
    let maxQuality = 1.0;
    let bestResult: ConversionResult | null = null;
    const maxIterations = 10;

    for (let i = 0; i < maxIterations; i++) {
      const quality = (minQuality + maxQuality) / 2;
      const result = await this.convertImage(file, { ...options, quality });

      if (!bestResult || Math.abs(result.size - targetSizeBytes) < Math.abs(bestResult.size - targetSizeBytes)) {
        bestResult = result;
      }

      if (result.size > targetSizeBytes) {
        maxQuality = quality;
      } else if (result.size < targetSizeBytes * 0.95) {
        minQuality = quality;
      } else {
        break;
      }
    }

    if (!bestResult) {
      throw new Error('Failed to compress to target size');
    }

    return bestResult;
  }

  /**
   * Smart compression - analyzes image and chooses optimal settings
   */
  static async smartCompress(file: File, options: ConversionOptions): Promise<ConversionResult> {
    return new Promise((resolve, reject) => {
      const img = new Image();
      const reader = new FileReader();

      reader.onload = async (e) => {
        img.src = e.target?.result as string;
      };

      img.onload = async () => {
        try {
          const canvas = document.createElement('canvas');
          const ctx = canvas.getContext('2d');

          if (!ctx) {
            throw new Error('Canvas context not available');
          }

          canvas.width = Math.min(img.width, 100);
          canvas.height = Math.min(img.height, 100);
          ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

          const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
          const data = imageData.data;

          let totalVariance = 0;
          let transparentPixels = 0;

          for (let i = 0; i < data.length; i += 4) {
            const r = data[i];
            const g = data[i + 1];
            const b = data[i + 2];
            const a = data[i + 3];

            if (a < 255) transparentPixels++;

            const avg = (r + g + b) / 3;
            totalVariance += Math.abs(r - avg) + Math.abs(g - avg) + Math.abs(b - avg);
          }

          const avgVariance = totalVariance / (data.length / 4);
          const transparencyRatio = transparentPixels / (data.length / 4);

          let recommendedQuality: number;
          let recommendedFormat = options.format;

          if (transparencyRatio > 0.1) {
            recommendedFormat = 'png';
            recommendedQuality = 1.0;
          } else if (avgVariance < 30) {
            recommendedQuality = 0.7;
          } else if (avgVariance < 60) {
            recommendedQuality = 0.85;
          } else {
            recommendedQuality = 0.92;
          }

          const result = await this.convertImage(file, {
            ...options,
            format: recommendedFormat,
            quality: recommendedQuality,
          });

          resolve(result);
        } catch (error) {
          reject(error);
        }
      };

      img.onerror = () => reject(new Error('Failed to load image'));
      reader.onerror = () => reject(new Error('Failed to read file'));
      reader.readAsDataURL(file);
    });
  }

  /**
   * Batch convert multiple images
   */
  static async batchConvert(
    files: File[],
    options: ConversionOptions,
    onProgress?: (current: number, total: number) => void
  ): Promise<ConversionResult[]> {
    const results: ConversionResult[] = [];

    for (let i = 0; i < files.length; i++) {
      const result = await this.convertImage(files[i], options);
      results.push(result);

      if (onProgress) {
        onProgress(i + 1, files.length);
      }
    }

    return results;
  }
}
