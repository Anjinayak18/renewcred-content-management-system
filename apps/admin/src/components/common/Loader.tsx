"use client";

interface LoaderProps {
  size?: "sm" | "md" | "lg";
  text?: string;
  fullScreen?: boolean;
}

const sizeClasses = {
  sm: "h-5 w-5 border-2",
  md: "h-8 w-8 border-4",
  lg: "h-12 w-12 border-4"
};

export default function Loader({
  size = "md",
  text = "Loading...",
  fullScreen = false
}: LoaderProps) {
  const spinner = (
    <div className="flex flex-col items-center justify-center gap-4">
      <div
        className={`animate-spin rounded-full border-slate-300 border-t-primary ${sizeClasses[size]}`}
      />

      {text && (
        <p className="text-sm text-text-secondary">
          {text}
        </p>
      )}
    </div>
  );

  if (fullScreen) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        {spinner}
      </div>
    );
  }

  return spinner;
}