"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { trackEvent } from "@/lib/analytics";

type Values = { name: string; email: string; company: string };

export default function DownloadGateForm({ filePath }: { filePath: string }) {
  const { register, handleSubmit, formState: { isSubmitting } } = useForm<Values>();
  const [done, setDone] = useState(false);

  async function onSubmit() {
    setDone(true);
    // In production, send to HubSpot here
    // Trigger download
    const a = document.createElement("a");
    a.href = filePath;
    a.download = "";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    trackEvent("pack_downloaded", { filePath });
  }

  return (
    <form className="space-y-3" onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label className="block text-sm">Name</label>
        <input className="mt-1 w-full rounded-md border border-zinc-300 p-2 dark:border-zinc-700 dark:bg-zinc-900" {...register("name", { required: true })} />
      </div>
      <div>
        <label className="block text-sm">Email</label>
        <input className="mt-1 w-full rounded-md border border-zinc-300 p-2 dark:border-zinc-700 dark:bg-zinc-900" type="email" {...register("email", { required: true })} />
      </div>
      <div>
        <label className="block text-sm">Company</label>
        <input className="mt-1 w-full rounded-md border border-zinc-300 p-2 dark:border-zinc-700 dark:bg-zinc-900" {...register("company", { required: true })} />
      </div>
      <button disabled={isSubmitting} className="rounded-md bg-purple-600 px-4 py-2 text-sm font-semibold text-white hover:bg-purple-700 disabled:opacity-60">
        {done ? "Thanks! Downloading..." : "Download"}
      </button>
    </form>
  );
}

