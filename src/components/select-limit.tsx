'use client';

import { cleanPerPage } from '@/lib/query-params';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

type Props = {
  limitList: number[];
};

/**
 * リストデータの表示件数を変更するためのコンポーネント
 * 表示件数を変更すると、クエリパラメーターのperPageを更新する
 * @param limitList 表示件数の選択肢
 */
export default function SelectLimit({ limitList }: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const defaultValue = cleanPerPage(searchParams.get('perPage'), limitList);

  const handleChange = (v: string) => {
    const params = new URLSearchParams(Array.from(searchParams.entries()));
    params.set('perPage', v);
    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <FormControl fullWidth>
      <FormLabel>表示件数</FormLabel>
      <Select
        labelId="perPage"
        id="perPage"
        defaultValue={defaultValue.toString()}
        onChange={(e) => handleChange(e.target.value)}>
        {limitList.map((item) => (
          <MenuItem key={item} value={item.toString()}>
            {item}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
