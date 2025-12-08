# 🖼️ Fix Cover Image Not Showing - Complete Guide

## ❌ Current Problem

The cover image is **NOT displaying** because Hygraph API returns an **empty URL**:
```json
"coverImage": {"url": ""}
```

Even though the image appears uploaded in Hygraph Studio, it's **not properly linked** to the blog post.

---

## ✅ Step-by-Step Fix in Hygraph

### Step 1: Open Your Blog Post

1. Go to **Hygraph Studio**: https://studio-ap-south-1.hygraph.com
2. Click **"Content"** in the left sidebar
3. Click **"Post"** to see all posts
4. Open the post you want to fix (e.g., "test blog")

### Step 2: Fix the Cover Image Field

**Option A: Re-link Existing Image (Recommended)**

1. In the post editor, find the **"Cover Image"** field
2. Click the **"Replace Cover Image"** button (or the image if one is shown)
3. In the asset picker, **select the image** you want to use
4. Make sure the image shows:
   - ✅ A thumbnail preview
   - ✅ The filename
   - ✅ A green **"Published"** badge
5. Click **"Select"** or **"Confirm"**

**Option B: Upload New Image**

1. Click **"Add Cover Image"** or **"Upload"**
2. Upload your image file
3. Wait for upload to complete
4. Make sure it shows **"Published"** status
5. Click **"Select"** to link it to the post

### Step 3: Publish the Post

**CRITICAL**: After linking the image, you **MUST** publish the post:

1. Click the **"Publish"** button (top right)
2. Confirm the publish action
3. Wait for confirmation that it's published

### Step 4: Verify the Image URL

After publishing, the API should return a URL like:
```
https://media.graphassets.com/xxxxx/xxxxx/image-name.png
```

**NOT** an empty string `""`

---

## 🔍 How to Verify It's Fixed

### Method 1: Check in Hygraph Studio

1. Open your post
2. The Cover Image field should show:
   - ✅ Image thumbnail
   - ✅ Filename
   - ✅ "Published" status
   - ✅ Clickable to view full image

### Method 2: Test the API

Run this command to check if the URL is now populated:

```bash
curl -X POST "https://ap-south-1.cdn.hygraph.com/content/cmioez7bb01n507walq7vz2vr/master" \
  -H "Content-Type: application/json" \
  -d '{"query":"{ post(where: { slug: \"YOUR_SLUG\" }, stage: PUBLISHED) { title coverImage { url } } }"}'
```

Replace `YOUR_SLUG` with your post slug (e.g., `hdhfjndn`).

**Expected result:**
```json
{
  "data": {
    "post": {
      "title": "test blog",
      "coverImage": {
        "url": "https://media.graphassets.com/xxxxx/xxxxx/image.png"
      }
    }
  }
}
```

### Method 3: Check Your Website

1. Visit your blog post page
2. The cover image should appear between the header and article content
3. If still not showing, wait 1 hour (ISR revalidation) or rebuild

---

## 🐛 Common Issues

### Issue: "Image is uploaded but URL is still empty"

**Cause**: Image is uploaded but not linked to the post field.

**Solution**: 
1. Go to the post editor
2. Click "Replace Cover Image"
3. Select the uploaded image from the asset picker
4. **Publish the post again**

### Issue: "Image shows in Hygraph but not on website"

**Possible causes:**
1. **Not published**: Make sure both the image AND the post are published
2. **Cache**: Wait 1 hour for ISR, or rebuild the site
3. **Wrong field**: Make sure you're using the "Cover Image" field (not a custom field)

### Issue: "Image URL exists but image doesn't load"

**Possible causes:**
1. **CORS**: Image domain might need to be added to `next.config.ts`
2. **Broken URL**: Check if the URL is accessible in a browser
3. **Image format**: Make sure it's a supported format (JPG, PNG, WebP)

---

## 📝 Quick Checklist

- [ ] Image is uploaded to Hygraph Assets
- [ ] Image shows "Published" status in Assets
- [ ] Image is selected in the post's "Cover Image" field
- [ ] Post is published (not just saved as draft)
- [ ] API returns a non-empty URL
- [ ] Website has been rebuilt or waited 1 hour

---

## 🚀 After Fixing

Once the image URL is populated:

1. **Development**: Hard refresh (`Cmd+Shift+R`)
2. **Production**: Wait 1 hour for ISR, or trigger a rebuild
3. **Instant update**: Set up webhook (see `BLOG_UPDATE_WORKFLOW.md`)

The image will appear automatically once the URL is correctly returned from Hygraph!

---

## 💡 Pro Tip

If you're still having issues after following these steps:

1. **Check browser console** (F12) for any image loading errors
2. **Check server logs** for GraphQL query errors
3. **Verify the image URL** works by opening it directly in a browser
4. **Try a different image** to rule out file corruption

The code is working correctly - the issue is that Hygraph needs the image to be properly linked and the post to be republished!
