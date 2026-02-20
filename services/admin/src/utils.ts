import crypto from 'crypto';
import dayjs from 'dayjs';

export function md5(str?: string) {
  if (str === undefined) {
    return str;
  }

  const hash = crypto.createHash('md5');

  hash.update(str);

  return hash.digest('hex');
}

export function Omit<T extends object, K extends keyof T>(
  obj: T,
  keys: K[],
): Omit<T, K> {
  const result = { ...obj };

  for (const key of keys) {
    delete result[key];
  }

  return result;
}

export const parseDate = (
  date: string | number,
  ...options: dayjs.OptionType[]
) => dayjs(date, ...options).toDate();
