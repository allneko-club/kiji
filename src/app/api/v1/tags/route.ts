import { getTags } from '@/models/tag';

export async function GET() {
  const data = await getTags();

  return Response.json({ data, meta: { count: data.length } }, { status: 200 });
}
