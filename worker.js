/**
 * BHASHA · AI Translation Edge Worker (Cloudflare Workers)
 * 
 * Endpoints:
 *   POST /api/translate
 *   POST /api/transcribe (placeholder for edge whisper integration)
 */

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);

    // Handle CORS preflight
    if (request.method === 'OPTIONS') {
      return new Response(null, {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type, Authorization',
          'Access-Control-Max-Age': '86400',
        },
      });
    }

    const corsHeaders = {
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json',
    };

    if (url.pathname === '/api/translate' && request.method === 'POST') {
      try {
        const body = await request.json();
        const { text, from = 'auto', to = 'hi', domain = 'General' } = body || {};

        if (!text || !text.trim()) {
          return new Response(JSON.stringify({ error: 'EMPTY_INPUT', message: 'Text is required' }), {
            status: 400,
            headers: corsHeaders,
          });
        }

        const queryText = (domain && domain !== 'General') ? `[Context: ${domain}] ${text}` : text;
        const upstreamUrl = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=${encodeURIComponent(from)}&tl=${encodeURIComponent(to)}&dt=t&q=${encodeURIComponent(queryText)}`;

        const upstreamRes = await fetch(upstreamUrl, {
          headers: {
            'User-Agent': 'Mozilla/5.0 (Cloudflare-Worker)',
          },
        });

        if (!upstreamRes.ok) {
          return new Response(JSON.stringify({
            error: 'TRANSLATION_SERVICE_UNAVAILABLE',
            message: `Provider status ${upstreamRes.status}`
          }), { status: upstreamRes.status, headers: corsHeaders });
        }

        const data = await upstreamRes.json();
        let translated = '';
        if (Array.isArray(data) && Array.isArray(data[0])) {
          translated = data[0].map(s => Array.isArray(s) && s[0] ? s[0] : '').join('');
        }

        if (domain && domain !== 'General') {
          translated = translated.replace(/^\[Context:\s*[^\]]+\]\s*/i, '').replace(/^\[[^\]]+\]\s*/, '');
        }

        return new Response(JSON.stringify({
          translatedText: translated,
          source: from,
          target: to,
        }), { headers: corsHeaders });

      } catch (err) {
        return new Response(JSON.stringify({
          error: 'SERVER_ERROR',
          message: err.message
        }), { status: 500, headers: corsHeaders });
      }
    }

    return new Response(JSON.stringify({ message: 'BHASHA Edge API running' }), {
      headers: corsHeaders,
    });
  },
};
