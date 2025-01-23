'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { CalendarIcon } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { cn } from '@/lib/utils';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { getFormattedDateFromObj } from '@/lib/datetime';
import { UserRole } from '@/config/consts';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import { updateQueryParams } from '@/lib/query-params';

const postFormSchema = z.object({
  id: z.string().optional(),
  name: z.string().optional(),
  email: z.string().optional(),
  role: z.nativeEnum(UserRole).optional(),
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
    <div className="p-3 my-3 rounded bg-slate-200 dark:bg-slate-800">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <div className="flex justify-between">
            <span>フィルター</span>
            <div className="grid grid-cols-2 gap-2">
              <Button onClick={(e)=> {
                e.preventDefault();
                form.reset({id:'', name:'', email: '', role: undefined, registeredFrom: undefined, registeredTo: undefined})
              }}>
                クリア
              </Button>
              <Button type="submit">検索</Button>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="id"
              render={({ field }) => (
                <FormItem className="grid gap-2">
                  <FormLabel>ID</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="grid gap-2">
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="grid gap-2">
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="role"
              render={({ field }) => (
                <FormItem className="grid gap-2">
                  <FormLabel>権限</FormLabel>
                  <FormControl>
                    <Select onValueChange={field.onChange} defaultValue={field.value} value={field.value}>
                      <SelectTrigger id="role" aria-label="role">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {Object.values(UserRole).map((role) => (
                          <SelectItem key={role} value={role}>
                            {role}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="registeredFrom"
              render={({ field }) => (
                <FormItem className="grid gap-2 flex-col">
                  <FormLabel>登録日(From)</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant="outline"
                          className={cn(!field.value && 'text-muted-foreground')}
                        >
                          {field.value && getFormattedDateFromObj(field.value)}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date) =>
                          date > new Date() || date < new Date('1900-01-01')
                        }
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="registeredTo"
              render={({ field }) => (
                <FormItem className="grid gap-2 flex-col">
                  <FormLabel>登録日(To)</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant="outline"
                          className={cn(!field.value && 'text-muted-foreground')}
                        >
                          {field.value && getFormattedDateFromObj(field.value)}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date) =>
                          date > new Date() || date < new Date('1900-01-01')
                        }
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </form>
      </Form>
    </div>
  )
}