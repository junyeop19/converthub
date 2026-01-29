import imageCompression from 'browser-image-compression';

/**
 * Image compression options
 */
export interface CompressionOptions {
  maxSizeMB?: number;
  maxWidthOrHeight?: number;
  quality?: number;
  useWebWorker?: boolean;
}

/**
 * Image compressor using browser-image-compression library
 */
export class ImageCompressor {
  /**
   * Compress image using browser-image-compression
   */
  static async compressImage(
    file: File,
    options: CompressionOptions = {}
  ): Promise<File> {
    const defaultOptions = {
      maxSizeMB: 1,
      maxWidthOrHeight: 1920,
      quality: 0.8,
      useWebWorker: true,
      ...options,
    };

    try {
      const compressedFile = await imageCompression(file, defaultOptions);
      return compressedFile;
    } catch (error) {
      console.error('Compression error:', error);
      throw new Error('Failed to compress image');
    }
  }

  /**
   * Get image dimensions from file
   */
  static getImageDimensions(file: File): Promise<{ width: number; height: number }> {
    return new Promise((resolve, reject) => {
      const img = new Image();
      const reader = new FileReader();

      reader.onload = (e) => {
        img.src = e.target?.result as string;
      };

      img.onload = () => {
        resolve({ width: img.width, height: img.height });
      };

      img.onerror = reject;
      reader.onerror = reject;

      reader.readAsDataURL(file);
    });
  }

  /**
   * Check if file is an image
   */
  static isImageFile(file: File): boolean {
    return file.type.startsWith('image/');
  }

  /**
   * Validate image file
   */
  static validateImageFile(file: File, maxSize: number): { valid: boolean; error?: string } {
    if (!this.isImageFile(file)) {
      return {
        valid: false,
        error: '이미지 파일만 업로드할 수 있습니다.',
      };
    }

    if (file.size > maxSize) {
      return {
        valid: false,
        error: `파일 크기는 ${Math.round(maxSize / 1024 / 1024)}MB를 초과할 수 없습니다.`,
      };
    }

    return { valid: true };
  }
}
