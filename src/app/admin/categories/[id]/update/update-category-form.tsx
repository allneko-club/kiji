'use client';
import * as React from 'react';
import { useActionState } from 'react';
import { updateCategory } from '@/app/admin/categories/actions';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import { getFormProps, getInputProps, useForm } from '@conform-to/react';
import { parseWithZod } from '@conform-to/zod';
import { editCategoryInputSchema } from '@/app/admin/categories/schema';
import { Category } from '@prisma/client';
import { UsePreventFormReset } from '@/app/admin/categories/[id]/update/use-prevent-form-reset';


export const UpdateCategoryForm = ({ category }: { category: Category }) => {

  const [lastResult, submitAction, isPending] = useActionState(
    updateCategory,
    undefined,
  );
  const [form, fields] = useForm({
    lastResult,
    onValidate({ formData }) {
      return parseWithZod(formData, { schema: editCategoryInputSchema });
    },
    defaultValue: category,
  });

  UsePreventFormReset({formId: form.id});

  return (
    <form action={submitAction} {...getFormProps(form)}>
      {form.errors && <Alert severity="error">{form.errors}</Alert>}

      <Stack spacing={4} marginY={4}>
        <input {...getInputProps(fields.id, { type: 'number' })} hidden />
        <FormControl required>
          <FormLabel htmlFor={fields.name.name}>名前</FormLabel>
          <TextField
            {...getInputProps(fields.name, { type: 'text' })}
            error={!fields.name.valid}
            helperText={fields.name.errors}
          />
        </FormControl>
        <FormControl required>
          <FormLabel htmlFor={fields.slug.name}>スラッグ</FormLabel>
          <TextField
            {...getInputProps(fields.slug, { type: 'text' })}
            error={!fields.slug.valid}
            helperText={fields.slug.errors}
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
        <FormControl>
          <FormLabel htmlFor={fields.description.name}>説明</FormLabel>
          <TextField
            {...getInputProps(fields.description, { type: 'text' })}
            multiline
            rows={4}
            error={!fields.description.valid}
            helperText={fields.description.errors}
          />
        </FormControl>
      </Stack>

      <Button type="submit" variant="contained" loading={isPending}>保存</Button>

    </form>
  );
};
