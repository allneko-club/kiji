import dayjs from 'dayjs';

const DATE_FORMAT = 'YYYY-MM-DD';
const TIME_FORMAT = 'HH:mm';

/**
 * @param timestamp  ミリ秒
 */
export const getFormattedDateTime = (timestamp: number) =>
  dayjs(timestamp).format(`${DATE_FORMAT} ${TIME_FORMAT}`);

export const getFormattedDateTimeFromObj = (obj: Date) => dayjs(obj).format(`${DATE_FORMAT} ${TIME_FORMAT}`);

export const getFormattedDateFromObj = (obj: Date) => dayjs(obj).format(DATE_FORMAT);
