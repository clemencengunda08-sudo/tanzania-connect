# Tanzania Reach — Cloudflare Configuration
# Last Updated: 2024-05-20

## Account Details
- Email: [YOUR_CLOUDFLARE_EMAIL]
- Plan: Free
- Zone ID: [FOUND_IN_DASHBOARD]

## Nameservers
Primary: aria.ns.cloudflare.com
Secondary: bob.ns.cloudflare.com

## WAF Rules Active
1. **Block AI Scrapers** ✅
   - Expression: `(http.user_agent contains "GPTBot") or (http.user_agent contains "ChatGPT-User") or (http.user_agent contains "CCBot") or (http.user_agent contains "anthropic-ai") or (http.user_agent contains "Claude-Web") or (http.user_agent contains "cohere-ai") or (http.user_agent contains "PerplexityBot") or (http.user_agent contains "Diffbot") or (http.user_agent contains "Bytespider") or (http.user_agent contains "Google-Extended")`
   - Action: BLOCK
2. **Block Script Scrapers** ✅
   - Expression: `(http.user_agent contains "python-requests") or (http.user_agent contains "scrapy") or (http.user_agent contains "curl") or (http.user_agent contains "wget") or (http.user_agent contains "libwww") or (http.user_agent contains "Go-http-client") or (http.user_agent contains "okhttp") or (http.user_agent contains "axios")`
   - Action: BLOCK
3. **Admin Route Protection** ✅
   - Expression: `(http.request.uri.path contains "/p-access") and not (ip.src in {YOUR_IP})`
   - Action: CHALLENGE (Turnstile)

## Rate Limiting Rules Active
1. **Global Limit**: 100 req/10s ✅
2. **Login Protection**: 5 req/min (POST only) ✅
3. **API Protection**: 30 req/min ✅
4. **Crawler Limit**: 10 req/min (Sitemap/Robots) ✅

## SSL Settings
- Mode: Full (Strict) ✅
- Always HTTPS: ON ✅
- TLS 1.3: ON ✅
- HSTS: 6 months ✅

## Speed Settings
- Auto Minify: ON ✅
- Brotli: ON ✅
- Polish: Lossless ✅
- WebP: ON ✅

## Security Settings
- Bot Fight Mode: ON ✅
- DDoS Protection: ON ✅
- Browser Integrity: ON ✅
- Security Level: Medium ✅