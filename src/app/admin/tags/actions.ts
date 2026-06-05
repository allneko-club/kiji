'use server';

import { adminActionClient } from '@/lib/action-client';
import { ZId } from '@/types/common';
import { ZTag } from '@/types/tag';
import { z } from 'zod';

export const createTag = adminActionClient.inputSchema(ZTag).action(async ({ parsedInput }) => {
  return { id: 1, name: 'タグ２', slug: 'tag2' };
});

export const updateTag = adminActionClient.inputSchema(ZTag).action(async ({ parsedInput }) => {
  return { id: 1, name: 'タグ２', slug: 'tag2' };
});

const ZDeleteTag = z.object({ id: ZId });

export const deleteTag = adminActionClient.inputSchema(ZDeleteTag).action(async ({ parsedInput }) => {
  return true;
});
