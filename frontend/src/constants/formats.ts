import type { SizePreset } from '@/types/image.types';

/**
 * Supported image formats configuration
 */
export const SUPPORTED_FORMATS = {
  jpeg: {
    label: 'JPG/JPEG',
    mimeType: 'image/jpeg',
    extensions: ['.jpg', '.jpeg'],
    description: '웹에서 가장 많이 사용되는 압축 포맷',
  },
  png: {
    label: 'PNG',
    mimeType: 'image/png',
    extensions: ['.png'],
    description: '투명 배경 지원, 무손실 압축',
  },
  webp: {
    label: 'WebP',
    mimeType: 'image/webp',
    extensions: ['.webp'],
    description: '최신 웹 이미지 포맷, 작은 파일 크기',
  },
} as const;

/**
 * Maximum file size (50MB)
 */
export const MAX_FILE_SIZE = 50 * 1024 * 1024;

/**
 * Quality presets
 */
export const QUALITY_PRESETS = {
  high: {
    value: 0.92,
    label: '높음 (92%)',
    description: '최고 품질, 큰 파일 크기',
  },
  medium: {
    value: 0.7,
    label: '중간 (70%)',
    description: '균형잡힌 품질과 크기',
  },
  low: {
    value: 0.5,
    label: '낮음 (50%)',
    description: '작은 파일 크기',
  },
} as const;

/**
 * Common size presets for social media, etc.
 */
export const SIZE_PRESETS: SizePreset[] = [
  {
    label: '원본 크기',
    width: null,
    height: null,
  },
  {
    label: 'Instagram 정사각형 (1080x1080)',
    width: 1080,
    height: 1080,
  },
  {
    label: 'Instagram 세로 (1080x1350)',
    width: 1080,
    height: 1350,
  },
  {
    label: 'Facebook 커버 (820x312)',
    width: 820,
    height: 312,
  },
  {
    label: 'Twitter 헤더 (1500x500)',
    width: 1500,
    height: 500,
  },
  {
    label: 'YouTube 썸네일 (1280x720)',
    width: 1280,
    height: 720,
  },
  {
    label: 'HD (1920x1080)',
    width: 1920,
    height: 1080,
  },
  {
    label: '사용자 지정',
    width: null,
    height: null,
  },
];

/**
 * Accepted file types for file input
 */
export const ACCEPTED_FILE_TYPES = {
  'image/*': ['.jpeg', '.jpg', '.png', '.webp'],
};
