'use client';

import { useEffect } from 'react';

type AdBannerProps = {
  dataAdSlot?: string;
  dataAdFormat?: string;
  dataFullWidthResponsive?: boolean;
  placeholder?: string;
};

export function AdBanner({
  dataAdSlot = 'YOUR_AD_SLOT',
  dataAdFormat = 'auto',
  dataFullWidthResponsive = true,
  placeholder = 'Ad Banner Placeholder',
}: AdBannerProps) {
  useEffect(() => {
    try {
      // @ts-ignore
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (err) {
      console.error(err);
    }
  }, []);

  return (
    <div className="my-8 flex justify-center items-center bg-white/5 border border-border rounded-2xl min-h-[100px] overflow-hidden relative">
      {/* Visual placeholder for development */}
      <div className="absolute inset-0 flex items-center justify-center text-muted text-sm -z-10">
        {placeholder}
      </div>

      <ins
        className="adsbygoogle w-full block"
        style={{ display: 'block' }}
        data-ad-client="ca-pub-YOUR_PUBLISHER_ID"
        data-ad-slot={dataAdSlot}
        data-ad-format={dataAdFormat}
        data-full-width-responsive={dataFullWidthResponsive.toString()}
      />
    </div>
  );
}
