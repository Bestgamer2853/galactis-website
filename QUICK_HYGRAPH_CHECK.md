# ⚡ Quick Hygraph Configuration Check

## 🎯 3 Critical Things to Verify in Hygraph

### 1. **Check Field Name** ⚠️ MOST IMPORTANT

Your code expects: `publishedDate`
But Hygraph might use: `publishedAt`

**How to check:**
1. Go to Hygraph Studio → **Schema** → **Post** model
2. Look for the date field
3. Check if it's named `publishedDate` or `publishedAt`

**If it's `publishedAt`:**
- The diagnostic endpoint (`/api/blog-diagnostic`) will detect this automatically
- It will show a recommendation to update the queries
- You can either:
  - **Option A**: Rename field in Hygraph to `publishedDate` (easier)
  - **Option B**: I can update the code to use `publishedAt`

---

### 2. **Verify API Permissions**

Go to: **Project Settings** → **API Access** → **Content API**

**Must have:**
- ✅ **Public Content API** enabled
- ✅ **Post** model: **Read** permission ✅
- ✅ **Asset** model: **Read** permission ✅ (if using images)

**How to check:**
- Look for a toggle or checkbox next to "Post" model
- Should show "Read" access enabled

---

### 3. **Ensure Posts Are Published**

Go to: **Content** → **Entries** → **Post**

**Check:**
- ✅ Posts show **"Published"** (green badge) in the Stages column
- ❌ NOT **"Draft"** (gray badge)

**To publish:**
1. Click on a post
2. Click **"Publish"** button (top right, green)
3. Confirm

---

## 🧪 Quick Test

Visit: `http://localhost:3000/api/blog-diagnostic`

**Good result:**
- `postsCount: 1` or more
- No errors
- Shows your post title

**Bad result:**
- `postsCount: 0` → Posts not published or API permissions issue
- Error about `publishedDate` → Field name mismatch (see #1 above)
- Error about permissions → API access not configured (see #2 above)

---

## 📋 Summary

**Most likely issues:**
1. ⚠️ Field name mismatch (`publishedDate` vs `publishedAt`) - **Check this first!**
2. ⚠️ Posts not published (still in Draft)
3. ⚠️ API permissions not set

**The diagnostic endpoint will tell you exactly which one!**

Visit `/api/blog-diagnostic` and it will show you what needs to be fixed.
