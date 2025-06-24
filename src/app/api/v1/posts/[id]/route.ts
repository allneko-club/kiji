import { notFoundResponse } from '@/app/api/_lib/response';
import { getPost } from '@/models/post';

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const post = await getPost(id);

  if (!post) {
    return notFoundResponse({ details: ['投稿が存在しません'] });
  }

  return Response.json({ data: post }, { status: 200 });
}
