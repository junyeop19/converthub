import React from 'react';
import { useTranslation } from 'react-i18next';
import type { ImageFormat, ConversionOptions } from '@/types/image.types';
import { SUPPORTED_FORMATS, QUALITY_PRESETS, SIZE_PRESETS } from '@/constants/formats';

interface ConversionOptionsProps {
  options: ConversionOptions;
  onChange: (options: ConversionOptions) => void;
  originalDimensions?: { width: number; height: number };
}

export const ConversionOptionsComponent: React.FC<ConversionOptionsProps> = ({
  options,
  onChange,
  originalDimensions,
}) => {
  const { t } = useTranslation();

  return (
    <div className="space-y-6">
      {/* Format Selection */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">{t('converter.options.format')}</label>
        <div className="grid grid-cols-3 gap-3">
          {Object.keys(SUPPORTED_FORMATS).map((key) => (
            <button
              key={key}
              onClick={() => onChange({ ...options, format: key as ImageFormat })}
              className={`p-3 rounded-lg border-2 transition-all ${
                options.format === key
                  ? 'border-primary-500 bg-primary-50 text-primary-700'
                  : 'border-gray-200 hover:border-primary-300'
              }`}
            >
              <div className="font-semibold">{t(`converter.options.formats.${key}.label`)}</div>
              <div className="text-xs text-gray-500 mt-1">{t(`converter.options.formats.${key}.description`)}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Quality Selection */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {t('converter.options.quality')} ({Math.round(options.quality * 100)}%)
        </label>
        {options.format === 'png' && (
          <div className="mb-2 p-2 bg-blue-50 border border-blue-200 rounded text-xs text-blue-700">
            {t('converter.options.pngNote')}
          </div>
        )}
        <input
          type="range"
          min="0.1"
          max="1"
          step="0.05"
          value={options.quality}
          onChange={(e) => onChange({ ...options, quality: parseFloat(e.target.value) })}
          disabled={options.format === 'png'}
          className={`w-full h-2 bg-gray-200 rounded-lg appearance-none ${
            options.format === 'png' ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'
          }`}
        />
        <div className="flex justify-between mt-2">
          {Object.entries(QUALITY_PRESETS)
            .reverse()
            .map(([key, preset]) => (
              <button
                key={key}
                onClick={() => onChange({ ...options, quality: preset.value })}
                disabled={options.format === 'png'}
                className={`text-xs px-3 py-1 rounded-full transition-colors ${
                  Math.abs(options.quality - preset.value) < 0.01
                    ? 'bg-primary-500 text-white'
                    : options.format === 'png'
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {t(`converter.options.qualityPresets.${key}`)}
              </button>
            ))}
        </div>
      </div>

      {/* Size Selection */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">{t('converter.options.size')}</label>
        <select
          value={
            options.width && options.height
              ? `${options.width}x${options.height}`
              : 'original'
          }
          onChange={(e) => {
            if (e.target.value === 'original') {
              onChange({ ...options, width: undefined, height: undefined });
            } else if (e.target.value === 'custom') {
              // Custom size will be handled by width/height inputs below
            } else {
              const preset = SIZE_PRESETS.find(
                (p) => p.width && p.height && `${p.width}x${p.height}` === e.target.value
              );
              if (preset) {
                onChange({
                  ...options,
                  width: preset.width || undefined,
                  height: preset.height || undefined,
                });
              }
            }
          }}
          className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
        >
          {SIZE_PRESETS.map((preset, index) => (
            <option
              key={index}
              value={
                preset.width && preset.height
                  ? `${preset.width}x${preset.height}`
                  : preset.key
              }
            >
              {t(`converter.options.presets.${preset.key}`)}
              {originalDimensions && !preset.width && !preset.height && preset.key === 'original'
                ? ` (${originalDimensions.width}x${originalDimensions.height})`
                : ''}
            </option>
          ))}
        </select>

        {/* Custom size inputs */}
        <div className="grid grid-cols-2 gap-3 mt-3">
          <div>
            <label className="block text-xs text-gray-600 mb-1">{t('converter.options.widthLabel')}</label>
            <input
              type="number"
              placeholder={t('converter.options.widthPlaceholder')}
              value={options.width || ''}
              onChange={(e) =>
                onChange({
                  ...options,
                  width: e.target.value ? parseInt(e.target.value) : undefined,
                })
              }
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-xs text-gray-600 mb-1">{t('converter.options.heightLabel')}</label>
            <input
              type="number"
              placeholder={t('converter.options.heightPlaceholder')}
              value={options.height || ''}
              onChange={(e) =>
                onChange({
                  ...options,
                  height: e.target.value ? parseInt(e.target.value) : undefined,
                })
              }
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Aspect ratio checkbox */}
        <label className="flex items-center mt-3 cursor-pointer">
          <input
            type="checkbox"
            checked={options.maintainAspectRatio}
            onChange={(e) =>
              onChange({ ...options, maintainAspectRatio: e.target.checked })
            }
            className="w-4 h-4 text-primary-500 border-gray-300 rounded focus:ring-primary-500"
          />
          <span className="ml-2 text-sm text-gray-700">{t('converter.options.maintain')}</span>
        </label>
      </div>
    </div>
  );
};
