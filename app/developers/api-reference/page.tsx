"use client";

import { RedocStandalone } from "redoc";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function APIReferencePage() {
  return (
    <div className="min-h-screen bg-white dark:bg-black">
      <Navbar />
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="h-[80vh] overflow-hidden rounded-lg border border-zinc-200 dark:border-zinc-800">
          {/* @ts-expect-error: redoc typings may not include specUrl in this version */}
          <RedocStandalone specUrl="/api-spec.yaml" />
        </div>
      </main>
      <Footer />
    </div>
  );
}

