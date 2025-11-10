// app/alt/layout.jsx
import Script from 'next/script';

export const metadata = {
  title: 'Gyatech – Get Your Admission (Alt)',
  description: 'Get Your Admission - Alternate Version',
};

export default function AltLayout({ children }) {
  return (
    <>
      {/* CSS Files */}
      <link rel="stylesheet" href="/css/bootstrap.min.css" />
      <link rel="stylesheet" href="/css/slick.css" />
      <link rel="stylesheet" href="/css/slick-theme.css" />
      <link rel="stylesheet" href="/css/aos.css" />
      <link rel="stylesheet" href="/css/style.css" />
      
      {children}
      
      {/* jQuery - must load first */}
      <Script
        src="/js/jquery-3.7.1.min.js"
        strategy="beforeInteractive"
      />
      
      {/* Bootstrap JS */}
      <Script
        src="/js/bootstrap.bundle.min.js"
        strategy="beforeInteractive"
      />
      
      {/* Slick Slider */}
      <Script
        src="/js/slick.min.js"
        strategy="beforeInteractive"
      />
      
      {/* AOS Animation */}
      <Script
        src="/js/aos.js"
        strategy="beforeInteractive"
      />
      
      {/* DO NOT load custom.js here - we'll handle it in the component */}
    </>
  );
}