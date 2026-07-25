"use client";

import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";

import AdminLayout from "@/components/layout/AdminLayout";
import ProtectedRoute from "@/components/layout/ProtectedRoute";

import Button from "@/components/common/Button";
import Input from "@/components/common/Input";
import Modal from "@/components/common/Modal";
import Pagination from "@/components/common/Pagination";
import Table, {
  TableColumn
} from "@/components/common/Table";

import PageForm, {
  PageFormValues
} from "@/components/pages/PageForm";

import {
  Page,
  fetchPages,
  createPage,
  updatePage,
  setSearchFilter,
  setSelectedPage,
  setStatusFilter
} from "@/store/slices/pageSlice";

import { useAppDispatch } from "@/hooks/useAppDispatch";
import { useAppSelector } from "@/hooks/useAppSelector";

const PAGE_SIZE = 10;

export default function PagesPage() {
  const dispatch = useAppDispatch();

  const {
    pages,
    selectedPage,
    filters,
    loading
  } = useAppSelector((state) => state.page);

  const [currentPage, setCurrentPage] =
    useState(1);

  const [isModalOpen, setIsModalOpen] =
    useState(false);

  const [isSubmitting, setIsSubmitting] =
    useState(false);

  // Load pages on mount
  useEffect(() => {
    const loadPages = async () => {
      await dispatch(fetchPages());
      setCurrentPage(1);
    };
    loadPages();
  }, [dispatch]);

  const filteredPages = useMemo(() => {
    return pages.filter((page) => {
      const matchesSearch =
        page.title
          .toLowerCase()
          .includes(
            filters.search.toLowerCase()
          ) ||
        page.slug
          .toLowerCase()
          .includes(
            filters.search.toLowerCase()
          );

      const matchesStatus =
        filters.status === "all" ||
        page.status === filters.status;

      return (
        matchesSearch && matchesStatus
      );
    });
  }, [pages, filters]);

  const totalPages = Math.max(
    1,
    Math.ceil(
      filteredPages.length / PAGE_SIZE
    )
  );

  const paginatedPages =
    filteredPages.slice(
      (currentPage - 1) * PAGE_SIZE,
      currentPage * PAGE_SIZE
    );

  const handleCreate = () => {
    dispatch(setSelectedPage(null));
    setIsModalOpen(true);
  };

  const handleEdit = (page: Page) => {
    dispatch(setSelectedPage(page));
    setIsModalOpen(true);
  };

  const handleSubmit = async (
    data: PageFormValues
  ) => {
    try {
      setIsSubmitting(true);

      if (selectedPage) {
        await dispatch(
          updatePage({
            id: selectedPage.id,
            data
          })
        ).unwrap();

        toast.success(
          "Page updated successfully."
        );
      } else {
        await dispatch(
          createPage(data)
        ).unwrap();

        toast.success(
          "Page created successfully."
        );
      }

      setIsModalOpen(false);
      setCurrentPage(1);
      
      // Refetch pages to ensure UI is up to date
      await dispatch(fetchPages());
    } catch (error: any) {
      console.error(error);

      toast.error(
        error?.message ||
          "Unable to save page."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const columns: TableColumn<Page>[] = [
    {
      key: "title",
      title: "Title"
    },
    {
      key: "slug",
      title: "Slug"
    },
    {
      key: "status",
      title: "Status",
      render: (page) => (
        <span
          className={`badge ${
            page.status ===
            "published"
              ? "badge-success"
              : "badge-warning"
          }`}
        >
          {page.status}
        </span>
      )
    },
    {
      key: "actions",
      title: "Actions",
      render: (page) => (
        <Button
          size="sm"
          onClick={() =>
            handleEdit(page)
          }
        >
          Edit
        </Button>
      )
    }
  ];

  return (
    <ProtectedRoute>
      <AdminLayout>
        <div className="space-y-6">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <h1 className="text-3xl font-bold">
              Pages
            </h1>

            <Button
              onClick={handleCreate}
            >
              Create Page
            </Button>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <Input
              placeholder="Search pages..."
              value={filters.search}
              onChange={(e) =>
                dispatch(
                  setSearchFilter(
                    e.target.value
                  )
                )
              }
            />

            <select
              className="input"
              value={filters.status}
              onChange={(e) =>
                dispatch(
                  setStatusFilter(
                    e.target
                      .value as
                      | "all"
                      | "draft"
                      | "published"
                  )
                )
              }
            >
              <option value="all">
                All Status
              </option>

              <option value="draft">
                Draft
              </option>

              <option value="published">
                Published
              </option>
            </select>
          </div>

          <Table
            columns={columns}
            data={paginatedPages}
            loading={loading}
            rowKey={(page) => page.id}
          />

          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={
              setCurrentPage
            }
          />

          <Modal
            isOpen={isModalOpen}
            title={
              selectedPage
                ? "Edit Page"
                : "Create Page"
            }
            onClose={() =>
              setIsModalOpen(false)
            }
            size="lg"
          >
            <PageForm
              initialData={
                selectedPage ||
                undefined
              }
              loading={isSubmitting}
              onSubmit={
                handleSubmit
              }
            />
          </Modal>
        </div>
      </AdminLayout>
    </ProtectedRoute>
  );
}