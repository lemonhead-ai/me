// app/api/spotify/currently-playing/route.ts
import { NextResponse } from 'next/server';

const client_id = process.env.SPOTIFY_CLIENT_ID;
const client_secret = process.env.SPOTIFY_CLIENT_SECRET;
const refresh_token = process.env.SPOTIFY_REFRESH_TOKEN;

const TOKEN_ENDPOINT = 'https://accounts.spotify.com/api/token';
const NOW_PLAYING_ENDPOINT = 'https://api.spotify.com/v1/me/player/currently-playing';

// Define Spotify types
interface SpotifyArtist {
  name: string;
}

interface SpotifyImage {
  url: string;
}

interface SpotifyAlbum {
  name: string;
  images: SpotifyImage[];
}

interface SpotifyTrack {
  name: string;
  external_urls: { spotify: string };
  artists: SpotifyArtist[];
  album: SpotifyAlbum;
  is_playing?: boolean;
}

interface SpotifyNowPlayingResponse {
  is_playing: boolean;
  item: SpotifyTrack | null;
}

async function getAccessToken() {
  if (!client_id || !client_secret || !refresh_token) {
    throw new Error('Missing Spotify credentials');
  }

  const basic = Buffer.from(`${client_id}:${client_secret}`).toString('base64');

  const response = await fetch(TOKEN_ENDPOINT, {
    method: 'POST',
    headers: {
      Authorization: `Basic ${basic}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      grant_type: 'refresh_token',
      refresh_token,
    }),
  });

  const data = await response.json();

  if (!response.ok) {
    console.error('Spotify Token Error:', data);
    throw new Error(`Token error: ${data.error}`);
  }

  return data as { access_token: string };
}

async function getNowPlaying() {
  const { access_token } = await getAccessToken();

  return fetch(NOW_PLAYING_ENDPOINT, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
    cache: 'no-store',
  });
}

export async function GET() {
  try {
    const response = await getNowPlaying();
    console.log('Now Playing Status:', response.status);

    if (response.status === 204 || response.status >= 400) {
      return new NextResponse(null, { status: 204 });
    }

    const song: SpotifyNowPlayingResponse = await response.json();

    if (!song?.item) {
      return new NextResponse(null, { status: 204 });
    }

    const isPlaying = song.is_playing;
    const title = song.item.name;
    const artist = song.item.artists.map((a) => a.name).join(', ');
    const album = song.item.album.name;
    const albumImageUrl = song.item.album.images[0]?.url;
    const songUrl = song.item.external_urls.spotify;

    return NextResponse.json({
      isPlaying,
      title,
      artist,
      album,
      albumImageUrl,
      songUrl,
    });
  } catch (error) {
  console.error('Spotify API Error:', (error as Error).message);
    return new NextResponse(null, { status: 500 });
  }
}

export const revalidate = 0;