"use client";

import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";

import mediaService, {
    resolveMediaUrl
} from "@/services/mediaService";

import AdminLayout from "@/components/layout/AdminLayout";
import ProtectedRoute from "@/components/layout/ProtectedRoute";

import Button from "@/components/common/Button";
import Input from "@/components/common/Input";
import Modal from "@/components/common/Modal";
import Pagination from "@/components/common/Pagination";

import MediaUpload from "@/components/media/MediaUpload";

import {
  fetchMedia,
  uploadMedia,
  setSearchFilter,
  setTypeFilter
} from "@/store/slices/mediaSlice";

import { useAppDispatch } from "@/hooks/useAppDispatch";
import { useAppSelector } from "@/hooks/useAppSelector";

const PAGE_SIZE = 12;

export default function MediaPage() {
  const dispatch = useAppDispatch();

  const {
    files,
    filters,
    uploading
  } = useAppSelector((state) => state.media);

  const [currentPage, setCurrentPage] =
    useState(1);

  const [uploadModalOpen, setUploadModalOpen] =
  useState(false);

useEffect(() => {
  dispatch(fetchMedia());
}, [dispatch]);

  const filteredFiles = useMemo(() => {
  return files.filter((file) => {
    const fileName =
      file.originalName ||
      file.filename ||
      "";

    const matchesSearch =
      fileName
        .toLowerCase()
        .includes(filters.search.toLowerCase());

    const mime =
      file.mimeType || "";

    const matchesType =
      filters.type === "all" ||
      mime.startsWith(filters.type);

    return matchesSearch && matchesType;
  });
}, [files, filters]);

  const totalPages = Math.max(
    1,
    Math.ceil(filteredFiles.length / PAGE_SIZE)
  );

  const paginatedFiles = filteredFiles.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE
  );

  const handleUpload = async (
  selectedFiles: File[]
) => {
  try {
    for (const file of selectedFiles) {
      await dispatch(uploadMedia(file)).unwrap();
    }

    await dispatch(fetchMedia()).unwrap();

    toast.success("Files uploaded successfully.");

    setUploadModalOpen(false);
  } catch (error) {
    console.error(error);
    toast.error("Upload failed.");
  }
};

  return (
    <ProtectedRoute>
      <AdminLayout>
        <div className="space-y-6">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <h1 className="text-3xl font-bold">
              Media Library
            </h1>

            <Button
              onClick={() =>
                setUploadModalOpen(true)
              }
            >
              Upload Media
            </Button>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <Input
              placeholder="Search media..."
              value={filters.search}
              onChange={(e) =>
                dispatch(
                  setSearchFilter(e.target.value)
                )
              }
            />

            <select
              className="input"
              value={filters.type}
              onChange={(e) =>
                dispatch(
                  setTypeFilter(
                    e.target.value as
                      | "all"
                      | "image"
                      | "video"
                      | "document"
                  )
                )
              }
            >
              <option value="all">
                All Types
              </option>

              <option value="image">
                Images
              </option>

              <option value="video">
                Videos
              </option>

              <option value="document">
                Documents
              </option>
            </select>
          </div>

          {paginatedFiles.length === 0 ? (
            <div className="card py-12 text-center">
              <p className="text-text-secondary">
                No media files found.
              </p>
            </div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {paginatedFiles.map((file) => (
                <div
                  key={file.id}
                  className="card"
                >
                  <div className="mb-4 flex h-40 items-center justify-center rounded-xl bg-slate-100">
                    {file.mimeType.startsWith("image") ? (
                      <img
                        src={resolveMediaUrl(file.url)}
                        
                        alt={file.originalName}
                        className="h-full w-full rounded-xl object-cover"
                      />
                    ) : (
                      <span className="text-5xl">
                        📄
                      </span>
                    )}
                  </div>

                  <h3 className="truncate font-semibold">
                    {file.originalName}
                  </h3>

                  <p className="mt-2 text-sm text-text-secondary">
                    {(file.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                </div>
              ))}
            </div>
          )}

          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />

          <Modal
            isOpen={uploadModalOpen}
            title="Upload Media"
            size="lg"
            onClose={() =>
              setUploadModalOpen(false)
            }
          >
            <MediaUpload
              uploading={uploading}
              onUpload={handleUpload}
            />
          </Modal>
        </div>
      </AdminLayout>
    </ProtectedRoute>
  );
}