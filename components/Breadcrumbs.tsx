import Link from "next/link";

type BreadcrumbItem = {
  label: string;
  href?: string;
};

export default function Breadcrumbs({ items }: { items: BreadcrumbItem[] }) {
  return (
    <nav aria-label="Breadcrumb" className="mb-6 text-sm text-zinc-600 dark:text-zinc-400">
      <ol className="flex flex-wrap items-center gap-2">
        {items.map((item, index) => (
          <li key={item.label} className="flex items-center gap-2">
            {item.href ? (
              <Link href={item.href} className="hover:text-purple-600">
                {item.label}
              </Link>
            ) : (
              <span aria-current="page" className="font-medium text-zinc-900 dark:text-zinc-100">
                {item.label}
              </span>
            )}
            {index < items.length - 1 && <span className="text-zinc-400">/</span>}
          </li>
        ))}
      </ol>
    </nav>
  );
}

