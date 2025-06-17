// server.js
const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Replace with your Spotify Developer credentials
const client_id = '3811264715a54d1899ccc40bce83503e';
const client_secret = 'ec37b26a5db24a978d5376041db65cf8';
const redirect_uri = 'https://your-frontend-domain.com/callback'; // must match Spotify app

// POST /auth
app.post('/auth', async (req, res) => {
  const { code } = req.body;
  try {
    const tokenResponse = await axios.post(
      'https://accounts.spotify.com/api/token',
      new URLSearchParams({
        grant_type: 'authorization_code',
        code,
        redirect_uri,
        client_id,
        client_secret
      }).toString(),
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }
    );
    res.json(tokenResponse.data);
  } catch (error) {
    console.error(error.response?.data || error.message);
    res.status(500).json({ error: 'Failed to authenticate with Spotify' });
  }
});

app.listen(3001, () => {
  console.log('Spotify proxy-auth bridge running on http://localhost:3001');
});
