/**
 * Image editing utilities for crop, rotate, flip operations
 */

export interface CropArea {
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface EditOptions {
  rotation?: number; // in degrees
  flipHorizontal?: boolean;
  flipVertical?: boolean;
  crop?: CropArea;
}

/**
 * Image editor class for client-side image manipulation
 */
export class ImageEditor {
  /**
   * Rotate image by specified degrees
   */
  static async rotateImage(file: File, degrees: number): Promise<Blob> {
    return new Promise((resolve, reject) => {
      const img = new Image();
      const reader = new FileReader();

      reader.onload = (e) => {
        img.src = e.target?.result as string;
      };

      img.onload = () => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');

        if (!ctx) {
          reject(new Error('Canvas context not available'));
          return;
        }

        // Calculate new canvas dimensions based on rotation
        const radians = (degrees * Math.PI) / 180;
        const sin = Math.abs(Math.sin(radians));
        const cos = Math.abs(Math.cos(radians));

        canvas.width = img.height * sin + img.width * cos;
        canvas.height = img.height * cos + img.width * sin;

        // Move to center and rotate
        ctx.translate(canvas.width / 2, canvas.height / 2);
        ctx.rotate(radians);
        ctx.drawImage(img, -img.width / 2, -img.height / 2);

        canvas.toBlob((blob) => {
          if (!blob) {
            reject(new Error('Failed to create blob'));
            return;
          }
          resolve(blob);
        }, file.type);
      };

      img.onerror = () => reject(new Error('Failed to load image'));
      reader.onerror = () => reject(new Error('Failed to read file'));
      reader.readAsDataURL(file);
    });
  }

  /**
   * Flip image horizontally or vertically
   */
  static async flipImage(
    file: File,
    horizontal: boolean = false,
    vertical: boolean = false
  ): Promise<Blob> {
    return new Promise((resolve, reject) => {
      const img = new Image();
      const reader = new FileReader();

      reader.onload = (e) => {
        img.src = e.target?.result as string;
      };

      img.onload = () => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');

        if (!ctx) {
          reject(new Error('Canvas context not available'));
          return;
        }

        canvas.width = img.width;
        canvas.height = img.height;

        ctx.save();

        // Apply flip transformation
        const scaleX = horizontal ? -1 : 1;
        const scaleY = vertical ? -1 : 1;
        const translateX = horizontal ? -canvas.width : 0;
        const translateY = vertical ? -canvas.height : 0;

        ctx.translate(translateX, translateY);
        ctx.scale(scaleX, scaleY);
        ctx.drawImage(img, 0, 0);
        ctx.restore();

        canvas.toBlob((blob) => {
          if (!blob) {
            reject(new Error('Failed to create blob'));
            return;
          }
          resolve(blob);
        }, file.type);
      };

      img.onerror = () => reject(new Error('Failed to load image'));
      reader.onerror = () => reject(new Error('Failed to read file'));
      reader.readAsDataURL(file);
    });
  }

  /**
   * Crop image to specified area
   */
  static async cropImage(file: File, cropArea: CropArea): Promise<Blob> {
    return new Promise((resolve, reject) => {
      const img = new Image();
      const reader = new FileReader();

      reader.onload = (e) => {
        img.src = e.target?.result as string;
      };

      img.onload = () => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');

        if (!ctx) {
          reject(new Error('Canvas context not available'));
          return;
        }

        canvas.width = cropArea.width;
        canvas.height = cropArea.height;

        ctx.drawImage(
          img,
          cropArea.x,
          cropArea.y,
          cropArea.width,
          cropArea.height,
          0,
          0,
          cropArea.width,
          cropArea.height
        );

        canvas.toBlob((blob) => {
          if (!blob) {
            reject(new Error('Failed to create blob'));
            return;
          }
          resolve(blob);
        }, file.type);
      };

      img.onerror = () => reject(new Error('Failed to load image'));
      reader.onerror = () => reject(new Error('Failed to read file'));
      reader.readAsDataURL(file);
    });
  }

  /**
   * Apply multiple edits to an image
   */
  static async applyEdits(file: File, options: EditOptions): Promise<Blob> {
    let currentBlob: Blob = file;

    // Apply rotation if specified
    if (options.rotation && options.rotation !== 0) {
      currentBlob = await this.rotateImage(
        new File([currentBlob], file.name, { type: file.type }),
        options.rotation
      );
    }

    // Apply flip if specified
    if (options.flipHorizontal || options.flipVertical) {
      currentBlob = await this.flipImage(
        new File([currentBlob], file.name, { type: file.type }),
        options.flipHorizontal,
        options.flipVertical
      );
    }

    // Apply crop if specified
    if (options.crop) {
      currentBlob = await this.cropImage(
        new File([currentBlob], file.name, { type: file.type }),
        options.crop
      );
    }

    return currentBlob;
  }

  /**
   * Create a cropped area from pixel coordinates to percentage
   */
  static pixelCropToPercentCrop(
    pixelCrop: CropArea,
    imageWidth: number,
    imageHeight: number
  ): CropArea {
    return {
      x: (pixelCrop.x / imageWidth) * 100,
      y: (pixelCrop.y / imageHeight) * 100,
      width: (pixelCrop.width / imageWidth) * 100,
      height: (pixelCrop.height / imageHeight) * 100,
    };
  }

  /**
   * Create a cropped area from percentage to pixel coordinates
   */
  static percentCropToPixelCrop(
    percentCrop: CropArea,
    imageWidth: number,
    imageHeight: number
  ): CropArea {
    return {
      x: (percentCrop.x / 100) * imageWidth,
      y: (percentCrop.y / 100) * imageHeight,
      width: (percentCrop.width / 100) * imageWidth,
      height: (percentCrop.height / 100) * imageHeight,
    };
  }
}
