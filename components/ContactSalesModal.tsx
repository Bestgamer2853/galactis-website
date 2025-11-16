"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { trackEvent } from "@/lib/analytics";

const schema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  company: z.string().min(2),
  phone: z.string().optional(),
  message: z.string().min(5),
});

type FormValues = z.infer<typeof schema>;

export default function ContactSalesModal() {
  const [open, setOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormValues>({ resolver: zodResolver(schema) });

  async function onSubmit(values: FormValues) {
    try {
      await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      setSubmitted(true);
      reset();
      trackEvent("contact_sales_submitted");
    } catch {
      // no-op for now
    }
  }

  return (
    <Dialog.Root
      open={open}
      onOpenChange={(value) => {
        setOpen(value);
        if (value) {
          setSubmitted(false);
          trackEvent("contact_sales_opened");
        } else {
          reset();
        }
      }}
    >
      <Dialog.Trigger asChild>
        <button className="rounded-md bg-purple-600 px-4 py-2 text-sm font-semibold text-white hover:bg-purple-700">
          Contact Sales
        </button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm" />
        <Dialog.Content className="fixed inset-x-0 bottom-0 z-50 max-h-[90vh] w-full overflow-y-auto rounded-t-3xl border border-zinc-200 bg-white p-6 shadow-2xl focus:outline-none dark:border-zinc-800 dark:bg-zinc-950 sm:inset-auto sm:left-1/2 sm:top-1/2 sm:max-h-[80vh] sm:w-[90vw] sm:max-w-lg sm:-translate-x-1/2 sm:-translate-y-1/2 sm:rounded-2xl sm:p-8">
          <div className="flex items-start justify-between gap-6">
            <div>
              <Dialog.Title className="text-lg font-semibold text-zinc-900 dark:text-white">Contact Sales</Dialog.Title>
          <Dialog.Description className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
            Tell us about your needs. Our team will contact you within 24 hours.
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
              <div className="grid gap-4 sm:grid-cols-2">
              <div>
                  <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-200">Name</label>
                  <input
                    className="mt-1 w-full rounded-lg border border-zinc-300 px-4 py-2.5 text-sm text-zinc-900 focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-100 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100 dark:focus:border-purple-500 dark:focus:ring-purple-900/30"
                    {...register("name")}
                  />
                {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>}
              </div>
              <div>
                  <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-200">Email</label>
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
                  <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-200">Company</label>
                  <input
                    className="mt-1 w-full rounded-lg border border-zinc-300 px-4 py-2.5 text-sm text-zinc-900 focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-100 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100 dark:focus:border-purple-500 dark:focus:ring-purple-900/30"
                    {...register("company")}
                  />
                {errors.company && <p className="mt-1 text-sm text-red-600">{errors.company.message}</p>}
              </div>
              <div>
                  <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-200">
                    Phone <span className="text-xs text-zinc-500">(optional)</span>
                  </label>
                  <input
                    className="mt-1 w-full rounded-lg border border-zinc-300 px-4 py-2.5 text-sm text-zinc-900 focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-100 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100 dark:focus:border-purple-500 dark:focus:ring-purple-900/30"
                    {...register("phone")}
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-200">Message</label>
                <textarea
                  className="mt-1 w-full resize-y rounded-lg border border-zinc-300 px-4 py-3 text-sm text-zinc-900 focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-100 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100 dark:focus:border-purple-500 dark:focus:ring-purple-900/30"
                  rows={4}
                  {...register("message")}
                />
                {errors.message && <p className="mt-1 text-sm text-red-600">{errors.message.message}</p>}
              </div>
              <div className="flex flex-col gap-3 pt-2 sm:flex-row sm:justify-end">
                <Dialog.Close asChild>
                  <button className="w-full rounded-lg border border-zinc-300 px-4 py-2 text-sm font-medium text-zinc-700 transition hover:bg-zinc-50 dark:border-zinc-700 dark:text-zinc-200 dark:hover:bg-zinc-900 sm:w-auto">
                    Cancel
                  </button>
                </Dialog.Close>
                <button
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

