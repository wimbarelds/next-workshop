export function Step3() {
  return (
    <div className="prose prose-invert prose-2xl">
      <h1>Server Components</h1>
      <ul>
        <li>
          https://nextjs.org/docs/app/building-your-application/data-fetching/fetching-caching-and-revalidating
        </li>
        <li>Server Components, Client Components, Components</li>
        <li>Server components can use client components in JSX</li>
        <li>Client components cannot use server components in JSX</li>
        <li>Client components _CAN_ be passed "server components" a children</li>
        <li>Nesting</li>
      </ul>
    </div>
  );
}
