import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function GettingStartedPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-black">
      <Navbar />
      <main className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">Quick Start</h1>
        <ol className="mt-6 list-decimal space-y-3 pl-5 text-zinc-700 dark:text-zinc-300">
          <li>Obtain an API key from the Developer Console.</li>
          <li>Set the API base URL and authenticate requests.</li>
          <li>Create your first agent and execute a test action.</li>
        </ol>
      </main>
      <Footer />
    </div>
  );
}

