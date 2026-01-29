import React from 'react';
import { Card } from '@/components/common/Card';

const Privacy: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold text-gray-900 mb-8">개인정보처리방침</h1>

      <div className="space-y-6">
        <Card>
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">1. 개인정보의 처리 목적</h2>
          <p className="text-gray-700 leading-relaxed">
            ConvertHub는 사용자의 개인정보를 수집하거나 저장하지 않습니다.
            모든 파일 변환 작업은 사용자의 브라우저에서 직접 처리되며,
            서버로 전송되지 않습니다.
          </p>
        </Card>

        <Card>
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">2. 개인정보의 처리 및 보유 기간</h2>
          <div className="text-gray-700 leading-relaxed space-y-3">
            <p>
              ConvertHub는 파일을 업로드하거나 저장하지 않으므로 개인정보를
              보유하지 않습니다. 다음과 같은 정보만 일시적으로 처리됩니다:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>브라우저 메모리 내에서만 처리되는 이미지 파일</li>
              <li>변환 작업 완료 후 즉시 삭제됨</li>
            </ul>
          </div>
        </Card>

        <Card>
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">3. 쿠키 사용</h2>
          <div className="text-gray-700 leading-relaxed space-y-3">
            <p>
              ConvertHub는 서비스 개선 및 광고 제공을 위해 쿠키를 사용할 수 있습니다:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Google Analytics: 웹사이트 사용 통계 수집</li>
              <li>Google AdSense: 맞춤형 광고 제공</li>
            </ul>
            <p className="mt-3">
              사용자는 브라우저 설정을 통해 쿠키 수집을 거부할 수 있습니다.
              다만, 쿠키 차단 시 일부 서비스 이용이 제한될 수 있습니다.
            </p>
          </div>
        </Card>

        <Card>
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">4. 제3자 제공</h2>
          <p className="text-gray-700 leading-relaxed">
            ConvertHub는 사용자의 개인정보를 제3자에게 제공하지 않습니다.
          </p>
        </Card>

        <Card>
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">5. 개인정보의 파기</h2>
          <p className="text-gray-700 leading-relaxed">
            모든 파일 처리는 브라우저에서 일시적으로만 이루어지며,
            페이지를 새로고침하거나 닫으면 자동으로 삭제됩니다.
          </p>
        </Card>

        <Card>
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">6. 정보주체의 권리·의무</h2>
          <div className="text-gray-700 leading-relaxed space-y-3">
            <p>사용자는 언제든지 다음과 같은 권리를 행사할 수 있습니다:</p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>쿠키 삭제 및 차단</li>
              <li>브라우저 캐시 삭제</li>
              <li>서비스 이용 중단</li>
            </ul>
          </div>
        </Card>

        <Card>
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">7. 개인정보 보호책임자</h2>
          <div className="text-gray-700 leading-relaxed space-y-2">
            <p>개인정보 처리에 관한 업무를 총괄해서 책임지고 있습니다:</p>
            <ul className="list-none space-y-1 ml-4 mt-3">
              <li>책임자: ConvertHub 관리자</li>
              <li>연락처: 추후 공지 예정</li>
            </ul>
          </div>
        </Card>

        <Card>
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">8. 개인정보 처리방침 변경</h2>
          <p className="text-gray-700 leading-relaxed">
            이 개인정보처리방침은 2026년 1월 30일부터 적용되며,
            법령 및 방침에 따른 변경내용의 추가, 삭제 및 정정이 있는 경우에는
            변경사항의 시행 7일 전부터 공지사항을 통하여 고지할 것입니다.
          </p>
        </Card>

        <div className="text-right text-sm text-gray-500 mt-8">
          <p>시행일자: 2026년 1월 30일</p>
        </div>
      </div>
    </div>
  );
};

export default Privacy;
