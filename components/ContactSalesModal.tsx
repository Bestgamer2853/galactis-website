"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { useState, useMemo } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { trackEvent } from "@/lib/analytics";

// Types
export type FormIntent = "sales" | "partner" | "support";
export type PartnerType = "Reseller" | "Service Provider" | "Consulting" | "Build";

export interface ContactSalesModalProps {
  intent?: FormIntent;
  partnerType?: PartnerType;
}

// Validation schemas for different intents
const salesSchema = z.object({
  intent: z.literal("sales"),
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  company: z.string().min(2, "Company name must be at least 2 characters"),
  phone: z.string().optional(),
  message: z.string().min(10, "Please provide at least 10 characters describing your use case"),
});

const partnerSchema = z.object({
  intent: z.literal("partner"),
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  company: z.string().min(2, "Company name must be at least 2 characters"),
  website: z.string().optional().refine(
    (val) => !val || val === "" || z.string().url().safeParse(val).success,
    { message: "Please enter a valid website URL" }
  ),
  partnerType: z.enum(["Reseller", "Service Provider", "Consulting", "Build"]),
  regions: z.string().min(2, "Please specify at least one region"),
  businessSummary: z.string().min(20, "Please provide at least 20 characters about your business"),
  additionalInfo: z.string().optional(),
});

const supportSchema = z.object({
  intent: z.literal("support"),
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  accountId: z.string().optional(),
  issueCategory: z.string().min(1, "Please select an issue category"),
  message: z.string().min(10, "Please describe your issue in at least 10 characters"),
});

// Dynamic schema based on intent
function getSchema(intent: FormIntent) {
  switch (intent) {
    case "sales":
      return salesSchema;
    case "partner":
      return partnerSchema;
    case "support":
      return supportSchema;
  }
}

type SalesFormValues = z.infer<typeof salesSchema>;
type PartnerFormValues = z.infer<typeof partnerSchema>;
type SupportFormValues = z.infer<typeof supportSchema>;
type FormValues = SalesFormValues | PartnerFormValues | SupportFormValues;

