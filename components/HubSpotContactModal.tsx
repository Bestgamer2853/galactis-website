"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { useEffect, useId, useRef, useState } from "react";
import { trackEvent } from "@/lib/analytics";
import { getSalesFormUrl } from "@/lib/hubspotForms";

declare global {
  interface Window {
    hbspt?: {
      forms?: {
        create: (config: {
          region: string;
          portalId: string;
          formId: string;
          target: string;
        }) => void;
      };
    };
  }
}

export interface HubSpotContactModalProps {
  triggerText?: string;
  triggerClassName?: string;
  title?: string;
  description?: string;
  variant?: "modal" | "link";
}

export default function HubSpotContactModal({
  triggerText = "Contact Sales",
  triggerClassName = "rounded-md bg-purple-600 px-4 py-2 text-sm font-semibold text-white hover:bg-purple-700",
  title = "Contact Sales",
  description = "Tell us about your needs. Our team will contact you within 24 hours.",
  variant = "modal",
}: HubSpotContactModalProps) {
  const hubspotUrl = getSalesFormUrl();

  if (variant === "link") {
    return (
      <a
        data-contact-trigger
        data-intent="sales"
        href={hubspotUrl}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => trackEvent("contact_clicked", { source: "hubspot_redirect" })}
        className={triggerClassName}
      >
        {triggerText}
      </a>
    );
  }

  const [open, setOpen] = useState(false);
  const [scriptLoaded, setScriptLoaded] = useState(false);
  const [formRendered, setFormRendered] = useState(false);
  const formContainerRef = useRef<HTMLDivElement>(null);
  const formContainerId = useId();

  useEffect(() => {
    const region = process.env.NEXT_PUBLIC_HUBSPOT_REGION?.trim()?.toLowerCase();
    const customScriptHost = process.env.NEXT_PUBLIC_HUBSPOT_EMBED_HOST?.trim();
    const scriptHost = customScriptHost || (region === "eu1" ? "https://js-eu1.hsforms.net" : "https://js.hsforms.net");
    const scriptSrc = `${scriptHost}/forms/embed/v2.js`;

    const existingScript = document.querySelector(`script[src="${scriptSrc}"]`);

    if (existingScript) {
      setScriptLoaded(true);
      return;
    }

    const script = document.createElement("script");
    script.src = scriptSrc;
    script.async = true;
    script.onload = () => setScriptLoaded(true);
    document.body.appendChild(script);
  }, []);

  useEffect(() => {
    if (open && scriptLoaded && !formRendered && formContainerRef.current) {
      const portalId = process.env.NEXT_PUBLIC_HUBSPOT_PORTAL_ID || "244419566";
      const formId = process.env.NEXT_PUBLIC_HUBSPOT_FORM_ID || "6c799ea3-a0a4-45b4-9b2b-ce89d117aa4d";
      const region = process.env.NEXT_PUBLIC_HUBSPOT_REGION?.trim() || "na1";

      if (typeof window !== "undefined" && window.hbspt?.forms) {
        window.hbspt.forms.create({
          region,
          portalId,
          formId,
          target: `#${formContainerId}`,
        });
        setFormRendered(true);
      }

      trackEvent("contact_modal_opened", { source: "hubspot_form" });
    }
  }, [open, scriptLoaded, formRendered, formContainerId]);

  return (
    <Dialog.Root
      open={open}
      onOpenChange={(value) => {
        setOpen(value);
        if (!value) {
          setFormRendered(false);
        }
      }}
    >
      <Dialog.Trigger asChild>
        <button
          data-contact-trigger
          data-intent="sales"
          className={triggerClassName}
          onClick={() => trackEvent("contact_clicked", { source: "hubspot_modal" })}
        >
          {triggerText}
        </button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm" />
        <Dialog.Content className="fixed inset-x-0 bottom-0 z-50 max-h-[95vh] w-full overflow-y-auto rounded-t-3xl border border-zinc-200 bg-white p-4 shadow-2xl focus:outline-none dark:border-zinc-800 dark:bg-zinc-950 sm:inset-auto sm:left-1/2 sm:top-1/2 sm:max-h-[90vh] sm:w-[90vw] sm:max-w-2xl sm:-translate-x-1/2 sm:-translate-y-1/2 sm:rounded-2xl sm:p-6 md:p-8">
          <div className="mb-6 flex items-start justify-between gap-6">
            <div>
              <Dialog.Title className="text-lg font-semibold text-zinc-900 dark:text-white">{title}</Dialog.Title>
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
            {open && !formRendered && (
              <div className="flex items-center justify-center py-12">
                <div className="h-8 w-8 animate-spin rounded-full border-4 border-purple-200 border-t-purple-600" />
              </div>
            )}
            <div ref={formContainerRef} id={formContainerId} className="hs-form-frame" />
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
