# Tanzania Reach — Pre-Launch Checklist

## 🔧 Technical
- [ ] `npm run build` passes with zero errors
- [ ] All TypeScript errors resolved
- [ ] All ESLint warnings resolved
- [ ] No console.log statements in code
- [ ] All images using next/image with correct optimization
- [ ] All routes have loading.tsx and error.tsx
- [ ] All forms have client-side and server-side validation
- [ ] Environment variables configured in Vercel/Firebase

## 🎨 Design & UI
- [ ] All sectors (13+) have verified expert content
- [ ] All images have descriptive alt text for accessibility
- [ ] Color contrast meets WCAG AA standards
- [ ] Dark mode tested on all pages
- [ ] Animations are smooth (60fps) and respect reduced motion settings
- [ ] Mobile navigation (Bottom Bar + FAB) works perfectly

## 🔍 SEO & Analytics
- [ ] Sitemap.xml generated and verified with Firestore data
- [ ] robots.txt configured to block unwanted AI scrapers
- [ ] Unique meta titles and descriptions for every sector
- [ ] JSON-LD Structured Data active on all articles
- [ ] OpenGraph images working for social sharing
- [ ] Cloudflare Analytics and Google Search Console linked

## 🛡️ Security
- [ ] HTTPS enforced across all routes
- [ ] Cloudflare WAF rules active and tested
- [ ] Firestore Security Rules deployed and verified
- [ ] Firebase Storage Rules protecting private documents
- [ ] Admin routes (/p-access) protected by 90s inactivity session

## 🚀 Deployment
- [ ] Vercel deployment successful on custom domain
- [ ] SSL certificate active
- [ ] DNS records (A and CNAME) correctly pointed via Cloudflare
- [ ] All third-party APIs (Gemini, N8N) connected and tested

## 📣 Marketing
- [ ] Launch announcement templates ready
- [ ] WhatsApp/Telegram groups identified for promotion
- [ ] LinkedIn professional post drafted
- [ ] Contact email (privacy@tanzaniareach.com) active