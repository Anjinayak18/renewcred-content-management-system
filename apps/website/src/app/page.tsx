import Link from "next/link";
import { ArrowRight, FileText, Globe, Layout } from "lucide-react";

export default function HomePage() {
  const features = [
    {
      title: "Content Management",
      description:
        "Create, edit, publish and manage website pages through the admin dashboard.",
      icon: FileText
    },
    {
      title: "Responsive Design",
      description:
        "A fully responsive website built with Next.js, Tailwind CSS and TypeScript.",
      icon: Layout
    },
    {
      title: "Modern Architecture",
      description:
        "Scalable frontend and backend architecture suitable for production applications.",
      icon: Globe
    }
  ];

  return (
    <>
      <section className="section">
        <div className="container-custom">
          <div className="mx-auto max-w-4xl text-center">
            <span className="inline-flex rounded-full bg-blue-100 px-4 py-2 text-sm font-medium text-primary">
              Modern CMS Platform
            </span>

            <h1 className="mt-6 text-5xl font-bold leading-tight md:text-6xl">
              Build and Manage Your Website
              with Ease
            </h1>

            <p className="section-subtitle mx-auto max-w-2xl">
              A complete Content Management System built using
              Next.js, TypeScript, Tailwind CSS and Node.js.
            </p>

            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link
                href="/pages"
                className="btn-primary"
              >
                Explore Pages
              </Link>

              <Link
                href="/about"
                className="btn-secondary flex items-center gap-2"
              >
                Learn More
                <ArrowRight size={18} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="section bg-slate-50 dark:bg-slate-900">
        <div className="container-custom">
          <div className="mb-12 text-center">
            <h2 className="section-title">
              Key Features
            </h2>

            <p className="section-subtitle">
              Everything you need to build and manage
              modern websites.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {features.map((feature) => {
              const Icon = feature.icon;

              return (
                <div
                  key={feature.title}
                  className="card"
                >
                  <div className="mb-6 inline-flex rounded-xl bg-blue-100 p-4 text-primary dark:bg-blue-900">
                    <Icon size={28} />
                  </div>

                  <h3 className="text-xl font-semibold">
                    {feature.title}
                  </h3>

                  <p className="mt-4 text-muted">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container-custom">
          <div className="card text-center">
            <h2 className="section-title">
              Ready to Get Started?
            </h2>

            <p className="section-subtitle mx-auto max-w-2xl">
              Start managing your website content with our
              powerful CMS dashboard and modern tools.
            </p>

            <div className="mt-8">
              <Link
                href="/contact"
                className="btn-primary"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}