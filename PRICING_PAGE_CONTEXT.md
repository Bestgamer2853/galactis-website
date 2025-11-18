# Pricing Page Context Document

## Overview
The pricing page (`/app/pricing/page.tsx`) for Galactis.ai is an enterprise-focused page that emphasizes custom pricing and consultation rather than displaying fixed pricing tiers. It's designed to guide enterprise prospects through a discovery-to-proposal journey.

## Current Implementation Status

### Page Structure
- **File Location**: `/app/pricing/page.tsx`
- **Client Component**: Yes (marked with `"use client"`)
- **Route**: `/pricing`
- **Navigation**: Accessible via navbar link and footer link

### Components Used
1. **Navbar** - Standard site navigation (`@/components/Navbar`)
2. **Footer** - Standard site footer (`@/components/Footer`)
3. **ContactSalesModal** - Modal for lead capture (used twice on the page)
4. **Link** - Next.js Link component for internal navigation

### Page Sections (Top to Bottom)

#### 1. Hero Section
- **Background**: Purple gradient (`from-purple-900 via-indigo-900 to-slate-900`)
- **Layout**: Two-column grid (1.2fr:0.8fr on large screens)
- **Left Column Content**:
  - Eyebrow text: "Pricing & procurement"
  - Headline: "Enterprise pricing is a conversation, not a calculator"
  - Description: Explains custom deployment spanning ITAM, network intelligence, and AI agents
  - Bullet points: 24-hour response, 5-day blueprint, 8-week pilots
  - CTAs: ContactSalesModal button + Link to solution briefs
- **Right Column Content**:
  - Glass-morphism card with backdrop blur
  - "What to expect" section with metrics:
    - Response SLA: 24 hours
    - Pilot duration: 8 weeks
    - Support model: Dedicated success pod
    - Regions: NA · EU · APAC

#### 2. Solution Bundles Section
- **Title**: "Solution bundles we typically model"
- **Layout**: 3-column grid on large screens
- **Data Source**: `bundleHighlights` array with 3 items:
  1. **ITAM + FinOps Blueprint**
     - Description: Unified asset inventory, ELP, reclaim playbooks
     - Bullets: Software/SaaS/hardware/cloud coverage, regulator packs, Finance+Procurement alignment
  2. **Network Intelligence & Automation**
     - Description: Topology, observability, AI runbooks for 99.95% uptime
     - Bullets: Blast-radius modeling, ServiceNow/PagerDuty/Slack integration, human guardrails
  3. **AI Agents Platform**
     - Description: Multimodal agents with policy, knowledge, observability
     - Bullets: Studio+governance, AIaaS guardrails, template library

#### 3. Procurement & Pilot Journey Section
- **Title**: "Procurement & pilot journey"
- **Layout**: Vertical list of stage cards
- **Data Source**: `engagementStages` array with 4 phases:
  1. **Day 0**: Discovery & KPI intake (24-hour response)
  2. **Days 1-5**: Blueprint & commercial modeling (ROI mapping)
  3. **Weeks 2-10**: Pilot & measurement (8-week program, dashboards, checkpoints)
  4. **Post-pilot**: Procurement & deployment (legal/security sign-off, rollout)

#### 4. Two-Column Info Section
- **Left Column**: "Come prepared with" checklist
  - Data from `readinessChecklist` array (5 items):
    - Target domains and KPIs
    - Systems to integrate
    - Compliance scope
    - Deployment model preferences
    - Timeline constraints
- **Right Column**: "What we guarantee" assurances
  - Data from `assurances` array (4 items):
    - SOC 2 Type II, ISO 27001, HIPAA, GDPR controls
    - Sovereign/dedicated tenant options
    - AI agent guardrails (policy templates, audit logs, rollback)
    - Managed success pods by industry/region

#### 5. Final CTA Section
- **Background**: Purple-themed (`bg-purple-50` with purple border)
- **Layout**: Two-column grid
- **Left Column**:
  - Eyebrow: "Next step"
  - Headline: "Ready for a bespoke proposal?"
  - Description: Bring KPIs, integrations, compliance constraints
- **Right Column**: "What you receive" list
  - Commercial options mapped to ROI
  - Integration + rollout sequencing
  - Governance & security summary
  - Executive-ready business case
- **CTA**: ContactSalesModal button

## Data Structures

### bundleHighlights
```typescript
Array<{
  title: string;
  description: string;
  bullets: string[];
}>
```

### engagementStages
```typescript
Array<{
  phase: string; // e.g., "Day 0", "Days 1-5"
  title: string;
  detail: string;
}>
```

### readinessChecklist
```typescript
string[] // Array of checklist items
```

### assurances
```typescript
string[] // Array of guarantee statements
```

## Design Patterns Used
- **Gradient backgrounds**: Purple-to-indigo-to-slate gradients for hero sections
- **Glass-morphism**: Backdrop blur effects (`backdrop-blur`, `bg-white/10`)
- **Border styling**: Rounded borders (`rounded-3xl`, `rounded-2xl`)
- **Dark mode support**: All sections use `dark:` variants
- **Responsive grids**: `lg:grid-cols-3`, `md:grid-cols-2` patterns
- **Bullet points**: Emerald and purple dots as visual indicators

## Related Components (Not Currently Used)

