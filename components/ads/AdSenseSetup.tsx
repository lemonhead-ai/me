import Script from 'next/script';

export function AdSenseSetup() {
  return (
    <Script
      async
      src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-YOUR_PUBLISHER_ID"
      crossOrigin="anonymous"
      strategy="afterInteractive"
    />
  );
}
