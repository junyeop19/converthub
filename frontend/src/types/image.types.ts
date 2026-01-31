/**
 * Image format types
 */
export type ImageFormat = 'jpeg' | 'png' | 'webp';

/**
 * Image file information
 */
export interface ImageFile {
  file: File;
  preview: string;
  name: string;
  size: number;
  type: string;
}

/**
 * Image conversion options
 */
export interface ConversionOptions {
  format: ImageFormat;
  quality: number;
  width?: number;
  height?: number;
  maintainAspectRatio: boolean;
}

/**
 * Image conversion result
 */
export interface ConversionResult {
  blob: Blob;
  url: string;
  size: number;
  format: ImageFormat;
}

/**
 * Size preset for common use cases
 */
export interface SizePreset {
  key: string;
  label: string;
  width: number | null;
  height: number | null;
}
