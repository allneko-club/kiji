'use client';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { cleanOrderBy, parseSortValue } from '@/lib/query-params';
import { cleanOrder } from '@/app/admin/users/clean';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

type Props = {
  selectItems: { [key: string]: string; },
}

/**
 * リストデータの並び順を変更するためのコンポーネント
 * 並び順を変更すると、クエリパラメーターのsortを更新する
 * @param selectItems 並び順の選択肢 keyはapiに渡すための値、 valueは表示する値
 * @constructor
 */
export default function SelectSort({ selectItems }: Props) {

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const order = cleanOrder(searchParams.get('order'));
  const orderBy = cleanOrderBy(searchParams.get('orderBy'));

  const handleChange = (v: string) => {
    const params = new URLSearchParams(Array.from(searchParams.entries()));
    const { order, orderBy } = parseSortValue(v);
    params.set('order', order);
    params.set('orderBy', orderBy);
    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <FormControl fullWidth>
      <FormLabel>ソート</FormLabel>
      <Select
        labelId="sort"
        id="sort"
        defaultValue={`${order}_${orderBy}`}
        onChange={e => handleChange(e.target.value)}
      >
        {Object.keys(selectItems).map((key) => (
          <MenuItem key={key} value={key}>
            {selectItems[key]}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}