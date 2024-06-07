import dayjs from "dayjs";
import { Moment } from "moment";

/**
 * 格式化日期选择器的日期
 *
 * @export
 * @param {(string | number | Moment)} data
 * @return {*} 
 */
export function formatDate(data: string | number | Moment) {
  return data ? (typeof data === 'object' ? data : dayjs(data)) : data;
}

/**
 * 格式化dateRange日期
 *
 * @export
 * @param {((string | number | Moment)[])} [data=[]]
 * @return {*} 
 */
export function formDataRange(data: (string | number | Moment)[] | null = []) {
  return !data ? data : data.length ? data.map(item => formatDate(item)) : data;
}