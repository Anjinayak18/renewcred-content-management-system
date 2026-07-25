"use client";

import { ButtonHTMLAttributes, ReactNode } from "react";
import Loader from "@/components/common/Loader";

type Variant =
  | "primary"
  | "secondary"
  | "danger"
  | "outline";

type Size =
  | "sm"
  | "md"
  | "lg";

interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  loading?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  children: ReactNode;
}

const variantClasses: Record<Variant, string> = {
  primary:
    "bg-primary text-white hover:bg-primary-700",

  secondary:
    "bg-slate-100 text-slate-900 hover:bg-slate-200",

  danger:
    "bg-red-600 text-white hover:bg-red-700",

  outline:
    "border border-border bg-white text-slate-900 hover:bg-slate-50"
};

const sizeClasses: Record<Size, string> = {
  sm: "px-3 py-2 text-sm",
  md: "px-5 py-3 text-base",
  lg: "px-6 py-4 text-lg"
};

export default function Button({
  variant = "primary",
  size = "md",
  loading = false,
  leftIcon,
  rightIcon,
  disabled,
  children,
  className = "",
  ...props
}: ButtonProps) {
  return (
    <button
      {...props}
      disabled={disabled || loading}
      className={`
        inline-flex
        items-center
        justify-center
        gap-2
        rounded-xl
        font-medium
        transition-all
        duration-200
        disabled:cursor-not-allowed
        disabled:opacity-60
        ${variantClasses[variant]}
        ${sizeClasses[size]}
        ${className}
      `}
    >
      {loading ? (
        <Loader
          size="sm"
          text=""
        />
      ) : (
        <>
          {leftIcon}

          <span>{children}</span>

          {rightIcon}
        </>
      )}
    </button>
  );
}