# 🎯 What to Do in Hygraph Now - Step by Step

## ✅ Try These Steps IN ORDER

### Step 1: Verify Asset is Published (Most Important)

1. **Go to Assets** (left sidebar in Hygraph Studio)
2. **Find your image** (the new one you uploaded - the panther image)
3. **Click on it** to open
4. **Check the right sidebar** under "STAGES":
   - Should show **"Published"** with green checkmark ✅
   - Should have **"LATEST"** tag
   - Should show a publication date
5. **If NOT published**:
   - Click **"Publish"** button
   - Wait for confirmation
   - Go back to your post

### Step 2: Verify Image is Linked in Post

1. **Go to Content** → **Post**
2. **Open "test blog"** post
3. **Scroll to "Cover Image" field**
4. **Verify**:
   - ✅ Image thumbnail is visible
   - ✅ Filename shows (should be the new image filename)
   - ✅ Green "Published" badge is visible on the image
5. **If image is NOT there or NOT published**:
   - Click **"Replace Cover Image"**
   - Select the new image from asset picker
   - Make sure it shows "Published" status
   - Click "Select"

### Step 3: Save and Republish (Critical)

1. **In the post editor**, click **"Save"** button (top right, blue button)
2. **Wait 5 seconds**
3. **Click "Publish"** dropdown (top right, green button)
4. **Select "Republish entry"** (or just click "Publish")
5. **Wait for confirmation** that it's published
6. **Wait 3-5 minutes** for CDN to sync

### Step 4: Check Schema Permissions

1. **Go to Schema** (left sidebar)
2. **Click on "Post" model**
3. **Find "Cover Image" field**
4. **Click on it** to see field settings
5. **Check**:
   - Field type should be **"Asset"**
   - Should allow **public read access**
6. **Go to "Asset" model** (in Schema)
7. **Check permissions**:
   - Should allow **public read** for published assets
   - If restricted, this could block URL access

### Step 5: Test API After Waiting

After completing Steps 1-4, **wait 3-5 minutes**, then test:

```bash
curl -X POST "https://ap-south-1.cdn.hygraph.com/content/cmioez7bb01n507walq7vz2vr/master" \
  -H "Content-Type: application/json" \
  -d '{"query":"{ post(where: { slug: \"hdhfjndn\" }, stage: PUBLISHED) { title coverImage { url } } }"}'
```

**Look for**: `"url": "https://media.graphassets.com/..."` (should NOT be empty)

---

## 🔍 If Still Not Working After All Steps

### Option A: Contact Hygraph Support

1. **Go to**: https://slack.hygraph.com
2. **Join their Slack community**
3. **Post in support channel** with:
   - Your project ID: `cmioez7bb01n507walq7vz2vr`
   - Issue: "Cover Image URL always returns empty string"
   - What you've tried: All steps above
   - Screenshot: Show that image is linked and published

### Option B: Check Hygraph Status

1. **Check**: https://status.hygraph.com
2. **Look for**: CDN or API issues in your region (ap-south-1)
3. **If there's an outage**: Wait for it to be resolved

### Option C: Try Different Approach

1. **Create a new test post** with a cover image
2. **See if the new post returns URL** (to rule out data corruption)
3. **If new post works**: The old post might have corrupted data
4. **If new post also fails**: Confirms it's a platform-wide issue

---

## 📋 Quick Checklist

Do these in order:

- [ ] **Step 1**: Asset is published (check Assets section)
- [ ] **Step 2**: Image is linked in Cover Image field
- [ ] **Step 3**: Post is saved AND republished
- [ ] **Step 4**: Wait 3-5 minutes
- [ ] **Step 5**: Test API - URL should NOT be empty
- [ ] **If still empty**: Contact Hygraph support

---

## ⚠️ Important Notes

1. **Save BEFORE Publish**: Sometimes you need to Save first, then Publish
2. **Wait for CDN**: Don't test immediately - wait 3-5 minutes after republishing
3. **Check Both**: Asset must be published AND linked to post
4. **Schema Permissions**: Make sure public read is enabled

---

## 🎯 Most Likely Fix

**Try Step 1 first** - Make sure the asset itself is published in the Assets section. This is the most common issue!

If the asset shows "Published" in Assets AND is linked in the post AND you've republished the post, then it's likely a Hygraph platform bug that needs their support team to fix.

---

## 💡 What to Tell Hygraph Support

If you need to contact them, say:

> "I have a blog post with a cover image that is:
> - Uploaded to Assets and Published ✅
> - Linked in the Cover Image field ✅  
> - Post is Published ✅
> 
> But the API always returns empty URL: `"coverImage": {"url": ""}`
> 
> Project: cmioez7bb01n507walq7vz2vr
> Region: ap-south-1
> Post slug: hdhfjndn
> 
> I've tried republishing multiple times and waiting 5+ minutes. This appears to be a CDN sync issue."

---

**Start with Step 1 - checking if the asset is published in the Assets section!** 🚀



