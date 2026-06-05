import { notFoundResponse } from '@/app/api/_lib/response';

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  // const post = await getPostById(id);
  const post = { id: 1, title: 'タイトル', content: '内容' };

  if (!post) {
    return notFoundResponse({ details: ['投稿が存在しません'] });
  }

  return Response.json({ data: post }, { status: 200 });
}
