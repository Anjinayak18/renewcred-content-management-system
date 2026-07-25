"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { ArrowRight, Search } from "lucide-react";

interface CmsPage {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  publishedAt: string;
  author: string;
}

const PAGE_SIZE = 6;

// Replace this mock data with API data later.
const mockPages: CmsPage[] = [
  {
    id: "1",
    title: "Getting Started with Our CMS",
    slug: "getting-started",
    excerpt:
      "Learn how to create, edit and publish content using our CMS platform.",
    publishedAt: "2026-07-10",
    author: "Admin"
  },
  {
    id: "2",
    title: "Building Modern Websites",
    slug: "modern-websites",
    excerpt:
      "Discover modern development practices using Next.js and TypeScript.",
    publishedAt: "2026-07-12",
    author: "Editor"
  },
  {
    id: "3",
    title: "Content Strategy Guide",
    slug: "content-strategy",
    excerpt:
      "Best practices for creating engaging and effective website content.",
    publishedAt: "2026-07-14",
    author: "Admin"
  }
];

export default function PagesPage() {
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] =
    useState(1);

  const filteredPages = useMemo(() => {
    return mockPages.filter(
      (page) =>
        page.title
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        page.excerpt
          .toLowerCase()
          .includes(search.toLowerCase())
    );
  }, [search]);

  const totalPages = Math.max(
    1,
    Math.ceil(filteredPages.length / PAGE_SIZE)
  );

  const paginatedPages = filteredPages.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE
  );

  return (
    <section className="section">
      <div className="container-custom">
        <div className="mb-12 text-center">
          <h1 className="section-title">
            Published Pages
          </h1>

          <p className="section-subtitle">
            Browse all published content from our
            CMS.
          </p>
        </div>

        <div className="relative mx-auto mb-10 max-w-xl">
          <Search
            size={20}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-muted"
          />

          <input
            className="input pl-12"
            placeholder="Search pages..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setCurrentPage(1);
            }}
          />
        </div>

        {paginatedPages.length === 0 ? (
          <div className="card text-center">
            <h2 className="text-xl font-semibold">
              No pages found
            </h2>

            <p className="mt-3 text-muted">
              Try searching with different
              keywords.
            </p>
          </div>
        ) : (
          <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
            {paginatedPages.map((page) => (
              <article
                key={page.id}
                className="card flex flex-col"
              >
                <div className="mb-4 text-sm text-muted">
                  {page.author} •{" "}
                  {new Date(
                    page.publishedAt
                  ).toLocaleDateString()}
                </div>

                <h2 className="text-2xl font-semibold">
                  {page.title}
                </h2>

                <p className="mt-4 flex-1 text-muted">
                  {page.excerpt}
                </p>

                <Link
                  href={`/pages/${page.slug}`}
                  className="mt-6 inline-flex items-center gap-2 font-medium text-primary"
                >
                  Read More
                  <ArrowRight size={18} />
                </Link>
              </article>
            ))}
          </div>
        )}

        {totalPages > 1 && (
          <div className="mt-12 flex justify-center gap-2">
            {Array.from(
              { length: totalPages },
              (_, index) => index + 1
            ).map((page) => (
              <button
                key={page}
                className={`h-10 w-10 rounded-lg border transition ${
                  currentPage === page
                    ? "bg-primary text-white"
                    : "border-default"
                }`}
                onClick={() =>
                  setCurrentPage(page)
                }
              >
                {page}
              </button>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}