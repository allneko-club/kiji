import { getCategories } from '@/models/category';

export async function GET() {
  const data = await getCategories();

  return Response.json({ data, meta: { count: data.length } }, { status: 200 });
}
