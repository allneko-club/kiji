'use client';
import { Category, Tag } from '@prisma/client';
import * as React from 'react';
import { useActionState, useEffect } from 'react';
import { savePost } from '@/app/my/posts/actions';
import { toast } from 'react-toastify';
import {
  Button,
  Checkbox,
  FormControl,
  FormLabel,
  InputLabel,
  MenuItem,
  Select,
  Switch,
  TextField,
} from '@mui/material';

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
    },
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
        <FormControl required>
          <TextField
            id="title"
            name="title"

            label="タイトル"
            defaultValue={state.title}
            error={!!state.errors.title}
            helperText={state?.errors.title}
          />
        </FormControl>

        <FormControl>
          <TextField
            id="content"
            name="content"
            label="本文"
            multiline
            maxRows={4}
            defaultValue={state.content}
            error={!!state.errors.content}
            helperText={state?.errors.content}
          />
        </FormControl>

        <FormControl>
          <div>
            <FormLabel htmlFor="published">公開</FormLabel>
            <Switch
              id="published"
              name="published"
              // helperText={state?.errors.published}
            />
          </div>
        </FormControl>

        <FormControl>
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
          {/*todo エラーメッセージ*/}
          {state?.errors?.categoryId}
        </FormControl>

        <FormControl>
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
          {/*todo エラーメッセージ*/}
          {state?.errors.published}
        </FormControl>
      </div>
    </form>
  );
};
