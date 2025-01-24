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
import { cleanPerPage } from '@/lib/query-params';

type Props = {
  selectItems: number[],
}

/**
 * リストデータの表示件数を変更するためのコンポーネント
 * 表示件数を変更すると、クエリパラメーターのperPageを更新する
 * @param selectItems 表示件数の選択肢
 */
export default function SelectPerPage({selectItems}: Props) {

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const defaultValue = cleanPerPage(searchParams.get('perPage'), selectItems);

  const handleChange = (v: string) => {
    const params = new URLSearchParams(Array.from(searchParams.entries()));
    params.set("perPage", v);
    router.push(`${pathname}?${params.toString()}`);
  }

  return (
    <Select onValueChange={handleChange} defaultValue={defaultValue.toString()}>
      <SelectTrigger id="perPage" aria-label="perPage">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>表示件数</SelectLabel>
          {selectItems.map((item) => (
            <SelectItem key={item} value={item.toString()}>
              {item}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}