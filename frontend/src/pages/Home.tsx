import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/common/Button';

const Home: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <h1 className="text-5xl font-bold text-gray-900 mb-4">
          무료 이미지 변환 도구
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          빠르고 안전하게 이미지를 변환하세요
          <br />
          <span className="text-primary-500 font-semibold">파일은 브라우저에서 직접 처리됩니다</span>
        </p>
        <Link to="/image-converter">
          <Button variant="primary" size="lg">
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            지금 시작하기
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
          <h3 className="text-lg font-semibold mb-2">완벽한 보안</h3>
          <p className="text-gray-600 text-sm">
            파일이 서버로 전송되지 않습니다. 브라우저에서 직접 처리되어 개인정보가 안전합니다.
          </p>
        </div>

        <div className="text-center p-6">
          <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold mb-2">빠른 처리</h3>
          <p className="text-gray-600 text-sm">
            업로드가 필요 없어 빠르게 변환됩니다. 대기 시간 없이 즉시 결과를 확인하세요.
          </p>
        </div>

        <div className="text-center p-6">
          <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold mb-2">완전 무료</h3>
          <p className="text-gray-600 text-sm">
            회원가입 없이 무료로 사용하세요. 제한 없이 원하는 만큼 변환할 수 있습니다.
          </p>
        </div>
      </div>

      {/* Supported Formats */}
      <div className="bg-white rounded-lg shadow-md p-8 mb-16">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">지원 포맷</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="border border-gray-200 rounded-lg p-4">
            <h3 className="font-semibold text-lg mb-2">JPG / JPEG</h3>
            <p className="text-sm text-gray-600">
              웹에서 가장 많이 사용되는 압축 포맷. 사진에 적합합니다.
            </p>
          </div>
          <div className="border border-gray-200 rounded-lg p-4">
            <h3 className="font-semibold text-lg mb-2">PNG</h3>
            <p className="text-sm text-gray-600">
              투명 배경을 지원하는 무손실 압축 포맷. 로고와 그래픽에 적합합니다.
            </p>
          </div>
          <div className="border border-gray-200 rounded-lg p-4">
            <h3 className="font-semibold text-lg mb-2">WebP</h3>
            <p className="text-sm text-gray-600">
              최신 웹 이미지 포맷. 작은 파일 크기로 빠른 로딩이 가능합니다.
            </p>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          지금 바로 시작하세요
        </h2>
        <p className="text-gray-600 mb-6">
          간단하고 빠르게 이미지를 변환하세요
        </p>
        <Link to="/image-converter">
          <Button variant="primary" size="lg">
            이미지 변환하기
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default Home;