### Available but Unused Calculators
1. **ROICalculator** (`@/components/ROICalculator.tsx`)
   - Purpose: Calculate ROI for ITAM implementations
   - Inputs: # of assets, hours/week, hourly cost
   - Output: Annual savings estimate
   - Currently used on: `/products/itam` page

2. **CostEstimator** (`@/components/CostEstimator.tsx`)
   - Purpose: Estimate AI Agents Platform costs
   - Inputs: # agents, calls/month, messages/month, workflows/day, model type (SaaS vs AIaaS)
   - Output: Monthly cost estimate
   - Currently used on: `/products/ai-agents` page

### ProductHero Component
- Available component used on product pages
- Could potentially be adapted for pricing hero section
- Supports custom gradients, stats, CTAs

## Integration Points

### ContactSalesModal
- Used twice on the page (hero section and final CTA)
- Accepts optional props: `intent`, `partnerType`
- Currently used without props (defaults to "sales" intent)
- Could be enhanced to pass `intent="sales"` explicitly or add pricing-specific context

### Analytics
- No explicit tracking on pricing page currently
- Other pages use `trackEvent` from `@/lib/analytics`
- Could add tracking for:
  - Page views
  - CTA clicks
  - Scroll depth
  - Time spent on page

## Missing Elements / Potential Improvements

### Visual Enhancements
1. **No custom illustrations**: Other pages use custom SVG illustrations (AIConversationFlow, ITAMDashboard, NetworkTopology)
2. **No animations**: Unlike product pages, no FadeInWhenVisible or motion animations
3. **No interactive elements**: Static content only, no calculators or estimators
4. **No visual hierarchy indicators**: Missing icons or graphics for engagement stages

### Functional Enhancements
1. **No ROI calculator integration**: ROICalculator component exists but not used
2. **No cost estimator integration**: CostEstimator component exists but not used
3. **No comparison tools**: Could show bundle comparisons or pricing scenarios
4. **No downloadable resources**: No pricing sheets, ROI calculators, or proposal templates
5. **No FAQ section**: Common pricing questions not addressed

### Content Gaps
1. **No actual price ranges**: Even ballpark estimates would be helpful
2. **No pricing model explanation**: How pricing is structured (per-seat, per-asset, subscription, etc.)
3. **No volume discounts mentioned**: Enterprise deals often have volume tiers
4. **No add-on services pricing**: Professional services, training, support tiers
5. **No comparison to competitors**: No "why choose us" pricing angle

### UX Improvements
1. **No breadcrumbs**: Missing navigation context
2. **No JSON-LD structured data**: SEO enhancement opportunity
3. **No loading states**: For async operations (if added)
4. **No form pre-population**: ContactSalesModal could pre-fill intent from pricing page
5. **No exit-intent capture**: Could show modal on scroll up

## Technical Details

### Styling
- Uses Tailwind CSS utility classes
- Supports dark mode throughout
- Responsive breakpoints: `sm:`, `md:`, `lg:`
- Consistent spacing: `mt-12`, `gap-6`, `p-6`, `p-8`

### Performance
- Client-side rendered (may impact initial load)
- No code splitting for this page
- No image optimizations (no images used)
- All data is static (no API calls)

### Accessibility
- Semantic HTML structure
- Labels for form elements (via ContactSalesModal)
- Color contrast should be checked (purple gradients on white text)
- Keyboard navigation should be tested

## Next Steps / Recommendations

1. **Add calculators**: Integrate ROICalculator and CostEstimator components
2. **Add animations**: Implement FadeInWhenVisible and motion animations for better engagement
3. **Add custom graphics**: Create pricing-specific illustrations (calculator, charts, timeline)
4. **Add structured data**: JSON-LD schema for pricing page
5. **Add breadcrumbs**: Navigation context
6. **Add FAQ section**: Address common pricing questions
7. **Add downloadable resources**: Pricing sheets, ROI calculators as PDFs
8. **Add analytics tracking**: Track user interactions
9. **Add pricing scenarios**: Example pricing tiers or ranges (even if approximate)
10. **Enhance CTA**: Pre-populate ContactSalesModal with pricing context

## Related Pages
- **Product Pages**: `/products/itam`, `/products/network-monitoring`, `/products/ai-agents` (contain calculators)
- **Solution Pages**: `/solutions/*` (industry-specific implementations)
- **Contact Page**: `/contact` (alternative contact method)
- **Partner Page**: `/partner` (partner program information)

## Brand Guidelines (Inferred)
- **Primary Colors**: Purple (`purple-600`, `purple-900`), Indigo (`indigo-900`)
- **Accent Colors**: Emerald (`emerald-500`, `emerald-600`)
- **Typography**: Semibold for headings, regular for body
- **Spacing**: Generous padding (`p-6`, `p-8`), consistent gaps (`gap-6`)
- **Borders**: Rounded corners (`rounded-3xl`, `rounded-2xl`)
- **Shadows**: Subtle shadows (`shadow-sm`, `shadow-2xl`)

## Code Quality Notes
- Clean, readable component structure
- Static data stored as constants (good for maintenance)
- Consistent naming conventions
- No TypeScript errors (based on current state)
- Follows Next.js App Router patterns
- No console errors or warnings expected