export default function ContactSalesModal({ intent: initialIntent = "sales", partnerType: initialPartnerType }: ContactSalesModalProps) {
  const [open, setOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  // Intent is fixed based on prop - no switching allowed
  const intent = initialIntent;
  
  // Generate unique trigger ID based on intent and partnerType
  const triggerId = `contact-trigger-${initialIntent}-${initialPartnerType || "default"}`;

  const schema = useMemo(() => getSchema(intent), [intent]);
  const formMethods = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      intent,
      ...(initialPartnerType && intent === "partner" ? { partnerType: initialPartnerType } : {}),
    },
  });
  
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = formMethods;

  async function onSubmit(values: FormValues) {
    try {
      // Ensure intent is set
      const formData = { ...values, intent };
      const endpoint = intent === "partner" ? "/api/contact/partner" : "/api/contact";
      await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      setSubmitted(true);
      reset();
      trackEvent(`${intent}_form_submitted`, { 
        partnerType: intent === "partner" && "partnerType" in values ? values.partnerType : undefined 
      });
    } catch {
      // no-op for now
    }
  }

  const getTitle = () => {
    switch (intent) {
      case "sales":
        return "Contact Sales";
      case "partner":
        return "Apply to Partner Program";
      case "support":
        return "Contact Support";
    }
  };

  const getDescription = () => {
    switch (intent) {
      case "sales":
        return "Tell us about your needs. Our team will contact you within 24 hours.";
      case "partner":
        return "Share a few details and our partnerships team will get back to you.";
      case "support":
        return "Describe your issue and we'll help you resolve it quickly.";
    }
  };

  const issueCategories = [
    "Technical Issue",
    "Billing Question",
    "Account Access",
    "Feature Request",
    "General Inquiry",
  ];

  return (
    <Dialog.Root
      open={open}
      onOpenChange={(value) => {
        setOpen(value);
        if (value) {
          setSubmitted(false);
          trackEvent("contact_modal_opened", { intent });
        } else {
          // Reset form when modal closes
          reset();
        }
      }}
    >
      <Dialog.Trigger asChild>
        <button data-contact-trigger data-intent={initialIntent} data-partner-type={initialPartnerType} id={triggerId} className="hidden rounded-md bg-purple-600 px-4 py-2 text-sm font-semibold text-white hover:bg-purple-700">
          Contact Sales
        </button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm" />
        <Dialog.Content className="fixed inset-x-0 bottom-0 z-50 max-h-[95vh] w-full overflow-y-auto rounded-t-3xl border border-zinc-200 bg-white p-4 shadow-2xl focus:outline-none dark:border-zinc-800 dark:bg-zinc-950 sm:inset-auto sm:left-1/2 sm:top-1/2 sm:max-h-[90vh] sm:w-[90vw] sm:max-w-2xl sm:-translate-x-1/2 sm:-translate-y-1/2 sm:rounded-2xl sm:p-6 md:p-8">
          <div className="flex items-start justify-between gap-6">
            <div>
              <Dialog.Title className="text-lg font-semibold text-zinc-900 dark:text-white">{getTitle()}</Dialog.Title>
          <Dialog.Description className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
                {getDescription()}
          </Dialog.Description>
            </div>
            <Dialog.Close asChild>
              <button
                className="rounded-full border border-transparent p-2 text-zinc-500 transition hover:border-zinc-200 hover:text-zinc-900 dark:hover:border-zinc-800 dark:hover:text-white"
                aria-label="Close modal"
              >
                ×
              </button>
            </Dialog.Close>
          </div>
          {submitted ? (
            <div className="mt-6 space-y-4 rounded-xl bg-emerald-50 p-6 text-emerald-800 dark:bg-emerald-900/20 dark:text-emerald-200">
              <p className="text-base font-semibold">Thank you! Our team will reach out within 24 hours.</p>
              <p className="text-sm text-emerald-700/80 dark:text-emerald-200/80">
                Keep this window open if you want to submit another request.
              </p>
              <Dialog.Close asChild>
                <button className="w-full rounded-lg border border-emerald-200 px-4 py-2 text-sm font-semibold text-emerald-800 transition hover:bg-emerald-100 dark:border-emerald-800 dark:text-emerald-200 dark:hover:bg-emerald-900/40">
                  Close
                </button>
              </Dialog.Close>
            </div>
          ) : (
            <form className="mt-6 space-y-4" onSubmit={handleSubmit(onSubmit)}>
              {/* Sales Intent Fields */}
              {intent === "sales" && (
                <div key="sales-form-content">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-200">Name *</label>
                  <input
                    className="mt-1 w-full rounded-lg border border-zinc-300 px-4 py-2.5 text-sm text-zinc-900 focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-100 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100 dark:focus:border-purple-500 dark:focus:ring-purple-900/30"
                    {...register("name")}
                  />
                {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>}
              </div>
              <div>
                      <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-200">Email *</label>
                  <input
                    className="mt-1 w-full rounded-lg border border-zinc-300 px-4 py-2.5 text-sm text-zinc-900 focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-100 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100 dark:focus:border-purple-500 dark:focus:ring-purple-900/30"
                    type="email"
                    {...register("email")}
                  />
                {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>}
                </div>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
              <div>
                      <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-200">Company *</label>
                  <input
                    className="mt-1 w-full rounded-lg border border-zinc-300 px-4 py-2.5 text-sm text-zinc-900 focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-100 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100 dark:focus:border-purple-500 dark:focus:ring-purple-900/30"
                    {...register("company")}
                  />
                {"company" in errors && errors.company && <p className="mt-1 text-sm text-red-600">{errors.company.message}</p>}
              </div>
              <div>
                  <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-200">
                    Phone <span className="text-xs text-zinc-500">(optional)</span>
                  </label>
                  <input
                    className="mt-1 w-full rounded-lg border border-zinc-300 px-4 py-2.5 text-sm text-zinc-900 focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-100 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100 dark:focus:border-purple-500 dark:focus:ring-purple-900/30"
                        type="tel"
                    {...register("phone")}
                  />
                </div>
              </div>
              <div>
                    <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-200">
                      Use case / Project description *
                    </label>
                    <textarea
                      className="mt-1 w-full resize-y rounded-lg border border-zinc-300 px-4 py-3 text-sm text-zinc-900 focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-100 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100 dark:focus:border-purple-500 dark:focus:ring-purple-900/30"
                      rows={4}
                      {...register("message")}
                    />
                    {"message" in errors && errors.message && <p className="mt-1 text-sm text-red-600">{errors.message.message}</p>}
                  </div>
                </div>
              )}

              {/* Partner Intent Fields */}
              {intent === "partner" && (
                <div key="partner-form-content">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-200">Name *</label>
                      <input
                        className="mt-1 w-full rounded-lg border border-zinc-300 px-4 py-2.5 text-sm text-zinc-900 focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-100 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100 dark:focus:border-purple-500 dark:focus:ring-purple-900/30"
                        {...register("name")}
                      />
                      {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-200">Email *</label>
                      <input
                        className="mt-1 w-full rounded-lg border border-zinc-300 px-4 py-2.5 text-sm text-zinc-900 focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-100 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100 dark:focus:border-purple-500 dark:focus:ring-purple-900/30"
                        type="email"
                        {...register("email")}
                      />
                      {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>}
                    </div>
                  </div>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-200">Company *</label>
                      <input
                        className="mt-1 w-full rounded-lg border border-zinc-300 px-4 py-2.5 text-sm text-zinc-900 focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-100 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100 dark:focus:border-purple-500 dark:focus:ring-purple-900/30"
                        {...register("company")}
                      />
                      {"company" in errors && errors.company && <p className="mt-1 text-sm text-red-600">{errors.company.message}</p>}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-200">
                        Website <span className="text-xs text-zinc-500">(optional)</span>
                      </label>
                      <input
                        className="mt-1 w-full rounded-lg border border-zinc-300 px-4 py-2.5 text-sm text-zinc-900 focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-100 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100 dark:focus:border-purple-500 dark:focus:ring-purple-900/30"
                        type="url"
                        placeholder="https://example.com"
                        {...register("website")}
                      />
                      {"website" in errors && errors.website && <p className="mt-1 text-sm text-red-600">{errors.website.message}</p>}
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-200">Partner type *</label>
                    <select
                      className="mt-1 w-full rounded-lg border border-zinc-300 bg-white px-4 py-2.5 text-sm text-zinc-900 focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-100 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100 dark:focus:border-purple-500 dark:focus:ring-purple-900/30"
                      {...register("partnerType")}
                    >
                      <option value="">Select partner type...</option>
                      <option value="Reseller">Reseller</option>
                      <option value="Service Provider">Service Provider</option>
                      <option value="Consulting">Consulting</option>
                      <option value="Build">Build</option>
                    </select>
                    {"partnerType" in errors && errors.partnerType && <p className="mt-1 text-sm text-red-600">{errors.partnerType.message}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-200">Regions served *</label>
                    <input
                      className="mt-1 w-full rounded-lg border border-zinc-300 px-4 py-2.5 text-sm text-zinc-900 focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-100 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100 dark:focus:border-purple-500 dark:focus:ring-purple-900/30"
                      type="text"
                      placeholder="e.g., India, Southeast Asia, Global"
                      {...register("regions")}
                    />
                    {"regions" in errors && errors.regions && <p className="mt-1 text-sm text-red-600">{errors.regions.message}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-200">
                      Brief summary of your business *
                    </label>
                    <textarea
                      className="mt-1 w-full resize-y rounded-lg border border-zinc-300 px-4 py-3 text-sm text-zinc-900 focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-100 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100 dark:focus:border-purple-500 dark:focus:ring-purple-900/30"
                      rows={4}
                      {...register("businessSummary")}
                    />
                    {"businessSummary" in errors && errors.businessSummary && <p className="mt-1 text-sm text-red-600">{errors.businessSummary.message}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-200">
                      Anything else we should know <span className="text-xs text-zinc-500">(optional)</span>
                    </label>
                    <textarea
                      className="mt-1 w-full resize-y rounded-lg border border-zinc-300 px-4 py-3 text-sm text-zinc-900 focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-100 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100 dark:focus:border-purple-500 dark:focus:ring-purple-900/30"
                      rows={3}
                      {...register("additionalInfo")}
                    />
                  </div>
                </div>
              )}

              {/* Support Intent Fields */}
              {intent === "support" && (
                <div key="support-form-content">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-200">Name *</label>
                      <input
                        className="mt-1 w-full rounded-lg border border-zinc-300 px-4 py-2.5 text-sm text-zinc-900 focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-100 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100 dark:focus:border-purple-500 dark:focus:ring-purple-900/30"
                        {...register("name")}
                      />
                      {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-200">Email *</label>
                      <input
                        className="mt-1 w-full rounded-lg border border-zinc-300 px-4 py-2.5 text-sm text-zinc-900 focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-100 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100 dark:focus:border-purple-500 dark:focus:ring-purple-900/30"
                        type="email"
                        {...register("email")}
                      />
                      {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>}
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-200">
                      Account ID <span className="text-xs text-zinc-500">(optional)</span>
                    </label>
                    <input
                      className="mt-1 w-full rounded-lg border border-zinc-300 px-4 py-2.5 text-sm text-zinc-900 focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-100 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100 dark:focus:border-purple-500 dark:focus:ring-purple-900/30"
                      type="text"
                      {...register("accountId")}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-200">Issue category *</label>
                    <select
                      className="mt-1 w-full rounded-lg border border-zinc-300 bg-white px-4 py-2.5 text-sm text-zinc-900 focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-100 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100 dark:focus:border-purple-500 dark:focus:ring-purple-900/30"
                      {...register("issueCategory")}
                    >
                      <option value="">Select category...</option>
                      {issueCategories.map((category) => (
                        <option key={category} value={category}>
                          {category}
                        </option>
                      ))}
                    </select>
                    {"issueCategory" in errors && errors.issueCategory && <p className="mt-1 text-sm text-red-600">{errors.issueCategory.message}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-200">Message *</label>
                <textarea
                  className="mt-1 w-full resize-y rounded-lg border border-zinc-300 px-4 py-3 text-sm text-zinc-900 focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-100 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100 dark:focus:border-purple-500 dark:focus:ring-purple-900/30"
                  rows={4}
                  {...register("message")}
                />
                {"message" in errors && errors.message && <p className="mt-1 text-sm text-red-600">{errors.message.message}</p>}
              </div>
                </div>
              )}

              <div className="flex flex-col gap-3 pt-2 sm:flex-row sm:justify-end">
                <Dialog.Close asChild>
                  <button className="w-full rounded-lg border border-zinc-300 px-4 py-2 text-sm font-medium text-zinc-700 transition hover:bg-zinc-50 dark:border-zinc-700 dark:text-zinc-200 dark:hover:bg-zinc-900 sm:w-auto">
                    Cancel
                  </button>
                </Dialog.Close>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full rounded-lg bg-purple-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-purple-700 disabled:cursor-not-allowed disabled:opacity-70 sm:w-auto"
                >
                  {isSubmitting ? "Submitting..." : "Submit"}
                </button>
              </div>
            </form>
          )}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
