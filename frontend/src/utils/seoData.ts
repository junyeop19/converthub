/**
 * SEO and Structured Data helpers
 */

export const SITE_URL = 'https://converthub.pages.dev'; // Update with your actual domain

export interface PageSEO {
  title: string;
  description: string;
  keywords: string;
  canonical: string;
  structuredData?: object;
}

/**
 * Generate structured data for WebApplication
 */
export function generateWebApplicationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'ConvertHub',
    url: SITE_URL,
    description: '무료 온라인 이미지 변환, 편집, GIF 제작 도구. 브라우저에서 안전하게 처리됩니다.',
    applicationCategory: 'MultimediaApplication',
    operatingSystem: 'Any',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    featureList: [
      '이미지 포맷 변환 (JPG, PNG, WebP)',
      'AI 배경 제거',
      '이미지를 PDF로 변환',
      '이미지 편집 (자르기, 회전, 뒤집기)',
      'GIF 제작',
      '이미지 압축',
      '브라우저 기반 처리',
    ],
  };
}

/**
 * Generate structured data for Organization
 */
export function generateOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'ConvertHub',
    url: SITE_URL,
    logo: `${SITE_URL}/logo.png`,
    sameAs: [],
  };
}

/**
 * Generate structured data for BreadcrumbList
 */
export function generateBreadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

/**
 * Generate FAQ structured data
 */
export function generateFAQSchema(faqs: { question: string; answer: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
}

/**
 * SEO data for each page
 */
export const pageSEO: Record<string, PageSEO> = {
  home: {
    title: 'ConvertHub - 무료 이미지 변환, 편집, GIF 제작 도구',
    description:
      '무료 온라인 이미지 도구. JPG/PNG/WebP 변환, AI 배경 제거, PDF 변환, 이미지 편집, GIF 제작. 브라우저에서 안전하게 처리. 회원가입 불필요.',
    keywords:
      '이미지 변환, JPG 변환, PNG 변환, WebP 변환, 이미지 압축, 배경 제거, GIF 만들기, PDF 변환, 이미지 편집, 무료, 온라인, image converter, background remover, gif maker',
    canonical: SITE_URL,
    structuredData: generateWebApplicationSchema(),
  },
  imageConverter: {
    title: '이미지 변환 - JPG, PNG, WebP 무료 변환 | ConvertHub',
    description:
      'JPG, PNG, WebP 포맷을 무료로 변환하세요. 이미지 압축, 리사이즈, 목표 크기 압축, 스마트 압축, 일괄 변환 지원. 브라우저에서 안전하게 처리.',
    keywords:
      'JPG 변환, PNG 변환, WebP 변환, 이미지 압축, 이미지 리사이즈, jpg to png, png to jpg, 이미지 포맷 변환, 무료 이미지 변환',
    canonical: `${SITE_URL}/image-converter`,
  },
  backgroundRemover: {
    title: 'AI 배경 제거 - 무료 온라인 배경 투명 제거 도구 | ConvertHub',
    description:
      'AI 기술로 이미지 배경을 자동으로 제거하세요. 무료, 회원가입 불필요. 브라우저에서 안전하게 처리됩니다. PNG 투명 배경으로 저장.',
    keywords:
      '배경 제거, 배경 투명, AI 배경 제거, 무료 배경 제거, background remover, remove background, 이미지 배경 삭제',
    canonical: `${SITE_URL}/background-remover`,
  },
  imageToPdf: {
    title: '이미지를 PDF로 변환 - 무료 온라인 PDF 변환 도구 | ConvertHub',
    description:
      '여러 이미지를 하나의 PDF 파일로 무료 변환. JPG, PNG, WebP 지원. A4, Letter, Legal 페이지 크기 선택. 브라우저에서 안전하게 처리.',
    keywords:
      '이미지 PDF 변환, JPG PDF 변환, PNG PDF 변환, 이미지 합치기, PDF 만들기, image to pdf, jpg to pdf, 무료 PDF 변환',
    canonical: `${SITE_URL}/image-to-pdf`,
  },
  imageEditor: {
    title: '이미지 편집 - 자르기, 회전, 뒤집기 무료 도구 | ConvertHub',
    description:
      '온라인에서 이미지를 자르고, 회전하고, 뒤집으세요. 무료 이미지 편집 도구. 브라우저에서 안전하게 처리. 원본 품질 유지.',
    keywords:
      '이미지 자르기, 이미지 회전, 이미지 뒤집기, 이미지 편집, crop image, rotate image, flip image, 무료 이미지 편집기',
    canonical: `${SITE_URL}/image-editor`,
  },
  gifMaker: {
    title: 'GIF 만들기 - 무료 온라인 GIF 제작 도구 | ConvertHub',
    description:
      '여러 이미지로 애니메이션 GIF를 무료로 만드세요. 프레임 속도 조절, 크기 조절. 브라우저에서 안전하게 처리. 회원가입 불필요.',
    keywords:
      'GIF 만들기, GIF 제작, 애니메이션 GIF, 이미지 GIF 변환, gif maker, create gif, animated gif, 무료 GIF 제작',
    canonical: `${SITE_URL}/gif-maker`,
  },
};
