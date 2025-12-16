# ElevenLabs Agent - Quick Setup

## Your Agent ID
`agent_4401kck0g80wecysddthnan6e89m`

## Quick Setup Steps

### 1. Create `.env.local` file in your project root

Add this line to your `.env.local` file:

```bash
NEXT_PUBLIC_ELEVENLABS_EMBED_CODE="<elevenlabs-convai agent-id=\"agent_4401kck0g80wecysddthnan6e89m\"></elevenlabs-convai><script src=\"https://unpkg.com/@elevenlabs/convai-widget-embed\" async type=\"text/javascript\"></script>"
```

**OR** use just the agent ID:

```bash
NEXT_PUBLIC_ELEVENLABS_AGENT_ID=agent_4401kck0g80wecysddthnan6e89m
```

### 2. Restart your dev server

```bash
npm run dev
```

### 3. Test it

Visit http://localhost:3000 and you should see the ElevenLabs widget in the bottom-right corner!

### 4. Deploy

Add the same environment variable to your hosting platform (Netlify/Vercel) and redeploy.

---

**Note:** The component is already integrated into your website layout, so once you add the environment variable, it will work automatically on all pages.

