// pages/_app.js
import Script from 'next/script';

function MyApp({ Component, pageProps }) {
  return (
    <>
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
      
      {/* Custom JS */}
      <Script
        src="/js/custom.js"
        strategy="beforeInteractive"
      />

      <Component {...pageProps} />
    </>
  );
}

export default MyApp;