import React from 'react';
import { Link } from 'react-router-dom';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white border-t border-gray-200 mt-auto">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* About */}
          <div>
            <h3 className="font-bold text-gray-900 mb-3">ConvertHub</h3>
            <p className="text-gray-600 text-sm">
              무료 온라인 파일 변환 도구. 빠르고 안전하게 파일을 변환하세요.
            </p>
          </div>

          {/* Links */}
          <div>
            <h3 className="font-bold text-gray-900 mb-3">바로가기</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/image-converter"
                  className="text-gray-600 hover:text-primary-500 text-sm transition-colors"
                >
                  이미지 변환
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className="text-gray-600 hover:text-primary-500 text-sm transition-colors"
                >
                  소개
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-bold text-gray-900 mb-3">법적 고지</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/privacy"
                  className="text-gray-600 hover:text-primary-500 text-sm transition-colors"
                >
                  개인정보처리방침
                </Link>
              </li>
              <li>
                <Link
                  to="/terms"
                  className="text-gray-600 hover:text-primary-500 text-sm transition-colors"
                >
                  이용약관
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-200 mt-8 pt-6 text-center">
          <p className="text-gray-600 text-sm">
            &copy; {currentYear} ConvertHub. All rights reserved.
          </p>
          <p className="text-gray-500 text-xs mt-2">
            파일은 브라우저에서 직접 처리되며 서버로 전송되지 않습니다.
          </p>
        </div>
      </div>
    </footer>
  );
};
