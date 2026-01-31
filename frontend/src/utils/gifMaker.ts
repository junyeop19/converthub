import gifshot from 'gifshot';

export interface GifOptions {
  interval?: number; // Time between frames in seconds (default: 0.1)
  numFrames?: number; // Number of frames
  gifWidth?: number; // Width of the GIF
  gifHeight?: number; // Height of the GIF
  frameDuration?: number; // Duration of each frame (default: 1)
}

export interface GifResult {
  dataUrl: string;
  blob: Blob;
}

/**
 * GIF Maker utility using gifshot library
 */
export class GifMaker {
  /**
   * Create a GIF from multiple image files
   */
  static async createGifFromFiles(
    files: File[],
    options: GifOptions = {}
  ): Promise<GifResult> {
    // Convert files to data URLs
    const imageDataUrls = await Promise.all(
      files.map((file) => this.fileToDataUrl(file))
    );

    return this.createGifFromDataUrls(imageDataUrls, options);
  }

  /**
   * Create a GIF from data URLs
   */
  static async createGifFromDataUrls(
    dataUrls: string[],
    options: GifOptions = {}
  ): Promise<GifResult> {
    return new Promise((resolve, reject) => {
      gifshot.createGIF(
        {
          images: dataUrls,
          gifWidth: options.gifWidth,
          gifHeight: options.gifHeight,
          interval: options.interval || 0.1,
          numFrames: options.numFrames || dataUrls.length,
          frameDuration: options.frameDuration || 1,
          sampleInterval: 10,
          numWorkers: 2,
        },
        (obj) => {
          if (obj.error) {
            reject(new Error(obj.errorMsg || 'Failed to create GIF'));
            return;
          }

          // Convert data URL to blob
          fetch(obj.image)
            .then((res) => res.blob())
            .then((blob) => {
              resolve({
                dataUrl: obj.image,
                blob,
              });
            })
            .catch(reject);
        }
      );
    });
  }

  /**
   * Convert File to data URL
   */
  private static fileToDataUrl(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = (e) => {
        resolve(e.target?.result as string);
      };

      reader.onerror = () => {
        reject(new Error('Failed to read file'));
      };

      reader.readAsDataURL(file);
    });
  }

  /**
   * Calculate optimal GIF dimensions while maintaining aspect ratio
   */
  static calculateGifDimensions(
    files: File[],
    maxWidth: number = 800,
    maxHeight: number = 600
  ): Promise<{ width: number; height: number }> {
    return new Promise((resolve, reject) => {
      if (files.length === 0) {
        resolve({ width: maxWidth, height: maxHeight });
        return;
      }

      const img = new Image();
      const reader = new FileReader();

      reader.onload = (e) => {
        img.src = e.target?.result as string;
      };

      img.onload = () => {
        let width = img.width;
        let height = img.height;

        // Scale down if necessary
        if (width > maxWidth) {
          height = (height * maxWidth) / width;
          width = maxWidth;
        }

        if (height > maxHeight) {
          width = (width * maxHeight) / height;
          height = maxHeight;
        }

        resolve({
          width: Math.round(width),
          height: Math.round(height),
        });
      };

      img.onerror = () => {
        reject(new Error('Failed to load image'));
      };

      reader.onerror = () => {
        reject(new Error('Failed to read file'));
      };

      reader.readAsDataURL(files[0]);
    });
  }
}
