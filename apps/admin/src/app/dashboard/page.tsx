"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

import AdminLayout from "@/components/layout/AdminLayout";
import ProtectedRoute from "@/components/layout/ProtectedRoute";

import { useAppDispatch } from "@/hooks/useAppDispatch";
import { fetchDashboard } from "@/store/slices/dashboardSlice";

import { useAppSelector } from "@/hooks/useAppSelector";


export default function DashboardPage() {
  const router = useRouter();

  const dispatch = useAppDispatch();

  const { isAuthenticated, user } = useAppSelector(
    (state) => state.auth
  );

  const { stats } = useAppSelector(
    (state) => state.dashboard
  );

  useEffect(() => {
  if (isAuthenticated) {
    dispatch(fetchDashboard());
  }
}, [dispatch, isAuthenticated]);

  

  const cards = [
    {
      title: "Total Pages",
      value: stats.totalPages
    },
    {
      title: "Published Pages",
      value: stats.publishedPages
    },
    {
      title: "Draft Pages",
      value: stats.draftPages
    },
    {
      title: "Media Files",
      value: stats.totalMedia
    }
  ];

  return (
  <ProtectedRoute>
    <AdminLayout>
      <div className="space-y-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">
            Dashboard
          </h1>

          <p className="mt-2 text-text-secondary">
            Welcome back
            {user
              ? `, ${user.firstName ?? ""} ${user.lastName ?? ""}`.trim()
              : ""}
            .
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {cards.map((card) => (
            <div
              key={card.title}
              className="card"
            >
              <h2 className="text-sm text-text-secondary">
                {card.title}
              </h2>

              <p className="mt-3 text-4xl font-bold">
                {card.value}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-2">
          <section className="card">
            <h2 className="card-title">
              Recent Activity
            </h2>

            <div className="mt-4 text-text-secondary">
              No recent activity available.
            </div>
          </section>

          <section className="card">
            <h2 className="card-title">
              Quick Actions
            </h2>

            <div className="mt-4 flex flex-wrap gap-3">
              <button
                className="btn-primary"
                onClick={() => router.push("/pages")}
              >
                Create Page
              </button>

              <button
                className="btn-secondary"
                onClick={() => router.push("/media")}
              >
                Upload Media
              </button>

              <button
                className="btn-secondary"
                onClick={() => router.push("/users")}
              >
                Manage Users
              </button>
            </div>
          </section>
        </div>
      </div>
    </AdminLayout>
  </ProtectedRoute>
);