# Galactis.ai Website - Codebase Overview

## Project Structure
This is a Next.js 16 application with TypeScript, using the App Router pattern. The site is for Galactis.ai, an enterprise ITAM, Network Monitoring & AI Agents platform.

## Technology Stack
- **Framework**: Next.js 16.0.1 (App Router)
- **Language**: TypeScript 5
- **Styling**: Tailwind CSS 4
- **UI Components**: Radix UI primitives
- **Animations**: Framer Motion
- **Forms**: React Hook Form + Zod validation
- **Analytics**: Google Analytics 4 (react-ga4)
- **Icons**: Lucide React

## Directory Structure

```
galactis-website/
├── app/                    # Next.js App Router pages
│   ├── layout.tsx         # Root layout with fonts and metadata
│   ├── page.tsx           # Homepage
│   ├── globals.css        # Global styles and Tailwind config
│   ├── api/               # API routes
│   │   └── contact/       # Contact form API endpoint
│   ├── products/          # Product pages (ITAM, Network Monitoring, AI Agents)
│   ├── solutions/         # Industry-specific solution pages
│   ├── company/           # About, Careers, Leadership
│   ├── developers/        # Developer documentation pages
│   └── resources/         # Blog, Case Studies, Whitepapers
├── components/            # React components
├── lib/                   # Utility functions (analytics, hubspot)
└── public/                # Static assets
```

## Key Configuration Files

### package.json
```json
{
  "name": "galactis-website",
  "version": "0.1.0",
  "scripts": {
    "dev": "next dev",        // Development server
    "build": "next build",    // Production build
    "start": "next start",    // Production server
    "lint": "eslint"          // Linting
  }
}
```
**Purpose**: Defines project dependencies and scripts. Uses React 19, Next.js 16, Tailwind CSS 4, Radix UI for accessible components, Framer Motion for animations.

### next.config.ts
```typescript
// Minimal Next.js config - currently empty
// Could add image optimization, redirects, rewrites here
```
**Status**: Empty configuration. Could be expanded for production optimizations.

### tsconfig.json
```typescript
// TypeScript configuration with strict mode enabled
// Path aliases: @/* maps to root directory
```
**Purpose**: Enables strict TypeScript checking and path aliases for cleaner imports.

### app/layout.tsx
```typescript
// Root layout component
// - Loads Inter and JetBrains Mono fonts from Google Fonts
// - Sets global metadata (SEO, OpenGraph, Twitter cards)
// - Applies font variables and dark mode support
```
**Key Features**:
- Font optimization with next/font
- SEO metadata setup
- Dark mode via class-based approach

### app/page.tsx
```typescript
// Homepage component
// Composes multiple sections:
// - Hero: Main value proposition with animated background
// - WhyGalactis: Three key differentiators
// - CustomersMarquee: Scrolling customer logos
// - StatsSection: Key metrics
// - FeatureHighlights: Four main features
// - TestimonialCarousel: Customer testimonials
// - HomepageROICalculator: Interactive savings calculator
// - CaseStudyCards: Industry case studies
```
**Pattern**: Server Component that imports and renders multiple client components.

## Core Components

### components/Navbar.tsx
```typescript
// Main navigation bar
// - Sticky header with backdrop blur
// - Logo and navigation links
// - Dark mode toggle
// - Login and Contact Sales CTAs
```
**Features**: Sticky positioning, responsive design, dark mode toggle integration.

### components/Footer.tsx
```typescript
// Site footer
// - Four column layout (Brand, Products, Developers, Company)
// - Security badges section (SOC2, ISO 27001, GDPR, HIPAA)
// - Copyright notice
```
**Pattern**: Static content with semantic HTML structure.

### components/Hero.tsx
```typescript
// Hero section with animated background
// - Gradient background with animated blur circles (Framer Motion)
// - Main headline with gradient text
// - CTAs (Contact Sales, Watch Demo)
// - Trust badges
// - Customer logo placeholders
// - Animated mock dashboard preview
```
**Client Component**: Uses Framer Motion for animations. Tracks analytics events on CTA clicks.

### components/DarkModeToggle.tsx
```typescript
// Dark mode switcher
// - Syncs with localStorage
// - Respects system preference as default
// - Toggles 'dark' class on document.documentElement
// - Prevents hydration mismatch with mounted state
```
**Pattern**: Client component with localStorage persistence and system preference detection.

### components/ContactSalesModal.tsx
```typescript
// Contact form modal (Radix UI Dialog)
// - Form validation with Zod schema
// - React Hook Form for form state
// - Submits to /api/contact endpoint
// - Success state handling
// - Analytics tracking
```
**Dependencies**: Radix UI Dialog, React Hook Form, Zod. Posts to API route.

### components/HomepageROICalculator.tsx
```typescript
// Interactive ROI calculator
// - Three inputs: Assets, Budget, Manual Hours/Week
// - Calculates: Annual Savings, Time Saved, ROI %
// - Updates in real-time
// - Tracks calculator usage in analytics
// - Redirects to contact page with source parameter
```
**Purpose**: Lead generation tool. Calculates potential savings based on user inputs.

### components/TestimonialCarousel.tsx
```typescript
// Customer testimonial carousel
// - Three testimonials with metrics
// - Dot navigation
// - Manual slide control
// - Responsive grid layout
```
**State Management**: Uses useState for active testimonial index.

### components/CustomersMarquee.tsx
```typescript
// Infinite scrolling marquee
// - Animates customer names horizontally
// - Duplicates array for seamless loop
// - CSS keyframe animation
```
**Animation**: Pure CSS animation (no JS required).

