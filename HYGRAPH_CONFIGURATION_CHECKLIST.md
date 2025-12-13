# ✅ Hygraph Configuration Checklist

## 🔍 Critical Checks in Hygraph Studio

### 1. **Post Model Schema** (Most Important!)

Go to: **Schema** → **Post** model

**Required Fields:**
- ✅ `title` - Single line text (Required)
- ✅ `slug` - Slug field (Required, Unique, based on title)
- ✅ `excerpt` - Multi-line text (Required)
- ✅ `content` - Rich text (Required)
- ⚠️ **`publishedDate` OR `publishedAt`** - Date & time (Required)
  - **IMPORTANT**: Check which one your schema uses!
  - Query expects: `publishedDate`
  - Setup guide mentions: `publishedAt`
  - **If mismatch**: Update query in `lib/hygraph.ts` OR rename field in Hygraph

**Optional but Recommended:**
- `coverImage` - Asset (Image only)
- `category` - Single line text
- `tags` - Single line text (Allow multiple)
- `featured` - Boolean

---

### 2. **API Access Permissions** (Critical!)

Go to: **Project Settings** → **API Access** → **Content API**

**Check:**
- ✅ **Public Content API** is enabled
- ✅ **Post** model has **Read** permission enabled
- ✅ **Asset** model has **Read** permission enabled (for cover images)

**How to verify:**
1. Go to Project Settings → API Access
2. Under "Public Content API", ensure:
   - Post model: ✅ Read access
   - Asset model: ✅ Read access

---

### 3. **Content Stages** (Important!)

Go to: **Project Settings** → **Content Stages**

**Verify:**
- ✅ **Published** stage exists
- ✅ Posts are moved to **Published** stage (not Draft)

**How to check:**
1. Go to **Content** → **Entries** → **Post**
2. Check the "Stages" column
3. Posts should show "Published" (green) not "Draft"

---

### 4. **Permanent Auth Token Permissions**

Go to: **Project Settings** → **Permanent Auth Tokens** → **NextJS Blog Token**

**Verify:**
- ✅ Token exists and is active
- ✅ **Content Permissions** include:
  - Post model: ✅ Read (and optionally Create/Update/Delete)
  - Asset model: ✅ Read

**Default Stage:**
- Should be set to **Published** (for reading published content)

---

### 5. **Field Name Mismatch Check** ⚠️ CRITICAL

**The Issue:**
- Your GraphQL query uses: `publishedDate`
- Setup guide suggests: `publishedAt`
- Hygraph might use either one

**How to Check:**
1. Visit: `http://localhost:3000/api/blog-diagnostic`
2. Look for error messages about field names
3. If you see: `"Cannot query field 'publishedDate'"` → Your schema uses `publishedAt`
4. If you see: `"Cannot query field 'publishedAt'"` → Your schema uses `publishedDate`

**How to Fix:**
- **Option A**: Rename field in Hygraph to match query (`publishedDate`)
- **Option B**: Update query in `lib/hygraph.ts` to use `publishedAt`

---

### 6. **Cover Image Configuration**

Go to: **Schema** → **Post** → **Cover Image** field

**Recommended Settings:**
- ✅ **Reference Type**: One-way reference (not two-way)
- ✅ **Allow multiple assets**: Unchecked (single image)
- ✅ **Make field required**: Optional (but recommended)

**Why it matters:**
- Two-way references can cause API issues
- One-way is simpler and more reliable

---

### 7. **Verify Published Posts**

Go to: **Content** → **Entries** → **Post**

**Check:**
- ✅ At least one post exists
- ✅ Post is in **Published** stage (green badge)
- ✅ Post has all required fields filled:
  - Title ✅
  - Slug ✅
  - Excerpt ✅
  - Content ✅
  - Published Date ✅

**How to Publish:**
1. Open a post
2. Click **"Publish"** button (top right, green)
3. Confirm publication

---

## 🧪 Test Your Configuration

### Step 1: Use Diagnostic Endpoint
Visit: `http://localhost:3000/api/blog-diagnostic`

**Expected Result:**
```json
{
  "hygraphConfigured": true,
  "tokenConfigured": true,
  "endpoint": "https://ap-south-1.cdn.hygraph.com/...",
  "testResults": {
    "basicQuery": "✅ Success with publishedDate",
    "postsCount": 1,
    "samplePost": { "id": "...", "title": "example", ... }
  },
  "recommendations": []
}
```

**If you see errors:**
- Check the `error` field for specific issues
- Follow recommendations in the response

### Step 2: Test GraphQL Query Directly

In Hygraph Studio:
1. Go to **API Playground**
2. Run this query:
```graphql
{
  posts(stage: PUBLISHED, first: 5) {
    id
    title
    slug
    excerpt
    publishedDate
  }
}
```

**If it works**: Your schema is correct ✅
**If it fails**: Check error message:
- `"Cannot query field 'publishedDate'"` → Use `publishedAt` instead
- `"Cannot query field 'posts'"` → Check API permissions

---

## 🔧 Common Issues & Fixes

### Issue 1: Field Name Mismatch
**Symptom**: Query fails with "Cannot query field" error

**Fix:**
1. Check which field name your schema uses (`publishedDate` or `publishedAt`)
2. Update `lib/hygraph.ts` queries to match
3. Or rename field in Hygraph to match queries

### Issue 2: No Posts Returned
**Symptom**: `postsCount: 0` in diagnostic

**Fix:**
1. Check posts are in **Published** stage (not Draft)
2. Verify posts have all required fields
3. Check API permissions for Post model

### Issue 3: Cover Images Not Loading
**Symptom**: Posts load but images are missing

**Fix:**
1. Check Asset model has Read permission
2. Verify coverImage field is one-way reference
3. Re-link images in Hygraph Studio

### Issue 4: API Access Denied
**Symptom**: 401 or 403 errors

**Fix:**
1. Check Public Content API is enabled
2. Verify Post and Asset models have Read permission
3. Check token permissions (if using authenticated endpoint)

---

## ✅ Quick Verification Checklist

Before testing, verify:

- [ ] Post model exists in Schema
- [ ] Required fields are present (title, slug, excerpt, content, publishedDate/publishedAt)
- [ ] Public Content API is enabled
- [ ] Post model has Read permission
- [ ] Asset model has Read permission (if using images)
- [ ] At least one post is Published (not Draft)
- [ ] Field names match queries (`publishedDate` vs `publishedAt`)
- [ ] Token has correct permissions (if using authenticated access)
- [ ] Cover image field is one-way reference (if using images)

---

## 🎯 Most Likely Issues to Check

Based on common problems:

1. **Field name mismatch** (`publishedDate` vs `publishedAt`) - ⚠️ Most common
2. **Posts not published** (still in Draft stage) - ⚠️ Very common
3. **API permissions not set** (Post model not readable) - ⚠️ Common
4. **Token permissions** (if using authenticated endpoint) - ⚠️ Less common

---

## 📞 Next Steps

1. **Run diagnostic**: `/api/blog-diagnostic`
2. **Check Hygraph Studio** using this checklist
3. **Fix any mismatches** found
4. **Test again** with diagnostic endpoint
5. **Visit blog page** to verify posts appear

---

**Remember**: The diagnostic endpoint (`/api/blog-diagnostic`) will tell you exactly what's wrong if something isn't configured correctly!
