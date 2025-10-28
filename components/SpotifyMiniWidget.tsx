'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { SpotifyIcon } from 'hugeicons-react';

interface SpotifyTrack {
  isPlaying: boolean;
  title: string;
  artist: string;
  songUrl: string;
}

export function SpotifyMiniWidget() {
  const [track, setTrack] = useState<SpotifyTrack | null>(null);

  useEffect(() => {
    const fetchNowPlaying = async () => {
      try {
        const response = await fetch('/api/spotify/now-playing');
        if (response.status === 204) {
          setTrack(null);
          return;
        }
        const data = await response.json();
        setTrack(data);
      } catch (err) {
        console.error('Error fetching Spotify data:', err);
      }
    };

    fetchNowPlaying();
    const interval = setInterval(fetchNowPlaying, 30000);
    return () => clearInterval(interval);
  }, []);

  if (!track) return null;

  return (
    <motion.a
      href={track.songUrl}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      whileHover={{ scale: 1.05 }}
      className="inline-flex items-center gap-2 px-3 py-2 glass rounded-full border border-border hover:border-primary/50 transition-colors text-sm"
    >
      <SpotifyIcon size={16} className="text-primary" />
      <span className="text-foreground font-medium truncate max-w-[200px]">
        {track.title}
      </span>
      {track.isPlaying && (
        <motion.div
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 1, repeat: Infinity }}
          className="w-2 h-2 bg-primary rounded-full"
        />
      )}
    </motion.a>
  );
}