"use client";

import { ReactNode } from "react";
import Loader from "@/components/common/Loader";

export interface TableColumn<T> {
  key: keyof T | string;
  title: string;
  render?: (row: T) => ReactNode;
  className?: string;
}

interface TableProps<T> {
  columns: TableColumn<T>[];
  data: T[];
  loading?: boolean;
  emptyMessage?: string;
  rowKey: (row: T) => string;
  onRowClick?: (row: T) => void;
}

export default function Table<T>({
  columns,
  data,
  loading = false,
  emptyMessage = "No records found.",
  rowKey,
  onRowClick
}: TableProps<T>) {
  if (loading) {
    return (
      <div className="card flex justify-center py-10">
        <Loader text="Loading data..." />
      </div>
    );
  }

  if (data.length === 0) {
    return (
      <div className="card py-10 text-center">
        <p className="text-text-secondary">
          {emptyMessage}
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-2xl border border-border bg-white shadow-card">
      <table className="min-w-full border-collapse">
        <thead className="bg-slate-50">
          <tr>
            {columns.map((column) => (
              <th
                key={String(column.key)}
                className={`border-b border-border px-6 py-4 text-left text-sm font-semibold ${column.className ?? ""}`}
              >
                {column.title}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {data.map((row) => (
            <tr
              key={rowKey(row)}
              onClick={() => onRowClick?.(row)}
              className={`border-b border-border transition hover:bg-slate-50 ${
                onRowClick ? "cursor-pointer" : ""
              }`}
            >
              {columns.map((column) => (
                <td
                  key={String(column.key)}
                  className={`px-6 py-4 text-sm ${column.className ?? ""}`}
                >
                  {column.render
                    ? column.render(row)
                    : String(
                        row[column.key as keyof T] ?? ""
                      )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}