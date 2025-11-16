# Deployment Guide: Galactis.ai Website

## Prerequisites
- GitHub account
- Vercel account (free tier available)
- Node.js 18+ installed locally (for testing)

## Step 1: Push to GitHub

### If you already have a GitHub repository:

1. **Check your current remote:**
   ```bash
   git remote -v
   ```

2. **If no remote exists, add your GitHub repository:**
   ```bash
   git remote add origin https://github.com/YOUR_USERNAME/galactis-website.git
   ```

3. **Stage all files:**
   ```bash
   git add .
   ```

4. **Commit your changes:**
   ```bash
   git commit -m "Initial commit: Galactis.ai website with animations and responsive design"
   ```

5. **Push to GitHub:**
   ```bash
   git push -u origin main
   ```

### If you need to create a new GitHub repository:

1. Go to [GitHub](https://github.com) and sign in
2. Click the "+" icon in the top right → "New repository"
3. Name it: `galactis-website`
4. Choose **Private** or **Public** (your choice)
5. **DO NOT** initialize with README, .gitignore, or license (you already have these)
6. Click "Create repository"
7. Then follow the commands GitHub shows you, or use:
   ```bash
   git remote add origin https://github.com/YOUR_USERNAME/galactis-website.git
   git branch -M main
   git push -u origin main
   ```

## Step 2: Deploy to Vercel

### Option A: Connect via Vercel Dashboard (Recommended)

1. **Sign up/Login to Vercel:**
   - Go to [vercel.com](https://vercel.com)
   - Sign up with your GitHub account (easiest method)

2. **Import your repository:**
   - Click "Add New..." → "Project"
   - Select your GitHub account
   - Find and select `galactis-website` repository
   - Click "Import"

3. **Configure your project:**
   - **Framework Preset:** Next.js (should auto-detect)
   - **Root Directory:** `./` (leave as default)
   - **Build Command:** `next build` (default)
   - **Output Directory:** `.next` (default)
   - **Install Command:** `npm install` (default)

4. **Environment Variables (if needed):**
   - If you have any `.env.local` variables, add them in Vercel dashboard:
     - Go to Project Settings → Environment Variables
     - Add any required variables (e.g., Google Analytics ID, API keys, etc.)

5. **Deploy:**
   - Click "Deploy"
   - Vercel will automatically build and deploy your site
   - Wait 2-3 minutes for the build to complete

6. **Custom Domain (Optional):**
   - After deployment, go to Project Settings → Domains
   - Add `galactis.ai` or your custom domain
   - Vercel will provide DNS instructions

### Option B: Deploy via Vercel CLI

1. **Install Vercel CLI:**
   ```bash
   npm i -g vercel
   ```

2. **Login to Vercel:**
   ```bash
   vercel login
   ```

3. **Deploy:**
   ```bash
   cd /Users/deiveeganaryan/galactis-website
   vercel
   ```

4. **Follow the prompts:**
   - Link to existing project or create new
   - Confirm settings
   - Deploy!

5. **For production deployment:**
   ```bash
   vercel --prod
   ```

## Step 3: Continuous Deployment

Once connected to Vercel:
- **Every push to `main` branch** = Automatic production deployment
- **Pull requests** = Preview deployments (automatic)
- **Deploy previews** = Test changes before merging

## Important Notes

### Before Deploying:

1. **Check Environment Variables:**
   - Make sure any `.env.local` variables are added in Vercel dashboard
   - Never commit `.env.local` to GitHub (it's in .gitignore)

2. **Build Locally First:**
   ```bash
   npm run build
   ```
   - This ensures there are no build errors before deploying

3. **SEO Configuration:**
   - Your `app/layout.tsx` already has metadata configured
   - Vercel automatically handles sitemap and robots.txt

4. **Analytics (Google Analytics 4):**
   - If you have `NEXT_PUBLIC_GA_ID`, add it in Vercel environment variables
   - Or update the GA4 code in `app/layout.tsx` with your tracking ID

### After Deployment:

1. **Verify Your Site:**
   - Visit the Vercel-provided URL (e.g., `galactis-website.vercel.app`)
   - Test all pages and functionality
   - Check mobile responsiveness

2. **Custom Domain Setup:**
   - Add your domain in Vercel dashboard
   - Update DNS records as instructed
   - Wait for DNS propagation (can take up to 48 hours, usually < 1 hour)

3. **Performance:**
   - Vercel automatically optimizes Next.js builds
   - Images are optimized via Next.js Image component
   - Static assets are CDN-cached

## Troubleshooting

### Build Fails:
- Check Vercel build logs for errors
- Run `npm run build` locally to debug
- Ensure all dependencies are in `package.json`

### Environment Variables Not Working:
- Make sure variables are prefixed with `NEXT_PUBLIC_` for client-side access
- Redeploy after adding new variables

### Domain Issues:
- Check DNS settings match Vercel's requirements
- Wait for DNS propagation
- Verify domain in Vercel dashboard shows "Valid Configuration"

## Support Resources

- [Vercel Documentation](https://vercel.com/docs)
- [Next.js Deployment](https://nextjs.org/docs/deployment)
- [Vercel Status](https://www.vercel-status.com)