### components/StatsSection.tsx
```typescript
// Statistics display
// - Four key metrics in grid layout
// - Static data (could be dynamic)
```
**Data**: Currently hardcoded. Could be fetched from API.

### components/FeatureHighlights.tsx
```typescript
// Four feature cards
// - Icon, title, description
// - Hover effects
// - Responsive grid (1-2-4 columns)
```
**Pattern**: Map over features array to render cards.

## API Routes

### app/api/contact/route.ts
```typescript
// POST endpoint for contact form
// - Accepts JSON body
// - Currently returns success (HubSpot integration stubbed)
// - Error handling with try/catch
```
**TODO**: Implement HubSpot integration via lib/hubspot.ts.

## Utility Libraries

### lib/analytics.ts
```typescript
// Google Analytics 4 wrapper
// - Initializes GA4 once
// - trackEvent() function for custom events
// - Predefined event constants (EVENTS object)
// - Handles SSR gracefully (no-op if not initialized)
```
**Usage**: Import trackEvent() in client components to track user actions.

### lib/hubspot.ts
```typescript
// HubSpot integration stub
// - Placeholder function for form submissions
// - Returns success echo for local development
```
**TODO**: Implement actual HubSpot Forms API integration using environment variables.

## Styling

### app/globals.css
```css
/* Tailwind CSS 4 configuration */
/* - Custom color variables (primary, secondary, accent) */
/* - Gradient definitions */
/* - Shadow variables */
/* - Font variables */
/* - Dark mode support */
/* - Utility classes (gradient-text, glass, glass-dark) */
```
**Approach**: Uses Tailwind CSS 4 with @theme inline configuration.

## Page Types

### Product Pages (app/products/*)
- ITAM, Network Monitoring, AI Agents
- Breadcrumb navigation
- JSON-LD structured data
- Feature descriptions
- ROI calculators

### Solution Pages (app/solutions/*)
- Industry-specific pages (Financial Services, Healthcare, etc.)
- Uses IndustryPage component for consistent layout
- Pain points, solutions, compliance alignment
- Case study snapshots
- Metrics display

### Developer Pages (app/developers/*)
- Getting Started, API Reference, SDKs
- Integration guides
- Developer console links
- Agent templates

## Data Flow

1. **User Interaction** → Client Component (e.g., ContactSalesModal)
2. **Form Submission** → POST to /api/contact
3. **API Route** → (Currently stub, should call HubSpot)
4. **Analytics** → trackEvent() called on key interactions
5. **Success** → UI updates, user redirected or shown confirmation

## State Management

- **Local State**: useState() in client components
- **Form State**: React Hook Form (ContactSalesModal, DownloadGateForm)
- **Theme State**: DarkModeToggle manages localStorage and DOM class
- **No Global State**: No Redux/Zustand - server components for data fetching

## SEO & Metadata

- **Metadata**: Defined in app/layout.tsx
- **JSON-LD**: Structured data via JsonLd component
- **Sitemap**: app/sitemap.ts (minimal, should be expanded)
- **robots.txt**: Static file in app/robots.txt

## Performance Considerations

1. **Font Loading**: Optimized with next/font
2. **Image Optimization**: Next.js Image component (not heavily used yet)
3. **Code Splitting**: Automatic with App Router
4. **Animations**: Framer Motion for smooth animations
5. **Client Components**: Only marked "use client" where needed

## Areas for Improvement

1. **API Integration**: HubSpot integration is stubbed
2. **Error Handling**: Limited error boundaries and user-facing error messages
3. **Loading States**: Missing loading indicators for async operations
4. **Accessibility**: Could add more ARIA labels and keyboard navigation
5. **Testing**: No test files present
6. **Environment Variables**: Need proper .env.example file
7. **Sitemap**: Should include all pages dynamically
8. **Image Optimization**: Replace placeholder images with Next.js Image
9. **Analytics**: Event tracking could be more comprehensive
10. **Type Safety**: Some any types could be more specific

## Environment Variables Needed

```
NEXT_PUBLIC_GA4_TRACKING_ID=G-XXXXXXXXXX
HUBSPOT_PORTAL_ID=xxxxx
HUBSPOT_FORM_ID=xxxxx
HUBSPOT_API_KEY=xxxxx
```

## Build & Deploy

```bash
npm run dev      # Development server (localhost:3000)
npm run build    # Production build
npm run start    # Production server
npm run lint     # ESLint check
```

## Component Patterns

1. **Server Components by Default**: Most pages are server components
2. **Client Components**: Only when needed (interactivity, hooks, browser APIs)
3. **Composition**: Large pages composed of smaller components
4. **Reusable Components**: IndustryPage, Breadcrumbs for consistency
5. **Form Handling**: React Hook Form + Zod for validation

## Styling Patterns

- **Utility-First**: Tailwind CSS classes
- **Dark Mode**: class-based (dark: prefix)
- **Responsive**: Mobile-first approach (sm:, md:, lg: breakpoints)
- **Custom Classes**: Defined in globals.css for complex patterns (gradient-text, glass)

## Next Steps for LLM Analysis

When analyzing this codebase, consider:
1. Component reusability and DRY principles
2. Type safety improvements
3. Performance optimizations
4. Accessibility enhancements
5. Testing strategies
6. API integration completion
7. Error handling patterns
8. SEO improvements
9. Code organization and structure
10. Security best practices

