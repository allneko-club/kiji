'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Form, FormControl, FormField } from '@/components/ui/form';
import { getRoleLabel, RoleFilterValues } from '@/config/consts';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { updateQueryParams } from '@/lib/query-params';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import 'dayjs/locale/de';
import * as React from 'react';
import dayjs from 'dayjs';
import {
  Button,
  FormLabel,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@mui/material';


const postFormSchema = z.object({
  id: z.string().optional(),
  name: z.string().optional(),
  email: z.string().optional(),
  role: z.union([z.literal(''), z.enum(RoleFilterValues)]) ,
  registeredFrom: z.date().optional(),
  registeredTo: z.date().optional(),
})

type PostFormValues = z.infer<typeof postFormSchema>

type Props = {
  defaultValues: Partial<PostFormValues>
}

export default function UsersFilter({defaultValues}: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const form = useForm<PostFormValues>({
    defaultValues,
    resolver: zodResolver(postFormSchema),
  })

  function onSubmit(data: PostFormValues) {
    const params = new URLSearchParams(Array.from(searchParams.entries()));
    const query = updateQueryParams(params, data);
    router.push(encodeURI(`${pathname}${query}`));
  }

  return (
    <div>
      <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="ja">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div>
              <span>フィルター</span>
              <div>
                <Button
                  variant="contained"
                  onClick={(e)=> {
                    e.preventDefault();
                    console.log(form.getValues('role'))
                    form.reset({id:'', name:'', email: '', role: '', registeredFrom: undefined, registeredTo: undefined})
                  }}
                >
                  クリア
                </Button>
                <Button type="submit" variant="contained">検索</Button>
              </div>
            </div>

            <div>
              <FormField
                control={form.control}
                name="id"
                render={({ field }) => (
                  <div>
                    <FormLabel>ID</FormLabel>
                    <FormControl>
                      <TextField {...field} />
                    </FormControl>
                  </div>
                )}
              />
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <div>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <TextField {...field} />
                    </FormControl>
                  </div>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <div>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <TextField {...field} />
                    </FormControl>
                  </div>
                )}
              />

              <FormField
                control={form.control}
                name="role"
                render={({ field }) => (
                  <div>
                    <InputLabel>権限</InputLabel>
                    <FormControl>
                      <Select
                        labelId="role"
                        id="role"
                        defaultValue={field.value}
                        value={field.value}
                        label="role"
                        onChange={e => field.onChange(e.target.value)}
                      >
                        {Object.keys(RoleFilterValues).map((role) => (
                          <MenuItem key={role} value={role}>
                            {getRoleLabel(Number(role))}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </div>
                )}
              />

              <FormField
                control={form.control}
                name="registeredFrom"
                render={({ field }) => (
                  <div>
                    <DatePicker
                      label="登録日(From)"
                      value={dayjs(field.value)}
                      onChange={(newValue) => field.onChange(newValue)}
                    />
                  </div>
                )}
              />
              <FormField
                control={form.control}
                name="registeredTo"
                render={({ field }) => (
                  <div>
                    <DatePicker
                      label="登録日(To)"
                      value={dayjs(field.value)}
                      onChange={(newValue) => field.onChange(newValue)}
                    />
                  </div>
                )}
              />
            </div>
          </form>
        </Form>
      </LocalizationProvider>
    </div>
  )
}