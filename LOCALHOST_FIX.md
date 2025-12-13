# 🔧 Localhost Not Working - Quick Fix Guide

## ✅ Good News!

Your Hygraph connection is **working correctly**! The API test shows:
- ✅ Endpoint is accessible
- ✅ Returns 1 published post: "example"
- ✅ `.env.local` is configured correctly

## 🚀 Start the Development Server

### Step 1: Navigate to Project Directory
```bash
cd /Users/deiveeganaryan/galactis-website
```

### Step 2: Start the Dev Server
```bash
npm run dev
```

You should see:
```
▲ Next.js 16.0.7
- Local:        http://localhost:3000
- Ready in X seconds
```

### Step 3: Open in Browser
Visit: **http://localhost:3000**

## 🧪 Test Hygraph Connection

### Option 1: Test Page
Visit: **http://localhost:3000/test-hygraph**

This page will show:
- ✅ Configuration status
- ✅ Number of posts found
- ✅ List of posts from Hygraph

### Option 2: Diagnostic Endpoint
Visit: **http://localhost:3000/api/blog-diagnostic**

Returns JSON with:
- Connection status
- Posts count
- Error messages (if any)
- Recommendations

### Option 3: Blog Page
Visit: **http://localhost:3000/resources/blog**

Should show your real posts from Hygraph (not placeholder posts).

## 🐛 Troubleshooting

### Issue: "Port 3000 already in use"

**Solution:**
```bash
# Kill process on port 3000
lsof -ti:3000 | xargs kill -9

# Or use a different port
npm run dev -- -p 3001
```

### Issue: "Cannot find module" or build errors

**Solution:**
```bash
# Clean install
rm -rf node_modules .next
npm install
npm run dev
```

### Issue: "Still seeing placeholder posts"

**Solution:**
1. **Check server logs** - Look for error messages
2. **Hard refresh browser** - `Cmd+Shift+R` (Mac) or `Ctrl+Shift+R` (Windows)
3. **Check `.env.local`** - Verify values are correct
4. **Restart server** - Stop (Ctrl+C) and restart `npm run dev`

### Issue: "Environment variables not loading"

**Solution:**
1. Ensure file is named `.env.local` (not `.env` or `.env.local.txt`)
2. Restart dev server after adding/editing `.env.local`
3. Check file is in project root (same directory as `package.json`)

## 📋 Quick Checklist

- [ ] `.env.local` exists in project root
- [ ] `HYGRAPH_ENDPOINT` is set correctly
- [ ] `HYGRAPH_TOKEN` is set (optional but recommended)
- [ ] Dev server is running (`npm run dev`)
- [ ] Browser shows `http://localhost:3000`
- [ ] Test page shows posts: `/test-hygraph`
- [ ] Blog page shows real posts: `/resources/blog`

## 🔍 Verify Configuration

Your `.env.local` should contain:
```bash
HYGRAPH_ENDPOINT=https://ap-south-1.cdn.hygraph.com/content/cmioez7bb01n507walq7vz2vr/master
HYGRAPH_TOKEN=eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6ImdjbXMtbWFpbi1wcm9kdWN0aW9uIn0...
```

## 📊 Expected Results

### Test Page (`/test-hygraph`)
- ✅ Endpoint: Configured
- ✅ Token: Configured (optional)
- ✅ Posts Found: 1 (or more)
- ✅ Shows post: "example"

### Blog Page (`/resources/blog`)
- ✅ Shows real posts from Hygraph
- ✅ No placeholder posts
- ✅ Each post has title, excerpt, date

### Diagnostic (`/api/blog-diagnostic`)
- ✅ `hygraphConfigured: true`
- ✅ `tokenConfigured: true`
- ✅ `postsCount: 1` (or more)

## 🎯 Next Steps After Fix

1. ✅ Localhost working
2. 📝 Create more blog posts in Hygraph Studio
3. 🔄 Posts appear automatically (ISR revalidates every hour)
4. 📈 Monitor SEO in Google Search Console

---

**Still having issues?** Check server logs for specific error messages and share them for further assistance.
