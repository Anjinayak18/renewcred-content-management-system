import Link from "next/link";
import { notFound } from "next/navigation";
import { CalendarDays, ChevronRight, User } from "lucide-react";

interface CmsPage {
  id: string;
  slug: string;
  title: string;
  content: string;
  author: string;
  publishedAt: string;
}

const pages: CmsPage[] = [
  {
    id: "1",
    slug: "getting-started",
    title: "Getting Started with Our CMS",
    content: `
Welcome to our Content Management System.

This platform allows administrators to create, edit, publish and manage website content efficiently.

Our CMS is built using modern technologies including Next.js, TypeScript, Node.js and Tailwind CSS.

You can easily manage pages, media, users and much more from the administration dashboard.
`,
    author: "Admin",
    publishedAt: "2026-07-10"
  },
  {
    id: "2",
    slug: "modern-websites",
    title: "Building Modern Websites",
    content: `
Modern web applications focus on speed, accessibility and scalability.

Our CMS provides a production-ready architecture suitable for enterprise applications.
`,
    author: "Editor",
    publishedAt: "2026-07-12"
  },
  {
    id: "3",
    slug: "content-strategy",
    title: "Content Strategy Guide",
    content: `
A strong content strategy helps organizations publish consistent, engaging and valuable information.

Our CMS simplifies content workflows for teams of every size.
`,
    author: "Admin",
    publishedAt: "2026-07-14"
  }
];

interface PageProps {
  params: {
    slug: string;
  };
}

export default function PageDetails({
  params
}: PageProps) {
  const page = pages.find(
    (item) => item.slug === params.slug
  );

  if (!page) {
    notFound();
  }

  return (
    <section className="section">
      <div className="container-custom max-w-4xl">
        <nav className="mb-8 flex items-center gap-2 text-sm text-muted">
          <Link href="/">Home</Link>

          <ChevronRight size={16} />

          <Link href="/pages">Pages</Link>

          <ChevronRight size={16} />

          <span>{page.title}</span>
        </nav>

        <article className="card">
          <h1 className="text-4xl font-bold">
            {page.title}
          </h1>

          <div className="mt-6 flex flex-wrap gap-6 text-sm text-muted">
            <div className="flex items-center gap-2">
              <User size={18} />

              <span>{page.author}</span>
            </div>

            <div className="flex items-center gap-2">
              <CalendarDays size={18} />

              <span>
                {new Date(
                  page.publishedAt
                ).toLocaleDateString()}
              </span>
            </div>
          </div>

          <div className="prose mt-10 max-w-none dark:prose-invert">
            {page.content
              .trim()
              .split("\n")
              .filter(Boolean)
              .map((paragraph, index) => (
                <p
                  key={index}
                  className="mb-5 leading-8"
                >
                  {paragraph}
                </p>
              ))}
          </div>

          <div className="mt-12 border-t border-default pt-6">
            <Link
              href="/pages"
              className="font-medium text-primary"
            >
              ← Back to All Pages
            </Link>
          </div>
        </article>
      </div>
    </section>
  );
}