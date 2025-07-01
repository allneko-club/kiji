'use client';

import { updateUser } from '@/app/admin/users/actions';
import { paths } from '@/config/paths';
import { Role, getRoleLabel } from '@/lib/roles';
import { getFormattedErrorMessage } from '@/lib/utils';
import { TUpdateUser, ZUpdateUser } from '@/schemas/user';
import { zodResolver } from '@hookform/resolvers/zod';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import FormLabel from '@mui/material/FormLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import { User } from '@prisma/client';
import { useRouter } from 'next/navigation';
import * as React from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

type Props = {
  user: User;
};

export const UserForm = ({ user }: Props) => {
  const router = useRouter();
  const { control, handleSubmit, formState } = useForm<TUpdateUser>({
    defaultValues: user,
    resolver: zodResolver(ZUpdateUser),
    mode: 'onChange',
  });
  const onSubmit: SubmitHandler<TUpdateUser> = async (data) => {
    try {
      const response = await updateUser(data);
      if (response?.data) {
        toast.success('保存しました');
        router.push(paths.admin.users.getHref());
      } else {
        const errorMessage = getFormattedErrorMessage(response);
        toast.error(errorMessage);
      }
    } catch (err) {
      console.error(err);
      toast.error('エラーが発生しました');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={4} marginY={4}>
        <Controller
          name="name"
          defaultValue=""
          control={control}
          render={({ field, fieldState: { error } }) => (
            <FormControl required>
              <FormLabel htmlFor="name">ユーザー名</FormLabel>
              <TextField {...field} error={!!error} helperText={error?.message} />
            </FormControl>
          )}
        />
        <Controller
          name="email"
          defaultValue=""
          control={control}
          render={({ field, fieldState: { error } }) => (
            <FormControl required>
              <FormLabel htmlFor="email">メールアドレス</FormLabel>
              <TextField {...field} error={!!error} helperText={error?.message} />
            </FormControl>
          )}
        />
        <Controller
          name="image"
          defaultValue=""
          control={control}
          render={({ field, fieldState: { error } }) => (
            <FormControl>
              <FormLabel htmlFor="image">画像URL</FormLabel>
              <TextField {...field} error={!!error} helperText={error?.message} />
            </FormControl>
          )}
        />
        <Controller
          name="role"
          defaultValue={Role.USER}
          control={control}
          render={({ field, fieldState: { error } }) => (
            <FormControl error={!!error}>
              <FormLabel htmlFor="role">権限</FormLabel>
              <Select {...field}>
                {Object.values(Role).map((role) => (
                  <MenuItem key={role} value={role}>
                    {getRoleLabel(Number(role))}
                  </MenuItem>
                ))}
              </Select>
              <FormHelperText>{error?.message}</FormHelperText>
            </FormControl>
          )}
        />
      </Stack>

      <Button type="submit" variant="contained" loading={formState.isSubmitting}>
        保存
      </Button>
    </form>
  );
};
