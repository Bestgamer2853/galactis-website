# 🔗 Link Cover Image to Blog Post - Step by Step

## ❌ Current Issue

Even though:
- ✅ Your post "test blog" is **Published**
- ✅ Your asset "Screenshot (419).png" is **Published**

The cover image **still doesn't appear** because the asset is **not linked** to the post's Cover Image field.

---

## ✅ Fix: Link the Asset to the Post

### Step 1: Open Your Blog Post Editor

1. In Hygraph Studio, go to **Content** → **Post**
2. Click on **"test blog"** to open the post editor

### Step 2: Find the Cover Image Field

1. Scroll down in the post editor
2. Look for the **"Cover Image"** field
3. You'll see one of these:
   - An empty field with "Add Cover Image" or "Upload" button
   - OR an image placeholder that might be empty

### Step 3: Link the Published Asset

**Option A: If Cover Image field is empty:**

1. Click **"Add Cover Image"** or **"Select Asset"** button
2. In the asset picker that opens:
   - You should see "Screenshot (419).png" in the list
   - Click on it to select it
3. The image should now appear in the Cover Image field
4. Make sure it shows:
   - ✅ Image thumbnail
   - ✅ Filename: "Screenshot (419).png"
   - ✅ Green "Published" badge

**Option B: If there's already something in Cover Image field:**

1. Click **"Replace Cover Image"** button
2. In the asset picker, select **"Screenshot (419).png"**
3. Confirm the selection

### Step 4: Publish the Post Again

**CRITICAL**: After linking the image, you **MUST** republish:

1. Click the **"Publish"** button (top right)
2. Confirm the publish action
3. Wait for the green "Published" confirmation

---

## 🔍 Verify It's Linked

After republishing, the Cover Image field should show:
- ✅ The image thumbnail
- ✅ The filename "Screenshot (419).png"
- ✅ A green "Published" badge
- ✅ The image is clickable/viewable

---

## 🧪 Test the API

After republishing, run this to verify the URL is now populated:

```bash
curl -X POST "https://ap-south-1.cdn.hygraph.com/content/cmioez7bb01n507walq7vz2vr/master" \
  -H "Content-Type: application/json" \
  -d '{"query":"{ post(where: { slug: \"hdhfjndn\" }, stage: PUBLISHED) { title coverImage { url } } }"}'
```

**Expected result** (URL should NOT be empty):
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

**If URL is still empty** (`"url": ""`), the image is still not properly linked.

---

## ⚠️ Common Mistakes

### Mistake 1: Only Publishing the Asset
- ❌ Publishing the asset alone doesn't link it
- ✅ You must **select the asset** in the post's Cover Image field

### Mistake 2: Saving but Not Publishing
- ❌ Just saving the post doesn't update the API
- ✅ You must click **"Publish"** after linking

### Mistake 3: Using Wrong Field
- ❌ Don't add the image to content or other fields
- ✅ Use the **"Cover Image"** field specifically

---

## 📝 Quick Checklist

- [ ] Opened "test blog" post editor
- [ ] Found "Cover Image" field
- [ ] Clicked "Add/Replace Cover Image"
- [ ] Selected "Screenshot (419).png" from asset picker
- [ ] Image thumbnail appears in Cover Image field
- [ ] Clicked "Publish" button
- [ ] Post shows "Published" status
- [ ] API returns non-empty URL (test with curl above)

---

## 🚀 After Linking

Once the URL is populated:

1. **Development**: Hard refresh browser (`Cmd+Shift+R`)
2. **Production**: Wait 1 hour for ISR, or rebuild site
3. **Image will appear** between the post header and content!

---

## 💡 Why This Happens

In Hygraph, there are **two separate steps**:
1. **Upload & Publish Asset** ← You've done this ✅
2. **Link Asset to Post Field** ← This is what's missing ❌

Both must be done for the image to appear on your website!
