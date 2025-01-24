'use client';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { cleanOrder, cleanOrderBy, parseSortValue } from '@/lib/query-params';

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
  const order = cleanOrder(searchParams.get('order'));
  const orderBy = cleanOrderBy(searchParams.get('orderBy'));

  const handleChange = (v: string) => {
    const params = new URLSearchParams(Array.from(searchParams.entries()));
    const {order , orderBy} = parseSortValue(v);
    params.set('order', order);
    params.set('orderBy', orderBy);
    router.push(`${pathname}?${params.toString()}`);
  }

  return (
    <Select onValueChange={handleChange} defaultValue={`${order}_${orderBy}`}>
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