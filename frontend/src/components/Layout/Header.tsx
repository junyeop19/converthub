import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { LanguageSwitch } from './LanguageSwitch';

export const Header: React.FC = () => {
  const { t } = useTranslation();

  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">C</span>
            </div>
            <h1 className="text-2xl font-bold text-gray-900">
              Convert<span className="text-primary-500">Hub</span>
            </h1>
          </Link>

          <div className="flex items-center space-x-4">
            <nav className="hidden md:flex space-x-6">
              <Link
                to="/image-converter"
                className="text-gray-700 hover:text-primary-500 font-medium transition-colors"
              >
                {t('nav.imageConverter')}
              </Link>
              <Link
                to="/about"
                className="text-gray-700 hover:text-primary-500 font-medium transition-colors"
              >
                {t('nav.about')}
              </Link>
            </nav>

            <LanguageSwitch />

            {/* Mobile menu button */}
            <button className="md:hidden p-2 text-gray-600 hover:text-primary-500">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
