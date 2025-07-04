import { z } from 'zod';

export type OrderBy = 'asc' | 'desc';

export const ZId = z.number().min(1);
export const ZCuid = z.string().cuid2();
