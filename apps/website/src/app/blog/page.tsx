export default function BlogPage() {
  const posts = [
    {
      id: 1,
      title: "Getting Started with Our CMS",
      excerpt: "Learn how to build and manage websites using our headless CMS platform.",
      author: "Admin",
      date: "24 Jul 2026",
    },
    {
      id: 2,
      title: "Next.js Best Practices",
      excerpt: "Tips for building scalable and high-performance web applications.",
      author: "Editor",
      date: "22 Jul 2026",
    },
    {
      id: 3,
      title: "Tailwind CSS Tips",
      excerpt: "Improve your frontend development workflow with Tailwind CSS.",
      author: "Admin",
      date: "20 Jul 2026",
    },
  ];

  return (
    <main className="min-h-screen px-6 py-16 max-w-6xl mx-auto">
      <h1 className="text-5xl font-bold mb-4">Blog</h1>
      <p className="text-gray-500 mb-10">
        Latest articles and updates from our CMS.
      </p>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <div
            key={post.id}
            className="rounded-xl border p-6 shadow hover:shadow-lg transition"
          >
            <h2 className="text-2xl font-semibold mb-3">
              {post.title}
            </h2>

            <p className="text-gray-500 mb-4">
              {post.excerpt}
            </p>

            <div className="text-sm text-gray-400">
              {post.author} • {post.date}
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}