import { env } from '@/lib/env';
import dayjs from 'dayjs';

const DATE_FORMAT = env.NEXT_PUBLIC_DATE_FORMAT;
const TIME_FORMAT = env.NEXT_PUBLIC_TIME_FORMAT;

/**
 * @param timestamp  ミリ秒
 */
export const getFormattedDateTime = (timestamp: number) =>
  dayjs(timestamp).format(`${DATE_FORMAT} ${TIME_FORMAT}`);

export const getFormattedDateTimeFromObj = (obj: Date) => dayjs(obj).format(`${DATE_FORMAT} ${TIME_FORMAT}`);

export const getFormattedDateFromObj = (obj: Date) => dayjs(obj).format(DATE_FORMAT);
