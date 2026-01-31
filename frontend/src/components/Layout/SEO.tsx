import { useEffect } from 'react';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  ogUrl?: string;
  canonical?: string;
  structuredData?: object;
}

const DEFAULT_SEO = {
  title: 'ConvertHub - 무료 이미지 변환, 편집, GIF 제작 도구',
  description: '무료 온라인 이미지 도구. 이미지 변환(JPG/PNG/WebP), 배경 제거, PDF 변환, 자르기/회전, GIF 제작. 브라우저에서 안전하게 처리. 회원가입 불필요.',
  keywords: '이미지 변환, JPG 변환, PNG 변환, WebP 변환, 이미지 압축, 이미지 리사이즈, 배경 제거, 이미지 편집, GIF 만들기, PDF 변환, 이미지 자르기, 이미지 회전, 무료 이미지 도구, 온라인 이미지 변환기, image converter, background remover, gif maker',
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
  canonical,
  structuredData,
}) => {
  const seoTitle = title || DEFAULT_SEO.title;
  const seoDescription = description || DEFAULT_SEO.description;
  const seoKeywords = keywords || DEFAULT_SEO.keywords;
  const seoOgTitle = ogTitle || seoTitle;
  const seoOgDescription = ogDescription || seoDescription;
  const seoOgImage = ogImage || DEFAULT_SEO.ogImage;
  const seoOgUrl = ogUrl || window.location.href;
  const seoCanonical = canonical || window.location.href;

  useEffect(() => {
    // Update document title
    document.title = seoTitle;

    // Basic meta tags
    updateMetaTag('description', seoDescription);
    updateMetaTag('keywords', seoKeywords);
    updateMetaTag('author', 'ConvertHub', 'name');
    updateMetaTag('robots', 'index, follow', 'name');
    updateMetaTag('language', 'Korean', 'name');
    updateMetaTag('revisit-after', '7 days', 'name');

    // Open Graph tags
    updateMetaTag('og:title', seoOgTitle, 'property');
    updateMetaTag('og:description', seoOgDescription, 'property');
    updateMetaTag('og:image', seoOgImage, 'property');
    updateMetaTag('og:url', seoOgUrl, 'property');
    updateMetaTag('og:type', 'website', 'property');
    updateMetaTag('og:site_name', DEFAULT_SEO.siteName, 'property');
    updateMetaTag('og:locale', 'ko_KR', 'property');

    // Twitter Card tags
    updateMetaTag('twitter:card', 'summary_large_image', 'name');
    updateMetaTag('twitter:title', seoOgTitle, 'name');
    updateMetaTag('twitter:description', seoOgDescription, 'name');
    updateMetaTag('twitter:image', seoOgImage, 'name');

    // Canonical URL
    updateCanonicalLink(seoCanonical);

    // Structured Data
    if (structuredData) {
      updateStructuredData(structuredData);
    }
  }, [seoTitle, seoDescription, seoKeywords, seoOgTitle, seoOgDescription, seoOgImage, seoOgUrl, seoCanonical, structuredData]);

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

function updateCanonicalLink(url: string) {
  let link = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;

  if (!link) {
    link = document.createElement('link');
    link.setAttribute('rel', 'canonical');
    document.head.appendChild(link);
  }

  link.setAttribute('href', url);
}

function updateStructuredData(data: object) {
  const scriptId = 'structured-data';
  let script = document.getElementById(scriptId) as HTMLScriptElement;

  if (!script) {
    script = document.createElement('script');
    script.id = scriptId;
    script.type = 'application/ld+json';
    document.head.appendChild(script);
  }

  script.textContent = JSON.stringify(data);
}
