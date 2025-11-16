# Galactis.ai Website

A modern, responsive website for Galactis.ai built with Next.js 16, React 19, TypeScript, and Tailwind CSS 4.

## Features

- ✨ World-class animations and micro-interactions
- 📱 Fully responsive design (mobile, tablet, desktop)
- 🎨 Premium UI/UX with glassmorphism and magnetic effects
- ⚡ Optimized performance with Next.js App Router
- 🔍 SEO optimized with metadata and structured data
- 🌙 Dark mode support
- ♿ WCAG AA accessible

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Run the development server:**
   ```bash
   npm run dev
   ```

3. **Open your browser:**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Build for Production

```bash
npm run build
npm start
```

## Deployment

See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed instructions on deploying to Vercel.

### Quick Deploy to Vercel

1. **Push to GitHub** (see instructions below)
2. **Go to [vercel.com](https://vercel.com)** and sign up/login
3. **Click "Add New..." → "Project"**
4. **Import your GitHub repository**
5. **Click "Deploy"** (Vercel auto-detects Next.js settings)

## Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript 5
- **Styling:** Tailwind CSS 4
- **Animations:** Framer Motion
- **UI Components:** Radix UI
- **Forms:** React Hook Form + Zod
- **Analytics:** Google Analytics 4

## Project Structure

```
├── app/                    # Next.js app router pages
│   ├── page.tsx           # Homepage
│   ├── layout.tsx         # Root layout
│   ├── company/           # Company pages
│   ├── products/          # Product pages
│   ├── solutions/         # Solution pages
│   └── ...
├── components/            # React components
│   ├── Hero.tsx          # Hero section
│   ├── Navbar.tsx        # Navigation bar
│   └── ...
├── lib/                   # Utility functions
├── hooks/                 # Custom React hooks
└── public/                # Static assets
```

## Environment Variables

If you need environment variables (e.g., Google Analytics), create a `.env.local` file:

```env
NEXT_PUBLIC_GA_ID=your_ga_id_here
```

**Note:** `.env.local` is gitignored. For production, add variables in Vercel dashboard.

## License

Private - All rights reserved by Galactis.ai
