import dayjs from 'dayjs';

/**
 * @param timestamp  ミリ秒
 */
export const getFormattedDateTime = (timestamp: number) => dayjs(timestamp).format("YYYY-MM-DD HH:mm")

export const getFormattedDateTimeFromObj = (obj: Date) => dayjs(obj).format("YYYY-MM-DD HH:mm")

export const getFormattedDateFromObj = (obj: Date) => dayjs(obj).format("YYYY-MM-DD")
