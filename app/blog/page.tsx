import Link from "next/link";

export default function BlogPage() {
  const blogs = [
    { title: "How to cook beans", slug: "how-to-cook-beans" },
    { title: "How to make money in 30 seconds", slug: "how-to-make-money" },
    { title: "How to be a Pro in Nextjs", slug: "how-to-be-a-pro-in-next-js" },
  ];
  return (
    <ul>
      {blogs.map((blog) => (
        <li key={blog.slug}>
          <Link href={`/blog/@japhet/${blog.slug}`}>{blog.title}</Link>
        </li>
      ))}
    </ul>
  );
}
