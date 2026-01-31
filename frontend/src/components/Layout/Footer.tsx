import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export const Footer: React.FC = () => {
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white border-t border-gray-200 mt-auto">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* About */}
          <div>
            <h3 className="font-bold text-gray-900 mb-3">{t('footer.about.title')}</h3>
            <p className="text-gray-600 text-sm">
              {t('footer.about.description')}
            </p>
          </div>

          {/* Links */}
          <div>
            <h3 className="font-bold text-gray-900 mb-3">{t('footer.links.title')}</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/image-converter"
                  className="text-gray-600 hover:text-primary-500 text-sm transition-colors"
                >
                  {t('footer.links.imageConverter')}
                </Link>
              </li>
              <li>
                <Link
                  to="/background-remover"
                  className="text-gray-600 hover:text-primary-500 text-sm transition-colors"
                >
                  {t('footer.links.backgroundRemover')}
                </Link>
              </li>
              <li>
                <Link
                  to="/image-to-pdf"
                  className="text-gray-600 hover:text-primary-500 text-sm transition-colors"
                >
                  {t('footer.links.imageToPdf')}
                </Link>
              </li>
              <li>
                <Link
                  to="/image-editor"
                  className="text-gray-600 hover:text-primary-500 text-sm transition-colors"
                >
                  {t('footer.links.imageEditor')}
                </Link>
              </li>
              <li>
                <Link
                  to="/gif-maker"
                  className="text-gray-600 hover:text-primary-500 text-sm transition-colors"
                >
                  {t('footer.links.gifMaker')}
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className="text-gray-600 hover:text-primary-500 text-sm transition-colors"
                >
                  {t('footer.links.about')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-bold text-gray-900 mb-3">{t('footer.legal.title')}</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/privacy"
                  className="text-gray-600 hover:text-primary-500 text-sm transition-colors"
                >
                  {t('footer.legal.privacy')}
                </Link>
              </li>
              <li>
                <Link
                  to="/terms"
                  className="text-gray-600 hover:text-primary-500 text-sm transition-colors"
                >
                  {t('footer.legal.terms')}
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-200 mt-8 pt-6 text-center">
          <p className="text-gray-600 text-sm">
            {t('footer.copyright', { year: currentYear })}
          </p>
          <p className="text-gray-500 text-xs mt-2">
            {t('footer.security')}
          </p>
        </div>
      </div>
    </footer>
  );
};
