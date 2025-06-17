export default async function handler(req, res) {
  // Allow requests from any origin (or specify Netlify domain for stricter security)
  res.setHeader("Access-Control-Allow-Origin", "https://famous-bombolone-f964c6.netlify.app");
  res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  // Handle preflight request
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  const clientId = process.env.SPOTIFY_CLIENT_ID;
  const redirectUri = process.env.SPOTIFY_REDIRECT_URI;

  const scopes = [
    'user-library-read',
    'user-read-playback-state',
    'user-modify-playback-state',
    'streaming'
  ].join(' ');

  const authUrl = `https://accounts.spotify.com/authorize` +
    `?client_id=${clientId}` +
    `&response_type=token` +
    `&redirect_uri=${encodeURIComponent(redirectUri)}` +
    `&scope=${encodeURIComponent(scopes)}` +
    `&show_dialog=true`;

  res.status(200).json({ authUrl });
}
