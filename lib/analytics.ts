import ReactGA from "react-ga4";

let initialized = false;

export function initAnalytics(trackingId?: string) {
  if (initialized) return;
  const id = trackingId || process.env.NEXT_PUBLIC_GA4_TRACKING_ID;
  if (!id) return;
  ReactGA.initialize(id);
  initialized = true;
}

export function trackEvent(eventName: string, params?: Record<string, unknown>) {
  try {
    ReactGA.event({ category: "User", action: eventName, ...params });
  } catch {
    // no-op in SSR or if GA not initialized
  }
}

export const EVENTS = {
  HERO_CONTACT_SALES: "hero_contact_sales_cta",
  HERO_DEMO: "hero_demo_requested",
  ROI_CALC_SUBMITTED: "roi_calculator_submitted",
  CONTACT_FORM_SUBMITTED: "contact_form_submitted",
  DARK_MODE_TOGGLED: "dark_mode_toggled",
  CASE_STUDY_VIEWED: "case_study_viewed",
} as const;

