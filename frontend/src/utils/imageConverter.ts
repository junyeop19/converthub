import type { ImageFormat, ConversionOptions, ConversionResult } from '@/types/image.types';
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
}
