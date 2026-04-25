const client_id = process.env.SPOTIFY_CLIENT_ID;
const client_secret = process.env.SPOTIFY_CLIENT_SECRET;
const refresh_token = process.env.SPOTIFY_REFRESH_TOKEN;

// Create Base64 token for initial authentication
const basic = Buffer.from(`${client_id}:${client_secret}`).toString('base64');

const TOKEN_ENDPOINT = `https://accounts.spotify.com/api/token`;
const NOW_PLAYING_ENDPOINT = `https://api.spotify.com/v1/me/player/currently-playing`;
const RECENTLY_PLAYED_ENDPOINT = `https://api.spotify.com/v1/me/player/recently-played?limit=1`;

// Helper to get a fresh access token
const getAccessToken = async () => {
  const response = await fetch(TOKEN_ENDPOINT, {
    method: 'POST',
    headers: {
      Authorization: `Basic ${basic}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      grant_type: 'refresh_token',
      refresh_token: refresh_token,
    }).toString(),
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch access token: ${response.statusText}`);
  }

  return response.json();
};

export default async function handler(req, res) {
  try {
    const { access_token } = await getAccessToken();

    // 1. Check currently playing song
    const nowPlayingResponse = await fetch(NOW_PLAYING_ENDPOINT, {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });

    // 204 means nothing is currently playing
    if (nowPlayingResponse.status === 204 || nowPlayingResponse.status > 400) {
      
      // 2. Fallback: fetch recently played
      const recentlyPlayedResponse = await fetch(RECENTLY_PLAYED_ENDPOINT, {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      });

      if (!recentlyPlayedResponse.ok) {
        return res.status(200).json({ isPlaying: false });
      }

      const recentData = await recentlyPlayedResponse.json();
      const track = recentData.items[0]?.track;

      if (!track) {
        return res.status(200).json({ isPlaying: false });
      }

      // Return recently played
      return res.status(200).json({
        isPlaying: false,
        title: track.name,
        artist: track.artists.map((_artist) => _artist.name).join(', '),
        albumImage: track.album.images[0]?.url,
        songUrl: track.external_urls?.spotify,
      });
    }

    const song = await nowPlayingResponse.json();

    // Catch podcasts or unsupported media types where 'item' is null
    if (!song.item) {
      return res.status(200).json({ isPlaying: false });
    }

    // Return currently playing
    return res.status(200).json({
      isPlaying: song.is_playing,
      title: song.item.name,
      artist: song.item.artists.map((_artist) => _artist.name).join(', '),
      albumImage: song.item.album.images[0]?.url,
      songUrl: song.item.external_urls?.spotify,
    });

  } catch (error) {
    console.error('Spotify API Error:', error);
    return res.status(500).json({ error: 'Failed to fetch Spotify data' });
  }
}
