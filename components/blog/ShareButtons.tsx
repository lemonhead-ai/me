'use client';

import { m } from 'framer-motion';
import {
  Facebook01Icon,
  NewTwitterIcon,
  RedditIcon,
  WhatsappIcon,
  Share01Icon
} from 'hugeicons-react';
import { useState, useEffect } from 'react';

export function ShareButtons({ title }: { title: string }) {
  const [url, setUrl] = useState('');

  useEffect(() => {
    setUrl(window.location.href);
  }, []);

  const shareLinks = {
    x: `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
    reddit: `https://reddit.com/submit?url=${encodeURIComponent(url)}&title=${encodeURIComponent(title)}`,
    whatsapp: `https://api.whatsapp.com/send?text=${encodeURIComponent(title + ' ' + url)}`,
  };

  const shareNative = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: title,
          url: url,
        });
      } catch (err) {
        console.error('Error sharing:', err);
      }
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <span className="text-sm font-semibold text-muted uppercase tracking-wider mb-2">Share this article</span>
      <div className="flex flex-row md:flex-col gap-3">
        <m.a
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          href={shareLinks.x}
          target="_blank"
          rel="noopener noreferrer"
          className="w-10 h-10 rounded-full bg-primary/10 hover:bg-primary/20 flex items-center justify-center text-primary transition-colors"
          aria-label="Share on X"
        >
          <NewTwitterIcon size={20} />
        </m.a>

        <m.a
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          href={shareLinks.facebook}
          target="_blank"
          rel="noopener noreferrer"
          className="w-10 h-10 rounded-full bg-primary/10 hover:bg-primary/20 flex items-center justify-center text-primary transition-colors"
          aria-label="Share on Facebook"
        >
          <Facebook01Icon size={20} />
        </m.a>

        <m.a
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          href={shareLinks.reddit}
          target="_blank"
          rel="noopener noreferrer"
          className="w-10 h-10 rounded-full bg-primary/10 hover:bg-primary/20 flex items-center justify-center text-primary transition-colors"
          aria-label="Share on Reddit"
        >
          <RedditIcon size={20} />
        </m.a>

        <m.a
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          href={shareLinks.whatsapp}
          target="_blank"
          rel="noopener noreferrer"
          className="w-10 h-10 rounded-full bg-primary/10 hover:bg-primary/20 flex items-center justify-center text-primary transition-colors"
          aria-label="Share on WhatsApp"
        >
          <WhatsappIcon size={20} />
        </m.a>

        <m.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={shareNative}
          className="w-10 h-10 rounded-full bg-primary hover:bg-primary-dark flex items-center justify-center text-blue md:hidden transition-colors"
          aria-label="Share"
        >
          <Share01Icon size={20} />
        </m.button>
      </div>
    </div>
  );
}
