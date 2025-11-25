"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { useState, useEffect, useRef } from "react";
import { trackEvent } from "@/lib/analytics";


export interface HubSpotContactModalProps {
  triggerText?: string;
  triggerClassName?: string;
  title?: string;
  description?: string;
}

export default function HubSpotContactModal({ 
  triggerText = "Contact Sales",
  triggerClassName = "rounded-md bg-purple-600 px-4 py-2 text-sm font-semibold text-white hover:bg-purple-700",
  title = "Contact Sales",
  description = "Tell us about your needs. Our team will contact you within 24 hours."
}: HubSpotContactModalProps) {
  const [open, setOpen] = useState(false);
  const [scriptLoaded, setScriptLoaded] = useState(false);
  const [formRendered, setFormRendered] = useState(false);
  const formContainerRef = useRef<HTMLDivElement>(null);

  // Preload HubSpot script on component mount for instant form display
  useEffect(() => {
    const scriptSrc = "https://js.hsforms.net/forms/v2.js";
    
    // Check if script already exists
    const existingScript = document.querySelector(`script[src="${scriptSrc}"]`);
    
    if (existingScript) {
      setScriptLoaded(true);
    } else {
      const script = document.createElement('script');
      script.src = scriptSrc;
      script.async = true;
      document.body.appendChild(script);

      script.onload = () => {
        setScriptLoaded(true);
      };
    }
  }, []);

  // Render form when modal opens and script is loaded
  useEffect(() => {
    if (open && scriptLoaded && !formRendered && formContainerRef.current) {
      const portalId = process.env.NEXT_PUBLIC_HUBSPOT_PORTAL_ID || "244419566";
      const formId = process.env.NEXT_PUBLIC_HUBSPOT_FORM_ID || "6c799ea3-a0a4-45b4-9b2b-ce89d117aa4d";
      const region = process.env.NEXT_PUBLIC_HUBSPOT_REGION || "na2";

      // Check if hbspt is available
      if (typeof window !== 'undefined' && (window as any).hbspt) {
        (window as any).hbspt.forms.create({
          region: region,
          portalId: portalId,
          formId: formId,
          target: formContainerRef.current,
        });
        setFormRendered(true);
      }

      trackEvent("contact_modal_opened", { source: "hubspot_form" });
    }

    // Reset form when modal closes
    if (!open && formRendered) {
      if (formContainerRef.current) {
        formContainerRef.current.innerHTML = '';
      }
      setFormRendered(false);
    }
  }, [open, scriptLoaded, formRendered]);

  return (
    <Dialog.Root
      open={open}
      onOpenChange={(value) => {
        setOpen(value);
      }}
    >
      <Dialog.Trigger asChild>
        <button 
          data-contact-trigger 
          data-intent="sales" 
          className={triggerClassName}
        >
          {triggerText}
        </button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm" />
        <Dialog.Content className="fixed inset-x-0 bottom-0 z-50 max-h-[95vh] w-full overflow-y-auto rounded-t-3xl border border-zinc-200 bg-white p-4 shadow-2xl focus:outline-none dark:border-zinc-800 dark:bg-zinc-950 sm:inset-auto sm:left-1/2 sm:top-1/2 sm:max-h-[90vh] sm:w-[90vw] sm:max-w-2xl sm:-translate-x-1/2 sm:-translate-y-1/2 sm:rounded-2xl sm:p-6 md:p-8">
          <div className="flex items-start justify-between gap-6 mb-6">
            <div>
              <Dialog.Title className="text-lg font-semibold text-zinc-900 dark:text-white">
                {title}
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
          
          {/* HubSpot form will load here */}
          <div className="hubspot-form-wrapper">
            {open && !formRendered && (
              <div className="flex items-center justify-center py-12">
                <div className="h-8 w-8 animate-spin rounded-full border-4 border-purple-200 border-t-purple-600"></div>
              </div>
            )}
            <div 
              ref={formContainerRef}
              className="hs-form-frame" 
            />
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

