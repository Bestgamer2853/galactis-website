# 🔐 Hygraph Token Setup Guide

## ✅ Your Token is Ready!

You have a **NextJS Blog Token** configured in Hygraph Studio. Here's how to add it to your project.

## 📝 Step 1: Add Token to Environment Variables

### For Local Development

Create or update `.env.local` in your project root:

```bash
# Hygraph Content API Endpoint (CDN - for published content)
HYGRAPH_ENDPOINT=https://ap-south-1.cdn.hygraph.com/content/cmioez7bb01n507walq7vz2vr/master

# Hygraph Permanent Auth Token (for authenticated access)
HYGRAPH_TOKEN=eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6ImdjbXMtbWFpbi1wcm9kdWN0aW9uIn0.eyJ2ZXJzaW9uIjozLCJpYXQiOjE3NjQ5NTk2MDMsImF1ZCI6WyJodHRwczovL2FwaS1hcC1zb3V0aC0xLmh5Z3JhcGguY29tL3YyL2NtaW9lejdiYjAxbjUwN3dhbHE3dnoydnIvbWFzdGVyIiwibWFuYWdlbWVudC1uZXh0LmdyYXBoY21zLmNvbSJdLCJpc3MiOiJodHRwczovL21hbmFnZW1lbnQtYXAtc291dGgtMS5oeWdyYXBoLmNvbS8iLCJzdWIiOiJiYzhhYTRmZi0wMjVmLTQ4ODQtODYxZS04NmMyMzU3M2FmNGUiLCJqdGkiOiJjbWl0N2RtNzQwZnY2MDdwamE4eHI2ZWYxIn0.yta_gQlB7PsRJEZ_iltcq16twZZfL66Mq_-c6NNWSnVJ8ECWakY4YvBOMXBOEub_yqF8ld2nB6BW7_07jVkW8SgmGE1PXCsvEKXvwvUJRoOd1m4Cx_1k6R8aTk-uIOQXUqA2dYvliLZzpFKUnXj7aHQp9S3agiQTUJJKg-7Jt_J2j_xYHzKEm1OnPuMFRatyKi3x5CObly9yXExrr9bi8YUjKRjXJRLRnEmQ8-_VXFXae4fv-gCv9Y7EfUa31UtvfjAUK__DTUmk8uXFWN07Y-clUEo5N_sj6ELi9n1JfZFXJb62XkxYcrYPhPY-NkmnqJcWLsYOvp__FAfZbXPCbO8Ndh5kPFOfp6qpOk_DGO1mSgGOe9nbbIJsSnZ0KlugjBJPhjh9oQMzBR5jv2gS_Ru_synmb1NpS37oTaePAjVRyhE_6MN0eGNAqWTEFrj26hWvuB7UsM04eEwU1rELMrmhykRbx1NSYXLPxUgiUL1KHd2stZuG5mAoHhgf8mJFR4lZkDDnPwtRINPrs_R69fK-7O4kZz4jxbe1m02Et_iKmBp5eC30Ui32KMVSrzkeHrUAMMEJQE2w7I69VbnGO5e2UZRKENDVglilz1l55cCGOcmHno20bUXDi9CTGHNNgMEbJv7vSzfIEs9T6FKVJHC00x7EbddWpfh7Mpy8R5s
```

### For Production (Vercel/Netlify)

#### Vercel
1. Go to your project in Vercel Dashboard
2. Navigate to **Settings** → **Environment Variables**
3. Add:
   - `HYGRAPH_ENDPOINT` = `https://ap-south-1.cdn.hygraph.com/content/cmioez7bb01n507walq7vz2vr/master`
   - `HYGRAPH_TOKEN` = `[your token from above]`
4. Redeploy your site

#### Netlify
1. Go to your site in Netlify Dashboard
2. Navigate to **Site Settings** → **Environment Variables**
3. Add the same variables as above
4. Redeploy your site

## 🔄 Step 2: Restart Development Server

After adding the token to `.env.local`:

```bash
# Stop the current server (Ctrl+C)
# Then restart:
npm run dev
```

## ✅ Step 3: Verify It's Working

### Method 1: Check Diagnostic Endpoint
Visit: `http://localhost:3000/api/blog-diagnostic`

You should see:
- ✅ `hygraphConfigured: true`
- ✅ `tokenConfigured: true`
- ✅ Posts count > 0 (if you have published posts)

### Method 2: Check Server Logs
When you visit `/resources/blog`, you should see:
```
✅ Successfully fetched X posts from Hygraph
📝 Post titles: [list of your posts]
```

If you see:
```
⚠️ Using fallback placeholder posts
```
Then check the error messages above it for specific issues.

## 🎯 What the Token Does

### With Token (Authenticated Access):
- ✅ Can access **published** content
- ✅ Can access **draft** content (if permissions allow)
- ✅ Better permission control
- ✅ More reliable API access

### Without Token (CDN Access):
- ✅ Can access **published** content only
- ⚠️ Cannot access draft content
- ⚠️ May have permission limitations

## 🔍 Token Configuration in Hygraph

Your token is configured with:
- **Name**: NextJS Blog Token
- **Default Stage**: Published
- **Content Permissions**: Check in Hygraph Studio → Project Settings → Permanent Auth Tokens

### Verify Token Permissions

1. Go to Hygraph Studio
2. Navigate to **Project Settings** → **Permanent Auth Tokens**
3. Click on "NextJS Blog Token"
4. Check **Content Permissions** section
5. Ensure "Post" model has **Read** permission enabled

## 🐛 Troubleshooting

### Issue: "Token not working"
- ✅ Verify token is in `.env.local` (not `.env`)
- ✅ Restart dev server after adding token
- ✅ Check token hasn't expired (tokens don't expire, but check permissions)
- ✅ Verify token has correct permissions in Hygraph

### Issue: "Still seeing placeholder posts"
1. Check diagnostic endpoint: `/api/blog-diagnostic`
2. Look for error messages in server logs
3. Verify posts are **Published** in Hygraph (not Draft)
4. Check that `HYGRAPH_ENDPOINT` is also set

### Issue: "Token works but no posts"
- Posts might be in Draft stage
- Check Content Permissions in Hygraph
- Verify Post model exists in Hygraph Schema

## 📊 Next Steps

1. ✅ Token added to `.env.local`
2. ✅ Server restarted
3. ✅ Diagnostic endpoint shows success
4. ✅ Blog page shows real posts (not placeholders)
5. 📝 Publish more posts in Hygraph Studio
6. 📈 Monitor SEO in Google Search Console

---

**Note**: The token is sensitive. Never commit `.env.local` to git (it should be in `.gitignore`). For production, use your hosting platform's environment variable settings.
