import dayjs from 'dayjs';

/**
 *
 * @param timestamp  ミリ秒
 */
export const getFormattedDateTime = (timestamp: number) => dayjs(timestamp).format("YYYY-MM-DD HH:mm")