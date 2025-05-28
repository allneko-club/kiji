'use client';
import { Category, Tag } from '@prisma/client';
import { useActionState, useEffect } from 'react';
import { savePost } from '@/app/my/posts/actions';
import { FormItem, FormMessage } from '@/components/form';
import FormLabel from '@mui/material/FormLabel';
import { toast } from 'react-toastify';
import * as React from 'react';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import TextField from '@mui/material/TextField';
import { Switch } from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

type Props = {
  initialState: {
    id: string;
    title: string;
    content: string;
    published: string;
    categoryId: string;
    tagIds: number[];
  };
  categories: Category[];
  tags: Tag[];
}

export const PostForm = ({ initialState, categories, tags }: Props) => {
  const [state, action, isPending] = useActionState(
    savePost,
    {
      ...initialState,
      message: '',
      errors: { title: '', content: '', published: '', categoryId: '' },
    }
  );

  useEffect(() => {
    if (state.message) {
      toast(state.message);
    }
  }, [state, state.message]);

  return (
    <form action={action}>
      <div>
        <Button type="submit" variant="contained" loading={isPending}>保存</Button>
      </div>

      <div>
        <FormItem>
          <TextField
            id="title"
            name="title"
            required
            label="タイトル"
            variant="outlined"
            defaultValue={state.title}
          />
          <FormMessage>{state?.errors.title}</FormMessage>
        </FormItem>

        <FormItem>
          <TextField
            id="content"
            name="content"
            label="本文"
            multiline
            maxRows={4}
            defaultValue={state.content}
          />
          <FormMessage>{state?.errors.content}</FormMessage>
        </FormItem>

        <FormItem>
          <div>
            <FormLabel htmlFor="published">公開</FormLabel>
            <Switch id="published" name="published" />
          </div>
          <FormMessage>{state?.errors.published}</FormMessage>
        </FormItem>

        <FormItem>
          <InputLabel>カテゴリー</InputLabel>
          <Select
            labelId="categoryId"
            id="categoryId"
            defaultValue={state.categoryId}
            label="categoryId"
          >
            {categories.map((item) => (
              <MenuItem key={item.id} value={item.id.toString()}>
                {item.name}
              </MenuItem>
            ))}
          </Select>
          <FormMessage>{state?.errors?.categoryId}</FormMessage>
        </FormItem>

        <FormItem>
          <div>
            <FormLabel htmlFor="tags">タグ</FormLabel>
            {tags.map(tag => (
              <div key={tag.id}>
                <FormLabel>{tag.name}</FormLabel>
                <Checkbox
                  name="tagIds"
                  value={tag.id}
                  defaultChecked={state.tagIds.includes(tag.id)}
                />
              </div>
            ))}
          </div>
          <FormMessage>{state?.errors.published}</FormMessage>
        </FormItem>
      </div>
    </form>
  );
};
