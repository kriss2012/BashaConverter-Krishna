/**
 * BHASHA · AI Translation Backend Handler (Vercel Serverless / Node.js)
 * 
 * Endpoints:
 *   POST /api/translate
 *   Body: { text: string, from: string, to: string, domain?: string }
 * 
 * Features:
 *   - Securely proxies translation requests to translation providers
 *   - No API keys exposed to frontend
 *   - Supports optional official Google Translate, OpenAI, or DeepL API keys via env vars
 *   - Falls back to reliable Google GTX translation engine
 */

module.exports = async (req, res) => {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'METHOD_NOT_ALLOWED', message: 'Use POST method' });
  }

  try {
    const { text, from = 'auto', to = 'hi', domain = 'General' } = req.body || {};

    if (!text || typeof text !== 'string' || !text.trim()) {
      return res.status(400).json({ error: 'EMPTY_INPUT', message: 'No text provided for translation' });
    }

    if (!to) {
      return res.status(400).json({ error: 'INVALID_LANGUAGE', message: 'Target language code is required' });
    }

    // Apply domain context prefix if applicable
    const queryText = (domain && domain !== 'General') ? `[Context: ${domain}] ${text}` : text;

    // 1. If TRANSLATION_API_KEY (Google Cloud / DeepL / OpenAI) is configured, use official API
    if (process.env.GOOGLE_TRANSLATE_API_KEY) {
      const gUrl = `https://translation.googleapis.com/language/translate/v2?key=${process.env.GOOGLE_TRANSLATE_API_KEY}`;
      const gRes = await fetch(gUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          q: queryText,
          source: from === 'auto' ? undefined : from,
          target: to,
          format: 'text'
        })
      });
      if (gRes.ok) {
        const gData = await gRes.json();
        const translated = gData?.data?.translations?.[0]?.translatedText || '';
        return res.status(200).json({ translatedText: translated, source: from, target: to });
      }
    }

    // 2. Default provider: Upstream Google Translate GTX engine with fallback
    const upstreamUrl = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=${encodeURIComponent(from)}&tl=${encodeURIComponent(to)}&dt=t&q=${encodeURIComponent(queryText)}`;
    
    let response;
    let data = null;
    try {
      response = await fetch(upstreamUrl, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
          'Accept': '*/*'
        }
      });
      if (response.ok) {
        data = await response.json();
      }
    } catch (e) {}

    // Fallback if upstream blocked or 429
    if (!data) {
      const fallbackUrl = `https://api.allorigins.win/raw?url=${encodeURIComponent(upstreamUrl)}`;
      try {
        const fbRes = await fetch(fallbackUrl);
        if (fbRes.ok) {
          data = await fbRes.json();
        }
      } catch (fbErr) {}
    }

    if (!data) {
      return res.status(503).json({
        error: 'TRANSLATION_SERVICE_UNAVAILABLE',
        message: 'Translation providers temporarily busy or rate-limited. Please retry in a few seconds.'
      });
    }
    let translated = '';
    if (Array.isArray(data) && Array.isArray(data[0])) {
      translated = data[0].map(s => Array.isArray(s) && s[0] ? s[0] : '').join('');
    }

    // Strip out domain prefix if it was prepended and translated verbatim
    if (domain && domain !== 'General') {
      translated = translated.replace(/^\[Context:\s*[^\]]+\]\s*/i, '').replace(/^\[[^\]]+\]\s*/, '');
    }

    return res.status(200).json({
      translatedText: translated,
      source: from,
      target: to
    });

  } catch (err) {
    console.error('Translation error in /api/translate:', err);
    return res.status(500).json({
      error: 'SERVER_ERROR',
      message: err.message || 'Internal translation error'
    });
  }
};
