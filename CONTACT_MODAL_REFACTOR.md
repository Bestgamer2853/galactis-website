# Contact Modal Refactor - Multi-Intent Form System

## Overview

The contact form has been refactored into a unified, multi-intent system that supports three different use cases:
- **Sales**: For sales inquiries
- **Partner**: For partner program applications  
- **Support**: For support requests

## Component: `ContactSalesModal`

### Props

```typescript
interface ContactSalesModalProps {
  intent?: "sales" | "partner" | "support";  // Default: "sales"
  partnerType?: "Reseller" | "Service Provider" | "Consulting" | "Build";  // Optional
}
```

### Features

1. **Dynamic Form Fields**: Fields change based on selected intent
2. **Intent Selector**: Users can switch between intents via dropdown
3. **Pre-filled Values**: When opened with specific props, fields are pre-filled
4. **Validation**: Separate validation schemas per intent
5. **Separate Endpoints**: Sales/Support go to `/api/contact`, Partners go to `/api/contact/partner`

## Usage Examples

### 1. Global "Contact Sales" Button (Sales Intent)

**In Navbar.tsx:**
```tsx
<ContactSalesModal intent="sales" />
```

When triggered:
- Opens modal with "Contact Sales" heading
- Pre-selects "Talk to Sales" intent
- Shows fields: Name, Email, Company, Phone (optional), Use case / Project description
- Submits to `/api/contact` endpoint

**Trigger example:**
```tsx
<button onClick={() => {
  const button = document.querySelector('[data-contact-trigger][data-intent="sales"]');
  button?.click();
}}>
  Contact Sales
</button>
```

### 2. Partners Page - Specific Partner Type

**In partner/page.tsx:**
```tsx
const [modalIntent, setModalIntent] = useState<"partner">("partner");
const [modalPartnerType, setModalPartnerType] = useState<string | undefined>(undefined);

const handlePartnerClick = (partnerType: string) => {
  setModalIntent("partner");
  setModalPartnerType(partnerType);
  setTimeout(() => {
    const button = document.querySelector(
      `[data-contact-trigger][data-intent="partner"][data-partner-type="${partnerType}"]`
    );
    button?.click();
  }, 100);
};

// In JSX:
<ContactSalesModal 
  key={`${modalIntent}-${modalPartnerType || "default"}`}
  intent={modalIntent} 
  partnerType={modalPartnerType as PartnerType | undefined} 
/>
```

**Example: "Become a Reseller" button:**
```tsx
<button onClick={() => handlePartnerClick("Reseller")}>
  Become a Reseller
</button>
```

When clicked:
- Opens modal with "Apply to Partner Program" heading
- Pre-selects "Apply as Partner" intent
- Pre-fills partner type dropdown with "Reseller"
- Shows fields: Name, Email, Company, Website (optional), Partner type, Regions served, Business summary, Additional info (optional)
- Submits to `/api/contact/partner` endpoint

### 3. Partners Page - General Partner Application

**Floating button on Partners page:**
```tsx
<button onClick={() => {
  setModalIntent("partner");
  setModalPartnerType(undefined);
  setTimeout(() => {
    const button = document.querySelector('[data-contact-trigger][data-intent="partner"]');
    button?.click();
  }, 100);
}}>
  Apply as Partner
</button>
```

When clicked:
- Opens modal with "Apply to Partner Program" heading
- Pre-selects "Apply as Partner" intent
- Partner type dropdown is empty (user selects)
- Same fields as above
- Submits to `/api/contact/partner` endpoint

### 4. Contact Page - Sales Form

**In contact/page.tsx:**
```tsx
<ContactSalesModal intent="sales" />
```

Renders as a visible button that opens the modal directly.

### 5. Support/Other Intent

**Example usage:**
```tsx
<ContactSalesModal intent="support" />
```

When triggered:
- Opens modal with "Contact Support" heading
- Pre-selects "Support/Other" intent
- Shows fields: Name, Email, Account ID (optional), Issue category, Message
- Submits to `/api/contact` endpoint with intent="support"

## Form Fields by Intent

### Sales Intent
- Name * (min 2 chars)
- Email * (valid email)
- Company * (min 2 chars)
- Phone (optional)
- Use case / Project description * (min 10 chars)

### Partner Intent
- Name * (min 2 chars)
- Email * (valid email)
- Company * (min 2 chars)
- Website (optional, must be valid URL if provided)
- Partner type * (dropdown: Reseller, Service Provider, Consulting, Build)
- Regions served * (min 2 chars)
- Brief summary of your business * (min 20 chars)
- Anything else we should know (optional)

### Support Intent
- Name * (min 2 chars)
- Email * (valid email)
- Account ID (optional)
- Issue category * (dropdown: Technical Issue, Billing Question, Account Access, Feature Request, General Inquiry)
- Message * (min 10 chars)

## API Endpoints

### `/api/contact` (POST)
- Handles: `intent: "sales"` or `intent: "support"`
- Source tracking: `sales_inquiry` or `support_request`

### `/api/contact/partner` (POST)
- Handles: `intent: "partner"`
- Source tracking: `partner_application_{partner_type}` (e.g., `partner_application_reseller`)
- Additional validation for partner-specific fields

## Modal Behavior

1. **Intent Selector**: Always visible at top, allows users to switch intents
2. **Pre-selection**: When opened with specific props, the intent dropdown is pre-selected
3. **Pre-filling**: Partner type is pre-filled when provided via props
4. **State Management**: Uses React Hook Form with dynamic validation schemas
5. **Submission**: Automatically routes to correct endpoint based on intent
6. **Success State**: Shows success message with option to submit another or close

## Integration Notes

- All modal instances use unique `data-contact-trigger` attributes with `data-intent` and `data-partner-type` for targeting
- Modal resets form state when closed
- Key prop is used on Partners page to force remount when intent/partnerType changes
- Analytics events are tracked with intent and optional partnerType data

