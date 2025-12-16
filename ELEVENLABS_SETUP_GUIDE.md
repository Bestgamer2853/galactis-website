# ElevenLabs Agent Integration Setup Guide

## 🎯 Quick Setup (5 minutes)

### Step 1: Create Your ElevenLabs Agent

1. **Sign up or log in to ElevenLabs**
   - Go to https://elevenlabs.io
   - Navigate to the [Agents Platform](https://elevenlabs.io/docs/conversational-ai/overview/)

2. **Create a New Agent**
   - Click **Create Agent** or **New Agent**
   - Configure your agent:
     - **Name**: Give it a name (e.g., "Galactis Support Agent")
     - **Voice**: Select a voice from ElevenLabs' library
     - **Knowledge Base**: Add your website content, FAQs, or documentation
     - **Instructions**: Set up conversation guidelines and behavior
     - **Web Widget**: Enable the web widget option

3. **Get Your Agent ID**
   - Once your agent is created, go to the agent settings
   - Find your **Agent ID** (it will look like a UUID or alphanumeric string)
   - Copy this ID - you'll need it for the next step

### Step 2: Get Your Embed Code or Agent ID

You have two options for integration:

#### Option A: Using Embed Code (Recommended - Most Reliable)

1. In your ElevenLabs dashboard, go to your agent's settings
2. Navigate to the **Widget** tab
3. Copy the embed code provided (it will look like HTML with script tags)
4. Use this in your environment variable (see Step 3)

#### Option B: Using Agent ID

1. In your ElevenLabs dashboard, find your agent
2. Copy the **Agent ID** (UUID or alphanumeric string)
3. Use this in your environment variable (see Step 3)

### Step 3: Add Environment Variables

Create a `.env.local` file in your project root (if it doesn't exist) and add:

**Option A - Using Embed Code (Recommended):**
```bash
# ElevenLabs Agent Configuration (Embed Code Method)
NEXT_PUBLIC_ELEVENLABS_EMBED_CODE="<script src='...'></script><script>...</script>"

# Optional: Widget Customization
# NEXT_PUBLIC_ELEVENLABS_WIDGET_POSITION=bottom-right
# NEXT_PUBLIC_ELEVENLABS_WIDGET_COLOR=#6366f1
```

**Option B - Using Agent ID:**
```bash
# ElevenLabs Agent Configuration (Agent ID Method)
NEXT_PUBLIC_ELEVENLABS_AGENT_ID=your-agent-id-here

# Optional: Widget Customization
# NEXT_PUBLIC_ELEVENLABS_WIDGET_POSITION=bottom-right
# NEXT_PUBLIC_ELEVENLABS_WIDGET_COLOR=#6366f1
```

**Note:** 
- For Option A: Paste the entire embed code as a string (keep the quotes)
- For Option B: Replace `your-agent-id-here` with your actual Agent ID
- You only need ONE of these - not both

**Optional Configuration:**
- `NEXT_PUBLIC_ELEVENLABS_WIDGET_POSITION`: Position of the widget on the page
  - Options: `bottom-right` (default), `bottom-left`, `top-right`, `top-left`
- `NEXT_PUBLIC_ELEVENLABS_WIDGET_COLOR`: Custom color for the widget (hex color code)

### Step 3: Test Locally

1. **Restart your development server** (important for environment variables to load):
   ```bash
   npm run dev
   ```

2. **Visit your website**
   - Go to http://localhost:3000
   - You should see the ElevenLabs agent widget in the bottom-right corner (or your configured position)

3. **Test the agent**
   - Click on the widget to open the conversation interface
   - Try asking questions related to your configured knowledge base
   - Verify that the voice responses work correctly

### Step 4: Deploy with Environment Variables

Before deploying, add the environment variable to your hosting platform:

#### For Netlify:
1. Go to **Site Settings** → **Environment Variables**
2. Click **Add a variable**
3. Add ONE of the following:
   - **Option A (Embed Code)**: `NEXT_PUBLIC_ELEVENLABS_EMBED_CODE` = `your-embed-code-here`
   - **Option B (Agent ID)**: `NEXT_PUBLIC_ELEVENLABS_AGENT_ID` = `your-agent-id-here`
4. Add optional variables:
   - (Optional) `NEXT_PUBLIC_ELEVENLABS_WIDGET_POSITION` = `bottom-right`
   - (Optional) `NEXT_PUBLIC_ELEVENLABS_WIDGET_COLOR` = `#6366f1`

#### For Vercel:
1. Go to **Project Settings** → **Environment Variables**
2. Add the same variables as above

**Important:** After adding environment variables, redeploy your site for the changes to take effect.

## 🎨 Customization

### Change Widget Position

The widget can be positioned in any corner of the screen:

```env
NEXT_PUBLIC_ELEVENLABS_WIDGET_POSITION=bottom-left
```

Available positions:
- `bottom-right` (default)
- `bottom-left`
- `top-right`
- `top-left`

### Change Widget Color

Match the widget color to your brand:

```env
NEXT_PUBLIC_ELEVENLABS_WIDGET_COLOR=#8b5cf6
```

Use any hex color code that matches your website's design.

### Disable the Agent

To temporarily disable the agent without removing the code, simply remove or comment out the `NEXT_PUBLIC_ELEVENLABS_AGENT_ID` environment variable:

```env
# NEXT_PUBLIC_ELEVENLABS_AGENT_ID=your-agent-id-here
```

The component will detect the missing ID and won't load the widget.

## 📍 Where It Appears

The ElevenLabs agent widget is automatically added to **all pages** of your website through the root layout (`app/layout.tsx`). This means:

- ✅ Homepage (`/`)
- ✅ All product pages (`/products/*`)
- ✅ All solution pages (`/solutions/*`)
- ✅ Contact page (`/contact`)
- ✅ Blog pages (`/resources/blog/*`)
- ✅ Every other page on your site

## 🔧 Technical Details

### Component Location
- **Component**: `components/ElevenLabsAgent.tsx`
- **Integration**: `app/layout.tsx`

### How It Works
1. The component loads the ElevenLabs widget script dynamically
2. It uses your Agent ID to initialize the specific agent
3. The widget appears as a floating button that users can click to start conversations
4. All conversations are handled by ElevenLabs' infrastructure

### Browser Compatibility
The widget works in all modern browsers that support:
- JavaScript ES6+
- Web Audio API (for voice playback)
- WebRTC (for real-time audio if enabled)

## 🐛 Troubleshooting

### Widget Not Appearing

1. **Check environment variable**
   - Make sure `NEXT_PUBLIC_ELEVENLABS_AGENT_ID` is set correctly
   - Restart your dev server after adding the variable

2. **Check browser console**
   - Open browser DevTools (F12)
   - Look for any error messages
   - Check if the script is loading: `https://elevenlabs.io/convai-widget/index.js`

3. **Verify Agent ID**
   - Double-check that your Agent ID is correct in the ElevenLabs dashboard
   - Make sure the agent is published/active

### Voice Not Working

1. **Check browser permissions**
   - Ensure your browser has microphone permissions enabled
   - Check browser settings for site permissions

2. **Check agent configuration**
   - Verify voice settings in your ElevenLabs agent dashboard
   - Make sure the agent has a voice selected

### Widget Appears on Wrong Pages

The widget is intentionally added to all pages. If you want to limit it to specific pages:

1. Remove `<ElevenLabsAgent />` from `app/layout.tsx`
2. Add it manually to specific pages:
   ```tsx
   import ElevenLabsAgent from "@/components/ElevenLabsAgent";
   
   export default function MyPage() {
     return (
       <>
         {/* Your page content */}
         <ElevenLabsAgent />
       </>
     );
   }
   ```

## 📚 Additional Resources

- [ElevenLabs Agents Documentation](https://elevenlabs.io/docs/conversational-ai/overview/)
- [ElevenLabs Web Widget Guide](https://elevenlabs.io/docs/conversational-ai/web-widget)
- [ElevenLabs Dashboard](https://elevenlabs.io/app)

## 🎉 That's It!

Your ElevenLabs agent is now integrated into your website. Users can interact with your AI agent through voice conversations on any page of your site.

The agent will:
- ✅ Appear on all pages automatically
- ✅ Handle voice conversations with users
- ✅ Use your configured knowledge base to answer questions
- ✅ Match your website's design (with optional color customization)

