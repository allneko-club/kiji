'use client';

import { RoleFilterValues, getRoleLabel } from '@/config/consts';
import { updateQueryParams } from '@/lib/query-params';
import { zodResolver } from '@hookform/resolvers/zod';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Grid from '@mui/material/Grid';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import 'dayjs/locale/de';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import * as React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { z } from 'zod';

const postFormSchema = z.object({
  id: z.string().optional(),
  name: z.string().optional(),
  email: z.string().optional(),
  role: z.union([z.literal(''), z.enum(RoleFilterValues)]),
  registeredFrom: z.date().optional(),
  registeredTo: z.date().optional(),
});

type PostFormValues = z.infer<typeof postFormSchema>;

type Props = {
  defaultValues: Partial<PostFormValues>;
};

export default function UsersFilter({ defaultValues }: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const { handleSubmit, control, reset } = useForm<PostFormValues>({
    defaultValues,
    resolver: zodResolver(postFormSchema),
  });

  function onSubmit(data: PostFormValues) {
    const params = new URLSearchParams(Array.from(searchParams.entries()));
    const query = updateQueryParams(params, data);
    router.push(encodeURI(`${pathname}${query}`));
  }

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="ja">
      <form onSubmit={handleSubmit(onSubmit)}>
        <Typography variant="h5" component="h2">
          フィルター
        </Typography>

        <Grid container spacing={2}>
          <Grid size={6}>
            <FormControl fullWidth>
              <FormLabel htmlFor="id">ID</FormLabel>
              <Controller name="id" control={control} render={({ field }) => <TextField {...field} />} />
            </FormControl>
          </Grid>
          <Grid size={6}>
            <FormControl fullWidth>
              <FormLabel htmlFor="name">名前</FormLabel>
              <Controller name="name" control={control} render={({ field }) => <TextField {...field} />} />
            </FormControl>
          </Grid>
          <Grid size={6}>
            <FormControl fullWidth>
              <FormLabel htmlFor="email">メールアドレス</FormLabel>
              <Controller name="email" control={control} render={({ field }) => <TextField {...field} />} />
            </FormControl>
          </Grid>
          <Grid size={6}>
            <FormControl fullWidth>
              <FormLabel htmlFor="role">権限</FormLabel>
              <Controller
                name="role"
                control={control}
                render={({ field }) => (
                  <Select
                    defaultValue={defaultValues.role}
                    value={field.value}
                    onChange={(e) => field.onChange(e.target.value)}>
                    {Object.keys(RoleFilterValues).map((role) => (
                      <MenuItem key={role} value={role}>
                        {getRoleLabel(Number(role))}
                      </MenuItem>
                    ))}
                  </Select>
                )}
              />
            </FormControl>
          </Grid>
          <Grid size={6}>
            <Controller
              control={control}
              name="registeredFrom"
              render={({ field }) => (
                <div>
                  <DatePicker label="登録日(From)" onChange={(newValue) => field.onChange(newValue)} />
                </div>
              )}
            />
          </Grid>
          <Grid size={6}>
            <Controller
              control={control}
              name="registeredTo"
              render={({ field }) => (
                <div>
                  <DatePicker label="登録日(To)" onChange={(newValue) => field.onChange(newValue)} />
                </div>
              )}
            />
          </Grid>
        </Grid>
        <Stack spacing={2} direction="row">
          <Button
            variant="contained"
            onClick={(e) => {
              e.preventDefault();
              reset({
                id: '',
                name: '',
                email: '',
                role: '',
                registeredFrom: undefined,
                registeredTo: undefined,
              });
            }}>
            クリア
          </Button>
          <Button type="submit" variant="contained">
            検索
          </Button>
        </Stack>
      </form>
    </LocalizationProvider>
  );
}
