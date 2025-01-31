import { getTags } from '@/models/tag';
import TagBadge from '@/components/tag-badge';

export default async function Page() {
  const { tags } = await getTags();

  return (<>
    <h1>タグ</h1>
    <div className="space-x-2">
      {tags.map((tag) => <TagBadge key={tag.id} name={tag.name} />)}
    </div>
  </>);
};
