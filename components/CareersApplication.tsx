"use client";

import { useCallback, useEffect, useId, useRef, useState } from "react";
import {
  HUBSPOT_PORTAL_ID,
  HUBSPOT_REGION,
  HUBSPOT_CAREERS_FORM_ID,
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

export default function CareersApplication({ 
  jobId, 
  onClose 
}: { 
  jobId?: number | null; 
  onClose?: () => void;
}) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const observerRef = useRef<MutationObserver | null>(null);
  const formContainerId = useId();
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

    if (observerRef.current) {
      observerRef.current.disconnect();
    }

    observerRef.current = new MutationObserver(() => {
      if (target.querySelector("iframe")) {
        setFormRendered(true);
        observerRef.current?.disconnect();
      }
    });

    observerRef.current.observe(target, { childList: true, subtree: true });

    window.hbspt.forms.create({
      region: HUBSPOT_REGION,
      portalId: HUBSPOT_PORTAL_ID,
      formId: HUBSPOT_CAREERS_FORM_ID,
      target: `#${formContainerId}`,
      onFormReady: () => setFormRendered(true),
    });

    setTimeout(() => {
      if (target.querySelector("iframe")) {
        setFormRendered(true);
        observerRef.current?.disconnect();
      }
    }, 3000);
  }, [formContainerId]);

  useEffect(() => {
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
          setLoadError("Unable to load HubSpot. Please try again later.");
        }
      });

    return () => {
      cancelled = true;
      observerRef.current?.disconnect();
      if (containerRef.current) {
        containerRef.current.innerHTML = "";
      }
    };
  }, [renderForm]);

  return (
    <div className="w-full">
      <div className="mb-4 flex items-start justify-between">
        <div>
          <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">Apply for Position</h3>
          <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
            Fill out the form below and we'll get back to you within 48 hours.
          </p>
        </div>
        {onClose && (
          <button
            onClick={onClose}
            className="rounded-full border border-transparent p-2 text-zinc-500 transition hover:border-zinc-200 hover:text-zinc-900 dark:hover:border-zinc-800 dark:hover:text-white text-2xl leading-none"
            aria-label="Close"
          >
            ×
          </button>
        )}
      </div>

      <div className="hubspot-form-wrapper">
        {!formRendered && !loadError && (
          <div className="flex items-center justify-center py-12">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-purple-200 border-t-purple-600" />
          </div>
        )}
        {loadError && (
          <div className="rounded-xl border border-rose-100 bg-rose-50 p-4 text-sm text-rose-700 dark:border-rose-900/40 dark:bg-rose-900/10 dark:text-rose-200">
            <p>{loadError}</p>
            <p className="mt-2">Please email your application directly to <a href="mailto:careers@galactis.ai" className="font-semibold underline">careers@galactis.ai</a></p>
          </div>
        )}
        <div ref={containerRef} className="hs-form-frame" />
      </div>
    </div>
  );
}

