import Link from "next/link";

interface PaginationProps {
  currentPage: number;
  totalItems: number;
  itemsPerPage: number;
  className?: string;
}

export default function Pagination({
  currentPage,
  totalItems,
  itemsPerPage,
  className = "",
}: PaginationProps) {
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const prevPage = currentPage > 1 ? currentPage - 1 : null;
  const nextPage = currentPage < totalPages ? currentPage + 1 : null;

  if (totalPages <= 1) return null;

  return (
    <div className={`flex justify-center ${className}`}>
      <nav className="flex items-center gap-2">
        {prevPage ? (
          <Link
            href={`?page=${prevPage}`}
            className="px-3 py-1 border border-gray-300 rounded hover:bg-gray-50"
          >
            Previous
          </Link>
        ) : (
          <button
            disabled
            className="px-3 py-1 border border-gray-300 rounded text-gray-400 cursor-not-allowed"
          >
            Previous
          </button>
        )}

        <span className="px-3 py-1">
          Page {currentPage} of {totalPages}
        </span>

        {nextPage ? (
          <Link
            href={`?page=${nextPage}`}
            className="px-3 py-1 border border-gray-300 rounded hover:bg-gray-50"
          >
            Next
          </Link>
        ) : (
          <button
            disabled
            className="px-3 py-1 border border-gray-300 rounded text-gray-400 cursor-not-allowed"
          >
            Next
          </button>
        )}
      </nav>
    </div>
  );
}
