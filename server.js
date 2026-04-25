import express from 'express';
import nodemailer from 'nodemailer';
import cors from 'cors';
import dotenv from 'dotenv';
// import spotifyHandler from './api/spotify.js';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Local implementation of Spotify API for dev testing
app.get("/spotify", async (req, res) => {
  try {
    const basic = Buffer.from(`${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`).toString('base64');
    const tokenRes = await fetch('https://accounts.spotify.com/api/token', {
      method: 'POST',
      headers: {
        Authorization: `Basic ${basic}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        grant_type: 'refresh_token',
        refresh_token: process.env.SPOTIFY_REFRESH_TOKEN,
      }),
    });
    
    const data = await tokenRes.json();
    console.log('[Spotify Token Response]:', JSON.stringify(data));
    
    if (data.error) {
      return res.status(200).json({ error: `Spotify token error: ${data.error} — ${data.error_description}` });
    }

    const access_token = data.access_token;
    
    // First try currently playing
    const nowPlayingRes = await fetch('https://api.spotify.com/v1/me/player/currently-playing', {
      headers: { Authorization: `Bearer ${access_token}` },
    });

    if (nowPlayingRes.status === 200) {
      const nowData = await nowPlayingRes.json();
      if (nowData?.is_playing && nowData?.item) {
        const track = nowData.item;
        return res.status(200).json({
          isPlaying: true,
          title: track.name,
          artist: track.artists.map(a => a.name).join(', '),
          albumArt: track.album.images[0]?.url || null,
          songUrl: track.external_urls.spotify,
        });
      }
    }

    // Fallback — recently played
    const recentRes = await fetch('https://api.spotify.com/v1/me/player/recently-played?limit=1', {
      headers: { Authorization: `Bearer ${access_token}` },
    });

    if (!recentRes.ok) {
      const errText = await recentRes.text();
      throw new Error(`Spotify Recently Played Error: ${recentRes.status} - ${errText}`);
    }

    const recentData = await recentRes.json();
    const track = recentData.items?.[0]?.track;

    if (!track) return res.status(200).json({ isPlaying: false });

    return res.status(200).json({
      isPlaying: false,
      title: track.name,
      artist: track.artists.map(a => a.name).join(', '),
      albumArt: track.album.images[0]?.url || null,
      songUrl: track.external_urls.spotify,
    });
  } catch (error) {
    console.error('[Spotify API Full Error]:', error);
    res.status(200).json({ isPlaying: false, error: String(error) });
  }
});

app.post("/send", async (req, res) => {
  const { name, email, message } = req.body;

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER,
      subject: `New message from ${name}`,
      replyTo: email,
      text: `
Name: ${name}
Email: ${email}

Message:
${message}
      `,
    });

    res.status(200).send("Email sent");
  } catch (error) {
    console.error(error);
    res.status(500).send("Error sending email");
  }
});

app.listen(5000, () => console.log("Server running on port 5000"));
