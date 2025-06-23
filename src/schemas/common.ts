import { z } from 'zod';

export const ZId = z.number().min(1);
export const ZCuid = z.string().cuid2();
