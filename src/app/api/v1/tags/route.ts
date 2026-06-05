export async function GET() {
  const data = [{ id: 1, name: 'IT' }];

  return Response.json({ data, meta: { count: data.length } }, { status: 200 });
}
