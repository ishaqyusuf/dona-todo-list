export default function SlugPage({ searchParams, params }) {
  const slug = params.slug;
  const username = params.username;
  return (
    <div>
      <h1>Hello {username}</h1>
      <p>{slug}</p>
    </div>
  );
}
