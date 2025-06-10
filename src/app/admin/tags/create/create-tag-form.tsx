'use client';
import * as React from 'react';
import { useActionState } from 'react';
import { createTag } from '@/app/admin/tags/actions';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import { getFormProps, getInputProps, useForm } from '@conform-to/react';
import { parseWithZod } from '@conform-to/zod';
import { createTagInputSchema } from '@/schemas/tag';
import Alert from '@mui/material/Alert';
import { UsePreventFormReset } from '@/hooks/use-prevent-form-reset';


export const CreateTagForm = () => {
  const [lastResult, submitAction, isPending] = useActionState(
    createTag,
    undefined,
  );
  const [form, fields] = useForm({
    lastResult,
    onValidate({ formData }) {
      return parseWithZod(formData, { schema: createTagInputSchema });
    },
  });

  UsePreventFormReset({formId: form.id});

  return (
    <form action={submitAction} {...getFormProps(form)}>
      {form.errors && <Alert severity="error">{form.errors}</Alert>}

      <Stack spacing={4} marginY={4}>
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
