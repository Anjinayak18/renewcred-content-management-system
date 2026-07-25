"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, Moon, Sun, X } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

interface NavItem {
  label: string;
  href: string;
}

const navItems: NavItem[] = [
  {
    label: "Home",
    href: "/"
  },
  {
    label: "Pages",
    href: "/pages"
  },
  {
    label: "Blog",
    href: "/blog"
  },
  {
    label: "About",
    href: "/about"
  },
  {
    label: "Contact",
    href: "/contact"
  }
];

export default function Navbar() {
  const pathname = usePathname();

  const { theme, setTheme } = useTheme();

  const [mounted, setMounted] =
    useState(false);

  const [mobileOpen, setMobileOpen] =
    useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isActive = (href: string) =>
    pathname === href;

  return (
    <header className="sticky top-0 z-50 border-b border-default bg-card/90 backdrop-blur">
      <div className="container-custom flex h-16 items-center justify-between">
        <Link
          href="/"
          className="text-2xl font-bold text-primary"
        >
          CMS
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`transition ${
                isActive(item.href)
                  ? "font-semibold text-primary"
                  : "text-muted hover:text-primary"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          {mounted && (
            <button
              type="button"
              aria-label="Toggle theme"
              className="rounded-lg border border-default p-2 transition hover:bg-gray-100 dark:hover:bg-slate-800"
              onClick={() =>
                setTheme(
                  theme === "dark"
                    ? "light"
                    : "dark"
                )
              }
            >
              {theme === "dark" ? (
                <Sun size={18} />
              ) : (
                <Moon size={18} />
              )}
            </button>
          )}

          <button
            type="button"
            aria-label="Toggle mobile menu"
            className="rounded-lg border border-default p-2 md:hidden"
            onClick={() =>
              setMobileOpen((prev) => !prev)
            }
          >
            {mobileOpen ? (
              <X size={20} />
            ) : (
              <Menu size={20} />
            )}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <nav className="border-t border-default bg-card md:hidden">
          <div className="container-custom flex flex-col py-4">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`rounded-lg px-2 py-3 transition ${
                  isActive(item.href)
                    ? "font-semibold text-primary"
                    : "text-muted hover:text-primary"
                }`}
                onClick={() =>
                  setMobileOpen(false)
                }
              >
                {item.label}
              </Link>
            ))}
          </div>
        </nav>
      )}
    </header>
  );
}