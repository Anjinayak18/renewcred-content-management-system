"use client";

import Link from "next/link";
import type { Route } from "next";
import { useRouter } from "next/navigation";
import { ReactNode } from "react";
import { toast } from "sonner";

import { useAppDispatch } from "@/hooks/useAppDispatch";
import { useAppSelector } from "@/hooks/useAppSelector";
import { logout } from "@/store/slices/authSlice";

interface AdminLayoutProps {
  children: ReactNode;
}

const navigation: { label: string; href: Route }[] = [
  {
    label: "Dashboard",
    href: "/dashboard"
  },
  {
    label: "Pages",
    href: "/pages"
  },
  {
    label: "Media",
    href: "/media"
  },
  {
    label: "Users",
    href: "/users"
  },
  {
    label: "Settings",
    href: "/settings"
  }
];

export default function AdminLayout({
  children
}: AdminLayoutProps) {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const { user } = useAppSelector(
    (state) => state.auth
  );

  const handleLogout = () => {
    dispatch(logout());

    toast.success("Logged out successfully.");

    router.replace("/login");
  };

  return (
    <div className="flex min-h-screen bg-background">
      <aside className="hidden w-64 border-r border-border bg-white lg:flex lg:flex-col">
        <div className="border-b border-border p-6">
          <h1 className="text-2xl font-bold text-primary">
            RenewCred CMS
          </h1>
        </div>

        <nav className="flex-1 p-4">
          <ul className="space-y-2">
            {navigation.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="block rounded-lg px-4 py-3 transition hover:bg-slate-100"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="border-t border-border p-4">
          <p className="font-medium">
            {user?.name || "Administrator"}
          </p>

          <p className="mt-1 text-sm text-text-secondary">
            {user?.email || "admin@example.com"}
          </p>

          <button
            onClick={handleLogout}
            className="btn-primary mt-4 w-full"
          >
            Logout
          </button>
        </div>
      </aside>

      <div className="flex min-h-screen flex-1 flex-col">
        <header className="flex items-center justify-between border-b border-border bg-white px-6 py-4">
          <h2 className="text-xl font-semibold">
            Admin Dashboard
          </h2>

          <div className="text-sm text-text-secondary">
            Welcome, {user?.name || "Admin"}
          </div>
        </header>

        <main className="flex-1 p-6">
          {children}
        </main>
      </div>
    </div>
  );
}