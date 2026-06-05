'use server';

import { adminActionClient } from '@/lib/action-client';
import { ZCategory } from '@/types/category';
import { ZId } from '@/types/common';
import { z } from 'zod';

export const createCategory = adminActionClient.inputSchema(ZCategory).action(async ({ parsedInput }) => {
  return { data: { id: 2, name: 'ok' } };
});

export const updateCategory = adminActionClient.inputSchema(ZCategory).action(async ({ parsedInput }) => {
  return { data: { id: 2, name: 'ok' } };
});

const ZDeleteCategory = z.object({ id: ZId });

export const deleteCategory = adminActionClient
  .inputSchema(ZDeleteCategory)
  .action(async ({ parsedInput }) => {
    return true;
  });
