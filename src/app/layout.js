import Script from 'next/script'

export const metadata = {
  title: 'Gyatech – Get Your Admission',
  description: 'Find the career you\'re looking for in your future.',
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        {/* Original template CSS files */}
        <link rel="stylesheet" href="/css/bootstrap.min.css" />
        <link rel="stylesheet" href="/css/slick.css" />
        <link rel="stylesheet" href="/css/slick-theme.css" />
        <link rel="stylesheet" href="/css/aos.css" />
        <link rel="stylesheet" href="/css/style.css" />
      </head>
      <body>
        {children}
        
        {/* Original template scripts */}
        <Script src="/js/jquery-3.7.1.min.js" strategy="beforeInteractive" />
        <Script src="/js/bootstrap.bundle.min.js" strategy="beforeInteractive" />
        <Script src="/js/slick.min.js" strategy="beforeInteractive" />
        <Script src="/js/aos.js" strategy="beforeInteractive" />
        <Script src="/js/custom.js" strategy="lazyOnload" />
      </body>
    </html>
  )
}