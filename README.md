# AIToolsInsider

A self-running AI affiliate content site. Generate SEO articles with Claude, embed affiliate links, and earn passive income from display ads and commissions.

## Quick start (5 minutes)

### 1. Push to GitHub

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/aitoolsinsider.git
git push -u origin main
```

### 2. Deploy to Vercel (free)

1. Go to [vercel.com](https://vercel.com) and sign in with GitHub
2. Click "Add New Project" → import your repo
3. Leave all settings as default → click Deploy
4. Your site is live at `https://aitoolsinsider.vercel.app` (or your custom domain)

### 3. Get your Anthropic API key

1. Go to [console.anthropic.com](https://console.anthropic.com)
2. Create an account → API Keys → Create Key
3. Copy the key — you'll paste it into the Admin panel each session

### 4. Generate your first articles

1. Open `yourdomain.com/admin.html`
2. Paste your Anthropic API key
3. Enter a topic like "best AI tools for teachers"
4. Click Generate → review → Publish

Aim to publish **2–3 articles per week**.

## Making money

### Affiliate programs (sign up for all of these — free)

| Tool | Commission | Link |
|------|-----------|------|
| Jasper AI | 30% recurring | https://www.jasper.ai/affiliates |
| Notion | 50% first sale | https://www.notion.so/affiliates |
| Grammarly | $0.20–$20/signup | https://www.grammarly.com/affiliates |
| Copy.ai | 45% recurring | https://www.copy.ai/affiliate-program |
| Surfer SEO | 25% recurring | https://surferseo.com/affiliate/ |

After signing up, replace `[AFFILIATE_LINK_ToolName]` placeholders in generated articles with your real affiliate URLs.

### Google AdSense

1. Once you have 10+ articles, apply at [adsense.google.com](https://adsense.google.com)
2. Replace the `<!-- AdSense -->` placeholder comments in `index.html` and `article.html` with your real AdSense code

## Income projections

| Timeline | Estimated monthly |
|----------|------------------|
| 0–3 months | £0–£50 (building content) |
| 3–6 months | £50–£200 (SEO kicks in) |
| 6–12 months | £200–£800 (compounding) |
| 12–24 months | £500–£2,000 (50+ articles) |

## File structure

```
aitoolsinsider/
├── index.html        # Homepage with article grid
├── article.html      # Article detail page
├── admin.html        # Admin panel (generate & publish articles)
├── style.css         # All styles
├── articles.js       # Article data + localStorage persistence
├── render.js         # Shared rendering helpers
├── admin.js          # Article generation via Anthropic API
└── README.md
```

## Notes

- Articles are stored in the browser's `localStorage`. For a production site with a real database, consider migrating to a backend (Supabase free tier works great).
- Your Anthropic API key is never stored — you paste it each admin session.
- The site is 100% static HTML/CSS/JS — no server required, no ongoing costs.
