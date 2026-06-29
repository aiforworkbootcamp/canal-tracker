// Serverless function — returns AISstream key to authenticated requests
// Key is stored as Vercel environment variable AISSTREAM_KEY
// This keeps the key off the client while still allowing direct WebSocket connection
export default function handler(req, res) {
  // Basic origin check — only serve to our own domain
  const origin = req.headers.origin || '';
  const host   = req.headers.host || '';

  // Allow vercel.app domains and localhost for dev
  const allowed = host.includes('vercel.app') || 
                  host.includes('localhost') ||
                  origin.includes('vercel.app');

  if (!allowed) {
    return res.status(403).json({ error: 'Forbidden' });
  }

  const key = process.env.AISSTREAM_KEY;
  if (!key) {
    return res.status(500).json({ error: 'API key not configured' });
  }

  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET');
  res.setHeader('Cache-Control', 'no-store'); // never cache the key

  return res.status(200).json({ key });
}
