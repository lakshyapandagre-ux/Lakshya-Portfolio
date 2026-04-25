import type { VercelRequest, VercelResponse } from '@vercel/node'

const CLIENT_ID = process.env.SPOTIFY_CLIENT_ID!
const CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET!
const REFRESH_TOKEN = process.env.SPOTIFY_REFRESH_TOKEN!

const TOKEN_ENDPOINT = 'https://accounts.spotify.com/api/token'
const RECENTLY_PLAYED_ENDPOINT =
  'https://api.spotify.com/v1/me/player/recently-played?limit=1'
const NOW_PLAYING_ENDPOINT =
  'https://api.spotify.com/v1/me/player/currently-playing'

const getAccessToken = async (): Promise<string> => {
  const basic = Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString('base64')

  const res = await fetch(TOKEN_ENDPOINT, {
    method: 'POST',
    headers: {
      Authorization: `Basic ${basic}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      grant_type: 'refresh_token',
      refresh_token: REFRESH_TOKEN,
    }),
  })

  const data = await res.json()

  if (data.error) {
    throw new Error(`Spotify token error: ${data.error} — ${data.error_description}`)
  }

  return data.access_token
}

const ALLOWED_ORIGIN = process.env.ALLOWED_ORIGIN ?? '*'

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  res.setHeader('Access-Control-Allow-Origin', ALLOWED_ORIGIN)
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')

  if (req.method === 'OPTIONS') {
    return res.status(200).end()
  }

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const access_token = await getAccessToken()

    // First try currently playing
    const nowPlayingRes = await fetch(NOW_PLAYING_ENDPOINT, {
      headers: { Authorization: `Bearer ${access_token}` },
    })

    // 204 = nothing playing, 200 = something playing
    if (nowPlayingRes.status === 200) {
      const nowData = await nowPlayingRes.json()

      if (nowData?.is_playing && nowData?.item) {
        const track = nowData.item
        return res.status(200).json({
          isPlaying: true,
          title: track.name,
          artist: track.artists.map((a: { name: string }) => a.name).join(', '),
          album: track.album.name,
          albumArt: track.album.images[0]?.url ?? null,
          songUrl: track.external_urls.spotify,
          duration: track.duration_ms,
          progress: nowData.progress_ms,
        })
      }
    }

    // Fallback — recently played
    const recentRes = await fetch(RECENTLY_PLAYED_ENDPOINT, {
      headers: { Authorization: `Bearer ${access_token}` },
    })

    if (!recentRes.ok) {
      const errText = await recentRes.text()
      throw new Error(`Spotify Recently Played Error: ${recentRes.status} - ${errText}`)
    }

    const recentData = await recentRes.json()
    const track = recentData.items?.[0]?.track

    if (!track) {
      return res.status(200).json({
        isPlaying: false,
        title: null,
        artist: null,
        albumArt: null,
        songUrl: null,
      })
    }

    return res.status(200).json({
      isPlaying: false,
      title: track.name,
      artist: track.artists.map((a: { name: string }) => a.name).join(', '),
      album: track.album.name,
      albumArt: track.album.images[0]?.url ?? null,
      songUrl: track.external_urls.spotify,
      duration: track.duration_ms,
      progress: 0,
    })
  } catch (error) {
    console.error('[Spotify API Error]:', error)
    return res.status(200).json({
      isPlaying: false,
      title: null,
      artist: null,
      albumArt: null,
      songUrl: null,
    })
  }
}
