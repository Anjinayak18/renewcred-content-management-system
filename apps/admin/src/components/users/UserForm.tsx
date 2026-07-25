"use client";

import { FormEvent, useEffect, useState } from "react";

import Button from "@/components/common/Button";
import Input from "@/components/common/Input";

export interface UserFormValues {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: "ADMIN" | "EDITOR" | "AUTHOR";
  isActive: boolean;
}

interface UserFormProps {
  initialData?: Partial<UserFormValues>;
  loading?: boolean;
  onSubmit: (data: UserFormValues) => void;
}

export default function UserForm({
  initialData,
  loading = false,
  onSubmit,
}: UserFormProps) {
  const [formData, setFormData] = useState<UserFormValues>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    role: "AUTHOR",
    isActive: true,
  });

  const [errors, setErrors] = useState<
    Partial<Record<keyof UserFormValues, string>>
  >({});

  useEffect(() => {
    if (!initialData) return;

    setFormData({
      firstName: initialData.firstName ?? "",
      lastName: initialData.lastName ?? "",
      email: initialData.email ?? "",
      password: "",
      role: initialData.role ?? "AUTHOR",
      isActive: initialData.isActive ?? true,
    });
  }, [initialData]);

  const validate = () => {
    const validationErrors: Partial<
      Record<keyof UserFormValues, string>
    > = {};

    if (!formData.firstName.trim()) {
      validationErrors.firstName = "First name is required.";
    }

    if (!formData.lastName.trim()) {
      validationErrors.lastName = "Last name is required.";
    }

    if (!formData.email.trim()) {
      validationErrors.email = "Email is required.";
    }

    if (
      !initialData &&
      formData.password.trim().length < 8
    ) {
      validationErrors.password =
        "Password must be at least 8 characters.";
    }

    setErrors(validationErrors);

    return Object.keys(validationErrors).length === 0;
  };

  const handleSubmit = (
    e: FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    if (!validate()) return;

    onSubmit(formData);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-5"
    >
      <div className="grid grid-cols-2 gap-4">
        <Input
          label="First Name"
          value={formData.firstName}
          error={errors.firstName}
          onChange={(e) =>
            setFormData((prev) => ({
              ...prev,
              firstName: e.target.value,
            }))
          }
        />

        <Input
          label="Last Name"
          value={formData.lastName}
          error={errors.lastName}
          onChange={(e) =>
            setFormData((prev) => ({
              ...prev,
              lastName: e.target.value,
            }))
          }
        />
      </div>

      <Input
        label="Email"
        type="email"
        value={formData.email}
        error={errors.email}
        onChange={(e) =>
          setFormData((prev) => ({
            ...prev,
            email: e.target.value,
          }))
        }
      />

      <Input
        label="Password"
        type="password"
        placeholder={
          initialData
            ? "Leave blank to keep current password"
            : "Enter password"
        }
        value={formData.password}
        error={errors.password}
        onChange={(e) =>
          setFormData((prev) => ({
            ...prev,
            password: e.target.value,
          }))
        }
      />

      <div>
        <label className="mb-2 block text-sm font-medium">
          Role
        </label>

        <select
          className="input"
          value={formData.role}
          onChange={(e) =>
            setFormData((prev) => ({
              ...prev,
              role: e.target.value as
                | "ADMIN"
                | "EDITOR"
                | "AUTHOR",
            }))
          }
        >
          <option value="ADMIN">Administrator</option>
          <option value="EDITOR">Editor</option>
          <option value="AUTHOR">Author</option>
        </select>
      </div>

      <div className="flex items-center gap-3">
        <input
          id="isActive"
          type="checkbox"
          checked={formData.isActive}
          onChange={(e) =>
            setFormData((prev) => ({
              ...prev,
              isActive: e.target.checked,
            }))
          }
        />

        <label htmlFor="isActive">
          Active User
        </label>
      </div>

      <div className="flex justify-end">
        <Button
          type="submit"
          loading={loading}
        >
          {initialData
            ? "Update User"
            : "Create User"}
        </Button>
      </div>
    </form>
  );
}