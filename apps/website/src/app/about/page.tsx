import { CheckCircle, Code2, Target, Users } from "lucide-react";

const technologies = [
  "Next.js 15",
  "React 19",
  "TypeScript",
  "Tailwind CSS",
  "Node.js",
  "Express.js",
  "MongoDB",
  "JWT Authentication"
];

export default function AboutPage() {
  return (
    <div className="section">
      <div className="container-custom">
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="section-title">
            About Our CMS
          </h1>

          <p className="section-subtitle">
            We build modern, scalable, and secure content
            management solutions that help businesses manage
            their digital content efficiently.
          </p>
        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-3">
          <div className="card text-center">
            <div className="mb-6 flex justify-center text-primary">
              <Target size={42} />
            </div>

            <h2 className="text-2xl font-semibold">
              Our Mission
            </h2>

            <p className="mt-4 text-muted">
              Deliver an intuitive CMS platform that simplifies
              website management while maintaining flexibility
              and performance.
            </p>
          </div>

          <div className="card text-center">
            <div className="mb-6 flex justify-center text-primary">
              <Users size={42} />
            </div>

            <h2 className="text-2xl font-semibold">
              Our Vision
            </h2>

            <p className="mt-4 text-muted">
              Empower developers, businesses, and content
              creators with reliable tools for modern web
              applications.
            </p>
          </div>

          <div className="card text-center">
            <div className="mb-6 flex justify-center text-primary">
              <Code2 size={42} />
            </div>

            <h2 className="text-2xl font-semibold">
              Our Technology
            </h2>

            <p className="mt-4 text-muted">
              Built with industry-standard technologies for
              speed, scalability, and maintainability.
            </p>
          </div>
        </div>

        <div className="mt-16 card">
          <h2 className="text-3xl font-bold">
            Technology Stack
          </h2>

          <p className="mt-4 text-muted">
            Our CMS leverages modern technologies to deliver
            high performance and developer productivity.
          </p>

          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {technologies.map((tech) => (
              <div
                key={tech}
                className="flex items-center gap-3 rounded-xl border border-default p-4"
              >
                <CheckCircle
                  size={20}
                  className="text-primary"
                />

                <span>{tech}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}