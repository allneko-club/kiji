import { FieldName, useField, useInputControl } from '@conform-to/react';
import FormLabel from '@mui/material/FormLabel';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import { Category } from '@prisma/client';
import * as React from 'react';

type Field<Schema> = {
  name: FieldName<Schema>;
  label: string;
  required: boolean;
  categories: Category[];
};

export function SelectCategory({ label, required, name, categories }: Field<number | null>) {
  const [meta] = useField(name);
  const control = useInputControl(meta);

  return (
    <>
      <FormLabel htmlFor={meta.name}>{label}</FormLabel>
      <TextField
        name={meta.name}
        value={control.value ?? ''}
        onChange={(event) => control.change(event.target.value)}
        onBlur={control.blur}
        error={!meta.valid}
        helperText={meta.errors}
        select
        required={required}>
        {categories.map((item) => (
          <MenuItem key={item.id} value={item.id.toString()}>
            {item.name}
          </MenuItem>
        ))}
      </TextField>
    </>
  );
}
