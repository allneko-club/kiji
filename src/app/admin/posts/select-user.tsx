import { FieldName, useField, useInputControl } from '@conform-to/react';
import { User } from '@prisma/client';
import FormLabel from '@mui/material/FormLabel';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import * as React from 'react';

type Field<Schema> = {
  name: FieldName<Schema>;
  label: string;
  required: boolean;
  users: User[];
};

export function SelectUser({ label, required, name, users }: Field<string>) {
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
        required={required}
      >
        {users.map((item) => (
          <MenuItem key={item.id} value={item.id}>
            {item.name}
          </MenuItem>
        ))}
      </TextField>
    </>
  );
}