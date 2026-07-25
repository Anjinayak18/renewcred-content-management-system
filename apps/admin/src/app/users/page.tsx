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
  TableColumn,
} from "@/components/common/Table";

import UserForm, {
  UserFormValues,
} from "@/components/users/UserForm";

import {
  User,
  fetchUsers,
  createUser,
  updateUser,
  deleteUser,
  setSelectedUser,
} from "@/store/slices/userSlice";

import { useAppDispatch } from "@/hooks/useAppDispatch";
import { useAppSelector } from "@/hooks/useAppSelector";

const PAGE_SIZE = 10;

export default function UsersPage() {
  const dispatch = useAppDispatch();

  const {
    users,
    selectedUser,
    loading,
  } = useAppSelector(
    (state) => state.user
  );

  const [search, setSearch] =
    useState("");

  const [currentPage, setCurrentPage] =
    useState(1);

  const [isModalOpen, setIsModalOpen] =
    useState(false);

  const [isSubmitting, setIsSubmitting] =
    useState(false);

  /**
   * ===========================
   * Load Users
   * ===========================
   */

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  /**
   * ===========================
   * Search
   * ===========================
   */

  const filteredUsers = useMemo(() => {
    return users.filter((user) => {
      const fullName =
        `${user.firstName} ${user.lastName}`;

      return (
        fullName
          .toLowerCase()
          .includes(search.toLowerCase()) ||

        user.email
          .toLowerCase()
          .includes(search.toLowerCase())
      );
    });
  }, [users, search]);

  /**
   * ===========================
   * Pagination
   * ===========================
   */

  const totalPages = Math.max(
    1,
    Math.ceil(
      filteredUsers.length /
        PAGE_SIZE
    )
  );

  const paginatedUsers =
    filteredUsers.slice(
      (currentPage - 1) *
        PAGE_SIZE,
      currentPage * PAGE_SIZE
    );

  /**
   * ===========================
   * Actions
   * ===========================
   */

  const handleCreate = () => {
    dispatch(setSelectedUser(null));
    setIsModalOpen(true);
  };

  const handleEdit = (user: User) => {
    dispatch(setSelectedUser(user));
    setIsModalOpen(true);
  };

  const handleDelete = async (
    user: User
  ) => {
    if (
      !confirm(
        `Delete ${user.firstName} ${user.lastName}?`
      )
    ) {
      return;
    }

    try {
      await dispatch(
        deleteUser(user._id)
      ).unwrap();

      toast.success(
        "User deleted successfully."
      );

      dispatch(fetchUsers());
    } catch (error: any) {
      toast.error(
        error?.message ??
          "Unable to delete user."
      );
    }
  };

  /**
   * ===========================
   * Save User
   * ===========================
   */

  const handleSubmit = async (
    data: UserFormValues
  ) => {
    try {
      setIsSubmitting(true);

      if (selectedUser) {
        await dispatch(
          updateUser({
            id: selectedUser._id,
            data,
          })
        ).unwrap();

        toast.success(
          "User updated successfully."
        );
      } else {
        await dispatch(
          createUser(data)
        ).unwrap();

        toast.success(
          "User created successfully."
        );
      }

      setIsModalOpen(false);

      dispatch(fetchUsers());
    } catch (error: any) {
      toast.error(
        error?.message ??
          "Unable to save user."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  /**
   * ===========================
   * Table Columns
   * ===========================
   */

  const columns: TableColumn<User>[] = [
    {
      key: "name",
      title: "Name",
      render: (user) => (
        <>
          {user.firstName}{" "}
          {user.lastName}
        </>
      ),
    },
    {
      key: "email",
      title: "Email",
    },
    {
      key: "role",
      title: "Role",
    },
    {
      key: "status",
      title: "Status",
      render: (user) => (
        <span
          className={`badge ${
            user.isActive
              ? "badge-success"
              : "badge-warning"
          }`}
        >
          {user.isActive
            ? "Active"
            : "Inactive"}
        </span>
      ),
    },
    {
      key: "actions",
      title: "Actions",
      render: (user) => (
        <div className="flex gap-2">
          <Button
            size="sm"
            onClick={() =>
              handleEdit(user)
            }
          >
            Edit
          </Button>

          <Button
            size="sm"
            variant="danger"
            onClick={() =>
              handleDelete(user)
            }
          >
            Delete
          </Button>
        </div>
      ),
    },
  ];
  
  return (
    <ProtectedRoute>
      <AdminLayout>
        <div className="space-y-6">
          {/* Header */}
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-3xl font-bold">
                Users
              </h1>

              <p className="mt-2 text-text-secondary">
                Manage system users
              </p>
            </div>

            <Button
              onClick={handleCreate}
            >
              Create User
            </Button>
          </div>

          {/* Search */}
          <Input
            placeholder="Search users..."
            value={search}
            onChange={(e) =>
              setSearch(
                e.target.value
              )
            }
          />

          {/* Table */}
          <Table
            columns={columns}
            data={paginatedUsers}
            loading={loading}
            rowKey={(user) =>
              user._id
            }
          />

          {/* Pagination */}
          <Pagination
            currentPage={
              currentPage
            }
            totalPages={
              totalPages
            }
            onPageChange={
              setCurrentPage
            }
          />          {/* Create / Edit User Modal */}
          <Modal
            isOpen={isModalOpen}
            title={
              selectedUser
                ? "Edit User"
                : "Create User"
            }
            size="lg"
            onClose={() => {
              setIsModalOpen(false);
              dispatch(setSelectedUser(null));
            }}
          >
            <UserForm
              initialData={
                selectedUser
                  ? {
                      firstName:
                        selectedUser.firstName,
                      lastName:
                        selectedUser.lastName,
                      email:
                        selectedUser.email,
                      role:
                        selectedUser.role,
                      isActive:
                        selectedUser.isActive,
                    }
                  : undefined
              }
              loading={isSubmitting}
              onSubmit={handleSubmit}
            />
          </Modal>
        </div>
      </AdminLayout>
    </ProtectedRoute>
  );
}  