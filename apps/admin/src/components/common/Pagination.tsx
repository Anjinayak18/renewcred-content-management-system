"use client";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  disabled?: boolean;
}

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  disabled = false
}: PaginationProps) {
  if (totalPages <= 1) {
    return null;
  }

  const pages = Array.from(
    { length: totalPages },
    (_, index) => index + 1
  );

  return (
    <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
      <button
        type="button"
        className="btn-secondary"
        disabled={disabled || currentPage === 1}
        onClick={() =>
          onPageChange(currentPage - 1)
        }
      >
        Previous
      </button>

      <div className="flex flex-wrap items-center gap-2">
        {pages.map((page) => (
          <button
            key={page}
            type="button"
            disabled={disabled}
            onClick={() => onPageChange(page)}
            className={`flex h-10 w-10 items-center justify-center rounded-lg border transition ${
              currentPage === page
                ? "border-primary bg-primary text-white"
                : "border-border bg-white hover:bg-slate-100"
            }`}
          >
            {page}
          </button>
        ))}
      </div>

      <button
        type="button"
        className="btn-secondary"
        disabled={
          disabled ||
          currentPage === totalPages
        }
        onClick={() =>
          onPageChange(currentPage + 1)
        }
      >
        Next
      </button>
    </div>
  );
}