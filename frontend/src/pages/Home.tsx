import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/common/Button';

const Home: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="max-w-4xl mx-auto">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <h1 className="text-5xl font-bold text-gray-900 mb-4">
          {t('home.hero.title')}
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          {t('home.hero.subtitle')}
          <br />
          <span className="text-primary-500 font-semibold">{t('home.hero.highlight')}</span>
        </p>
        <Link to="/image-converter">
          <Button variant="primary" size="lg">
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            {t('home.hero.cta')}
          </Button>
        </Link>
      </div>

      {/* Features */}
      <div className="grid md:grid-cols-3 gap-8 mb-16">
        <div className="text-center p-6">
          <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold mb-2">{t('home.features.security.title')}</h3>
          <p className="text-gray-600 text-sm">
            {t('home.features.security.description')}
          </p>
        </div>

        <div className="text-center p-6">
          <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold mb-2">{t('home.features.speed.title')}</h3>
          <p className="text-gray-600 text-sm">
            {t('home.features.speed.description')}
          </p>
        </div>

        <div className="text-center p-6">
          <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold mb-2">{t('home.features.free.title')}</h3>
          <p className="text-gray-600 text-sm">
            {t('home.features.free.description')}
          </p>
        </div>
      </div>

      {/* Supported Formats */}
      <div className="bg-white rounded-lg shadow-md p-8 mb-16">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">{t('home.formats.title')}</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="border border-gray-200 rounded-lg p-4">
            <h3 className="font-semibold text-lg mb-2">{t('home.formats.jpg.title')}</h3>
            <p className="text-sm text-gray-600">
              {t('home.formats.jpg.description')}
            </p>
          </div>
          <div className="border border-gray-200 rounded-lg p-4">
            <h3 className="font-semibold text-lg mb-2">{t('home.formats.png.title')}</h3>
            <p className="text-sm text-gray-600">
              {t('home.formats.png.description')}
            </p>
          </div>
          <div className="border border-gray-200 rounded-lg p-4">
            <h3 className="font-semibold text-lg mb-2">{t('home.formats.webp.title')}</h3>
            <p className="text-sm text-gray-600">
              {t('home.formats.webp.description')}
            </p>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          {t('home.cta.title')}
        </h2>
        <p className="text-gray-600 mb-6">
          {t('home.cta.subtitle')}
        </p>
        <Link to="/image-converter">
          <Button variant="primary" size="lg">
            {t('home.cta.button')}
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default Home;
