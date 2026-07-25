"use client";

import { FormEvent, useEffect, useState } from "react";

import Button from "@/components/common/Button";
import Input from "@/components/common/Input";

import type { Page } from "@/store/slices/pageSlice";

interface PageFormProps {
  initialData?: Page;
  loading?: boolean;
  onSubmit: (data: PageFormValues) => void;
}

export interface PageFormValues {
  title: string;
  slug: string;
  content: string;
  status: "draft" | "published";
}

export default function PageForm({
  initialData,
  loading = false,
  onSubmit
}: PageFormProps) {
  const [formData, setFormData] =
    useState<PageFormValues>({
      title: "",
      slug: "",
      content: "",
      status: "draft"
    });

  const [errors, setErrors] = useState<
    Partial<Record<keyof PageFormValues, string>>
  >({});

  useEffect(() => {
    if (!initialData) return;

    setFormData({
      title: initialData.title,
      slug: initialData.slug,
      content: initialData.content,
      status: initialData.status
    });
  }, [initialData]);

  const generateSlug = (value: string) =>
    value
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-");

  const handleTitleChange = (
    value: string
  ) => {
    setFormData((prev) => ({
      ...prev,
      title: value,
      slug: generateSlug(value)
    }));
  };

  const validate = () => {
    const validationErrors: Partial<
      Record<keyof PageFormValues, string>
    > = {};

    if (!formData.title.trim()) {
      validationErrors.title =
        "Title is required.";
    }

    if (!formData.slug.trim()) {
      validationErrors.slug =
        "Slug is required.";
    }

    if (!formData.content.trim()) {
      validationErrors.content =
        "Content is required.";
    }

    setErrors(validationErrors);

    return (
      Object.keys(validationErrors).length ===
      0
    );
  };

  const handleSubmit = (
  event: FormEvent<HTMLFormElement>
) => {
  event.preventDefault();

  console.log("FORM SUBMITTED");
  console.log(formData);

  if (!validate()) return;

  onSubmit(formData);
};
  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6"
    >
      <Input
        label="Title"
        value={formData.title}
        error={errors.title}
        placeholder="Enter page title"
        onChange={(e) =>
          handleTitleChange(e.target.value)
        }
      />

      <Input
        label="Slug"
        value={formData.slug}
        error={errors.slug}
        placeholder="page-slug"
        onChange={(e) =>
          setFormData((prev) => ({
            ...prev,
            slug: e.target.value
          }))
        }
      />

      <div>
        <label className="mb-2 block text-sm font-medium">
          Content
        </label>

        <textarea
          rows={10}
          value={formData.content}
          onChange={(e) =>
            setFormData((prev) => ({
              ...prev,
              content: e.target.value
            }))
          }
          className={`input resize-none ${
            errors.content
              ? "border-red-500"
              : ""
          }`}
          placeholder="Write page content..."
        />

        {errors.content && (
          <p className="mt-2 text-sm text-red-600">
            {errors.content}
          </p>
        )}
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium">
          Status
        </label>

        <select
          value={formData.status}
          className="input"
          onChange={(e) =>
            setFormData((prev) => ({
              ...prev,
              status: e.target
                .value as PageFormValues["status"]
            }))
          }
        >
          <option value="draft">
            Draft
          </option>

          <option value="published">
            Published
          </option>
        </select>
      </div>

      <div className="flex justify-end">
        <Button
          type="submit"
          loading={loading}
        >
          {initialData
            ? "Update Page"
            : "Create Page"}
        </Button>
      </div>
    </form>
  );
}