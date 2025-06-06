'use client';
import * as React from 'react';
import { useActionState } from 'react';
import { updateTag } from '@/app/admin/tags/actions';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import { getFormProps, getInputProps, useForm } from '@conform-to/react';
import { parseWithZod } from '@conform-to/zod';
import { updateTagInputSchema } from '@/app/admin/tags/schema';
import { UsePreventFormReset } from '@/hooks/use-prevent-form-reset';
import { Tag } from '@prisma/client';


export const UpdateTagForm = ({ tag }: { tag: Tag }) => {

  const [lastResult, submitAction, isPending] = useActionState(
    updateTag,
    undefined,
  );
  const [form, fields] = useForm({
    lastResult,
    onValidate({ formData }) {
      return parseWithZod(formData, { schema: updateTagInputSchema });
    },
    defaultValue: tag,
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
