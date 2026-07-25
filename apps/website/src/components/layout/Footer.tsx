import Link from "next/link";
import {
  Github,
  Linkedin,
  Mail,
  Twitter
} from "lucide-react";

const quickLinks = [
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

const socialLinks = [
  {
    label: "GitHub",
    href: "https://github.com",
    icon: Github
  },
  {
    label: "LinkedIn",
    href: "https://linkedin.com",
    icon: Linkedin
  },
  {
    label: "Twitter",
    href: "https://twitter.com",
    icon: Twitter
  },
  {
    label: "Email",
    href: "mailto:info@example.com",
    icon: Mail
  }
];

export default function Footer() {
  return (
    <footer className="border-t border-default bg-card">
      <div className="container-custom py-12">
        <div className="grid gap-10 md:grid-cols-3">
          <div>
            <h2 className="text-2xl font-bold text-primary">
              CMS
            </h2>

            <p className="mt-4 text-muted">
              A modern content management
              system built with Next.js,
              TypeScript, Tailwind CSS and a
              scalable architecture.
            </p>
          </div>

          <div>
            <h3 className="mb-4 text-lg font-semibold">
              Quick Links
            </h3>

            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-muted transition hover:text-primary"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-lg font-semibold">
              Connect
            </h3>

            <div className="flex gap-4">
              {socialLinks.map((item) => {
                const Icon = item.icon;

                return (
                  <a
                    key={item.label}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={item.label}
                    className="rounded-xl border border-default p-3 transition hover:bg-slate-100 dark:hover:bg-slate-800"
                  >
                    <Icon size={20} />
                  </a>
                );
              })}
            </div>

            <p className="mt-6 text-sm text-muted">
              Email:
              <a
                href="mailto:info@example.com"
                className="ml-2 text-primary"
              >
                info@example.com
              </a>
            </p>
          </div>
        </div>

        <div className="mt-10 border-t border-default pt-6 text-center text-sm text-muted">
          © {new Date().getFullYear()} CMS
          Assignment. All rights reserved.
        </div>
      </div>
    </footer>
  );
}