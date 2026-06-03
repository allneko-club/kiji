import { z } from 'zod';

const ACCEPT_MIME_TYPES = ['image/png', 'image/jpeg', 'image/webp'];
const MAX_MB = 2;
const MAX_SIZE = 1024 * 1024 * MAX_MB;

export const imageInputSchema = z.object({
  image: z
    .instanceof(File)
    .refine(({ type }) => ACCEPT_MIME_TYPES.includes(type), {
      message: 'PNG・JPEG・WEBP以外の画像はアップロードできません',
    })
    .refine(({ size }) => size <= MAX_SIZE, {
      message: `${MAX_MB}MB以上のファイルはアップロードできません`,
    }),
});
