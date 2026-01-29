import React from 'react';
import { Link } from 'react-router-dom';
import { Card } from '@/components/common/Card';
import { Button } from '@/components/common/Button';

const About: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">ConvertHub 소개</h1>
        <p className="text-xl text-gray-600">
          무료로 이미지를 변환하고 편집하는 웹 서비스
        </p>
      </div>

      <div className="space-y-6">
        <Card>
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">ConvertHub란?</h2>
          <p className="text-gray-700 leading-relaxed">
            ConvertHub는 누구나 무료로 사용할 수 있는 온라인 파일 변환 도구입니다.
            브라우저에서 직접 파일을 처리하므로 서버로 업로드할 필요가 없어
            빠르고 안전하게 변환 작업을 수행할 수 있습니다.
          </p>
        </Card>

        <Card>
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">왜 ConvertHub를 사용해야 하나요?</h2>
          <div className="space-y-4">
            <div className="flex items-start">
              <div className="flex-shrink-0 w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mr-4">
                <svg className="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-1">완벽한 보안</h3>
                <p className="text-gray-600">
                  파일이 서버로 전송되지 않고 브라우저에서 직접 처리됩니다.
                  개인정보와 파일이 외부로 유출될 걱정이 없습니다.
                </p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="flex-shrink-0 w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mr-4">
                <svg className="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-1">빠른 처리</h3>
                <p className="text-gray-600">
                  업로드와 다운로드 과정이 없어 즉시 변환 작업을 시작할 수 있습니다.
                  대기 시간 없이 빠르게 결과를 확인하세요.
                </p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="flex-shrink-0 w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mr-4">
                <svg className="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-1">완전 무료</h3>
                <p className="text-gray-600">
                  회원가입이나 구독 없이 모든 기능을 무료로 사용할 수 있습니다.
                  제한 없이 원하는 만큼 변환하세요.
                </p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="flex-shrink-0 w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mr-4">
                <svg className="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-1">사용하기 쉬움</h3>
                <p className="text-gray-600">
                  직관적인 인터페이스로 누구나 쉽게 사용할 수 있습니다.
                  복잡한 설정 없이 드래그 앤 드롭으로 간편하게 변환하세요.
                </p>
              </div>
            </div>
          </div>
        </Card>

        <Card>
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">현재 지원 기능</h2>
          <div className="space-y-3 text-gray-700">
            <div className="flex items-start">
              <svg className="w-5 h-5 text-primary-500 mr-2 flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>이미지 포맷 변환 (JPG ↔ PNG ↔ WebP)</span>
            </div>
            <div className="flex items-start">
              <svg className="w-5 h-5 text-primary-500 mr-2 flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>이미지 압축 및 품질 조정</span>
            </div>
            <div className="flex items-start">
              <svg className="w-5 h-5 text-primary-500 mr-2 flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>이미지 리사이즈 (크기 조절)</span>
            </div>
            <div className="flex items-start">
              <svg className="w-5 h-5 text-primary-500 mr-2 flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>비율 유지 리사이즈</span>
            </div>
            <div className="flex items-start">
              <svg className="w-5 h-5 text-primary-500 mr-2 flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>소셜 미디어 프리셋 (Instagram, Facebook 등)</span>
            </div>
          </div>
        </Card>

        <Card>
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">앞으로의 계획</h2>
          <div className="space-y-3 text-gray-700">
            <p className="leading-relaxed">
              ConvertHub는 지속적으로 발전하고 있습니다. 앞으로 다음과 같은 기능을 추가할 예정입니다:
            </p>
            <div className="flex items-start">
              <svg className="w-5 h-5 text-gray-400 mr-2 flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>PDF 파일 변환 및 편집</span>
            </div>
            <div className="flex items-start">
              <svg className="w-5 h-5 text-gray-400 mr-2 flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>배치 변환 (여러 파일 동시 처리)</span>
            </div>
            <div className="flex items-start">
              <svg className="w-5 h-5 text-gray-400 mr-2 flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>추가 이미지 포맷 지원 (TIFF, BMP, GIF 등)</span>
            </div>
            <div className="flex items-start">
              <svg className="w-5 h-5 text-gray-400 mr-2 flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>고급 이미지 편집 기능</span>
            </div>
          </div>
        </Card>

        <Card className="bg-primary-50 border-primary-200">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">지금 바로 시작하세요</h2>
          <p className="text-gray-700 mb-6">
            ConvertHub를 사용하면 빠르고 안전하게 이미지를 변환할 수 있습니다.
            지금 바로 무료로 시작해보세요!
          </p>
          <Link to="/image-converter">
            <Button variant="primary" size="lg">
              이미지 변환하기
            </Button>
          </Link>
        </Card>
      </div>
    </div>
  );
};

export default About;
