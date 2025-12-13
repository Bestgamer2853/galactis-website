# 🔄 Fix Cover Image CDN Cache Issue

## ✅ What You've Done Correctly

- ✅ Image is uploaded to Hygraph
- ✅ Image is linked in the Cover Image field
- ✅ Post is published (08 Dec 2025, 17:58)

## ❌ Current Problem

Even though everything looks correct in Hygraph Studio, the API is still returning an empty URL. This is likely a **CDN cache issue** or the asset needs to be republished.

---

## 🔧 Solutions to Try (In Order)

### Solution 1: Republish the Post Again

Sometimes Hygraph's CDN needs a fresh publish to update:

1. In the post editor, click **"Republish entry"** button (in the right sidebar under STAGES)
2. Wait a few seconds
3. Test the API again (see below)

### Solution 2: Republish the Asset Itself

The asset might need to be republished separately:

1. Go to **Assets** in the left sidebar
2. Find **"Screenshot (419).png"**
3. Open it
4. In the right sidebar, under **STAGES**, click **"Republish entry"**
5. Go back to your post and click **"Republish entry"** again
6. Wait 30-60 seconds for CDN to update

### Solution 3: Unlink and Re-link the Image

Sometimes the link gets corrupted:

1. In the post editor, click **"Replace Cover Image"**
2. Click **"Remove"** or clear the selection
3. Click **"Add Cover Image"** again
4. Select **"Screenshot (419).png"** from the asset picker
5. Click **"Publish"** (or "Republish entry")
6. Wait 30-60 seconds

### Solution 4: Wait for CDN Propagation

Hygraph's CDN can take 1-5 minutes to update:

1. Wait 2-3 minutes after republishing
2. Test the API again
3. If still empty, try Solutions 1-3 again

---

## 🧪 Test After Each Solution

Run this command to check if the URL is now populated:

```bash
curl -X POST "https://ap-south-1.cdn.hygraph.com/content/cmioez7bb01n507walq7vz2vr/master" \
  -H "Content-Type: application/json" \
  -d '{"query":"{ post(where: { slug: \"hdhfjndn\" }, stage: PUBLISHED) { title coverImage { url } } }"}'
```

**Expected result** (should NOT be empty):
```json
{
  "data": {
    "post": {
      "title": "test blog",
      "coverImage": {
        "url": "https://media.graphassets.com/xxxxx/xxxxx/Screenshot_419_.png"
      }
    }
  }
}
```

---

## 🔍 Verify Asset is Published

Check if the asset itself is published:

1. Go to **Assets** → Find "Screenshot (419).png"
2. Open it
3. In the right sidebar, check **STAGES**:
   - Should show **"Published"** with green checkmark
   - Should have **"LATEST"** tag
   - Should show a publication date

If it's NOT published:
1. Click **"Publish"** on the asset
2. Then go back to your post and **"Republish entry"**

---

## ⏱️ Timeline

After republishing:
- **Immediate**: Changes saved in Hygraph
- **30-60 seconds**: CDN starts updating
- **1-5 minutes**: CDN fully propagated
- **Your website**: Updates within 1 hour (ISR) or instantly with webhook

---

## 🎯 Recommended Action Plan

1. **First**: Click **"Republish entry"** on the post (right sidebar)
2. **Wait**: 1-2 minutes
3. **Test**: Run the API test command above
4. **If still empty**: Go to Assets → Republish the asset → Republish the post
5. **If still empty**: Unlink and re-link the image (Solution 3)

---

## 💡 Why This Happens

Hygraph uses a CDN (Content Delivery Network) to serve content. Sometimes:
- The CDN cache hasn't updated yet
- The asset publish state is out of sync with the post
- The link between asset and post needs to be refreshed

Republishing forces a fresh CDN update!

---

## ✅ Success Indicators

You'll know it's working when:
- API returns a URL starting with `https://media.graphassets.com/`
- URL is NOT an empty string
- Image appears on your website after refresh

Try Solution 1 first - it's the quickest fix! 🚀



