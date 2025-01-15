'use client';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { cleanSortParam } from '@/app/users/utils';

type Props = {
  selectItems: { [key: string]: string; },
}

/**
 * リストデータの並び順を変更するためのコンポーネント
 * 並び順を変更すると、クエリパラメーターのsortを更新する
 * @param selectItems 並び順の選択肢 keyはapiに渡すための値、 valueは表示する値
 * @constructor
 */
export default function SelectSort({selectItems}: Props) {

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const defaultValue = cleanSortParam(searchParams.get('sort') || undefined);

  const handleChange = (v: string) => {
    const params = new URLSearchParams(Array.from(searchParams.entries()));
    params.set("sort", v);
    router.push(`${pathname}?${params.toString()}`);
  }

  return (
    <Select onValueChange={handleChange} defaultValue={defaultValue}>
      <SelectTrigger id="sort" aria-label="sort">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>ソート</SelectLabel>
          {Object.keys(selectItems).map((key) => (
            <SelectItem key={key} value={key}>
              {selectItems[key]}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}