# Netlify Deployment Guide - Galactis.ai Website

Complete guide for deploying the Galactis.ai Next.js website to Netlify.

---

## 📋 Prerequisites

- GitHub repository with your code pushed
- Netlify account (free tier available)
- Node.js 18+ (specified in `.nvmrc` and `package.json`)

---

## 🚀 Quick Start Deployment

### Option A: Deploy via Netlify Dashboard (Recommended)

1. **Sign up/Login to Netlify:**
   - Go to [netlify.com](https://netlify.com)
   - Sign up with GitHub (easiest method)

2. **Import your repository:**
   - Click "Add new site" → "Import an existing project"
   - Select "Deploy with GitHub"
   - Authorize Netlify to access your repositories
   - Select `galactis-website` repository

3. **Configure build settings:**
   Netlify should auto-detect Next.js, but verify:
   - **Build command:** `npm run build`
   - **Publish directory:** `.next` (handled by plugin)
   - **Node version:** `18.20.4` (from `.nvmrc`)

4. **Install Netlify Next.js Plugin:**
   - In Netlify dashboard: Site Settings → Build & Deploy → Plugins
   - Click "Add plugin" → Search "Next.js"
   - Install `@netlify/plugin-nextjs`
   - OR: It's already in `package.json` as dev dependency (recommended)

5. **Set Environment Variables:**
   - Go to Site Settings → Environment Variables
   - Add required variables:
     ```
     HUBSPOT_PORTAL_ID=your_portal_id
     HUBSPOT_FORM_ID=your_form_id
     NEXT_PUBLIC_GA4_TRACKING_ID=your_ga_id (optional)
     NODE_ENV=production
     ```

6. **Deploy:**
   - Click "Deploy site"
   - Wait 3-5 minutes for build to complete
   - Your site will be live at `https://your-site-name.netlify.app`

### Option B: Deploy via Netlify CLI

1. **Install Netlify CLI:**
   ```bash
   npm install -g netlify-cli
   ```

2. **Login to Netlify:**
   ```bash
   netlify login
   ```

3. **Initialize Netlify in your project:**
   ```bash
   cd /Users/deiveeganaryan/galactis-website
   netlify init
   ```
   - Follow prompts to link to existing site or create new
   - Select build command: `npm run build`
   - Select publish directory: `.next` (plugin handles this)

4. **Set environment variables:**
   ```bash
   netlify env:set HUBSPOT_PORTAL_ID your_portal_id
   netlify env:set HUBSPOT_FORM_ID your_form_id
   netlify env:set NEXT_PUBLIC_GA4_TRACKING_ID your_ga_id
   ```

5. **Deploy:**
   ```bash
   netlify deploy
   ```
   For production:
   ```bash
   netlify deploy --prod
   ```

---

## ⚙️ Configuration Files

### 1. `netlify.toml`
Main Netlify configuration file (already created):
- Build command and environment
- Next.js plugin configuration
- Redirect and rewrite rules
- Security and performance headers
- Caching strategies

### 2. `.nvmrc`
Specifies Node.js version: `18.20.4`
- Ensures consistent Node version across deployments
- Matches `package.json` engines requirement

### 3. `next.config.ts`
Next.js configuration (updated for Netlify compatibility):
- Image optimization settings
- TypeScript configuration
- React strict mode
- Works on both Vercel and Netlify

### 4. `public/_headers`
Additional Netlify headers:
- Security headers (X-Frame-Options, CSP, etc.)
- Cache control for static assets
- Performance headers

---

## 🔧 Required Setup

### 1. Install Netlify Next.js Plugin

The plugin is already in `package.json` as a dev dependency. After cloning:

```bash
npm install
```

Or manually:
```bash
npm install -D @netlify/plugin-nextjs
```

**Why it's needed:**
- Handles Next.js 16 App Router properly
- Manages API routes as Netlify Functions
- Handles ISR (Incremental Static Regeneration)
- Optimizes builds for Netlify

### 2. Environment Variables

Set these in Netlify Dashboard → Site Settings → Environment Variables:

#### Required:
```
HUBSPOT_PORTAL_ID=your_hubspot_portal_id
HUBSPOT_FORM_ID=your_hubspot_form_id
```

#### Optional:
```
NEXT_PUBLIC_GA4_TRACKING_ID=your_google_analytics_id
NODE_ENV=production
```

#### For Different Environments:
You can set different variables for:
- Production
- Deploy Previews
- Branch Deploys

---

## 📦 Build Configuration

### Build Settings (Auto-detected from `netlify.toml`):

- **Build command:** `npm run build`
- **Publish directory:** `.next` (handled by plugin)
- **Node version:** `18.20.4` (from `.nvmrc`)
- **Base directory:** `./` (root)

### Build Plugins:

1. **@netlify/plugin-nextjs** (Required)
   - Automatically handles:
     - Next.js App Router
     - API routes → Netlify Functions
     - Image optimization
     - Static generation
     - Server-side rendering

---

## 🌐 Custom Domain Setup

1. **Add Domain in Netlify:**
   - Go to Site Settings → Domain Management
   - Click "Add custom domain"
   - Enter `galactis.ai` or your domain

2. **Configure DNS:**
   Netlify will provide DNS records:
   - **A Record:** Point to Netlify IP
   - **CNAME:** Point to Netlify subdomain
   - **Or use Netlify DNS:** Change nameservers

3. **SSL Certificate:**
   - Netlify automatically provisions Let's Encrypt SSL
   - HTTPS enabled by default
   - Force HTTPS in Site Settings → Domain Management

---

## 🔄 Continuous Deployment

Once connected to GitHub:
- **Every push to `main` branch** = Automatic production deployment
- **Pull requests** = Preview deployments (automatic)
- **Branch deploys** = Preview deployments for feature branches

### Branch Deploy Settings:
- **Production branch:** `main` (default)
- **Branch deploys:** Enabled (default)
- **Deploy previews:** Enabled (default)

---

## 📊 Performance Optimization

### Already Configured:

1. **Caching:**
   - Static assets: 1 year cache
   - Images: 1 day cache
   - Next.js static: Immutable cache

2. **Headers:**
   - Security headers (X-Frame-Options, CSP, etc.)
   - Performance headers (DNS prefetch)
   - Cache control headers

3. **Next.js Optimizations:**
   - Image optimization (AVIF, WebP)
   - Code splitting
   - Static generation where possible

### Additional Optimizations:

1. **Enable Netlify Image CDN:**
   - Site Settings → Build & Deploy → Post Processing
   - Enable "Asset optimization"
   - Enable "Image optimization"

2. **Enable Prerendering:**
   - Site Settings → Build & Deploy → Post Processing
   - Enable "Prerendering"

---

## 🐛 Troubleshooting

### Build Fails:

1. **Check Build Logs:**
   - Go to Deploys → Click on failed deploy
   - Review build logs for errors

2. **Common Issues:**
   - **Missing dependencies:** Ensure all deps are in `package.json`
   - **TypeScript errors:** Run `npm run type-check` locally
   - **Node version mismatch:** Check `.nvmrc` matches Netlify

3. **Test Build Locally:**
   ```bash
   npm run build
   ```

### API Routes Not Working:

1. **Verify Plugin Installed:**
   - Check Netlify dashboard: Plugins section
   - Ensure `@netlify/plugin-nextjs` is installed

2. **Check Function Logs:**
   - Netlify Dashboard → Functions
   - View logs for API route calls

3. **Verify Routes:**
   - API routes should work automatically with plugin
   - Check `/api/contact` works in deploy preview

### Environment Variables Not Working:

1. **Check Variable Names:**
   - Server-side: `process.env.HUBSPOT_PORTAL_ID`
   - Client-side: Must start with `NEXT_PUBLIC_`

2. **Redeploy After Adding:**
   - Environment variables require redeployment
   - Trigger new deploy after adding variables

3. **Check Scopes:**
   - Variables can be scoped to Production/Preview/Branch
   - Ensure correct scope selected

### Image Optimization Issues:

1. **Check Image Domains:**
   - `next.config.ts` has `remotePatterns: ["**"]`
   - Adjust if needed for specific domains

2. **Netlify Image CDN:**
   - Enable in Site Settings → Post Processing
   - Improves image delivery performance

### Rate Limiting Issues:

The contact form has in-memory rate limiting. For production:

**Consider upgrading to:**
- Redis for distributed rate limiting
- Netlify Edge Functions for edge-side rate limiting
- External rate limiting service

---

## 🔐 Security Best Practices

### Already Configured:

1. **Security Headers:**
   - X-Frame-Options: DENY
   - X-Content-Type-Options: nosniff
   - X-XSS-Protection enabled
   - Referrer-Policy: strict-origin-when-cross-origin

2. **Permissions Policy:**
   - Camera, microphone, geolocation disabled

### Additional Recommendations:

1. **Content Security Policy (CSP):**
   - Add custom CSP header if needed
   - Configure in `netlify.toml` or `_headers`

2. **Environment Variables:**
   - Never commit secrets to Git
   - Use Netlify environment variables
   - Use different values for production/preview

3. **HTTPS:**
   - Always enabled on Netlify
   - Force HTTPS redirect in Site Settings

---

## 📈 Monitoring & Analytics

### Available in Netlify Dashboard:

1. **Analytics:**
   - Site traffic
   - Bandwidth usage
   - Top pages
   - Geographic distribution

2. **Build Analytics:**
   - Build times
   - Build frequency
   - Build success rates

3. **Function Logs:**
   - API route logs
   - Error tracking
   - Performance metrics

### Google Analytics 4:

Already configured in the codebase:
- Set `NEXT_PUBLIC_GA4_TRACKING_ID` environment variable
- Analytics automatically initializes on page load

---

## 🔄 Migration from Vercel

If migrating from Vercel:

1. **No Code Changes Required:**
   - Configuration files already updated
   - Works on both platforms

2. **Environment Variables:**
   - Export from Vercel dashboard
   - Import to Netlify dashboard

3. **Custom Domain:**
   - Remove domain from Vercel
   - Add to Netlify (DNS updates needed)

4. **Deploy:**
   - Connect GitHub repo to Netlify
   - Set environment variables
   - Deploy!

---

## 📝 Checklist Before Deployment

- [ ] Code pushed to GitHub
- [ ] `@netlify/plugin-nextjs` in package.json
- [ ] `netlify.toml` configured
- [ ] `.nvmrc` specifies Node version
- [ ] Environment variables set in Netlify dashboard
- [ ] Build command: `npm run build`
- [ ] Test build locally: `npm run build`
- [ ] Type check passes: `npm run type-check`
- [ ] Lint passes: `npm run lint`

---

## 🎯 Post-Deployment Checklist

- [ ] Site loads at Netlify URL
- [ ] All pages accessible
- [ ] API routes working (`/api/contact`)
- [ ] Images loading correctly
- [ ] Forms submitting successfully
- [ ] Analytics tracking (if configured)
- [ ] Custom domain configured (if using)
- [ ] HTTPS enabled
- [ ] Security headers verified
- [ ] Mobile responsive
- [ ] Dark mode working
- [ ] Performance scores good (Lighthouse)

---

## 📚 Additional Resources

- [Netlify Next.js Plugin Docs](https://github.com/netlify/netlify-plugin-nextjs)
- [Netlify Documentation](https://docs.netlify.com/)
- [Next.js Deployment Guide](https://nextjs.org/docs/deployment)
- [Netlify Community Forums](https://answers.netlify.com/)

---

## 🆘 Support

If you encounter issues:

1. Check Netlify build logs
2. Review this guide's troubleshooting section
3. Check Netlify status: [status.netlify.com](https://status.netlify.com)
4. Contact Netlify support or community forums

---

**Last Updated:** After Netlify configuration setup

