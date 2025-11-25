"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { useCallback, useEffect, useId, useRef, useState } from "react";
import { trackEvent } from "@/lib/analytics";
import {
  HUBSPOT_PARTNER_FORM_ID,
  HUBSPOT_PORTAL_ID,
  HUBSPOT_REGION,
  getPartnerFormUrl,
  loadHubSpotFormsScript,
} from "@/lib/hubspotForms";

declare global {
  interface Window {
    hbspt?: {
      forms?: {
        create: (config: {
          region: string;
          portalId: string;
          formId: string;
          target: string;
          onFormReady?: () => void;
        }) => void;
      };
    };
  }
}

export interface HubSpotPartnerModalProps {
  triggerText?: string;
  triggerClassName?: string;
  title?: string;
  description?: string;
  partnerType?: string;
  variant?: "modal" | "link";
}

export default function HubSpotPartnerModal({
  triggerText = "Apply as Partner",
  triggerClassName = "rounded-md bg-purple-600 px-4 py-2 text-sm font-semibold text-white hover:bg-purple-700",
  title = "Apply to Partner Program",
  description = "Share a few details and our partnerships team will get back to you.",
  partnerType,
  variant = "modal",
}: HubSpotPartnerModalProps) {
  const hubspotUrl = getPartnerFormUrl();

  if (variant === "link") {
    return (
      <a
        data-contact-trigger
        data-intent="partner"
        data-partner-type={partnerType}
        href={hubspotUrl}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() =>
          trackEvent("partner_clicked", {
            source: "hubspot_redirect",
            partnerType,
          })
        }
        className={triggerClassName}
      >
        {triggerText}
      </a>
    );
  }

  const containerRef = useRef<HTMLDivElement | null>(null);
  const formContainerId = useId();
  const [open, setOpen] = useState(false);
  const [formRendered, setFormRendered] = useState(false);
  const [loadError, setLoadError] = useState<string | null>(null);

  const renderForm = useCallback(() => {
    const target = containerRef.current;
    if (!target) {
      return;
    }

    target.innerHTML = "";
    target.id = formContainerId;

    if (!window.hbspt?.forms?.create) {
      setLoadError("HubSpot is unavailable. Please try again later.");
      return;
    }

    window.hbspt.forms.create({
      region: HUBSPOT_REGION,
      portalId: HUBSPOT_PORTAL_ID,
      formId: HUBSPOT_PARTNER_FORM_ID,
      target: `#${formContainerId}`,
      onFormReady: () => setFormRendered(true),
    });
  }, [formContainerId]);

  useEffect(() => {
    if (!open) {
      return;
    }

    let cancelled = false;
    setFormRendered(false);
    setLoadError(null);

    loadHubSpotFormsScript()
      .then(() => {
        if (cancelled) {
          return;
        }
        renderForm();
      })
      .catch(() => {
        if (!cancelled) {
          setLoadError("Unable to load HubSpot. Please try again or use the direct form link.");
        }
      });

    return () => {
      cancelled = true;
      if (containerRef.current) {
        containerRef.current.innerHTML = "";
      }
    };
  }, [open, renderForm]);

  return (
    <Dialog.Root
      open={open}
      onOpenChange={(value) => {
        setOpen(value);
        if (value) {
          trackEvent("partner_clicked", {
            source: "hubspot_modal",
            partnerType,
          });
        }
      }}
    >
      <Dialog.Trigger asChild>
        <button
          data-contact-trigger
          data-intent="partner"
          data-partner-type={partnerType}
          className={triggerClassName}
        >
          {triggerText}
        </button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm" />
        <Dialog.Content className="fixed inset-x-0 bottom-0 z-50 max-h-[95vh] w-full overflow-y-auto rounded-t-3xl border border-zinc-200 bg-white p-4 shadow-2xl focus:outline-none dark:border-zinc-800 dark:bg-zinc-950 sm:inset-auto sm:left-1/2 sm:top-1/2 sm:max-h-[90vh] sm:w-[90vw] sm:max-w-2xl sm:-translate-x-1/2 sm:-translate-y-1/2 sm:rounded-2xl sm:p-6 md:p-8">
          <div className="mb-6 flex items-start justify-between gap-6">
            <div>
              <Dialog.Title className="text-lg font-semibold text-zinc-900 dark:text-white">
                {title}
                {partnerType && <span className="ml-2 text-purple-600">- {partnerType}</span>}
              </Dialog.Title>
              <Dialog.Description className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
                {description}
              </Dialog.Description>
            </div>
            <Dialog.Close asChild>
              <button
                className="rounded-full border border-transparent p-2 text-zinc-500 transition hover:border-zinc-200 hover:text-zinc-900 dark:hover:border-zinc-800 dark:hover:text-white text-2xl leading-none"
                aria-label="Close modal"
              >
                ×
              </button>
            </Dialog.Close>
          </div>

          <div className="hubspot-form-wrapper">
            {open && !formRendered && !loadError && (
              <div className="flex items-center justify-center py-12">
                <div className="h-8 w-8 animate-spin rounded-full border-4 border-purple-200 border-t-purple-600" />
              </div>
            )}
            {loadError && (
              <div className="space-y-4 rounded-xl border border-rose-100 bg-rose-50 p-4 text-sm text-rose-700 dark:border-rose-900/40 dark:bg-rose-900/10 dark:text-rose-200">
                <p>{loadError}</p>
                <a
                  href={hubspotUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-purple-600 underline-offset-2 hover:underline"
                >
                  Open the HubSpot form in a new tab
                </a>
              </div>
            )}
            <div ref={containerRef} className="hs-form-frame" />
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

