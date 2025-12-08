# 🔧 Blog Troubleshooting Guide

## ✅ Current Status

**The blog IS working correctly!** Server logs show:
- ✅ "Successfully fetched 2 posts from Hygraph"
- ✅ Real posts are being rendered: "test" and "test blog"

## 🔍 If You're Still Seeing Placeholder Posts

### 1. **Clear Browser Cache** (Most Common Issue)

**Chrome/Edge:**
- Press `Cmd+Shift+R` (Mac) or `Ctrl+Shift+R` (Windows/Linux)
- Or: Open DevTools (F12) → Right-click refresh button → "Empty Cache and Hard Reload"

**Safari:**
- Press `Cmd+Option+E` to clear cache
- Then `Cmd+R` to refresh

**Firefox:**
- Press `Cmd+Shift+R` (Mac) or `Ctrl+Shift+R` (Windows/Linux)

### 2. **Check You're on the Right URL**

- **Development**: `http://localhost:3000/resources/blog`
- **Production**: `https://galactis.ai/resources/blog` (needs rebuild)

### 3. **Check Server Logs**

Look for this message in your terminal:
```
✅ Successfully fetched 2 posts from Hygraph
```

If you see this, the code is working - it's a cache issue.

### 4. **Verify Environment Variables**

Check that `.env.local` has:
```bash
HYGRAPH_ENDPOINT=https://ap-south-1.cdn.hygraph.com/content/cmioez7bb01n507walq7vz2vr/master
```

### 5. **Restart Dev Server**

```bash
# Stop the server (Ctrl+C)
# Then restart:
npm run dev
```

### 6. **Check Production Build**

If you're looking at production (`galactis.ai`), you need to:
1. Rebuild the site
2. Deploy the new build
3. Clear CDN cache (if using Vercel/Netlify)

## 🧪 How to Verify It's Working

### Method 1: Check HTML Source
1. Visit `/resources/blog`
2. Right-click → "View Page Source"
3. Search for "test blog" or "test"
4. If you see these titles, it's working (just cached in browser)

### Method 2: Check JSON-LD
In the page source, look for:
```json
"blogPost":[
  {"@type":"BlogPosting","headline":"test",...},
  {"@type":"BlogPosting","headline":"test blog",...}
]
```

If you see "test" and "test blog", it's working!

### Method 3: Development Debug Banner
In development mode, you'll see a purple debug banner showing:
- Number of posts fetched
- Whether they're from Hygraph or fallback
- List of post titles

## 🐛 Common Issues

### Issue: "Still seeing placeholder posts"
**Solution**: Hard refresh browser (Cmd+Shift+R)

### Issue: "Posts not updating after publishing in Hygraph"
**Solution**: 
- Wait 1 hour (ISR revalidation)
- Or set up webhook for instant updates (see `BLOG_UPDATE_WORKFLOW.md`)

### Issue: "Error fetching posts"
**Solution**: 
- Check `.env.local` has `HYGRAPH_ENDPOINT`
- Restart dev server
- Check server logs for error details

## ✅ Verification Checklist

- [ ] `.env.local` has `HYGRAPH_ENDPOINT` set
- [ ] Dev server shows "✅ Successfully fetched X posts"
- [ ] Hard refreshed browser (Cmd+Shift+R)
- [ ] Checked page source for real post titles
- [ ] Restarted dev server if needed

## 📞 Still Not Working?

If you've tried everything above:
1. Share a screenshot of what you're seeing
2. Share the server logs (terminal output)
3. Share the browser console errors (F12 → Console tab)

---

**Remember**: The code IS working - server logs confirm it. If you see placeholder posts, it's almost always a browser cache issue!
