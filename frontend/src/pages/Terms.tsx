import React from 'react';
import { Card } from '@/components/common/Card';

const Terms: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold text-gray-900 mb-8">이용약관</h1>

      <div className="space-y-6">
        <Card>
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">제1조 (목적)</h2>
          <p className="text-gray-700 leading-relaxed">
            이 약관은 ConvertHub(이하 "사이트")가 제공하는 이미지 변환 서비스
            (이하 "서비스")의 이용과 관련하여 사이트와 이용자의 권리, 의무 및
            책임사항을 규정함을 목적으로 합니다.
          </p>
        </Card>

        <Card>
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">제2조 (서비스의 제공)</h2>
          <div className="text-gray-700 leading-relaxed space-y-3">
            <p>사이트는 다음과 같은 서비스를 제공합니다:</p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>이미지 포맷 변환 (JPG, PNG, WebP 등)</li>
              <li>이미지 압축 및 크기 조절</li>
              <li>이미지 품질 조정</li>
              <li>기타 사이트가 정하는 서비스</li>
            </ul>
          </div>
        </Card>

        <Card>
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">제3조 (서비스 이용)</h2>
          <div className="text-gray-700 leading-relaxed space-y-3">
            <p>
              서비스는 별도의 회원가입 없이 누구나 무료로 이용할 수 있습니다.
            </p>
            <p className="mt-3">다음 각 호에 해당하는 경우 서비스 이용이 제한될 수 있습니다:</p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>50MB를 초과하는 파일 업로드</li>
              <li>지원하지 않는 파일 형식 사용</li>
              <li>서비스의 정상적인 운영을 방해하는 행위</li>
            </ul>
          </div>
        </Card>

        <Card>
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">제4조 (개인정보 보호)</h2>
          <div className="text-gray-700 leading-relaxed space-y-3">
            <p>
              사이트는 이용자의 개인정보를 중요시하며, 다음과 같이 보호합니다:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>모든 파일 처리는 브라우저에서 수행되며 서버로 전송되지 않습니다</li>
              <li>이용자가 업로드한 파일은 저장되지 않습니다</li>
              <li>자세한 내용은 개인정보처리방침을 참조하시기 바랍니다</li>
            </ul>
          </div>
        </Card>

        <Card>
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">제5조 (저작권)</h2>
          <div className="text-gray-700 leading-relaxed space-y-3">
            <p>
              이용자가 업로드하는 파일에 대한 저작권은 해당 이용자에게 있습니다.
            </p>
            <p className="mt-3">
              사이트는 이용자가 업로드한 파일을 저장하거나 사용하지 않으며,
              변환된 파일에 대한 권리는 전적으로 이용자에게 있습니다.
            </p>
          </div>
        </Card>

        <Card>
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">제6조 (사이트의 의무)</h2>
          <div className="text-gray-700 leading-relaxed space-y-3">
            <p>사이트는 다음 각 호의 의무를 다합니다:</p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>서비스의 안정적인 제공을 위해 지속적으로 노력합니다</li>
              <li>이용자의 개인정보를 보호하기 위해 최선을 다합니다</li>
              <li>이용자의 의견이나 불만을 신속하게 처리하도록 노력합니다</li>
            </ul>
          </div>
        </Card>

        <Card>
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">제7조 (이용자의 의무)</h2>
          <div className="text-gray-700 leading-relaxed space-y-3">
            <p>이용자는 다음 행위를 하여서는 안 됩니다:</p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>불법적인 내용의 파일 업로드 또는 변환</li>
              <li>타인의 저작권을 침해하는 파일의 무단 사용</li>
              <li>서비스의 운영을 고의로 방해하는 행위</li>
              <li>사이트의 정보를 임의로 변경하는 행위</li>
              <li>바이러스나 악성 코드를 유포하는 행위</li>
            </ul>
          </div>
        </Card>

        <Card>
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">제8조 (서비스의 변경 및 중단)</h2>
          <div className="text-gray-700 leading-relaxed space-y-3">
            <p>
              사이트는 다음 각 호의 경우 서비스의 전부 또는 일부를 제한하거나
              중단할 수 있습니다:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>서비스용 설비의 보수 등 공사로 인한 부득이한 경우</li>
              <li>전기통신사업법에 규정된 기간통신사업자가 전기통신 서비스를 중지한 경우</li>
              <li>국가비상사태, 정전, 서비스 설비의 장애 또는 서비스 이용의 폭주 등</li>
              <li>기타 사이트가 서비스를 계속 제공하는 것이 곤란한 경우</li>
            </ul>
          </div>
        </Card>

        <Card>
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">제9조 (면책 조항)</h2>
          <div className="text-gray-700 leading-relaxed space-y-3">
            <p>사이트는 다음 각 호의 경우 책임을 지지 않습니다:</p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>이용자가 서비스를 이용하여 기대하는 수익을 얻지 못한 경우</li>
              <li>이용자가 변환한 파일의 품질이나 결과물에 대한 만족도</li>
              <li>이용자의 귀책사유로 인한 서비스 이용의 장애</li>
              <li>제3자가 불법적으로 사이트의 서버에 접속하여 발생한 손해</li>
              <li>천재지변 또는 이에 준하는 불가항력으로 인하여 서비스를 제공할 수 없는 경우</li>
            </ul>
          </div>
        </Card>

        <Card>
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">제10조 (광고 게재)</h2>
          <p className="text-gray-700 leading-relaxed">
            사이트는 서비스 운영을 위해 광고를 게재할 수 있으며,
            이용자는 서비스 이용 시 노출되는 광고에 대해 동의한 것으로 간주됩니다.
          </p>
        </Card>

        <Card>
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">제11조 (약관의 개정)</h2>
          <p className="text-gray-700 leading-relaxed">
            사이트는 필요한 경우 이 약관을 개정할 수 있으며,
            약관을 개정하는 경우 적용일자 및 개정사유를 명시하여
            현행 약관과 함께 사이트의 초기화면에 그 적용일자 7일 이전부터
            적용일자 전일까지 공지합니다.
          </p>
        </Card>

        <Card>
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">제12조 (준거법 및 관할법원)</h2>
          <p className="text-gray-700 leading-relaxed">
            이 약관에 명시되지 않은 사항은 대한민국 법령에 의거하며,
            서비스 이용으로 발생한 분쟁에 대해 소송이 필요한 경우
            대한민국 법원을 관할 법원으로 합니다.
          </p>
        </Card>

        <div className="text-right text-sm text-gray-500 mt-8">
          <p>시행일자: 2026년 1월 30일</p>
        </div>
      </div>
    </div>
  );
};

export default Terms;
