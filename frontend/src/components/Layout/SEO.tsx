import { useEffect } from 'react';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  ogUrl?: string;
}

const DEFAULT_SEO = {
  title: 'ConvertHub - 무료 이미지 변환 도구',
  description: '빠르고 안전한 온라인 이미지 변환 서비스. JPG, PNG, WebP 포맷을 무료로 변환하고 압축하세요. 브라우저에서 직접 처리되어 안전합니다.',
  keywords: '이미지 변환, JPG 변환, PNG 변환, WebP 변환, 이미지 압축, 이미지 리사이즈, 무료 이미지 도구, 온라인 이미지 변환기',
  ogImage: '/og-image.png',
  siteName: 'ConvertHub',
};

export const SEO: React.FC<SEOProps> = ({
  title,
  description,
  keywords,
  ogTitle,
  ogDescription,
  ogImage,
  ogUrl,
}) => {
  const seoTitle = title || DEFAULT_SEO.title;
  const seoDescription = description || DEFAULT_SEO.description;
  const seoKeywords = keywords || DEFAULT_SEO.keywords;
  const seoOgTitle = ogTitle || seoTitle;
  const seoOgDescription = ogDescription || seoDescription;
  const seoOgImage = ogImage || DEFAULT_SEO.ogImage;
  const seoOgUrl = ogUrl || window.location.href;

  useEffect(() => {
    // Update document title
    document.title = seoTitle;

    // Update meta tags
    updateMetaTag('description', seoDescription);
    updateMetaTag('keywords', seoKeywords);

    // Open Graph tags
    updateMetaTag('og:title', seoOgTitle, 'property');
    updateMetaTag('og:description', seoOgDescription, 'property');
    updateMetaTag('og:image', seoOgImage, 'property');
    updateMetaTag('og:url', seoOgUrl, 'property');
    updateMetaTag('og:type', 'website', 'property');
    updateMetaTag('og:site_name', DEFAULT_SEO.siteName, 'property');

    // Twitter Card tags
    updateMetaTag('twitter:card', 'summary_large_image', 'name');
    updateMetaTag('twitter:title', seoOgTitle, 'name');
    updateMetaTag('twitter:description', seoOgDescription, 'name');
    updateMetaTag('twitter:image', seoOgImage, 'name');
  }, [seoTitle, seoDescription, seoKeywords, seoOgTitle, seoOgDescription, seoOgImage, seoOgUrl]);

  return null;
};

function updateMetaTag(name: string, content: string, attribute: 'name' | 'property' = 'name') {
  let element = document.querySelector(`meta[${attribute}="${name}"]`);

  if (!element) {
    element = document.createElement('meta');
    element.setAttribute(attribute, name);
    document.head.appendChild(element);
  }

  element.setAttribute('content', content);
}
