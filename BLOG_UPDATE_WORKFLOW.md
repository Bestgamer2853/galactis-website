# 📝 Blog Update Workflow - How Blogs Update on Your Website

## ✅ NO - You DON'T Need to Redeploy!

Your blog is set up with **ISR (Incremental Static Regeneration)**, which means:

### Current Setup (Automatic Updates)

**How it works:**
- ✅ Blog pages **automatically refresh** every **1 hour**
- ✅ New posts appear within **1 hour** of publishing in Hygraph
- ✅ Updated posts refresh within **1 hour**
- ✅ **No redeployment needed!**

**Current revalidation time**: `3600 seconds` (1 hour)

---

## 🚀 Option 1: Instant Updates (Recommended)

I've created a **webhook system** for **instant updates** (no waiting 1 hour).

### How It Works:
1. You publish a blog post in Hygraph
2. Hygraph sends a webhook to your website
3. Website **instantly updates** (within seconds)
4. **No redeployment needed!**

### Setup Steps:

#### Step 1: Add Environment Variable

Add to your `.env.local`:
```bash
REVALIDATION_SECRET=your-secret-key-here-make-it-random
```

**Generate a random secret:**
```bash
# On Mac/Linux:
openssl rand -hex 32

# Or use any random string like:
REVALIDATION_SECRET=galactis-blog-webhook-2025-secret-key
```

#### Step 2: Add to Production

**For Vercel:**
1. Go to Project Settings → Environment Variables
2. Add: `REVALIDATION_SECRET` = `your-secret-key`

**For Netlify:**
1. Go to Site Settings → Environment Variables
2. Add: `REVALIDATION_SECRET` = `your-secret-key`

#### Step 3: Configure Webhook in Hygraph

1. **Go to Hygraph Studio**: https://studio-ap-south-1.hygraph.com
2. **Click "Webhooks"** (left sidebar)
3. **Click "Create webhook"**
4. **Configure**:
   - **Name**: "Blog Revalidation"
   - **URL**: 
     - **Development**: `http://localhost:3000/api/revalidate` (for testing)
     - **Production**: `https://galactis.ai/api/revalidate`
   - **Events**: 
     - ✅ Check "Publish" (when post is published)
     - ✅ Check "Unpublish" (when post is unpublished)
     - ✅ Check "Update" (when post is updated)
   - **Model**: Select "Post"
   - **Headers**: 
     - Key: `x-webhook-secret`
     - Value: `your-secret-key-here` (same as REVALIDATION_SECRET)
5. **Click "Create"**

#### Step 4: Test It

1. **Publish a new blog post** in Hygraph
2. **Check your website** - should update within **5-10 seconds**
3. **Check terminal** - you should see revalidation logs

---

## ⏰ Option 2: Keep Current Setup (1 Hour Updates)

If you don't want to set up webhooks, the current setup works fine:

- ✅ New posts appear within **1 hour**
- ✅ No configuration needed
- ✅ Works automatically
- ⏰ Just wait up to 1 hour for updates

**To change the wait time**, edit:
- `app/resources/blog/page.tsx` - line 14: `export const revalidate = 3600;`
- `app/resources/blog/[slug]/page.tsx` - line 64: `export const revalidate = 3600;`

Change `3600` to:
- `60` = 1 minute (faster, more API calls)
- `1800` = 30 minutes
- `3600` = 1 hour (current)
- `86400` = 24 hours (slower)

---

## 📊 Update Methods Comparison

| Method | Update Time | Setup Required | Best For |
|--------|-------------|-----------------|----------|
| **Webhooks** (Option 1) | **Instant** (5-10 sec) | Yes (5 min setup) | Production sites |
| **ISR** (Option 2) | 1 hour | No (already done) | Development/testing |

---

## 🔍 How to Verify Updates

### With Webhooks (Instant):
1. Publish post in Hygraph
2. Wait 5-10 seconds
3. Refresh your website
4. New post should appear!

### Without Webhooks (1 Hour):
1. Publish post in Hygraph
2. Wait up to 1 hour
3. Refresh your website
4. New post should appear!

---

## 🎯 Recommended Setup

**For Production**: Use **webhooks** (Option 1) for instant updates
**For Development**: Current setup (1 hour) is fine

---

## ✅ Summary

**Current Status:**
- ✅ **No redeployment needed** - blogs update automatically
- ✅ **ISR enabled** - pages refresh every 1 hour
- ✅ **Webhook system ready** - can enable for instant updates

**What Happens When You Publish:**
1. You publish in Hygraph
2. Website automatically fetches new content
3. Pages update within 1 hour (or instantly with webhooks)
4. **No code changes or redeployment needed!**

You can publish as many blogs as you want in Hygraph, and they'll automatically appear on your website! 🚀



