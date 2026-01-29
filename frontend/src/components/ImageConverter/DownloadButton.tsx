import React from 'react';
import { Button } from '@/components/common/Button';
import { downloadBlob, generateFilename } from '@/utils/fileUtils';
import type { ConversionResult } from '@/types/image.types';

interface DownloadButtonProps {
  result: ConversionResult | null;
  originalFilename: string;
  disabled?: boolean;
}

export const DownloadButton: React.FC<DownloadButtonProps> = ({
  result,
  originalFilename,
  disabled = false,
}) => {
  const handleDownload = () => {
    if (!result) return;

    const extension = result.format === 'jpeg' ? 'jpg' : result.format;
    const filename = generateFilename(originalFilename, extension);
    downloadBlob(result.blob, filename);
  };

  return (
    <Button
      onClick={handleDownload}
      disabled={!result || disabled}
      variant="primary"
      size="lg"
      className="w-full md:w-auto"
    >
      <svg
        className="w-5 h-5 mr-2"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
        />
      </svg>
      다운로드
    </Button>
  );
};
