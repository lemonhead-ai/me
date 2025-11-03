'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SpotifyIcon } from 'hugeicons-react';
import Image from 'next/image';

interface SpotifyTrack {
  isPlaying: boolean;
  title: string;
  artist: string;
  album: string;
  albumImageUrl: string;
  songUrl: string;
}

export function SpotifyNowPlaying() {
  const [track, setTrack] = useState<SpotifyTrack | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
  const fetchNowPlaying = async () => {
    try {
      const response = await fetch('https://api.spotify.com/v1/me/player/currently-playing', {
        cache: 'no-store',
      });

      if (response.status === 204) {
        setTrack(null);
        return;
      }

      if (!response.ok) {
        console.warn('Spotify API responded with:', response.status);
        setError(true);
        return;
      }

      const data = await response.json();
      setTrack(data);
      setError(false);
    } catch (err) {
      console.error('Network error fetching Spotify:', err);
      setError(true);
    } finally {
      setIsLoading(false);
    }
  };

  fetchNowPlaying();
  const interval = setInterval(fetchNowPlaying, 30000);
  return () => clearInterval(interval);
}, []);

  if (isLoading) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass rounded-2xl p-4 border border-border"
      >
        <div className="flex items-center gap-3">
          <div className="w-16 h-16 bg-secondary rounded-lg animate-pulse" />
          <div className="flex-1">
            <div className="h-4 bg-secondary rounded w-3/4 mb-2 animate-pulse" />
            <div className="h-3 bg-secondary rounded w-1/2 animate-pulse" />
          </div>
        </div>
      </motion.div>
    );
  }

  if (error || !track) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass rounded-2xl p-4 border border-border"
      >
        <div className="flex items-center gap-3 text-muted">
          <div className="w-16 h-16 bg-secondary rounded-3xl flex items-center justify-center">
            <SpotifyIcon size={24} />
          </div>
          <div className="flex-1">
            <p className="text-sm font-medium">Not Playing</p>
            <p className="text-xs">Spotify</p>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <AnimatePresence mode="wait">
      <motion.a
        key={track.songUrl}
        href={track.songUrl}
        target="_blank"
        rel="noopener noreferrer"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        whileHover={{ scale: 1.02 }}
        className="glass rounded-2xl p-4 border border-border hover:border-primary/50 transition-colors cursor-pointer block"
      >
        <div className="flex items-center gap-3">
          {/* Album Art */}
          <div className="relative w-16 h-16 flex-shrink-0 rounded-lg overflow-hidden">
            <Image
              src={track.albumImageUrl}
              alt={track.album}
              fill
              className="object-cover"
            />
            {track.isPlaying && (
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 1, repeat: Infinity }}
                  className="text-primary"
                >
                  <SpotifyIcon size={24} />
                </motion.div>
              </div>
            )}
          </div>

          {/* Track Info */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <p className="text-sm font-semibold text-foreground truncate">
                {track.title}
              </p>
              {track.isPlaying && (
                <motion.div
                  animate={{ opacity: [1, 0.5, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  className="flex-shrink-0"
                >
                  <div className="flex gap-0.5 items-end h-3">
                    <motion.div
                      animate={{ height: ['4px', '12px', '4px'] }}
                      transition={{ duration: 0.8, repeat: Infinity, delay: 0 }}
                      className="w-0.5 bg-primary rounded-full"
                    />
                    <motion.div
                      animate={{ height: ['8px', '4px', '8px'] }}
                      transition={{ duration: 0.8, repeat: Infinity, delay: 0.1 }}
                      className="w-0.5 bg-primary rounded-full"
                    />
                    <motion.div
                      animate={{ height: ['4px', '10px', '4px'] }}
                      transition={{ duration: 0.8, repeat: Infinity, delay: 0.2 }}
                      className="w-0.5 bg-primary rounded-full"
                    />
                  </div>
                </motion.div>
              )}
            </div>
            <p className="text-xs text-muted truncate">{track.artist}</p>
            <div className="flex items-center gap-1 mt-1">
              <SpotifyIcon size={12} className="text-primary flex-shrink-0" />
              <p className="text-xs text-muted truncate">
                {track.isPlaying ? 'Now Playing' : 'Last Played'}
              </p>
            </div>
          </div>
        </div>
      </motion.a>
    </AnimatePresence>
  );
}