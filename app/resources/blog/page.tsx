import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-black">
      <Navbar />
      <main className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">Blog</h1>
        <p className="mt-4 text-zinc-700 dark:text-zinc-300">Thought leadership and technical tutorials from the Galactis.ai engineering, product, and strategy teams.</p>
        <div className="mt-8 space-y-6">
          {[
            {
              title: "The Five Essential Pillars of Technology Value Optimization",
              date: "October 2025",
              summary: "How CIOs align IT spend with business outcomes using continuous benchmarking and AI-driven insights.",
            },
            {
              title: "Architecting Agentic Workflows for High-Regulation Sectors",
              date: "September 2025",
              summary: "Design patterns for orchestrating AI agents with human approvals, compliance guardrails, and audit trails.",
            },
            {
              title: "Closing the Loop on Network Automation",
              date: "August 2025",
              summary: "Implementing observability-driven runbooks that repair incidents autonomously and capture learning back into the platform.",
            },
          ].map((post) => (
            <article key={post.title} className="rounded-xl border border-zinc-200 p-6 dark:border-zinc-800">
              <p className="text-xs uppercase tracking-wide text-purple-600">{post.date}</p>
              <h2 className="mt-2 text-xl font-semibold text-zinc-900 dark:text-zinc-100">{post.title}</h2>
              <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">{post.summary}</p>
              <a href="#" className="mt-4 inline-block text-sm font-semibold text-purple-600 hover:text-purple-700">
                Read article →
              </a>
            </article>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}

