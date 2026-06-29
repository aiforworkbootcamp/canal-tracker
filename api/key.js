export default function handler(req, res) {
  const key = process.env.AISSTREAM_KEY;
  if (!key) {
    return res.status(500).json({ error: 'API key not configured on server' });
  }
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Cache-Control', 'no-store');
  return res.status(200).json({ key });
}
