# 🔧 Fix Cover Image Display - Step by Step Guide

## ❌ Current Problem

**The cover image is NOT being displayed** because:
- ✅ Image is uploaded in Hygraph ("Screenshot (419).png")
- ✅ Image shows as "Published" in Hygraph
- ❌ **But the image URL is EMPTY** when fetched via API
- ❌ No image tag is rendered on the website

---

## ✅ What You Need to Do

### Step 1: Fix the Image Link in Hygraph

The image is uploaded but **not properly linked** to the blog post. Here's how to fix it:

1. **Go to Hygraph Studio**: https://studio-ap-south-1.hygraph.com
2. **Open your blog post**: "test blog"
3. **In the "Cover Image" field**:
   - Click **"Replace Cover Image"** button
   - **Select the existing image** ("Screenshot (419).png") from the asset picker
   - OR **Re-upload** the image if needed
4. **Make sure**:
   - The image shows a **green "Published"** tag
   - The image thumbnail is visible
   - The filename is shown
5. **Click "Publish"** button (top right) to save the post

### Step 2: Verify the Image URL

After republishing, the image URL should look like:
```
https://media.graphassets.com/xxxxx/xxxxx/Screenshot_419_.png
```

**NOT** an empty string `""`

### Step 3: Refresh Your Website

- **Development**: Hard refresh your browser (Cmd+Shift+R or Ctrl+Shift+R)
- **Production**: Wait ~1 hour for ISR revalidation, or rebuild

---

## 📍 Where the Image Will Appear

Once fixed, the cover image will display:

```
┌─────────────────────────────────┐
│  [Blog Post Title]               │
│  [Excerpt]                       │
│  [Date] • [Read Time]            │
├─────────────────────────────────┤
│  ⬇️ COVER IMAGE APPEARS HERE ⬇️  │
│  [Full-width image]              │
│  [Rounded corners, shadow]       │
├─────────────────────────────────┤
│  [Article Content]                │
└─────────────────────────────────┘
```

**Position**: Between the header (title/date) and the article content

---

## 🔍 How to Verify It's Working

### Method 1: Check in Browser
1. Go to: `http://localhost:3000/resources/blog/hdhfjndn`
2. Look **between** the date/read time and "welcome to galactis"
3. You should see the full-width cover image

### Method 2: Check HTML Source
1. Right-click → "View Page Source"
2. Search for: `alt="test blog"`
3. You should find: `<img src="https://media.graphassets.com/..." alt="test blog">`

### Method 3: Test API Directly
```bash
# This should return a valid URL (not empty)
curl "https://ap-south-1.cdn.hygraph.com/content/cmioez7bb01n507walq7vz2vr/master" \
  -H "Content-Type: application/json" \
  -d '{"query":"{ post(where: { slug: \"hdhfjndn\" }, stage: PUBLISHED) { coverImage { url } } }"}'
```

---

## ⚠️ Common Issues & Solutions

### Issue 1: Image URL Still Empty After Republishing
**Solution**:
- Go to **Assets** in Hygraph (left sidebar)
- Find "Screenshot (419).png"
- Make sure it's **Published** (green tag)
- If not, click "Publish" on the asset itself
- Then go back to your blog post and re-link it

### Issue 2: Image Shows in Hygraph but Not on Website
**Solution**:
- Clear your browser cache
- Hard refresh (Cmd+Shift+R)
- Check browser console for image loading errors
- Verify the image URL is accessible (try opening it directly)

### Issue 3: Image is Broken/404
**Solution**:
- The image might have been deleted or moved
- Re-upload the image in Hygraph
- Re-link it to your blog post
- Republish

---

## ✅ Current Status

- ✅ **Code is ready**: Image display code is implemented
- ✅ **Location is correct**: Between header and content
- ✅ **Image optimization**: Configured in next.config.ts
- ❌ **Image URL is empty**: Need to fix in Hygraph

---

## 🎯 Quick Checklist

- [ ] Open blog post in Hygraph
- [ ] Click "Replace Cover Image"
- [ ] Select/re-upload the image
- [ ] Verify image shows "Published" status
- [ ] Click "Publish" on the blog post
- [ ] Refresh your browser
- [ ] Image should now appear!

---

## 📝 Summary

**The problem**: Image URL is empty from Hygraph API
**The solution**: Re-link the cover image in Hygraph and republish
**The result**: Image will appear between the header and article content

Once you fix the image link in Hygraph, it will automatically appear on your website! 🖼️



