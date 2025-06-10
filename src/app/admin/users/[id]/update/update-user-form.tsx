'use client';
import * as React from 'react';
import { useActionState } from 'react';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import { getFormProps, getInputProps, useForm } from '@conform-to/react';
import { parseWithZod } from '@conform-to/zod';
import { UsePreventFormReset } from '@/hooks/use-prevent-form-reset';
import { User } from '@prisma/client';
import { updateUserInputSchema } from '@/schemas/user';
import { updateUser } from '@/app/admin/users/actions';
import Select from '@mui/material/Select';
import { getRoleLabel, RoleFilterValues } from '@/config/consts';
import MenuItem from '@mui/material/MenuItem';


export const UpdateUserForm = ({ user }: { user: User }) => {

  const [lastResult, submitAction, isPending] = useActionState(
    updateUser,
    undefined,
  );
  const [form, fields] = useForm({
    lastResult,
    onValidate({ formData }) {
      return parseWithZod(formData, { schema: updateUserInputSchema });
    },
    defaultValue: user,
  });

  UsePreventFormReset({formId: form.id});

  return (
    <form action={submitAction} {...getFormProps(form)}>
      {form.errors && <Alert severity="error">{form.errors}</Alert>}

      <Stack spacing={4} marginY={4}>
        <input {...getInputProps(fields.id, { type: 'text' })} hidden />
        <FormControl required>
          <FormLabel htmlFor={fields.name.name}>名前</FormLabel>
          <TextField
            {...getInputProps(fields.name, { type: 'text' })}
            error={!fields.name.valid}
            helperText={fields.name.errors}
          />
        </FormControl>
        <FormControl required>
          <FormLabel htmlFor={fields.email.name}>メールアドレス</FormLabel>
          <TextField
            {...getInputProps(fields.email, { type: 'text' })}
            error={!fields.email.valid}
            helperText={fields.email.errors}
          />
        </FormControl>
        <FormControl>
          <FormLabel htmlFor={fields.image.name}>画像URL</FormLabel>
          <TextField
            {...getInputProps(fields.image, { type: 'url' })}
            error={!fields.image.valid}
            helperText={fields.image.errors}
          />
        </FormControl>
        <FormControl fullWidth error={!fields.image.valid}>
          <FormLabel htmlFor={fields.role.name}>権限</FormLabel>
          <Select name={fields.role.name} defaultValue={fields.role.initialValue}>
            {Object.keys(RoleFilterValues).map((role) => (
              <MenuItem key={role} value={role}>
                {getRoleLabel(Number(role))}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Stack>

      <Button type="submit" variant="contained" loading={isPending}>保存</Button>

    </form>
  );
};
