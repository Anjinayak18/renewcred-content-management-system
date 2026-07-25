"use client";

import { ReactNode, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { useAppSelector } from "@/hooks/useAppSelector";

interface ProtectedRouteProps {
  children: ReactNode;
}

export default function ProtectedRoute({
  children,
}: ProtectedRouteProps) {
  const router = useRouter();

  const [mounted, setMounted] = useState(false);

  const { isAuthenticated, loading } = useAppSelector(
    (state) => state.auth
  );

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted && !loading && !isAuthenticated) {
      router.replace("/login");
    }
  }, [mounted, loading, isAuthenticated, router]);

  // Prevent hydration mismatch
  if (!mounted) {
    return null;
  }

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="text-center">
          <div className="mx-auto h-12 w-12 animate-spin rounded-full border-4 border-slate-200 border-t-primary" />
          <p className="mt-4 text-text-secondary">
            Verifying authentication...
          </p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return <>{children}</>;
}