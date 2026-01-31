declare module 'gifshot' {
  export interface GifOptions {
    images?: string[];
    gifWidth?: number;
    gifHeight?: number;
    interval?: number;
    numFrames?: number;
    frameDuration?: number;
    sampleInterval?: number;
    numWorkers?: number;
  }

  export interface GifResult {
    image: string;
    error: boolean;
    errorCode?: string;
    errorMsg?: string;
  }

  export function createGIF(
    options: GifOptions,
    callback?: (obj: GifResult) => void
  ): void;
}
