// app/products/page.tsx
export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<{ id?: string; name?: string }>
}) {
  // Promise 형태의 searchParams를 await으로 해제
  const { id = "non id", name = "non name" } = await searchParams;

  return (
    <div>
      <h1>Products Page</h1>
      <p>id : {id}</p>
      <p>name : {name}</p>
    </div>
  );
}
