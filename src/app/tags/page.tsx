import { getTags } from '@/models/tag';
import TagBadge from '@/components/tag-badge';
import type { Metadata } from 'next';

export const metadata: Metadata = {title: "タグ"};

export default async function Page() {
  const tags = await getTags();

  return (<>
    <h1>タグ</h1>
    <div className="space-x-2">
      {tags.map((tag) => <TagBadge key={tag.id} name={tag.name} />)}
    </div>
  </>);
};
