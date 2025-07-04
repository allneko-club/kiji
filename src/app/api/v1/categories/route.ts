import { getCategories } from '@/features/posts/models/category';

export async function GET() {
  const data = await getCategories();

  return Response.json({ data, meta: { count: data.length } }, { status: 200 });
}
